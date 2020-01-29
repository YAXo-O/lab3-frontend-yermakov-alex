function formatURL(url, query) {
  const keys = Object.keys(query);
  if (keys.length === 0) {
    return url;
  }

  return keys.filter(k => query[k] !== undefined).reduce((acc, key) => `${acc}${key}=${query[key]}&`, `${url}?`);
}

export function get(url, query) {
  const _url = formatURL(url, query);
  console.log(`Get request to ${url}`);

  return fetch(_url, {
    method: 'GET',
  })
    .then(r => {
      if (r.ok) {
        return r.json();
      } else {
        throw {
          status: r.status,
          reason: r.statusText,
        }
      }
    })
}
