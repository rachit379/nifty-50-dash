import React from 'react'

export function Badge({ className='', variant='default', children }: React.PropsWithChildren<{className?:string, variant?:'default'|'secondary'|'destructive'|'outline'}>) {
  const styles = variant==='secondary' ? 'bg-neutral-800 text-neutral-100' :
                 variant==='destructive' ? 'bg-red-600 text-white' :
                 variant==='outline' ? 'border border-neutral-700 text-neutral-100' :
                 'bg-emerald-600 text-white'
  return <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs ${styles} ${className}`}>{children}</span>
}
