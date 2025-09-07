import {ReactNode} from 'react'

export type CardProps = {
  children: ReactNode
}

export const Card = ({children}: CardProps) => (
  <div className="flex flex-col w-full grow overflow-hidden rounded-xl relative z-40 items-center justify-center">
    {children}
  </div>
)
