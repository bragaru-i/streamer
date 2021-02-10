import React from 'react'
import { NavLink } from 'react-router-dom'

import styles from './Header.module.scss'

interface Props {

}

const Header = (props: Props) => {
  return (
    <header>

      <nav className={styles.nav}>
        <div className={styles.logo}>
          STREAMER
         </div>
        <div className="spacer" />
        <ul className={styles.navItems}>
          <NavLink className={styles.navItem} to="/broadcasts">All Broadcasts</NavLink>
          <NavLink className={styles.navItem} to="/">Home</NavLink>
        </ul>
      </nav>
    </header>
  )
}

export default Header
