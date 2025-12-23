import React from 'react'
import styles from './Footer.module.css'

export default function Footer() {
  
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.info}>
          <i className="fas fa-shield-alt"></i>
          <span>Cryptography System</span>
        </div>
        <div className={styles.copyright}>
          <span>© {new Date().getFullYear()} All rights reserved</span>
        </div>
      </div>
    </footer>
  )
}
