# @fabrice/use-api

> React hook to manage API calls.

[![NPM](https://img.shields.io/npm/v/@fabrice/use-api.svg)](https://www.npmjs.com/package/@fabrice/use-api) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Getting Started

### Prerequisites

This React hook relies on network requests being made using the [axios](https://github.com/axios/axios) library. Other http clients may be used as well as long as `ok` and `data` properties exist on the network response.

### Install

```bash
npm install --save @fabrice/use-api
```

### Usage

```jsx
import { useApi } from "@fabrice/use-api";
import { create } from "apisauce";
import React, { useEffect } from "react";

function getUsers() {
  const client = create({ baseURL: "https://jsonplaceholder.typicode com" });
  return client.get("/users");
}

function App() {
  const api = useApi(getUsers, []);

  useEffect(() => {
    api.request();
  }, []);

  return loading ? (
    <p>Loading users...</p>
  ) : (
    <>
      {api.data.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </>
  );
}
```

## API

### Params

The `useApi` hook takes in two values

- `apiFunction` - the network request to be made.

  ```javaScript
  function AddTodo(todo) {
    return axios.post("https://todos.com/add/", todo);
  }
  ```

- `initialState` - the state before the request is made. By default, the initial state is an empty object.

### Return Value

An object containing the following is returned from the hook:

- `data` - the data returned from a successful network request (taken from the response's `data` property).
- `error` - boolean value indicating whether the request was completed successfully. Similarly, this value is derived from the `ok` property on the response.
- `loading` - boolean value indicating the status of the network request.
- `request` - asynchronous function that sends the network request and handles the state. Any parameters are forwarded to the function passed into `useApi`. The original response is also returned from the function.

**Example:**

```javaScript
// the returned object can also be destructured to pick out individual properties
const { data, error, loading, request } = useApi(postTodo);

const todo = { title: "New Todo", status: "Not Done" };

// sending the request
const response = await request(todo, { setting1: 1, option2: 2});
```

## License

MIT © [Fabricevladimir](https://github.com/Fabricevladimir)

---

This hook was created using [create-react-hook](https://github.com/hermanya/create-react-hook).
