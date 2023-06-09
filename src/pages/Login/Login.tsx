// npm modules
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// services
import * as authService from '../../services/authService'

// css
import styles from './Login.module.css'

// types
import { AuthPageProps } from '../../types/props'
import { LoginFormData } from '../../types/forms'
import { handleErrMsg } from '../../types/validators'

const LoginPage = (props: AuthPageProps): JSX.Element => {
  const { handleAuthEvt } = props
  const navigate = useNavigate()

  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  })

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setMessage('')
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    try {
      if (!import.meta.env.VITE_BACK_END_SERVER_URL) {
        throw new Error('No VITE_BACK_END_SERVER_URL in front-end .env')
      }
      await authService.login(formData)
      handleAuthEvt()
      navigate('/')
    } catch (err) {
      console.log(err)
      handleErrMsg(err, setMessage)
    }
  }

  const { email, password } = formData

  const isFormInvalid = (): boolean => {
    return !(email && password)
  }

  return (
    <main className={styles.logInContainer}>
      <div className={styles.logInForm}>
        <h1>LOG IN</h1>
        <p className={styles.message}>{message}</p>
        <form autoComplete="off" onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            Email
            <input
              type="text"
              value={email}
              name="email"
              onChange={handleChange}
              className={styles.logInInput}
            />
          </label>
          <label className={styles.label}>
            Password
            <input
              type="password"
              value={password}
              name="password"
              onChange={handleChange}
              className={styles.logInInput}
            />
          </label>
          <div>
            <Link to="/auth/signup">CREATE ACCOUNT</Link>
            <button className={styles.logInBtn} disabled={isFormInvalid()}>
              LOG IN
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default LoginPage
