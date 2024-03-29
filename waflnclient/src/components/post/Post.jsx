import React, { useContext, useEffect, useState } from "react";
import "./post.css"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import axios from "axios"
import {format} from "timeago.js"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";

export default function Post({post}){
    const [like,setLike] = useState(post.likes.length);
    const [isLiked,setIsLiked] = useState(false);
    const [user,setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user: currentUser} = useContext(AuthContext);

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id));
      }, [currentUser._id, post.likes]);

    useEffect(()=>{
        const fetchUser = async() =>{
          const res = await axios.get(`/users?userId=${post.userId}`)
          setUser(res.data)
        }
        fetchUser();
      },[post.userId]);

    const likeHandler = ()=>{
        try{
            axios.put("/posts/" + post._id + "/like", {userId:currentUser._id});
        }catch{}
        setLike(isLiked ? like -1 : like +1)
        setIsLiked(!isLiked)
    }
    return(
        <div className="post">
            <div className="postwrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={"/profile/" + user.username} style={{textDecoration: "none"}}>
                            <img className="postProfileImg" 
                            src={ 
                                user.profilePicture
                                ? PF + user.profilePicture
                                : PF + "profilePicture/defaultPic.jpg"
                                } 
                            alt="" />
                        </Link>
                        <Link to={"/profile/" + user.username} style={{textDecoration: "none"}}>
                            <span className="postUsername">{user.username}</span>
                        </Link>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVertIcon/>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img src={post.img ? PF+post.img : ""} alt="" className="postImg" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <ThumbUpAltIcon 
                        className="likeIcon" 
                        htmlColor={isLiked ? "green" : "brown"} 
                        onClick={likeHandler}
                        />
                        <span className="postLikeCounter" style={{color: isLiked ? "green" : "brown", textDecoration: isLiked ? 'underline' : 'none', }}>
                            {like} likes
                        </span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}