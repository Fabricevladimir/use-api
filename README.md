# @fabrice/use-api

> React hook to manage API calls.

[![NPM](https://img.shields.io/npm/v/@fabrice/use-api.svg)](https://www.npmjs.com/package/@fabrice/use-api) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @fabrice/use-api
```

## Usage

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

## License

MIT © [Fabricevladimir](https://github.com/Fabricevladimir)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
