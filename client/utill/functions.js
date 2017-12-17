export const convertObj = (arr, key) => {
  const res = {}
  for (let obj of arr) {
    res[obj[key]] = obj;
  }
  return res;
}

export const stripTags = (str) => {
  return str.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'').replace(/\\r\\n/g, '\r\n')
}

export const stripTagsBr = (str) => {
  return str.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'').replace(/\\r\\n/g, '<br>')
}

export const truncate = (str, length) => {
  const count = length ? length : 100;
  const abridgement = str.replace(/\r?\n/g,'').length > count ? '…' : '';
  return str.replace(/\r?\n/g,'').slice(0, count) + abridgement; 
}
