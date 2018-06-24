// This contains sample code which tests the typings. This code does not run, but it is type-checked
import { Router } from 'react-router';
import { History, createBrowserHistory, createMemoryHistory } from 'history';
import { RouterModel, SynchronizedHistory, syncHistoryWithStore } from '../';

const routerModel: RouterModel = RouterModel.create();
const browserHistory: History = createBrowserHistory();
const history: SynchronizedHistory = syncHistoryWithStore(browserHistory, routerModel);

{
  { <Router history={history} /> }
  { <Router history={browserHistory} /> }
  { <Router history={createMemoryHistory()} /> }
  { <Router history={createBrowserHistory()} /> }
  { <Router history={syncHistoryWithStore(createBrowserHistory(), RouterModel.create())} /> }
  { <Router history={syncHistoryWithStore(createMemoryHistory(), RouterModel.create())} /> }
}

{
  history.unsubscribe();
  history.push('/test1');
}

{
  let action = routerModel.action;
  if (action === 'POP') {
    console.log('POP');
  }

  if (action === 'PUSH') {
    console.log('PUSH');
  }

  if (action === 'REPLACE') {
    console.log('REPLACE');
  }

  const { pathname, hash, key, search, state } = routerModel.location;
  routerModel.push('path/to/location');
  routerModel.push({ pathname, hash, key, state });
  routerModel.go(-1);
  routerModel.goBack();
  routerModel.goForward();
  routerModel.replace('path/to/replace');
  routerModel.replace({ pathname, hash, key, state });
  routerModel.block('path/to/block');
}