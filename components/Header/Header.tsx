"use client";
import React, { useState } from "react";
import styles from "./header.module.scss";
import { Drawer} from "antd";
import Link from "next/link";

const Header = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };


  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo Section */}
        <div className={styles.logo}>
          <Link href="/">firstbase</Link>
        </div>

        {/* Desktop Navigation */}
        <nav className={`${styles.nav} ${styles.desktopNav}`}>
          <ul>
            <li>
              <Link href="#products">Products</Link>
            </li>
            <li>
              <Link href="#pricing">Pricing</Link>
            </li>
            <li>
              <Link href="#rewards">Rewards</Link>
            </li>
            <li>
              <Link href="#partners">Partners</Link>
            </li>
            <li>
              <Link href="#resources">Resources</Link>
            </li>
            <li>
              <Link href="#company">Company</Link>
            </li>
          </ul>
          <div className={styles.authButtons}>
            <Link href="#signin" className={styles.signIn}>
              Sign in
            </Link>
            <Link href="#start" className={styles.startBusiness}>
              Start my business
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className={styles.mobileMenu} onClick={showDrawer}>
          <div className={styles.burger}></div>
          <div className={styles.burger}></div>
          <div className={styles.burger}></div>
        </div>
      </div>

      <Drawer
        placement={"right"}
        width={'60%'}
        onClose={() => setOpen(false)}
        open={open}
        className={"headerDrawerStyle"}
      >
        <nav className={styles.navMobile}>
          <ul>
            <li>
              <a href="#products">Products</a>
            </li>
            <li>
              <a href="#pricing">Pricing</a>
            </li>
            <li>
              <a href="#rewards">Rewards</a>
            </li>
            <li>
              <a href="#partners">Partners</a>
            </li>
            <li>
              <a href="#resources">Resources</a>
            </li>
            <li>
              <a href="#company">Company</a>
            </li>
          </ul>
          <div className={styles.authButtons}>
            <a href="#signin" className={styles.signIn}>
              Sign in
            </a>
            <a href="#start" className={styles.startBusiness}>
              Start my business
            </a>
          </div>
        </nav>
      </Drawer>
    </header>
  );
};

export default Header;
