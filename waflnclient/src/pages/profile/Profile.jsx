import React from "react";
import "./profile.css"
import Topbar from "../../components/topbar/Topbar"
import Sidebar  from "../../components/sidebar/Sidebar"
import Rightbar from "../../components/rightbar/Rightbar"
import Feed from "../../components/feed/Feed"

export default function Profile(){
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return(
        <>
            <Topbar/>
            <div className="profile">
            <Sidebar/>
            <div className="profileRight">
                <div className="profileRightTop">
                    <div className="profileCover">
                        <img src={`${PF}profilePicture/user3pic.jpg`} alt="" className="profileCoverImg" />
                        <img src={`${PF}profilePicture/defaultPic.jpg`} alt="" className="profileUserImg" />
                    </div>
                    <div className="profileInfo">
                        <h4 className="profileInfoName">User Name</h4>
                        <span className="profileInfoDesc">MY PROFILE DESCRIPTION</span>
                    </div>
                </div>
                <div className="profileRightBottom">
                    <Feed/>
                    <Rightbar profile/>
                </div>
                
            </div>
           
            </div>
            
       </>
    )
}