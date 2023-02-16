import axios from 'axios'
const qs = require('qs')

export async function loginFunction(email, password) {
    let axiosConfig = {
        headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
    }
    let url = `${process.env.REACT_APP_API_URL}auth/signin`

    return await axios
        .post(url, qs.stringify({ email: email, password: password }))
        .then((res) => {
            localStorage.setItem('jwt', res.data.access_token)

            return res.status
        })
}

export async function registerFunction(
    email,
    password,
    firstName,
    lastName,
    stat,
    tel
) {
    let axiosConfig = {
        headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
    }
    let url = `${process.env.REACT_APP_API_URL}auth/signup`

    if (!stat) {
        stat = 0
    }

    return await axios
        .post(
            url,
            qs.stringify({
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                tel: tel,
                stat: stat,
            }),
            axiosConfig
        )
        .then((res) => res)
}
