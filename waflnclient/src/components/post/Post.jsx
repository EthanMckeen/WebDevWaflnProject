import React, { useState } from "react";
import "./post.css"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { Users } from "../../dummyData";

export default function Post({post}){
    const [like,setLike] = useState(post.like)
    const [isLiked,setisLiked] = useState(false)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const likeHandler = ()=>{
        setLike(isLiked ? like -1 : like +1)
        setisLiked(!isLiked)
    }
    return(
        <div className="post">
            <div className="postwrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img src={Users.filter(u=> u.id === post.userId)[0].profilePicture} alt="" className="postProfileImg" />
                        <span className="postUsername">{Users.filter(u=> u.id === post.userId)[0].username}</span>
                        <span className="postDate">{post.date}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVertIcon/>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img src={PF+post?.photo} alt="" className="postImg" />
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