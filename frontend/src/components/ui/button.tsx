import React from 'react'

export function Button({
  className='', variant='default', size='md', disabled=false, children, ...props
}: React.PropsWithChildren<{
  className?: string,
  variant?: 'default' | 'secondary' | 'outline',
  size?: 'sm' | 'md',
  disabled?: boolean
}> & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const base = 'inline-flex items-center justify-center rounded-lg transition-colors'
  const colors = variant==='secondary' ? 'bg-neutral-800 text-neutral-100 hover:bg-neutral-700' :
                 variant==='outline' ? 'border border-neutral-700 text-neutral-100 hover:bg-neutral-800' :
                 'bg-neutral-100 text-neutral-900 hover:bg-white'
  const sz = size==='sm' ? 'h-7 px-2 text-xs' : 'h-9 px-3 text-sm'
  return <button className={`${base} ${colors} ${sz} ${disabled?'opacity-60 cursor-not-allowed':''} ${className}`} disabled={disabled} {...props}>{children}</button>
}
