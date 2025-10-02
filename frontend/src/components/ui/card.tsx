import React from 'react'

export function Card({ className='', children }: React.PropsWithChildren<{className?:string}>) {
  return <div className={`rounded-xl border border-neutral-800 bg-neutral-900/60 ${className}`}>{children}</div>
}
export function CardHeader({ className='', children }: React.PropsWithChildren<{className?:string}>) {
  return <div className={`px-4 pt-4 ${className}`}>{children}</div>
}
export function CardTitle({ className='', children }: React.PropsWithChildren<{className?:string}>) {
  return <div className={`text-lg font-semibold ${className}`}>{children}</div>
}
export function CardContent({ className='', children }: React.PropsWithChildren<{className?:string}>) {
  return <div className={`px-4 pb-4 ${className}`}>{children}</div>
}
