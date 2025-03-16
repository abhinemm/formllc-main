"use client";
import React, { useLayoutEffect, useState } from "react";
import styles from "./header.module.scss";
import { Drawer } from "antd";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useAppContext } from "../Context/AppContext";
import { UserTypesEnum } from "@/utils/constants";

const Header = () => {
  const [sideDrawer, setSideDrawer] = useState(false);
  const { contextOptions } = useAppContext();
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
              <li>
                <Link href="/pricing">Contact Us</Link>
              </li>
              {contextOptions?.userData ? (
                <>
                  <li>
                    {contextOptions?.userData.type == UserTypesEnum.customer ? (
                      <Link href="/user" className={styles.signIn}>
                        My Account
                      </Link>
                    ) : (
                      <Link href="/admin" className={styles.signIn}>
                        My Account
                      </Link>
                    )}
                  </li>
                  <li>
                    <a
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className={styles.signIn}
                    >
                      Logout
                    </a>
                  </li>
                </>
              ) : (
                <li>
                  <Link href="/api/auth/signin" className={styles.signIn}>
                    Sign in
                  </Link>
                </li>
              )}
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
              {contextOptions?.userData ? (
                <>
                  {contextOptions?.userData.type == UserTypesEnum.customer ? (
                    <Link href="/user" className={styles.signIn}>
                      My Account
                    </Link>
                  ) : (
                    <Link href="/admin" className={styles.signIn}>
                      My Account
                    </Link>
                  )}
                </>
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
