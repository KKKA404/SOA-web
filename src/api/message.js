import axios from 'axios'

export function getMessageList(key,num) {
    const url = '/tianApi/travel/index'
    const data = {
      key,
      num
    }
  
    return axios.get(url, {
      params: data
    }).then(res => {
      return Promise.resolve(res)
    })
  }