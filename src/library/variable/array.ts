declare global {
  interface Array<T> {
    indexOfKey(key: string, value: any): number;
    findSingle(key: string, value: any): T | undefined;
    findMulti(key: string, value: any | any[], isEquals?: boolean): this;
    orderBy(key: string | '', sort_type: `asc` | `desc`): this;
    serializeObject(): object;
    remove(index: number, deleteCount?: number): void;
  }
}

function convertQueryData(data: any): string {
  return JSON.stringify({
    d: typeof data === 'number' ? data.toString() : data,
  });
}

Array.prototype.indexOfKey = function (key, value) {
  let findIndex = -1;
  let index = 0;
  if (typeof value !== 'undefined') {
    for (const item of this) {
      let _data: any = item;

      if (key.length > 0) {
        for (const name of key.split('.')) {
          if (typeof _data !== 'undefined') {
            _data = _data[name];
          }
        }
      }

      if (convertQueryData(_data) == convertQueryData(value)) {
        findIndex = index;
        break;
      }
      index++;
    }
  }
  return findIndex;
};
Array.prototype.findSingle = function (key, value) {
  let foundItem = null;

  if (typeof value !== 'undefined') {
    for (const item of this) {
      let _data: any = item;

      if (key.length > 0) {
        for (const name of key.split('.')) {
          if (typeof _data !== 'undefined') {
            _data = _data[name];
          }
        }
      }

      if (convertQueryData(_data) == convertQueryData(value)) {
        foundItem = item;
        break;
      }
    }
  }

  return foundItem;
};
Array.prototype.findMulti = function (key, value, isEquals = true) {
  const foundItems = [];

  if (typeof value !== 'undefined') {
    for (const item of this) {
      let _data: any = item;

      if (key.length > 0) {
        for (const name of key.split('.')) {
          if (typeof _data !== 'undefined') {
            _data = _data[name];
          }
        }
      }

      let query = false;

      if (Array.isArray(value)) {
        query = value.some(
          (v) => convertQueryData(v) == convertQueryData(_data)
        );
      } else {
        query = convertQueryData(_data) == convertQueryData(value);
      }

      if (query == isEquals) {
        foundItems.push(item);
      }
    }
  }

  return foundItems;
};
Array.prototype.orderBy = function (key, sort_type) {
  return this.sort(function (a, b) {
    if (key !== '' && (!a.hasOwnProperty(key) || !b.hasOwnProperty(key))) {
      // property doesn't exist on either object
      return 0;
    }

    const keyA = key != '' ? a[key] : a;
    const keyB = key != '' ? b[key] : b;

    const varA = typeof keyA === 'string' ? keyA.toUpperCase() : keyA;
    const varB = typeof keyB === 'string' ? keyB.toUpperCase() : keyB;

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return sort_type === 'desc' ? comparison * -1 : comparison;
  });
};
Array.prototype.serializeObject = function () {
  const result: any = {};
  this.forEach((item: { name: string; value: any }) => {
    result[item.name] = item.value;
  });
  return result;
};
Array.prototype.remove = function (index, deleteCount = 1) {
  this.splice(index, deleteCount);
};

export default {};
