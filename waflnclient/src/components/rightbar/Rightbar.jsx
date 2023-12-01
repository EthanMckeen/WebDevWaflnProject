import React, { useEffect, useState, useContext } from "react";
import './rightbar.css'
import CakeIcon from '@mui/icons-material/Cake';
import { Users } from "../../dummyData";
import Online from "../online/Online"
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ProfileEditDialog from "../profileEditDialog/ProfileEditDialog";

export default function Rightbar({ user }){
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const { user: currentUser, dispatch } = useContext(AuthContext);
    const [followed, setFollowed] = useState( null );

    useEffect(() => {
        if (user && user._id) {
            setFollowed(currentUser.followings.includes(user._id));
        }
  }, [user, currentUser]);

    useEffect(()=>{
    if (user && user._id) {
        const getFriends = async ()=>{
            try{
                const friendList = await axios.get("/users/friends/"+ user._id)
                setFriends(friendList.data);
            }catch(err){
                console.log(err)
            }
        }
        getFriends();
    }
    },[user])


    const handleClickFollow = async () => {
        try {
          if (followed) {
            await axios.put(`/users/${user._id}/unfollow`, {
              userId: currentUser._id,
            });
            dispatch({ type: "UNFOLLOW", payload: user._id });
          } else {
            await axios.put(`/users/${user._id}/follow`, {
              userId: currentUser._id,
            });
            dispatch({ type: "FOLLOW", payload: user._id });
          }
          setFollowed(!followed);
        } catch (err) {
        }
      };


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
            {user.username === currentUser.username && (
                <ProfileEditDialog/>
            )}
            {user.username !== currentUser.username && (
                <button 
                    className={followed ? "rightbarUnfollowButton" : "rightbarFollowButton" }
                    onClick={handleClickFollow}
                >
                    {followed ? "Unfollow " : "Follow "}
                    {followed ? <RemoveIcon/> : <AddIcon/>}
                    
                </button>
            )}
            <h4 className="rightbarTitle">User Information </h4>
            <hr className="rightbarHr"></hr>
            <div className="rightbarInfo">
                
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Pronouns:</span>
                    <span className="rightbarInfoValue">
                        {  user.pronouns === 0 
                           ? "-" 
                           : user.pronouns === 1 
                           ? "She/her" 
                           : user.pronouns === 2 
                           ? "She/they" 
                           : user.pronouns === 3 
                           ? "He/they" 
                           : user.pronouns === 4 
                           ? "He/him"
                           : user.pronouns === 5
                           ? "They/Them" 
                           : "Other"}
                    </span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Birthday:</span>
                    <span className="rightbarInfoValue">{user.birthday}</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">City:</span>
                    <span className="rightbarInfoValue">{user.city}</span>
                </div>
            </div>
            <h4 className="rightbarTitle">User Friends </h4>
            <hr className="rightbarHr"></hr>
            <div className="rightbarFollowings">
                {friends?.map(friend=>(
                <Link to={"/profile/"+ friend.username} style={{textDecoration: "none"}} className="pfpLink" key={friend._id} >
                    <div className="rightbarFollowing">
                        <img 
                            className="rightbarFollowingImg"
                            src={friend.profilePicture ? PF + friend.profilePicture : PF + "profilePicture/defaultPic.jpg"} 
                            alt=""  
                        />
                        <span className="rightbarFollowingName">{friend.username}</span>
                    </div>
                </Link>
                ))}
            </div>
        </>
        )
    }


    return(
        <div className="rightbar">
            <div className="rightbarWrapper">
                {user ? <ProfileRightBar/> : <HomeRightBar/>}
            </div>
        </div>
    )
}