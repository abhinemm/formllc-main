"use client";
import React, { useLayoutEffect, useState } from "react";
import styles from "./header.module.scss";
import { Drawer } from "antd";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const Header = () => {
  const [sideDrawer, setSideDrawer] = useState(false);
  const session = useSession();
  const pathName = usePathname();
  useLayoutEffect(() => {
    setSideDrawer(false);
  }, [pathName]);

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.container}>
          {/* Logo Section */}
          <div className={styles.logo}>
            <Link href="/">Formllc</Link>
          </div>

          {/* Desktop Navigation */}
          <nav className={`${styles.nav} ${styles.desktopNav}`}>
            <ul>
              {/* <li>
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
              </li> */}
              <li>
                <Link href="/contact-us">Contact Us</Link>
              </li>
              <li>
                {session?.data?.user ? (
                  <Link href="/user" className={styles.signIn}>
                    My Account
                  </Link>
                ) : (
                  <Link href="/api/auth/signin" className={styles.signIn}>
                    Sign in
                  </Link>
                )}
              </li>
            </ul>
            <div className={styles.authButtons}>
              <Link href="/start-buisness" className={styles.startBusiness}>
                Start my business
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div
            className={styles.mobileMenu}
            onClick={() => setSideDrawer(true)}
          >
            <div className={styles.burger}></div>
            <div className={styles.burger}></div>
            <div className={styles.burger}></div>
          </div>
        </div>
      </div>

      <Drawer
        placement={"right"}
        width={"60%"}
        onClose={() => setSideDrawer(false)}
        open={sideDrawer}
        className={"headerDrawerStyle"}
      >
        <nav className={styles.navMobile}>
          <ul>
            <li>
              <Link href="/contact-us">Contact Us</Link>
            </li>
            <li>
              {session?.data?.user ? (
                <Link href="/user" className={styles.signIn}>
                  My Account
                </Link>
              ) : (
                <Link href="/api/auth/signin" className={styles.signIn}>
                  Sign in
                </Link>
              )}
            </li>
          </ul>
          <div className={styles.authButtons}>
            <Link href="/start-buisness" className={styles.startBusiness}>
              Start my business
            </Link>
          </div>
        </nav>
      </Drawer>
    </header>
  );
};

export default Header;
