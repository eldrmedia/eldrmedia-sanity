'use client'
import React from 'react'
export default function ThemeVars({ theme }: { theme?: any }){
  if(!theme) return null
  const vars: Record<string,string> = {}
  if(theme.primary?.hex) vars['--sun-500'] = theme.primary.hex
  if(theme.primaryDark?.hex) vars['--sun-700'] = theme.primaryDark.hex
  return <style>{`:root{${Object.entries(vars).map(([k,v])=>`${k}:${v}`).join(';')}}`}</style>
}
