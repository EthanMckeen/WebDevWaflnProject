import React from "react";
import './sidebar.css';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatIcon from '@mui/icons-material/Chat';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";

export default function Sidebar(){
    return(
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <RssFeedIcon/>
                        <span className="sidebarListItemText">Feed</span>
                    </li>
                    <li className="sidebarListItem">
                        <ChatIcon/>
                        <span className="sidebarListItemText">Chat</span>
                    </li>
                    <li className="sidebarListItem">
                        <BookmarkIcon/>
                        <span className="sidebarListItemText">Bookmarks</span>
                    </li>
                </ul>
                <hr className="sidebarHR" />
                <ul className="sidebarFriendList">
                    {Users.map(u=>(
                        <CloseFriend key={u.id} user={u}/>
                    ))}
                </ul>
            </div>
        </div>
    )
}