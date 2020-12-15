import { useState } from 'react'
import { validateApiFunction } from './helpers/validateApiFunction'

/**
 * Hook managing API calls
 * @param {Function} apiFunction - API function to be invoked
 * @param {*} [initialState] - Default data
 * @example
 *  const ExampleComponent = () => {
 *    const api = useApi(getUsers, [])
 *
 *    useEffect(() => {
 *    api.request()
 *    }, [])
 *
 *    return api.loading
 *    ? <p>Loading data...</p>
 *    : {api.data.map(user => <p>{user.fullname}</p>)}
 *  }
 */
export function useApi(apiFunction, initialState={}) {
  validateApiFunction(apiFunction);

  const [data, setData] = useState(initialState)

  return {data}
}
