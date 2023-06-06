import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

// css
import styles from './Landing.module.css'

// types
import { User } from '../../types/models'

interface LandingProps {
  user: User | null;
}

const Landing = (props: LandingProps): JSX.Element => {
  const { user } = props

  const [logInForm, setLogInForm] = useState(false)
  const [signUpForm, setSignUpForm] = useState(false)

  const navigate = useNavigate()

  const handleLogIn = () => {
    setLogInForm(true)
    setSignUpForm(false)
  }

  const handleSignUp = () => {
    setLogInForm(false)
    setSignUpForm(true)
  }

  const handleCancelClick = () => {
    setLogInForm(false)
    setSignUpForm(false)
  }

  if (user) {
    navigate ('/days')
  }

  if (!logInForm && !signUpForm) {
    return (
      <main className={styles.container}>
        <h1>hello, {user ? user.name : 'friend'}</h1>
      </main>
    )
  }
}

export default Landing
