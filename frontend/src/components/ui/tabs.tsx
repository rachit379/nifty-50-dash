import React, { createContext, useContext, useState } from 'react'

type CtxT = { value: string, setValue: (v:string)=>void }
const Ctx = createContext<CtxT | null>(null)

export function Tabs({ value, onValueChange, children }: React.PropsWithChildren<{value:string, onValueChange:(v:string)=>void}>) {
  const [v, setV] = useState(value)
  const setValue = (nv:string) => { setV(nv); onValueChange(nv) }
  return <Ctx.Provider value={{value:v, setValue}}>{children}</Ctx.Provider>
}

export function TabsList({ className='', children }: React.PropsWithChildren<{className?:string}>) {
  return <div className={`inline-grid rounded-lg ${className}`}>{children}</div>
}

export function TabsTrigger({ className='', value, children }: React.PropsWithChildren<{className?:string, value:string}>) {
  const ctx = useContext(Ctx)!
  const active = ctx.value===value
  return (
    <button
      onClick={()=>ctx.setValue(value)}
      className={`px-3 py-1.5 rounded-md border ${active?'border-neutral-700 bg-neutral-800 text-white':'border-transparent text-neutral-300 hover:text-white'} ${className}`}
    >
      {children}
    </button>
  )
}
