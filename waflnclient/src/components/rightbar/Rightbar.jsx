import React from "react";
import './rightbar.css'
import CakeIcon from '@mui/icons-material/Cake';
import { Users } from "../../dummyData";
import Online from "../online/Online"

export default function Rightbar({profile}){
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const HomeRightBar = () => {
        return(
            <>
                <div className="birthdayContainer">
                    <CakeIcon className="birthdayIcon"/>
                    <span className="birthdayText"><b>User1</b> and <b>2 others</b> has their birthday today</span>
                </div>
                <img src="/assets/Ad/exampleAd.jpg" alt="" className="rightbarAd" />
                <h4 className="rightbarTitle">Online Friends</h4>
                <hr className="rightbarHr" />
                
                <ul className="rightbarFriendList">
                    {Users.map(u=>(
                        <Online key={u.id} user={u}/>
                    ))}
                </ul>            
            </>
        );
    };

    const ProfileRightBar = () => {
        return (
            <>
            <h4 className="rightbarTitle">User Information </h4>
            <hr className="rightbarHr"></hr>
            <div className="rightbarInfo">
                
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Pronouns:</span>
                    <span className="rightbarInfoValue">They/Them</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Birthday:</span>
                    <span className="rightbarInfoValue">April 1st</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">City:</span>
                    <span className="rightbarInfoValue">New York</span>
                </div>
            </div>
            <h4 className="rightbarTitle">User Friends </h4>
            <hr className="rightbarHr"></hr>
            <div className="rightbarFollowings">
                <div className="rightbarFollowing">
                    <img src="assets/profilePicture/user1pic.jpg" alt="" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">John Doe</span>
                </div>
            </div>
            </>
        )
    }
    return(
        <div className="rightbar">
            <div className="rightbarWrapper">
                {profile ? <ProfileRightBar/> : <HomeRightBar/>}
            </div>
        </div>
    )
}