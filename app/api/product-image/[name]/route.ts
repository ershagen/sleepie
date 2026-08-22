import { readdir, readFile } from 'fs/promises'
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

  const dir = path.join(process.cwd(), 'public', 'product-images')

  try {
    // Prefer single file name.b64, else concatenate name.0.b64, name.1.b64, ...
    let b64 = ''
    try {
      b64 = await readFile(path.join(dir, `${name}.b64`), 'utf8')
    } catch {
      const files = await readdir(dir)
      const parts = files
        .filter((f) => f.startsWith(`${name}.`) && f.endsWith('.b64'))
        .sort((a, b) => {
          const ai = parseInt(a.split('.')[1] || '0', 10)
          const bi = parseInt(b.split('.')[1] || '0', 10)
          return ai - bi
        })
      for (const f of parts) {
        b64 += await readFile(path.join(dir, f), 'utf8')
      }
    }

    if (!b64) {
      return new NextResponse('Not found', { status: 404 })
    }

    const buffer = Buffer.from(b64.trim(), 'base64')
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
