import React from 'react'

export function Select({ defaultValue, children }: React.PropsWithChildren<{defaultValue?:string}>) {
  return <div data-select-root>{children}</div>
}
export function SelectTrigger({ className='', children }: React.PropsWithChildren<{className?:string}>) {
  return <div className={`rounded-md border px-2 py-1 ${className}`}>{children}</div>
}
export function SelectValue({ placeholder }: {placeholder?:string}) {
  return <span>{placeholder}</span>
}
export function SelectContent({ className='', children }: React.PropsWithChildren<{className?:string}>) {
  return <div className={`mt-1 rounded-md border p-1 ${className}`}>{children}</div>
}
export function SelectItem({ value, className='', children }: React.PropsWithChildren<{value:string, className?:string}>) {
  return <div className={`px-2 py-1 rounded hover:bg-neutral-800 cursor-pointer ${className}`} data-value={value}>{children}</div>
}
