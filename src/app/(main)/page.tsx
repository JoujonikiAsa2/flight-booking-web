import Link from 'next/link'
import React from 'react'

export default function HomePage() {
  return (
    <div>
      <Link href={'/register'}>Register</Link>
    </div>
  )
}
