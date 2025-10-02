import React from 'react'

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`rounded-md border border-neutral-800 bg-neutral-900 px-2 py-1 text-neutral-100 ${props.className||''}`} />
}
