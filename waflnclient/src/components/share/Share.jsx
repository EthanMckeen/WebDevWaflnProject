import React, { useContext, useRef, useState } from "react";
import "./share.css"
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { AuthContext} from "../../context/AuthContext";
import axios from "axios";
import CancelIcon from '@mui/icons-material/Cancel';




export default function Share(){
    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [file,setFile] = useState(null);

    const submitHandler = async (e) =>{
        e.preventDefault()
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }
        if(file){
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file",file);
            newPost.img = fileName;
            try{
                await axios.post("/upload", data);
            }catch(err){
                console.log(err);
            }
        }
        try{
            await axios.post("/posts", newPost)
            window.location.reload();
        }catch(err){}
    }

    return(
        <div className="share">
           <div className="shareWrapper">
                <div className="shareTop">
                    <img 
                        src={ 
                            user.profilePicture
                                ? PF + user.profilePicture
                                : PF + "profilePicture/defaultPic.jpg"
                            } 
                        alt=""  
                        className="shareProfileImg"
                    />
                    <input 
                        className="shareInput" 
                        placeholder={"What is " + user.username +" Waffln About?"}  
                        ref={desc}
                    />
                </div>
                <hr className="shareHR" />
                {file && (
                    <div className="shareImgContainer">
                        <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                        <CancelIcon className="shareCancelImg" onClick={()=>setFile(null)}/>
                    </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMediaIcon htmlColor="tomato" className="shareIcon"/>
                            <span className="shareoptionText">Media</span>
                            <input 
                                style={{display: "none"}} 
                                type="file" id="file" 
                                accept=".png, .jpg, .jpeg" 
                                onChange={(e)=>setFile(e.target.files[0])}
                            />
                        </label>
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
                    <button className="shareButton" type="submit">Share Post</button>
                </form>
           </div>
        </div>
    )
}