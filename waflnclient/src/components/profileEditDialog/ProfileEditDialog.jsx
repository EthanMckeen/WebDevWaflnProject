import React, { useContext, useState, useEffect } from "react";
import { AuthContext} from "../../context/AuthContext";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import EditIcon from '@mui/icons-material/Edit';
import "./profileEditDialog.css";
import axios from "axios";
import { updateUserInfo } from "../../apiCalls";



const ProfileEditDialog = () => { 
  const {user, dispatch} = useContext(AuthContext);
  const [open,setOpen] = useState(false);
  const [pfp,setPfp] = useState(false);
  const [coverFile,setCoverFile] = useState(false);
  const [updatedBio, setUpdatedBio] = useState(user.desc);
  const [updatedPronouns, setUpdatedPronouns] = useState(user.pronouns);
  const [updatedBirthday, setUpdatedBirthday] = useState(user.birthday);
  const [updatedCity, setUpdatedCity] = useState(user.city);
 

  useEffect(() => {
    if (open) {
      setUpdatedBio(user.bio);
      setUpdatedPronouns(user.pronouns);
      setUpdatedBirthday(user.birthday);
      setUpdatedCity(user.city);
    }
  },[]);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveChanges = async () => {
    let pfpName;
    let coverFileName;
    if(pfp){
      const data = new FormData();
      pfpName = Date.now() + pfp.name;
      data.append("name", pfpName);
      data.append("file",pfp);
      try{
        await axios.post("/upload", data,);
      }catch(err){
        console.log(err);
      }
    }
    if(coverFile){
      const data = new FormData();
      coverFileName = Date.now() + coverFile.name;
      data.append("name", coverFileName);
      data.append("file", coverFile);
      try{
        await axios.post("/upload", data);
      }catch(err){
        console.log(err);
      }
    }

    try {
      const updatedUserData = {

        desc: updatedBio,
        pronouns: updatedPronouns,
        birthday: updatedBirthday,
        city: updatedCity,
        profilePicture: pfpName? pfpName: "",
        coverPicture: coverFileName? coverFileName: "",
      };
      await updateUserInfo( user._id, updatedUserData, dispatch);
      setOpen(false);
      await window.location.reload();
    }catch(err){
      console.log(err);
    }

   
  };

  const handleChange = (event) => {
    setUpdatedBio(event.target.value);
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const handlePfpChange = (event) => {
    setPfp(event.target.files[0]);
  };

  const handleCoverPictureChange = (event) => {
    setCoverFile(event.target.files[0]);
  };

  return (
    <div>
      <button className="editButton" onClick={handleOpen}>
        Edit Profile&nbsp;<EditIcon />
      </button>
      <Dialog open={open} onClose={handleClose}>
        <div className="dialogTitle">Edit Profile</div>
        <hr className="dialogHr" />
        <DialogContent>
          <form className='editProfileForm'>
            <div className="editProfileInputItem">
            </div>
            <div className="editProfileInputItem">
              <label className="editProfileLabel" >Bio:</label>
              <textarea 
                className="editProfileInput" 
                style={{ resize: 'none' }}
                rows="1" 
                maxLength="50"
                value={updatedBio}
                onChange={handleChange}
              />
            </div>
            <div className="editProfileInputItem">
              <label className="editProfileLabel">Pronouns: </label>
              <select 
                className="editProfileInput" 
                defaultValue={updatedPronouns}
                onChange={(e) => setUpdatedPronouns(e.target.value)}
              >
                <option value="0">-</option>
                <option value="1">She/her</option>
                <option value="2">She/they</option>
                <option value="3">He/they</option>
                <option value="4">He/him</option>
                <option value="5">They/them</option>
                <option value="6">None</option>
              </select>
            </div>
            <div className="editProfileInputItem">
              <label className="editProfileLabel">Birthday: </label>
              <input className="editProfileInput" type="text" maxLength={20} defaultValue={updatedBirthday} onChange={(e) => setUpdatedBirthday(e.target.value)} />
            </div>
            <div className="editProfileInputItem">
              <label className="editProfileLabel">City: </label>
              <input className="editProfileInput" type="text" maxLength={30} defaultValue={updatedCity} onChange={(e) => setUpdatedCity(e.target.value)} />
            </div>
            <div className="editProfileInputItem">
              <label className="editProfileLabel">Profile Picture:</label>
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={handlePfpChange}
              />
            
            </div>
            <div className="editProfileInputItem">
              <label className="editProfileLabel">Cover Picture:</label>
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={handleCoverPictureChange}
              />
            </div>
          </form>
        </DialogContent>
        <span className='editProfileActions'>
          <button className="editProfileCancel" onClick={handleClose}>Cancel</button>
          <button className="editProfileSave"onClick={handleSaveChanges}>
            Save
          </button>
        </span>
      </Dialog>
    </div>
  );
};

export default ProfileEditDialog;