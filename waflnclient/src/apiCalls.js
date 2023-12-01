import axios from "axios"

export const loginCall = async (userCreds, dispatch) => {
    dispatch({type: "LOGIN_START"});
    try{
        const res = await axios.post("auth/login", userCreds);
        dispatch({type: "LOGIN_SUCCESS", payload: res.data });
    }catch(err){
        dispatch({type: "LOGIN_FAILURE", payload: err });
    }
};

export const logoutCall = async (dispatch) => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    
};

export const updateUserInfo = async (userId, newUserInfo, dispatch) => {
    try {
        await axios.put(`/users/${userId}`, newUserInfo);
        const res = await axios.get(`/users/?userId=${userId}`);     
        console.log(res);
        dispatch({type: "USER_UPDATE", payload: res.data});
    } catch (err) {
      console.log(err);
    }
};

export const searchBarSearch = async (searchTerm) => {
    try {
        const response = await axios.get(`/users?username=${searchTerm}`);
        const user = response.data;
        if (user) {
            return 'Success';
          } 
        } catch (err) {
          throw new Error('User not found');
        }
};