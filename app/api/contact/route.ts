import { NextResponse } from 'next/server'

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

    // TODO: Add your email sending logic here
    // For example, using nodemailer or an email service API

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
