import React from 'react'
import { useMyHook } from '@fabrice/use-api'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App