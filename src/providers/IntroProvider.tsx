'use client'

import {type ReactNode, createContext, useContext, useState} from 'react'

type IntroContextValue = {
  introComplete: boolean
  setIntroComplete: (complete: boolean) => void
}

const IntroContext = createContext<IntroContextValue>({
  introComplete: false,
  setIntroComplete: () => {
    // default noop
  },
})

export const useIntro = () => useContext(IntroContext)

export const IntroProvider = ({children}: {children: ReactNode}) => {
  const [introComplete, setIntroComplete] = useState(false)

  return <IntroContext value={{introComplete, setIntroComplete}}>{children}</IntroContext>
}
