//----------------------------------------------------------- DEPENDENCIES //
// 0. Firebase
import { firebaseApp } from "../firebase";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, updateEmail, updatePassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

// 4. ReactJS
import { createContext, useContext, useEffect, useState } from "react"

// Creating a context
const AuthContext = createContext();

//----------------------------------------------------------- AUTH PROVIDER //
export function AuthProvider({ children }) {

    // Dependency Instances
    const auth = getAuth(firebaseApp);

    // State Variables
    const [currentUser, setCurrentUser] = useState()
    const [userLoading, setUserLoading] = useState(true);

    // Monitor Authentication State
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setUserLoading(false);
        })

        //Cleanup
        return unsub;

    }, [])

    // Sign Up
    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // Sign In
    function signin(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    // Sign Out
    function signout() {
        return signOut(auth)
    }

    //Reset Password
    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email)
    }

    //Update Email
    function updateUserEmail(email) {
        return updateEmail(auth.currentUser, email)
    }

    //Update Password
    function updateUserPassword(password) {
        return updatePassword(auth.currentUser, password)
    }

    //Update Profile
    function updateUserProfile(name) {
        return updateProfile(auth.currentUser, {
            displayName: name
        })
    }

    // Value for the context
    const value = {
        currentUser,
        signup,
        signin,
        signout,
        resetPassword,
        updateUserEmail,
        updateUserPassword,
        updateUserProfile
    }


    return (
        <AuthContext.Provider value={value}>
            {!userLoading && children}
        </AuthContext.Provider>
    )
}

//----------------------------------------------------------- CUSTOM HOOK //
export function useAuth() {
    return useContext(AuthContext);
}

