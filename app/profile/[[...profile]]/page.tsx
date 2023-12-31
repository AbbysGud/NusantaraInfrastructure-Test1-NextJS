import Navbar from "@/app/navbar";
import { UserProfile } from "@clerk/nextjs";
 
const Profile = () => (
    <div>
        <Navbar/>
        <div className="py-10 px-10">
            <UserProfile path="/profile" routing="path" />
        </div>
    </div>
);
 
export default Profile;