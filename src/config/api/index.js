const apis = {
  "directoryList": "/directory/list"
}

export function get(apiName) {
  const serverUrl = `${window.location.protocol}//${window.location.hostname}:3001`;

  return `${serverUrl}${apis[apiName]}`
}

export default {
  get
}