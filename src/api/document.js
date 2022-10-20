import axios from 'axios'

export function getDocument(rid,day,original) {
    const url = '/proxyApi/x/web-interface/ranking/region'
    const data = {
      rid,
      day,
      original
    }
  
    return axios.get(url, {
      params: data
    }).then(res => {
      return Promise.resolve(res)
    })
  }