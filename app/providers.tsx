'use client'

import { NextUIProvider } from '@nextui-org/react'
import { MantineProvider } from '@mantine/core'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <MantineProvider>
        {children}
      </MantineProvider>
    </NextUIProvider>
  )
}
