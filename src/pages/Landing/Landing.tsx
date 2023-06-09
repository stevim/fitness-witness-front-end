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
  const navigate = useNavigate()

  if (user) {
    navigate('/days')
  } else {
    navigate('/auth/login')
  }

  const userView = (
    <h3>...loading</h3>
  )

  const guestView = (
    <h2 className={styles.guestView}>Sign up to get started!</h2>
  )
  
  return (
    <>
      { user ? userView : guestView}
    </>
  )
}

export default Landing
