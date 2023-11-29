import React from "react";
import "./share.css"
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import LocationOnIcon from '@mui/icons-material/LocationOn';



export default function Share(){
    return(
        <div className="share">
           <div className="shareWrapper">
                <div className="shareTop">
                    <img src="/assets/profilePicture/defaultPic.jpg" alt="" className="shareProfileImg" />
                    <input placeholder="What are you Waffln About?" className="shareInput" />
                </div>
                <hr className="shareHR" />
                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <PermMediaIcon htmlColor="tomato" className="shareIcon"/>
                            <span className="shareoptionText">Add Photo</span>
                        </div>
                    </div>
                    <div className="shareOptions">
                        <div className="shareOption">
                            <LabelIcon htmlColor="tomato" className="shareIcon"/>
                            <span className="shareoptionText">Tag</span>
                        </div>
                    </div>
                    <div className="shareOptions">
                        <div className="shareOption">
                            <LocationOnIcon htmlColor="tomato" className="shareIcon"/>
                            <span className="shareoptionText">Location</span>
                        </div>
                    </div>
                    <button className="shareButton">Share Post</button>
                </div>
           </div>
        </div>
    )
}