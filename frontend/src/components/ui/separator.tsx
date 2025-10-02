import React from 'react'
export function Separator({ className='' }: {className?:string}) {
  return <hr className={`h-px border-0 bg-neutral-800 ${className}`} />
}
