### frontend-store

`frontend-store` exports `useStore` hook that exposes tuple of current store state and setState function for setting new state. Only difference between React's `useState` and Frontend's `useStore` hooks is that if you pass object to setter function it will merge those changes with previos store values, same as `setState` function in class component is working.

Example usage:

```jsx
import useStore from 'frontend-store'

const ExampleComponent = () => {
  const [store, setStore] = useStore()

  console.log(store) // initial value is `{}`

  return (
    <div>
      <button onClick={() => setStore({ foo: 'bar' })}>
        Update store
      </button>
    <div>
  )
}

Example of setting state:
console.log(store) // initial value is `{}`
setStore({ foo: 'bar' })
console.log(store) // `{ foo: 'bar' }`

setStore({ fizz: 'buzz' })
console.log(store) // `{ foo: 'bar'; fizz: 'buzz' }`

setStore(() => ({ new: 'value' }))
console.log(store) // `{ new: 'value' }`
```
