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
          <div id={styles.userName}>
            {user.name.toUpperCase()}
          </div>
          <div id={styles.links}>
            <div className={styles.navLink}><NavLink to='/days'>ALL DAYS</NavLink></div>
            <div className={styles.navLink}><NavLink to='/days/new' >ADD DAY</NavLink></div>
            <div className={styles.navLink}><NavLink to="" onClick={handleLogout}>LOG OUT</NavLink></div>
            <div className={styles.navLink}><NavLink to="/auth/change-password">CHANGE PASSWORD</NavLink></div>
          </div>
        </div>
      :
        <div className={styles.navbarContainer}>
          <div></div>
          <div id={styles.links}>
            <div className={styles.navLink}><NavLink to="/auth/login">LOG IN</NavLink></div>
            <div className={styles.navLink}><NavLink to="/auth/signup">SIGN UP</NavLink></div>
          </div>
        </div>
      }
    </nav>
  )
}

export default NavBar
