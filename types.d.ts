// Type definitions for mst-react-router 1.1.0
// Project: https://github.com/alisd23/mst-react-router
// Definitions by: Keyj1n https://github.com/Keyj1n

import { History, Location, UnregisterCallback } from 'history';
import { IModelType, ModelPropertiesDeclarationToProperties, IType, Instance } from 'mobx-state-tree';

declare namespace MstReactRouter {
  type Props = {
    location: IType<Location, Location, Location>;
    action: string;
  }

  export type RouterModelType = IModelType<
    ModelPropertiesDeclarationToProperties<Props>,
    Pick<History, 'push' | 'replace' | 'go' | 'goBack' | 'goForward' | 'block'>
  >;

  export type RouterModel = Instance<RouterModelType>;

  export const RouterModel: RouterModelType;

  export interface SynchronizedHistory extends History {
    unsubscribe?: UnregisterCallback;
  }

  export function syncHistoryWithStore(history: History, store: RouterModel): SynchronizedHistory;
}

export = MstReactRouter;