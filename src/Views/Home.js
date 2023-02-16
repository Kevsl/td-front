import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import frLocale from '@fullcalendar/core/locales/fr'
import { useEffect, useState } from 'react'
import { getAllAgents } from '../Services/agents.service'
import { getAgentMeetings } from '../Services/meetings.service'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    function renderEventContent() {
        meetingsList &&
            meetingsList.map((meeting) => {
                return (
                    <>
                        <b>{meeting.start}</b>
                        <br></br>
                        <i>{meeting.contact}</i>
                    </>
                )
            })
    }
    const navigate = useNavigate()
    const [usersList, setUsersList] = useState([])
    const [meetingsList, setMeetingsList] = useState([])

    useEffect(() => {
        getAllAgents().then((res) => {
            setUsersList(res.data)
        })
    }, [])

    function getAgentPlaning(id) {
        getAgentMeetings(id).then((res) => {
            setMeetingsList(res.data)
        })
    }

    let token = localStorage.getItem('jwt')
    if (!token) {
        navigate('/')
    }

    function handleLogout() {
        localStorage.removeItem('jwt')
        navigate('/')
    }
    return (
        <div className="  w-5/6 mx-auto my-8 ">
            <button
                className="bg-gray-400 text-white px-4 rounded-xl"
                onClick={() => {
                    handleLogout()
                }}
            >
                Se déconnecter
            </button>
            <div className="flex items-center">
                <div className="w-1/4 items-start mr-4 mt-16 overflow-y-scroll">
                    {usersList &&
                        usersList.map((user) => {
                            return (
                                <div
                                    className="border rounded-xl border-black-400 items-start cursor-pointer"
                                    key={user.id}
                                    onClick={() => getAgentPlaning(user.id)}
                                >
                                    <p className="text-center my-2">
                                        {user.firstName} {user.lastName}{' '}
                                    </p>
                                    <p className="text-center my-2">
                                        {user.email} - {user.tel}{' '}
                                    </p>
                                    <p className="text-center my-2">
                                        {user.stat} rendez vous{' '}
                                    </p>
                                </div>
                            )
                        })}
                </div>
                <div className="w-3/4">
                    <div className="flex items-center justify-center">
                        <h1 className="text-center mt-8 mb-12 text-3xl ">
                            Agenda des Commerciaux
                        </h1>

                        <button
                            onClick={() => {
                                navigate('/add-meeting')
                            }}
                            className="w-32 mx-auto bg-blue-500 text-white rounded-xl my-4"
                        >
                            Ajouter un rendez vous
                        </button>
                    </div>
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        weekends={false}
                        events={meetingsList}
                        eventContent={renderEventContent(meetingsList)}
                        locale={frLocale}
                    />
                </div>
            </div>
        </div>
    )
}
export default Home
