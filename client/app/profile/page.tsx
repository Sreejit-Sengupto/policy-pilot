import Header from "../../component/header";
import { ProfilePage } from "./profilePage";// named import

export const metadata = {
  title: "Profile - PolicyPilot",
};

export default function Page() {
  return (
    <>
      <ProfilePage />
    </>
  );
}
