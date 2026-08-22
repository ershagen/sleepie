import { readFile } from 'fs/promises'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'

const ALLOWED = new Set(['rocker', 'noise', 'muslin', 'sack', 'bundle'])

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ name: string }> }
) {
  const { name } = await context.params
  if (!ALLOWED.has(name)) {
    return new NextResponse('Not found', { status: 404 })
  }

  try {
    const filePath = path.join(
      process.cwd(),
      'public',
      'product-images',
      `${name}.b64`
    )
    const b64 = await readFile(filePath, 'utf8')
    const buffer = Buffer.from(b64, 'base64')
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'image/webp',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch {
    return new NextResponse('Not found', { status: 404 })
  }
}
