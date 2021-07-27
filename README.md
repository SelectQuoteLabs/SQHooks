# SQHooks 🎣

## Getting Started

```bash
> npm install @selectquotelabs/sqhooks
```

## Local Development

NPM Version: [lts/fermium](https://nodejs.org/en/about/releases/)

```bash
> npm install
```

> 🧙‍♂️ HIGHLY recommend running `npm run test.watch` during development to ensure tests are passing

### Testing your changes before you commit

1. Build your source code

```bash
> npm run build
```

2. package your code for `npm`

```bash
npm pack
```

3. Copy the path of the tarball file

4. From the consumer repo

```bash
npm install ~/path/to/selectquotelabs-sqhooks-x.x.x.tgz
```

> 🧙‍♂️ It's easiest to test consumption on a non-Docker project such as SQForm, senior-admin-ui, senior-aqe-ui, scplus-shared-components, etc.

5. Import your custom hook, write necessary code and test to ensure it works 🚀

Example

```javscript
import {useDialog} from '@selectquotelabs/sqhooks';

Hopefully you know how to consume a hook within a component
```

## Contributing

### Conventional Commits

Coming soon...

### SQHooks API Rules

#### Hook names should be prefixed with `use`

✅

`useCounter`

⛔️

`counter`

#### Hook arguments and return value MUST be either a single value or an object

✅

```javascript
function useMyState(initialState) {
  const [state, setState] = useState(initialState);
  return {state, setState};
}
```

⛔️

```javascript
function useMyState(initialState) {
  const [state, setState] = useState(initialState);
  return [state, setState];
}
```

> 🧙‍♂️ Being strict and opinionated about our hooks argument and return value creates a predictable API. This also makes typing and testing easier.

## Documentation

### useDialog

**Description** Controls a dialog open state

**Example**

```javascript
const {isDialogOpen, openDialog, closeDialog} = useDialog(false);
```

**Parameters**
`isOpen: boolean` Is the initial Dialog open state. Defaults to `false` if not specified

**Returns** `{isDialogOpen: boolean, openDialog: void fn, closeDialog: void fn}`

---

### usePrevious

**Description** Get the previous value of props or state

**Example**

```javascript
const [count, setCount] = useState(0);

const prevCount = usePrevious(count);
// If the `count` increments to 1 the `prevCount` will be 0
```

**Parameters**

`value`: the value whose previous state we want to track

`initialValue`: (optional) the return value of the hook on initial render. If an `initialValue` isn't provided the initial return value will be `undefined`.

**Returns** The previous value of the target state

---

### useDebounce / useDebouncedCallback

**Description** `useDebounce` for simple values, `useDebouncedCallback` for callbacks

**[`use-debounce` docs](https://github.com/xnimorz/use-debounce#readme)**

**Example**

```javascript
// useDebounce
const [text, setText] = useState('Hello');
const [value] = useDebounce(text, 1000);
return (
  <div>
    <input
      defaultValue={text}
      onChange={(event) => setText(event.target.value)}
    />
    <p>Actual value: {text}</p>
    <p>Debounced value: {value}</p>
  </div>
);
// useDebouncedCallback
const [value, setValue] = useState('');
const debounced = useDebouncedCallback((value) => {
  setValue(value);
}, 1000);
return (
  <div>
    <input
      defaultValue={value}
      onChange={(event) => debounced(event.target.value)}
    />
    <p>Debounced value: {value}</p>
  </div>
);
```

---

### useLocalStorage

**Description** Sync state to local storage (similar to `useState`) so that it persists through a page refresh. Tests utilize the [`jest-localstorage-mock`](https://www.npmjs.com/package/jest-localstorage-mock).

**Example**

```javascript
const {storedValue, setValue} = useLocalStorage('ID', 'abc123');
```

**Parameters**

`key: string` The localStorage key you want to read/create/update.

`initialValue` (optional) The initial value to set if the value of the key in localStorage is empty.

**Returns**

```typescript
{
  storedValue: Type | undefined;
  setValue: React.Dispatch<React.SetStateAction<Type | undefined>>;
}
```

---

### useIsomorphicLocalStorage

**Description** An isomorphic version of `useLocalStorage`. Sync state to local storage (similar to `useState`) so that it persists through a page refresh. Tests utilize the [`jest-localstorage-mock`](https://www.npmjs.com/package/jest-localstorage-mock).

**Example**

```javascript
const {storedValue, storeValue, isFetching} = useIsomorphicLocalStorage(
  'ID',
  'abc123'
);
```

**Parameters**

`key: string` The localStorage key you want to read/create/update.

`initialValue` (optional) The initial value to set if the value of the key in localStorage is empty.

**Returns**
the stored value from localStorage, a function to store a value in localStorage, and a boolean value to indicate fetching state.

```typescript
{
  storedValue: string;
  storeValue: React.Dispatch<React.SetStateAction<Type | undefined>>;
  isFetching: boolean;
}
```

---

### useToggle

**Description** Simple hook that returns a boolean value and a function that toggles that value to the inverse of its current state.

**Example**

```javascript
const {value, toggle} = useToggle();
```

**Parameters**
`initialValue: boolean` (optional) The initial value of `value`. Defaults to `false` if not specified.

**Returns**

```ts
{
  value: boolean;
  toggle: () => void
}
```

---

### useDropdownOptions

**Description** Transforms your array of objects into the shape our form system expects.

**Example**

```javascript
const users = [
  {firstName: 'Franken', lastName: 'Berry', ID: 123},
  {firstName: 'Count', lastName: 'Chocula', ID: 456},
  {firstName: 'Boo', lastName: 'Berry', ID: 789},
];
const options = useDropdownOptions('firstName', 'ID', users);
/*
options:
[
  { label: 'Franken', value: 123 },
  { label: 'Count', value: 456 },
  { label: 'Boo', value: 789 },
]
*/
```

**Parameters**

`label`: the key in the provided items object array to use as the value of the `label` property in the returned options object array

`value`: the key in the provided items object array to use as the value of the `value` property in the returned options object array

`items`: array of objects from which to draw the values of `label` and `value` to build the options object array

**Returns** Array of objects to be used as dropdown options

```ts
{
  label: string | number;
  value: string | number | null;
}
[];
```

---

### useClipboard

**Description** Returns a function to copy a given value to the clipboard, and a ref to pass to an element to enable copying its `innerText` using the function as the element's `onClick` handler.

**Example**

```javascript
// copies 'hello'
const {onClick, ref} = useClipboard();
return (
  <button onClick={onClick} ref={ref}>
    hello
  </button>
);
// copies 'world'
const {onClick, ref} = useClipboard('world');
return (
  <button onClick={onClick} ref={ref}>
    hello
  </button>
);
```

**Parameters**

`contentToCopy: string` (optional) Content to copy to the clipboard when `onClick` is called. If a value is not specified, the `innerText` of the clicked element will be copied.

**Returns**

```typescript
{
  onClick: () => Promise<void>;
  ref: React.RefObject<HTMLElement>;
}
```

## Migrate to SQHooks

Use the library for net-new code. As a PR reviewer, encourage the use of Hooks from this library. Squads should create backlog tickets to replace a hook, with it's SQHooks equivalent.

## Upgrading

### v1 to v2

Affected hooks: `useDropdownOptions`

v2 of SQHooks includes a change to `useDropdownOptions` that allows it to return an empty array. Previously if an empty array was passed for `items` then the hook would return an array with the "empty" option, `{label: '- -', value: null}`. v2 will now return an empty array. If you still want that "empty" on your dropdown or autocomplete then you should use the `displayEmpty` prop on your component.
