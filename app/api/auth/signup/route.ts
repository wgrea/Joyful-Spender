// app/api/auth/signup/route.js

import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('[Signup] Incoming request:', body)

    const { name, email, password } = signUpSchema.parse(body)
    console.log('[Signup] Parsed input:', { name, email })

    const existingUser = await prisma.user.findUnique({ where: { email } })
    console.log('[Signup] Existing user found:', !!existingUser)

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }

    console.log('[Signup] Hashing password...')
    const hashedPassword = await bcrypt.hash(password, 12)

    console.log('[Signup] Creating user...')
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    const { password: _, ...userWithoutPassword } = user
    console.log('[Signup] User created:', userWithoutPassword)

    return NextResponse.json({ user: userWithoutPassword }, { status: 201 })
  } catch (error: any) {
    console.error('[Signup Error]', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
