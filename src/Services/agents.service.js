import axios from 'axios'

export async function getAllAgents() {
    let url = `${process.env.REACT_APP_API_URL}users/all`
    return await axios.get(url).then((res) => res)
}
