// Type definitions for mst-react-router 1.1.0
// Project: https://github.com/alisd23/mst-react-router
// Definitions by: Keyj1n https://github.com/Keyj1n

import { History, Location, UnregisterCallback } from 'history';
import { IStateTreeNode, IModelType, Snapshot } from 'mobx-state-tree';

declare namespace MstReactRouter {

  export interface RouterModel extends Pick<History, 'location' | 'action' | 'push' | 'replace' | 'go' | 'goBack' | 'goForward' | 'block'>, IStateTreeNode { }

  export const RouterModel: IModelType<Snapshot<Pick<RouterModel, 'location' | 'action'>>, RouterModel>

  export interface SynchronizedHistory extends History {
    unsubscribe?: UnregisterCallback;
  }

  export function syncHistoryWithStore(history: History, store: RouterModel): SynchronizedHistory;
}

export = MstReactRouter;