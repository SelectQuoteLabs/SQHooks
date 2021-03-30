# SQHooks 🎣

## Getting Started

```bash
> npm install @selectquotelabs/SQHooks
```

## Local Development

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
import {useDialog} from '@selectquotelabs/sqhooks

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

## Migrate to SQHooks

Use the library for net-new code. As a PR reviewer, encourage the use of Hooks from this library. Squads should create backlog tickets to replace a hook, with it's SQHooks equivalent.
