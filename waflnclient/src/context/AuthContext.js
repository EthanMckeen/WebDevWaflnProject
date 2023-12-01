import { createContext, useReducer, useEffect } from "react";
import AuthReducer from "./AuthReducer";


var userDataFromLocalStorage = localStorage.getItem("user");

const INITIAL_STATE = {
    user: userDataFromLocalStorage ? JSON.parse(userDataFromLocalStorage) : null,
    isFetching: false,
    error: false,
};

export const AuthContext = createContext(INITIAL_STATE);



export const AuthContextProvider = ({ children }) =>{
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(state.user))
      },[state.user])

      

    return(
        <AuthContext.Provider 
        value={{
                user: state.user, 
                isFetching: state.isFetching, 
                error: state.error, 
                dispatch,
            }}
            >
                {children}
        </AuthContext.Provider>
    );
};

