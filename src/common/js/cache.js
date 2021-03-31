// 存储缓存相关 localStorage

import storage from "good-storage";

const SEARCH_KEY = "__search__";
const SEARCH_MAX_LEN = 15;

function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare);
  console.log(index)
  if (index === 0) {
    return;
  }
  if (index > 0) {
    arr.splice(index, 1);
  }
  arr.unshift(val);
  if (maxLen && arr.length > maxLen) {
    arr.pop();
  }
}

export function saveSearch(query) {
    let searches = storage.get(SEARCH_KEY, [])
    insertArray(searches, query, (item) => {
      return item.id === query.id
    }, SEARCH_MAX_LEN)
    storage.set(SEARCH_KEY, searches)
    return searches
}

export function loadSearch() {
  return storage.get(SEARCH_KEY);
}
