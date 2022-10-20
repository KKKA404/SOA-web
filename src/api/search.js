import axios from 'axios'

export function getResultList(keyword, page, pagesize) {
  const url = '/proxyApi/x/web-interface/search/all/v2'
  const data = {
    keyword,
    page,
    pagesize
  }

  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res)
  })
}

// 搜索提示词
export function getSuggest(query) {
  const url = '/proxyApi/suggest'
  const data = {
    'term': query
  }

  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res)
  })
}


// 默认搜索词
export function getSearchDefaultWords() {
  const url = '/proxyApi/x/web-interface/search/default'

  return axios.get(url).then(res => {
    return Promise.resolve(res)
  })
}

// 百度
export function getBaidu(t) {
  const url = '/baiduApi/dub'
  const data = {
    t
  }

  return axios.get(url, { params: data }).then(res => {
    return Promise.resolve(res)
  })
}