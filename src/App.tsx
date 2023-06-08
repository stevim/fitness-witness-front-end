// npm modules 
import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// pages
import DayList from './pages/DayList/DayList'
import NewDay from './pages/NewDay/NewDay'
import DayDetails from './pages/DayDetails/DayDetails'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import ChangePassword from './pages/ChangePassword/ChangePassword'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'
import * as dayService from './services/dayService'

// styles
import './App.css'

// types
import { User, Day } from './types/models'
import { DayFormData } from './types/forms'

function App(): JSX.Element {
  const [user, setUser] = useState<User | null>(authService.getUser())
  const [days, setDays] = useState<Day[]>([])
  
  const navigate = useNavigate()
  
  useEffect((): void => {
    const fetchDays = async (): Promise<void> => {
      try {
        const dayData: Day[] = await dayService.index()
        setDays(dayData)
      } catch (err) {
        console.log(err)
      }
    }
    user ? fetchDays() : setDays([])
  }, [user])

  const handleCreateDay = async (dayFormData: DayFormData): Promise<void> => {
    try {
      const newDay = await dayService.create(dayFormData,)
      setDays([...days, newDay])
    } catch (err) {
      console.log(err)      
    }
  }

  const handleLogout = (): void => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleAuthEvt = (): void => {
    setUser(authService.getUser())
  }

  return (
    <>
      <NavBar
        user={user}
        handleLogout={handleLogout}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Landing
              user={user}
            />
          }
        />
        <Route
          path='/days'
          element={
            <ProtectedRoute user={user}>
              <DayList
                days={days}
                setDays={setDays}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path='/days/new'
          element={
            <ProtectedRoute user={user}>
              <NewDay
                user={user}
                days={days}
                handleCreateDay={handleCreateDay}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/auth/signup"
          element={<Signup handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/login"
          element={<Login handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/change-password"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleAuthEvt={handleAuthEvt} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
