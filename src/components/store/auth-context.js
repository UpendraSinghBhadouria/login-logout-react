import { createContext, useEffect, useState } from "react";
import Users from "../users/Users";

const AuthContext = createContext();

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [users,] = useState(Users);

    useEffect(() => {
        const userLoggedInInformation = localStorage.getItem('isLoggedIn');

        if (userLoggedInInformation === '1') {
            setIsLoggedIn(true);
        }
    }, [])

    const loginHandler = (email, password) => {
        const usersEmail = users.map((user) => {
            return user.email;
        })

        const usersPassword = users.map((user) => {
            return user.password;
        })

        if (usersEmail.includes(email) && usersPassword.includes(password)) {
            localStorage.setItem('isLoggedIn', '1');
            setIsLoggedIn(true);
        } else {
            alert("Invalid User!");
        }
    }

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    }
    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                onLogout: logoutHandler,
                onLogin: loginHandler
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;