config = require '../config'

serialize = (obj, prefix) ->
  if not obj
    return ""
  str = []
  for p of obj
    if obj.hasOwnProperty p
      k = if prefix then prefix else p
      v = obj[p]
      str.push(
        if typeof v == "object"
          serialize(v, k)
        else
          encodeURIComponent(k) + "=" + encodeURIComponent(v))
  str.join "&"

class XhrPromise

  # Return Promise for a url json get request
  getJson: (url, params) ->
    fetch((encodeURI(url) + if params then ((if url.search(/\?/) == -1 then "?" else "&") + serialize params) else ""),
      timeout: 10000
      method: 'GET'
      headers:
        "Accept": "application/json"
    ).then (res) =>
      res.json()
        .catch (e) =>
          @tattle e, url

# Return Promise for post request
  postJson: (url, params, payload) ->
    fetch((encodeURI(url) + if params then ((if url.search(/\?/) == -1 then "?" else "&") + serialize params) else ""),
      timeout: 10000
      method: 'POST'
      body: payload
      headers:
        "Accept": "application/json"
        "Content-Type": "application/json"
    ).then (res) =>
      res.json()
        .catch (e) =>
          return @tattle e, url


# Return Promise for array of url json get requests
  getJsons: (urls) =>
    promises = urls.map (url) =>
      @getJson(url)
    return Promise.all(promises)

  tattle: (error, url) ->
    body =
      error: "#{error}"
      url: "#{url}"
    body = JSON.stringify(body)
    fetch(config.URL.TATTLE,
      mode: 'on-cors'
      timeout: 10000
      method: 'POST'
      body: body
      headers:
        "Accept": "application/json"
        "Content-Type": "application/json"
    ).then (res) ->
      console.log "Got response", res

module.exports = new XhrPromise()
