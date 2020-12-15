import { useApi } from '@fabrice/use-api'
import { create } from 'apisauce'
import React, { useEffect } from 'react'

const App = () => {
  const api = useApi(getUsers, [])

  useEffect(() => {
    api.request()
  }, [])

  function getUsers() {
    const client = create({ baseURL: 'https://jsonplaceholder.typicode.com' })
    return client.get('/users')
  }

  return (
    <>{api.data.map(user => <p key={user.id}>{user.name}</p>)}</>
  )
}
export default App
