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
          font-family: 'Helvetica', Arial, sans-serif;
          line-height: 1.6;
          background: #ffffff;
        }
        .header {
          background: #1c4c66;
          padding: 30px 20px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .header h1 {
          color: white;
          font-size: 24px;
          font-weight: 300;
          margin: 0;
        }
        .header p {
          color: rgba(255, 255, 255, 0.9);
          font-size: 14px;
          margin: 5px 0 0;
        }
        .content {
          padding: 40px 30px;
          background: #ffffff;
        }
        .info-item {
          margin-bottom: 25px;
          padding: 15px;
          background: #f8f9fa;
          border-left: 3px solid #3bada9;
          border-radius: 4px;
        }
        .label {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #1c4c66;
          margin-bottom: 5px;
          display: block;
        }
        .footer {
          background: #f8f9fa;
          color: #1c4c66;
          padding: 20px;
          text-align: center;
          font-size: 12px;
          border-radius: 0 0 8px 8px;
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
          font-family: 'Helvetica', Arial, sans-serif;
          line-height: 1.6;
          background: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
          background: #1c4c66;
          padding: 40px 20px;
          text-align: center;
        }
        .header h1 {
          color: white;
          font-size: 26px;
          font-weight: 300;
          margin: 0;
        }
        .content {
          padding: 40px 30px;
          background: #ffffff;
          color: #444;
        }
        .message-box {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 6px;
          margin: 20px 0;
          border-left: 3px solid #3bada9;
        }
        .button {
          display: inline-block;
          padding: 12px 24px;
          background: #3bada9;
          color: white;
          text-decoration: none;
          border-radius: 25px;
          margin-top: 20px;
          font-weight: 500;
          transition: background 0.3s ease;
        }
        .button:hover {
          background: #1c4c66;
        }
        .social-links {
          padding: 20px 0;
          background: #ffffff;
          text-align: center;
        }
        .social-icon {
          display: inline-block;
          margin: 0 10px;
          width: 35px;
          height: 35px;
          background: #f8f9fa;
          border-radius: 50%;
          padding: 8px;
          transition: all 0.3s ease;
        }
        .social-icon:hover {
          background: #3bada9;
        }
        .social-icon:hover svg {
          fill: #ffffff;
        }
        .social-icon svg {
          width: 100%;
          height: 100%;
          fill: #1c4c66;
          transition: fill 0.3s ease;
        }
        .footer {
          background: #f8f9fa;
          color: #666;
          padding: 20px;
          text-align: center;
          font-size: 12px;
        }
        ul {
          list-style: none;
          padding: 0;
        }
        ul li {
          margin-bottom: 10px;
          padding-left: 20px;
          position: relative;
        }
        ul li:before {
          content: "•";
          color: #3bada9;
          font-size: 20px;
          position: absolute;
          left: 0;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>Thanks for reaching out!</h1>
        </div>
        <div class="content">
          <p>Hello ${data.name},</p>
          <p>Thank you for contacting DevNex. We've received your message and will get back to you within 24-48 hours.</p>
          
          <div class="message-box">
            <strong>Your message:</strong><br>
            ${data.message}
          </div>

          <p>While you wait, feel free to:</p>
          <ul>
            <li>Explore our latest projects</li>
            <li>Read our case studies</li>
            <li>Connect with us on social media</li>
          </ul>

          <center>
            <a href="https://devnex.co/portfolio" class="button">View Our Work</a>
          </center>
        </div>

        <div class="social-links">
          <a href="https://www.linkedin.com/company/devnexglobal/" class="social-icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="https://twitter.com/DevnexGlobal" class="social-icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </a>
          <a href="https://www.instagram.com/devnex.co/" class="social-icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
            </svg>
          </a>
        </div>

        <div class="footer">
          <p>© ${new Date().getFullYear()} DevNex. All rights reserved.</p>
          <p style="color: #3bada9">www.devnex.co</p>
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
