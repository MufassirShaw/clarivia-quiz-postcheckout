"use client"

import Image from "next/image"
import { useState } from "react"
import Link from "next/link"
import styles from "./Header.module.css"

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header>
      {/* Top Strip */}
      <div className={styles.topBar}>
        <p className={styles.topText}>
          Available Nationwide - Questions? Call Us:{" "}
          <a href="tel:2567925982" className={styles.callLink}>
            256-792-5982
          </a>
        </p>
      </div>

      <div className="container">
        {/* Navbar */}
        <nav className={styles.navbar}>
          <div className={styles.navContainer}>
            <Link href="/" className={styles.brand}>
              <Image
                src="/images/logo-thin__1.png"
                alt="Clarivia Logo"
                width={145}
                height={66}
                className={styles.logoImage}
              />
            </Link>

            <ul className={styles.navLinks}>
              <li>
                <a href="#Weight-Loss" className={styles.navLink}>
                  Toenail Fungus
                </a>
              </li>
              <li>
                <a href="#faq" className={styles.navLink}>
                  FAQs
                </a>
              </li>
            </ul>

            <button
              className={styles.menuButton}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className={styles.mobileMenu}>
              <a
                href="#Weight-Loss"
                className={styles.mobileNavLink}
                onClick={() => setMenuOpen(false)}
              >
                Toenail Fungus
              </a>
              <a
                href="#faq"
                className={styles.mobileNavLink}
                onClick={() => setMenuOpen(false)}
              >
                FAQs
              </a>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
