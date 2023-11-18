import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";


import Swal from "sweetalert2";
import auth from "../config/Firebase.config";
import axios from "axios";


export const AuthContext = createContext(null)
const GoogleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)



    // google 
    const GoogleAuth = () => {
        setLoading(true);
        return signInWithPopup(auth, GoogleProvider)
    }
    // creat User
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    //login
    const LogInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }
    //Update user
    const UpdateUser = (name, photo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    // logOUT
    const logOutUser = () => {
        const loggedUser = user.email
        setLoading(true);
        signOut(auth)
            .then(() => {
                axios.post('https://hungry-explorer-server.vercel.app/api/v1/logout', loggedUser, { withCredentials: true })
                    .then(res => {
                        console.log(res.data)
                    })
                Swal.fire({
                    icon: 'success',
                    title: 'logged out successfully',
                    text: '',
                    footer: ''
                })
            })
            .catch(err => {

                Swal.fire({
                    icon: 'success',
                    title: `${err.massage}`,
                    text: '',
                    footer: ''
                })

            })
    }


    // Auth State change
    useEffect(() => {
        onAuthStateChanged(auth, (storedUser) => {

            setUser(storedUser)
            setLoading(false);
            // jwt
            if (storedUser) {
                const userEmail = storedUser?.email || user.email;
                const loggedUser = { email: userEmail }
                console.log(loggedUser)
                axios.post('https://hungry-explorer-server.vercel.app/api/v1/jwt', loggedUser, { withCredentials: true })
                    .then(res => {
                        console.log('token responce', res.data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }

        })
    }, [])



    //dark mode toggle


    const authInfo = {
        GoogleAuth,
        createUser,
        user,
        LogInUser,
        logOutUser,
        UpdateUser,
        loading,


    }



    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;