import "./topbar.css"

import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import {Link} from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { logoutCall } from '../../apiCalls'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from "react-router-dom";




export default function Topbar(){

    const { user, dispatch } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const navigate = useNavigate();
    const handleClick = () => {
        const confirmed = window.confirm("Are you sure you want to sign out?");
        if (confirmed) {
          logoutCall(dispatch);
          navigate("/login");
        }
      };



    return(
        <div className="topbarContainer">
            <div className="topbarLeft">
            <Link to ="/" style={{textDecoration: "none"}}>
                <span className="logo">Wafln</span>
            </Link>    
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <SearchIcon/>
                    <input placeholder="Search for..." className="searchInput" />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <PersonIcon/>
                        <span className="topbarIconBadge">3</span>
                    </div>
                    <div className="topbarIconItem">
                        <ChatIcon/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <NotificationsIcon/>
                        <span className="topbarIconBadge">5</span>
                    </div>
                </div>
                <Link to={`/profile/${user.username}`} >
                    <img 
                        src={
                            user.profilePicture
                            ? PF + user.profilePicture
                            : PF + "profilePicture/defaultPic.jpg"
                            } 
                            alt="" 
                            className="topbarImg" 
                    />
                </Link>
                <li className="signoutItem" onClick={handleClick}>
                    <ExitToAppIcon className="signoutIcon"/> 
                    <span className="signoutText">Sign out</span>
                </li>
            </div>
        </div>
    )
}