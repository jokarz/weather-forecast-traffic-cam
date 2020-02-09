const keyName = "revgeocode";

export const lookupCache = key => {
  if (window && window.localStorage) {
    const res = window.localStorage.getItem(keyName);
    if (res) {
      const data = JSON.parse(res);
      return data[key] || null;
    }
  }
  return null;
};

export const getCache = key => {
  if (window && window.localStorage) {
    const res = window.localStorage.getItem(keyName);
    if (res) {
      const data = JSON.parse(res);
      return data[key] || null;
    }
  }
  return null;
};

export const updateCache = newData => {
  if (window && window.localStorage) {
    const res = window.localStorage.getItem(keyName);
    if (res) {
      const data = JSON.parse(res);
      window.localStorage.setItem(
        keyName,
        JSON.stringify({ ...data, ...newData })
      );
    } else {
      window.localStorage.setItem(keyName, JSON.stringify({ ...newData }));
    }
  }
  return;
};

export const clearCache = () => {
  if (window && window.localStorage) {
    window.localStorage.removeItem(keyName);
  }
  return;
};
