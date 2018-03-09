# mst-react-router

Keep your [`mobx-state-tree`](https://github.com/mobxjs/mobx-state-tree) state in sync with react-router via a [`RouterModel`](#RouterModel).

This library provides a `RouterModel` model which can instantiated and composed as part of your root app store.

This library is for use with **react-router v4**.

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
  - [RouterStore](#routerstore)
  - [syncHistoryWithStore](#synchistorywithstorehistory-store)


## Installation

```
npm install --save mst-react-router
```

And if you haven't installed all the peer dependencies, you should probably do that now:

```bash
npm install --save mobx-state-tree mobx mobx-react react-router
```

## Usage

`index.js`
```js
import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { Provider } from 'mobx-react';
import { Router } from 'react-router';
import { types } from 'mobx-state-tree';
import { RouterModel, syncHistoryWithStore } from 'mst-react-router';

import App from './App';

const routerModel = RouterModel.create();

// Define root model type
const Model = types.model({
  router: RouterModel
});

export const store = Model.create({ router: routerModel });

// Hook up router model to browser history object
const history = syncHistoryWithStore(createBrowserHistory(), routerModel);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
```

`App.js`
```js
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';

class App extends Component {
  render() {
    const { location, push, goBack } = this.props.store.router;

    return (
      <div>
        <span>Current pathname: {location.pathname}</span>
        <button onClick={() => push('/test')}>Change url</button>
        <button onClick={() => goBack()}>Go Back</button>
      </div>
    );
  }
}

// withRouter helps avoid update "block" issues
export default withRouter(inject('store')(App));
```

## Troubleshooting

**Routes not updating correctly when URL changes**

There is a known issue with React Router 4 and MobX (and Redux) where "blocker" components like those
created by `@observer` (and `@connect` in Redux) block react router updates from propagating down the
component tree.

There is a React Router 4 documentation page for information on this issue:

https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md

To fix problems like this, try wrapping components which are being "blocked" with React Router's `withRouter` higher
order component should help, depdending on the case.

Refer to the link above for more information on this solution, and some alternatives.


## API

#### RouterModel

```js
const routerModel = RouterModel.create();
```

A `RouterModel` instance has the following properties:

- `location` - history [location object](https://github.com/mjackson/history#listening)
- `action` - the history API [action]()

And the following [history methods](https://github.com/mjackson/history#navigation), which all have the same signatures as listed on the history API page (follow the link).

`push(path, [state])`
`replace(path, [state])`
`go(n)`
`goBack()`
`goForward()`
`block(prompt)`

#### syncHistoryWithStore(*history*, *store*)

- `history` - A variant of a history object, usually `browserHistory`
- `store` - An instance of `RouterModel`

returns an enhanced history object with the following **additional method**:

- **unsubscribe()**  
Un-syncs the store from the history. The store will **no longer update** when the history changes.

```js
const history = syncHistoryWithStore(createBrowserHistory(), routingModel);
history.unsubscribe();
// Store no longer updates
```
