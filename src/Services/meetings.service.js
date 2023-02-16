import axios from 'axios'
const qs = require('qs')

export async function getAgentMeetings(id) {
    let url = `${process.env.REACT_APP_API_URL}meeting/${id}`
    return await axios.get(url).then((res) => res)
}

export async function bookMeeting(contact, name, start, id) {
    let url = `${process.env.REACT_APP_API_URL}meeting`

    return await axios
        .post(
            url,
            qs.stringify({
                contact: contact,
                title: name,
                start: start,
                end: start,
                utilisateur_id: `${id}`,
            })
        )
        .then((res) => console.log(res))
}
