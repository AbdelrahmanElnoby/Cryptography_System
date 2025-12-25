import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to={'/'} className={styles.logo}>
          <i className="fas fa-shield-alt"></i>
          <span>Cryptography System</span>
        </Link>
        
        <div className={styles.navLinks}>
          <NavLink 
            to={'/'} 
            className={({ isActive }) => 
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            <i className="fas fa-home"></i>
            <span>Home</span>
          </NavLink>
          <NavLink 
            to={'encryption'} 
            className={({ isActive }) => 
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            <i className="fas fa-lock"></i>
            <span>Encryption</span>
          </NavLink>
          <NavLink 
            to={'history'} 
            className={({ isActive }) => 
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            <i className="fas fa-history"></i>
            <span>History</span>
          </NavLink>
          <NavLink 
            to={'statistics'} 
            className={({ isActive }) => 
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            <i className="fas fa-chart-line"></i>
            <span>Statistics</span>
          </NavLink>
          <NavLink 
            to={'hybrid-system'} 
            className={({ isActive }) => 
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            <i className="fas fa-key"></i>
            <span>Hybrid System</span>
          </NavLink>
          <NavLink 
            to={'about'} 
            className={({ isActive }) => 
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            <i className="fas fa-info-circle"></i>
            <span>About</span>
          </NavLink>
          <NavLink 
            to={'guide'} 
            className={({ isActive }) => 
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            <i className="fas fa-book"></i>
            <span>Guide</span>
          </NavLink>
        </div>

        <button 
          className={styles.mobileMenuButton}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`${styles.mobileMenu} ${isOpen ? styles.mobileMenuOpen : ''}`}>
        <NavLink 
          to={'/'} 
          className={({ isActive }) => 
            `${styles.mobileNavLink} ${isActive ? styles.active : ''}`
          }
          onClick={() => setIsOpen(false)}
        >
          <i className="fas fa-home"></i>
          <span>Home</span>
        </NavLink>
        <NavLink 
          to={'encryption'} 
          className={({ isActive }) => 
            `${styles.mobileNavLink} ${isActive ? styles.active : ''}`
          }
          onClick={() => setIsOpen(false)}
        >
          <i className="fas fa-lock"></i>
          <span>Encryption</span>
        </NavLink>
        <NavLink 
          to={'history'} 
          className={({ isActive }) => 
            `${styles.mobileNavLink} ${isActive ? styles.active : ''}`
          }
          onClick={() => setIsOpen(false)}
        >
          <i className="fas fa-history"></i>
          <span>History</span>
        </NavLink>
        <NavLink 
          to={'statistics'} 
          className={({ isActive }) => 
            `${styles.mobileNavLink} ${isActive ? styles.active : ''}`
          }
          onClick={() => setIsOpen(false)}
        >
          <i className="fas fa-chart-line"></i>
          <span>Statistics</span>
        </NavLink>
        <NavLink 
          to={'hybrid-system'} 
          className={({ isActive }) => 
            `${styles.mobileNavLink} ${isActive ? styles.active : ''}`
          }
          onClick={() => setIsOpen(false)}
        >
          <i className="fas fa-key"></i>
          <span>Hybrid System</span>
        </NavLink>
        <NavLink 
          to={'about'} 
          className={({ isActive }) => 
            `${styles.mobileNavLink} ${isActive ? styles.active : ''}`
          }
          onClick={() => setIsOpen(false)}
        >
          <i className="fas fa-info-circle"></i>
          <span>About</span>
        </NavLink>
        <NavLink 
          to={'guide'} 
          className={({ isActive }) => 
            `${styles.mobileNavLink} ${isActive ? styles.active : ''}`
          }
          onClick={() => setIsOpen(false)}
        >
          <i className="fas fa-book"></i>
          <span>Guide</span>
        </NavLink>
      </div>
    </header>
  )
}
