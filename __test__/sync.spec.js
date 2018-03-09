import createMemoryHistory from 'history/createMemoryHistory';
import { RouterModel, syncHistoryWithStore } from '../index';

let history, memoryHistory, routerModel;

const matchers = {
  toEqualLocation: () => ({
    compare: (actual, expected) => {
      expected = {
        search: '',
        hash: '',
        state: undefined,
        ...expected
      };
      const passed = (
        actual.pathname === expected.pathname &&
        actual.search === expected.search &&
        actual.hash === expected.hash &&
        actual.state === expected.state
      );
      return {
        pass: passed,
        message: passed
          ? 'Location\'s matched'
          : `Expected location to be ${JSON.stringify(expected)} but it was ${JSON.stringify(actual)}`
      };
    }
  })
};

beforeEach(() => {
  jasmine.addMatchers(matchers);
  routerModel = RouterModel.create();
  memoryHistory = createMemoryHistory('/');
  history = syncHistoryWithStore(memoryHistory, routerModel);
});

describe('syncing', () => {
  it('syncs store with history', () => {
    expect(routerModel.action).toBe('POP');
    expect(routerModel.location).toEqualLocation({
      pathname: '/'
    });

    history.push('/url-1');
    expect(routerModel.action).toBe('PUSH');
    expect(routerModel.location).toEqualLocation({
      pathname: '/url-1'
    });

    history.goBack();
    expect(routerModel.action).toBe('POP');
    expect(routerModel.location).toEqualLocation({
      pathname: '/'
    });

    history.goForward();
    expect(routerModel.action).toBe('POP');
    expect(routerModel.location).toEqualLocation({
      pathname: '/url-1'
    });

    history.replace('/url-2?animal=fish#mango');
    expect(routerModel.action).toBe('REPLACE');
    expect(routerModel.location).toEqualLocation({
      pathname: '/url-2',
      search: '?animal=fish',
      query: { animal: 'fish' },
      hash: '#mango'
    });
  });

  it('provdides a way to unsubscribe the router store from history', () => {
    history.push('/');
    expect(routerModel.location).toEqualLocation({
      pathname: '/'
    });

    history.unsubscribe();
    history.push('/url-1');

    expect(routerModel.location).toEqualLocation({
      pathname: '/'
    });
  });
});
