"use client"

import Image from "next/image"
import styles from "./Header.module.css"
import { useState } from "react"

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header>
      {/* Top Strip */}
      <div className={styles.topBar}>
        <p>
          Available Nationwide - Questions? Call Us:{" "}
          <a href="tel:2567925982" className={styles.callLink}>
            256-792-5982
          </a>
        </p>
      </div>

      {/* Nav Bar */}
      <nav className={`${styles.navbar}`}>
        <div className={styles.logo}>
          <Image
            src="/images/logo-thin__1.png"
            alt="Clarivia Logo"
            width={150}
            height={50}
          />
        </div>
        <ul className={`${styles.navLinks} ${menuOpen ? styles.active : ""}`}>
          <li>
            <a href="#Weight-Loss">Toenail Fungus</a>
          </li>
          <li>
            <a href="#faq">FAQs</a>
          </li>
        </ul>

        <button
          className={styles.menuButton}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </nav>
    </header>
  )
}
