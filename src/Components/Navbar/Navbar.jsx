import React, { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useScroll } from '../../context/ScrollContext'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { activeSection } = useScroll()
  const isHomePage = location.pathname === '/' || location.pathname === '/home'

  const handleSectionClick = (e, sectionId) => {
    if (isHomePage) {
      e.preventDefault()
      const element = document.getElementById(sectionId)
      if (element) {
        const offset = 100 // Account for navbar height
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - offset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
        setIsOpen(false)
      }
    } else {
      setIsOpen(false)
    }
  }

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
            className={({ isActive }) => {
              const isActiveLink = isHomePage ? activeSection === 'home' : isActive
              return `${styles.navLink} ${isActiveLink ? styles.active : ''}`
            }}
            onClick={(e) => {
              if (isHomePage) {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            }}
          >
            <i className="fas fa-home"></i>
            <span>Home</span>
          </NavLink>
          <NavLink 
            to={'guide'} 
            className={({ isActive }) => {
              const isActiveLink = isHomePage ? activeSection === 'guide' : isActive
              return `${styles.navLink} ${isActiveLink ? styles.active : ''}`
            }}
            onClick={(e) => handleSectionClick(e, 'guide')}
          >
            <i className="fas fa-book"></i>
            <span>Guide</span>
          </NavLink>
          <NavLink 
            to={'about'} 
            className={({ isActive }) => {
              const isActiveLink = isHomePage ? activeSection === 'about' : isActive
              return `${styles.navLink} ${isActiveLink ? styles.active : ''}`
            }}
            onClick={(e) => handleSectionClick(e, 'about')}
          >
            <i className="fas fa-info-circle"></i>
            <span>About</span>
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
          className={({ isActive }) => {
            const isActiveLink = isHomePage ? activeSection === 'home' : isActive
            return `${styles.mobileNavLink} ${isActiveLink ? styles.active : ''}`
          }}
          onClick={(e) => {
            if (isHomePage) {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
            setIsOpen(false)
          }}
        >
          <i className="fas fa-home"></i>
          <span>Home</span>
        </NavLink>
        <NavLink 
          to={'guide'} 
          className={({ isActive }) => {
            const isActiveLink = isHomePage ? activeSection === 'guide' : isActive
            return `${styles.mobileNavLink} ${isActiveLink ? styles.active : ''}`
          }}
          onClick={(e) => handleSectionClick(e, 'guide')}
        >
          <i className="fas fa-book"></i>
          <span>Guide</span>
        </NavLink>
        <NavLink 
          to={'about'} 
          className={({ isActive }) => {
            const isActiveLink = isHomePage ? activeSection === 'about' : isActive
            return `${styles.mobileNavLink} ${isActiveLink ? styles.active : ''}`
          }}
          onClick={(e) => handleSectionClick(e, 'about')}
        >
          <i className="fas fa-info-circle"></i>
          <span>About</span>
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
      </div>
    </header>
  )
}
