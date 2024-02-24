import { ProfileInput } from "../../components/profile-input/profile-input";
import { Profile } from "../../components/profile/profile";
import styles from "./profile.module.css";

export function ProfilePage() {
  return (
    <div className={styles.profileDiv}>
      <Profile />
      <ProfileInput />
    </div>
  );
}
