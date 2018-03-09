/**
 * Sync the history object with the given mst router store
 * @param {object} history - 'History' instance to subscribe to
 * @param {object} store - Router store instance to sync with the history changes
 */
export const syncHistoryWithStore = (history, store) => {
  store._setHistory(history);

  // Handle update from history object
  const handleLocationChange = location => {
    store._updateLocation({ ...location });
  };
  const unsubscribeFromHistory = history.listen(handleLocationChange);
  handleLocationChange(history.location);

  history.unsubscribe = unsubscribeFromHistory;

  return history;
};
