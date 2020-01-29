function formatUrl(url, query) {
  const result = Object.keys(query)
    .filter(key => query[key] !== undefined)
    .reduce((acc, cur) => `${acc}&${cur}=${query[cur]}`, `${url}?`);

  return result;
}

export function post(url, body) {
  return fetch(url, {
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json && resp.json() || null;
      } else {
        throw {
          reason: resp.statusText,
        };
      }
    })
    .then((json) => {
      return json;
    });
}

export function get(url, query) {
  return fetch(formatUrl(url, query), {
    method: 'GET',
  })
    .catch(e => {
      throw {
        reason: e,
        unreachable: true,
      };
    })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw {
          reason: resp.statusText,
        };
      }
    })
    .then((json) => {
      return json;
    });
}

export function update(url, body) {
  return fetch(url, {
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
    method: 'PATCH',
  })
    .then((resp) => {
      if (!resp.ok) {
        throw {
          reason: resp.statusText,
        };
      }
    });
}

export function remove(url, query) {
  return fetch(formatUrl(url, query), {
    method: 'DELETE',
  })
    .catch(e => {
      throw {
        reason: e,
        unreachable: true,
      };
    })
    .then((resp) => {
      if (!resp.ok) {
        throw {
          reason: resp.statusText,
        };
      }
    });
}

export function restore(url, body) {
  return fetch(url, {
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
  })
    .then((resp) => {
      if (!resp.ok) {
        throw {
          reason: resp.statusText,
        };
      }
    });
}
