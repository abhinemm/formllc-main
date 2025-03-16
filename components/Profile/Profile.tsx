import React from "react";
import styles from "./MyProfile.module.scss";

const MyProfile: React.FC = () => {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <div className={styles.avatarSection}>
          <img
            src="https://via.placeholder.com/150"
            alt="Profile Avatar"
            className={styles.avatar}
          />
          <h2 className={styles.name}>John Doe</h2>
          <p className={styles.role}>Software Developer</p>
        </div>

        <div className={styles.detailsSection}>
          <h3>Contact Information</h3>
          <p>
            <strong>Email:</strong> john.doe@example.com
          </p>
          <p>
            <strong>Phone:</strong> +1 123-456-7890
          </p>

          <h3>Address</h3>
          <p>1234 Elm Street</p>
          <p>City, State, ZIP</p>

          <h3>About Me</h3>
          <p>
            Passionate software developer with expertise in building scalable
            and user-friendly web applications.
          </p>
        </div>

        <div className={styles.actionsSection}>
          <button className={styles.editButton}>Edit Profile</button>
          <button className={styles.logoutButton}>Log Out</button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
