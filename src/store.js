import { types } from 'mobx-state-tree';

export const RouterModel = types
  .model('RouterModel', {
    location: types.optional(types.frozen()),
    action: types.optional(types.string, '')
  })
  .actions(routerModel => {
    // "volatile" state to store history instance from "history" library
    let history;

    return {
      _updateLocation(newState) {
        routerModel.location = newState;
        routerModel.action = history.action;
      },
      _setHistory(initialHistory) {
        history = initialHistory;
        routerModel.location = { ...history.location };
      },
      push() {
        history.push(...arguments);
      },
      replace(location) {
        history.replace(...arguments);
      },
      go(n) {
        history.go(n);
      },
      goBack() {
        history.goBack();
      },
      goForward() {
        history.goForward();
      },
      block() {
        history.block(...arguments);
      }
    };
  });
