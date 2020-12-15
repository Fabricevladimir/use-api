import { useApi } from './'
import { renderHook, act } from '@testing-library/react-hooks'

const defaultApiFunction = jest.fn();

describe('useApi', () => {
  function setUp(apiFunction = defaultApiFunction, initialState) {
    return renderHook(() => useApi(apiFunction, initialState));
  } 

  it('should be defined', () => {
    expect(useApi).toBeDefined()
  })

  it('should set default initial state when value not provided', () => {
    const { result } = setUp();
    expect(result.current.data).toEqual({});
  })

  it('should set initial state with given value', ()=> {
    const initialState = "abc";
    const { result } = setUp(undefined, initialState);
    expect(result.current.data).toBe(initialState);
  })

  it('should throw Error when apiFunction is not provided', () => {
    expect(() => useApi()).toThrow(/required/);
  })
  
  it('should throw TypeError when apiFunction is not of function type', () => {
    expect(() => useApi(1)).toThrow(/type/);
  })
})
