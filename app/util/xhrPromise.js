function serialize(obj, prefix) {
  if (!obj) {
    return '';
  }

  return Object.keys(obj).map((p) => {
    const k = prefix || p;
    const v = obj[p];

    return typeof v === 'object' ?
      serialize(v, k) : `${encodeURIComponent(k)}=${encodeURIComponent(v)}`;
  }).join('&');
}

export function tattle(config, url, data, error) {
  if (config !== undefined && config.URL.TATTLE !== '') {
    fetch(config.URL.TATTLE,
      {
        mode: 'on-cors',
        timeout: 10000,
        method: 'POST',
        body: JSON.stringify({ url, data, error }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    ).then(res => console.log(res)); // eslint-disable-line no-console
  } else {
    throw error;
  }
}

// Return Promise for a url json get request
export function getJson(config, url, params) {
  return fetch(
    encodeURI(url) + (params ? (url.search(/\?/) === -1 ? '?' : '&') + serialize(params) : ''),
    {
      timeout: 10000,
      method: 'GET',

      headers: {
        Accept: 'application/json',
      },
    },
  ).then(res => res.json())
    .catch(error => tattle(config, url, params, error));
}

// Return Promise for a json post request
export function postJson(url, params, payload, config) {
  return fetch(
    encodeURI(url) + (params ? ((url.search(/\?/) === -1 ? '?' : '&') + serialize(params)) : ''),
    {
      timeout: 10000,
      method: 'POST',
      body: payload,

      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  ).then(res => res.json())
    .catch(error => tattle(config, url, { params, payload }, error));
}

// Return Promise for array of json get requests
export function getJsons(config, urls) {
  return Promise.all(urls.map(url => getJson(config, url)));
}
