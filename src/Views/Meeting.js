import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import frLocale from '@fullcalendar/core/locales/fr'
import { useEffect, useState } from 'react'
import { getAllAgents } from '../Services/agents.service'
import { bookMeeting, getAgentMeetings } from '../Services/meetings.service'
import { useNavigate } from 'react-router-dom'
import { BasicDateTimePicker } from '../Utils/datePicker'

const Meeting = () => {
    const navigate = useNavigate()
    const [usersList, setUsersList] = useState([])
    const [agentId, setAgentId] = useState()
    const [clientName, setClientName] = useState()
    const [clientContact, setClientContact] = useState()
    const [clientEmail, setClientEmail] = useState()
    const [meetingDate, setMeetingDate] = useState(new Date())
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        getAllAgents().then((res) => {
            setUsersList(res.data)
        })
    }, [])

    let token = localStorage.getItem('jwt')
    if (!token) {
        navigate('/')
    }

    function handleLogout() {
        localStorage.removeItem('jwt')
        navigate('/')
    }
    function handleSubmit() {
        if (clientContact && clientName && meetingDate) {
            bookMeeting(clientContact, clientName, meetingDate, agentId).then(
                (res) => {
                    if (res === 200) {
                        navigate('/dashboard')
                    } else {
                        setErrorMessage('Problème avec les champs')
                    }
                }
            )
        }
    }

    return (
        <div className="w-2/3 mx-auto my-8">
            <div className="flex items-center justify-around w-full"></div>
            <button
                className="bg-gray-400 text-white px-4 rounded-xl mx-auto"
                onClick={() => {
                    handleLogout()
                }}
            >
                Se déconnecter
            </button>
            <button
                className="bg-gray-400 text-white px-4 rounded-xl"
                onClick={() => {
                    navigate('/dashboard')
                }}
            >
                Tableau des rendez vous
            </button>
            <div className="flex items-center flex-col justify-center">
                <div className=" mr-4 mt-16 overflow-y-scroll flex items-center flex-col justify-center">
                    <p className="text-center w-72 my-2 ">Agent commercial</p>
                    <select
                        className="border rounded-xl border-black-400 cursor-pointer w-72"
                        onClick={(e) => {
                            setAgentId(e.target.value)
                        }}
                    >
                        {usersList &&
                            usersList.map((user) => {
                                return (
                                    <option
                                        value={user.id}
                                        className="text-center"
                                    >
                                        {user.firstName} {user.lastName}
                                    </option>
                                )
                            })}
                    </select>
                    <div className="my-2">
                        <p className="my-2">Votre numéro de téléphone :</p>
                        <input
                            type="text"
                            className="border-gray-400 border-solid border-2 rounded-md"
                            onChange={(e) => {
                                setClientContact(e.target.value)
                            }}
                        />
                    </div>
                    <div className="my-4">
                        <p className="my-2">Votre nom</p>
                        <input
                            type="text"
                            className="-ml-6 border-gray-400 border-solid border-2 rounded-md"
                            onChange={(e) => {
                                setClientName(e.target.value)
                            }}
                        />
                    </div>
                    <div className="my-4">
                        <p className="my-2">Votre email</p>
                        <input
                            type="text"
                            className="-ml-6 border-gray-400 border-solid border-2 rounded-md"
                            onChange={(e) => {
                                setClientEmail(e.target.value)
                            }}
                        />
                    </div>
                    <div className="mt-8">
                        <BasicDateTimePicker setMeetingDate={setMeetingDate} />
                    </div>
                    <button
                        className="border-white border-solid border-2 rounded-md my-4 px-4 bg-gray-400 text-white"
                        onClick={() => {
                            handleSubmit()
                        }}
                    >
                        Réserver ce créneau
                    </button>
                    {errorMessage && <p className="text-red">{errorMessage}</p>}
                </div>
            </div>
        </div>
    )
}
export default Meeting
