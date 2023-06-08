// npm modules
import { NavLink } from 'react-router-dom'

// css
import styles from './NavBar.module.css'

// types
import { User } from '../../types/models'

interface NavBarProps {
  user: User | null;
  handleLogout: () => void;
}

const NavBar = (props: NavBarProps): JSX.Element => {
  const { user, handleLogout } = props
  
  return (
    <nav>
      {user ?
        <div className={styles.navbarContainer}>
          <div>Welcome, {user.name}</div>
          <div className={styles.navLink}><NavLink to='/days'>All Days</NavLink></div>
          <div className={styles.navLink}><NavLink to='/days/new' >Add Day</NavLink></div>
          <div className={styles.navLink}><NavLink to="" onClick={handleLogout}>LOG OUT</NavLink></div>
          <div className={styles.navLink}><NavLink to="/auth/change-password">Change Password</NavLink></div>
        </div>
      :
        <div className={styles.navbarContainer}>
          <div className={styles.navLink}><NavLink to="/auth/login">Log In</NavLink></div>
          <div className={styles.navLink}><NavLink to="/auth/signup">Sign Up</NavLink></div>
        </div>
      }
    </nav>
  )
}

export default NavBar
