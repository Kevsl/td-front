import { Routes, Route } from 'react-router-dom'
import Home from './Views/Home'
import Login from './Views/Login'
import Meeting from './Views/Meeting'

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Home />} />
                <Route path="/add-meeting" element={<Meeting />} />
            </Routes>
        </div>
    )
}

export default App
