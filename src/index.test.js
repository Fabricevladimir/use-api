import { useApi } from './'
import { renderHook, act } from '@testing-library/react-hooks'

const defaultResponse = { ok: true, data: [1, 2, 3] }
const defaultApiFunction = 
  jest.fn()
      .mockResolvedValue(defaultResponse);

describe('useApi', () => {
  function setUp(apiFunction = defaultApiFunction, initialState) {
    return renderHook(() => useApi(apiFunction, initialState));
  } 

  it('should be defined', () => {
    expect(useApi).toBeDefined()
  })

  it('should throw Error when apiFunction is not provided', () => {
    expect(() => useApi()).toThrow(/required/);
  })
  
  it("should throw TypeError when apiFunction is not of type 'function'", () => {
    expect(() => useApi(1)).toThrow(/type/);
  })

  it('should set initial state', () => {
    const { result } = setUp();
    expect(result.current.data).toEqual({});
    expect(result.current.error).toBe(false);
    expect(result.current.loading).toBe(false);
  })

  it('should set initial state for data with given value', () => {
    const initialState = "abc";
    const { result } = setUp(undefined, initialState);
    expect(result.current.data).toBe(initialState);
  })

  it('should make api call with given arguments', async () => {
    const { result } = setUp();
    const defArgs = {
      options: { a: 1 },
      url: 'abc'
    }

    await act(async () => {
      result.current.request(defArgs.url, defArgs.options);
    });

    expect(defaultApiFunction).toHaveBeenCalledWith(defArgs.url, defArgs.options);
  })

  it('should set state data to api response data and error and loading to false when request succefully completed', async () => {
    const { result } = setUp();

    await act(async () => {
      result.current.request();
    });

    expect(result.current.data).toBe(defaultResponse.data);
    expect(result.current.error).toBe(false);
    expect(result.current.loading).toBe(false);
  })

  it('should set error to true and when request unsuccessful', async () => {
    const { result } = setUp(jest.fn().mockResolvedValue({ok: false}));

    await act(async () => {
      result.current.request();
    });

    expect(result.current.error).toBe(true);
  })

  // TODO: Check the warning about act without await
  it('should set loading to true when request made', async () => {
    const { result, waitForNextUpdate} = setUp();
    act(() => result.current.request());
    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
  })
})
