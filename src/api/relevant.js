import axios from 'axios'

export function getLocation(word, page, num) {
    const url = '/tianApi/scenic/index'
    const data = {
        key: 'e187c82474d5c0b5c338824d54729d59',
        word,
        page,
        num
    }

    return axios.get(url, {
        params: data
    }).then(res => {
        return Promise.resolve(res)
    })
}

export function getCovidInfo(city) {
    const url = '/covidApi/api/springTravel/risk'
    const data = {
        token: 'yNyxlXgnjjC0xOXe',
        city,
    }

    return axios.get(url, {
        params: data
    }).then(res => {
        return Promise.resolve(res)
    })
}