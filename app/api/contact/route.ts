import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Simple rate limiting implementation
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5
const ipRequestCounts = new Map<string, { count: number; timestamp: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const requestData = ipRequestCounts.get(ip)

  if (!requestData) {
    ipRequestCounts.set(ip, { count: 1, timestamp: now })
    return false
  }
  
  if (now - requestData.timestamp > RATE_LIMIT_WINDOW) {
    // Reset if the window has passed
    ipRequestCounts.set(ip, { count: 1, timestamp: now })
    return false
  }

  if (requestData.count >= MAX_REQUESTS_PER_WINDOW) {
    return true
  }

  requestData.count++
  return false
}

// Input validation
function validateInput(data: any): string | null {
  if (!data.name || typeof data.name !== 'string' || data.name.length < 2) {
    return 'Invalid name'
  }

  if (!data.email || typeof data.email !== 'string' || 
      !data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return 'Invalid email'
  }

  if (!data.message || typeof data.message !== 'string' || data.message.length < 10) {
    return 'Message too short'
  }

  if (data.phone && typeof data.phone !== 'string') {
    return 'Invalid phone number'
  }

  // Check for suspicious patterns
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /data:/i,
    /on\w+=/i,
  ]

  const allFields = `${data.name}${data.email}${data.message}${data.phone || ''}`
  if (suspiciousPatterns.some(pattern => pattern.test(allFields))) {
    return 'Invalid input detected'
  }

  return null
}

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEmail(data: any) {
  // HTML template for admin notification
  const adminEmailHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          font-family: Arial, sans-serif;
          line-height: 1.6;
        }
        .header {
          background: #2563eb;
          color: white;
          padding: 20px;
          text-align: center;
        }
        .content {
          padding: 20px;
          background: #f8fafc;
        }
        .footer {
          background: #1e40af;
          color: white;
          padding: 15px;
          text-align: center;
          font-size: 12px;
        }
        .info-item {
          margin-bottom: 15px;
          padding: 10px;
          background: white;
          border-radius: 5px;
        }
        .label {
          font-weight: bold;
          color: #2563eb;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>New Contact Form Submission</h1>
          <p>Received on ${new Date().toLocaleString()}</p>
        </div>
        <div class="content">
          <div class="info-item">
            <span class="label">Name:</span>
            <p>${data.name}</p>
          </div>
          <div class="info-item">
            <span class="label">Email:</span>
            <p>${data.email}</p>
          </div>
          <div class="info-item">
            <span class="label">Phone:</span>
            <p>${data.phone || 'Not provided'}</p>
          </div>
          <div class="info-item">
            <span class="label">Message:</span>
            <p>${data.message}</p>
          </div>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} DevNex. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // HTML template for auto-response to user
  const userAutoResponseHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          font-family: Arial, sans-serif;
          line-height: 1.6;
        }
        .header {
          background: #2563eb;
          color: white;
          padding: 20px;
          text-align: center;
        }
        .content {
          padding: 20px;
          background: #f8fafc;
        }
        .footer {
          background: #1e40af;
          color: white;
          padding: 15px;
          text-align: center;
          font-size: 12px;
        }
        .button {
          display: inline-block;
          padding: 10px 20px;
          background: #2563eb;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          margin-top: 15px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>Thank You for Contacting DevNex</h1>
        </div>
        <div class="content">
          <p>Dear ${data.name},</p>
          <p>Thank you for reaching out to us. We have received your message and will get back to you within 24-48 hours.</p>
          <p>Here's a copy of your message:</p>
          <blockquote style="border-left: 3px solid #2563eb; padding-left: 15px; margin: 15px 0;">
            ${data.message}
          </blockquote>
          <p>In the meantime, feel free to:</p>
          <ul>
            <li>Visit our website: <a href="https://devnex.co">devnex.co</a></li>
            <li>Follow us on social media for updates</li>
            <li>Check out our portfolio</li>
          </ul>
          <a href="https://devnex.co/portfolio" class="button">View Our Work</a>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} DevNex. All rights reserved.</p>
          <div style="margin-top: 10px;">
            <a href="https://www.linkedin.com/company/devnexglobal/" style="color: white; margin: 0 5px;">LinkedIn</a> |
            <a href="https://twitter.com/DevnexGlobal" style="color: white; margin: 0 5px;">Twitter</a> |
            <a href="https://www.instagram.com/devnex.co/" style="color: white; margin: 0 5px;">Instagram</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  // Send notification to admin
  const adminMailOptions = {
    from: `"DevNex Contact Form" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `New Contact: ${data.name} - ${data.email} - ${new Date().toLocaleDateString()}`,
    html: adminEmailHTML,
    replyTo: data.email,
    headers: {
      'X-Priority': '1',
      'X-MSMail-Priority': 'High',
      'Importance': 'high'
    }
  };

  // Send auto-response to user
  const userMailOptions = {
    from: `"DevNex Team" <${process.env.EMAIL_USER}>`,
    to: data.email,
    subject: 'Thank You for Contacting DevNex',
    html: userAutoResponseHTML,
  };

  // Send both emails
  await Promise.all([
    transporter.sendMail(adminMailOptions),
    transporter.sendMail(userMailOptions)
  ]);
}

export async function POST(request: Request) {
  try {
    // Get client IP
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    
    // Check rate limit
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      )
    }

    const data = await request.json()

    // Validate input
    const validationError = validateInput(data)
    if (validationError) {
      return NextResponse.json(
        { error: validationError },
        { status: 400 }
      )
    }

    // Send email
    await sendEmail(data)

    return NextResponse.json({ 
      success: true,
      message: 'Message sent successfully'
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}
