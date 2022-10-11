
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import "firebase/auth";
import { useState } from 'react';
import {
    getAuth,
    signInWithPopup,
    signOut,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { useContext } from "react";
import { UserContext } from './../../App';
import { useNavigate } from "react-router-dom";


const firebaseConfig = {
    apiKey: "AIzaSyA0X75doEes0LlXk3chYa068Xh_SgKMDtA",
    authDomain: "ema-john-simple-ad467.firebaseapp.com",
    projectId: "ema-john-simple-ad467",
    storageBucket: "ema-john-simple-ad467.appspot.com",
    messagingSenderId: "1058099397782",
    appId: "1:1058099397782:web:601c20301faa9d1ec82eb7",
    measurementId: "G-4QVD5XLZ9N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function Login() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    const [user, setUser] = useState({
        isSignedIn: false,
        name: "",
        email: "",
        password: '',
        photo: "",
        error: '',
        success: false
    });

    const [newUser, setNewUser] = useState(false);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const navigate = useNavigate();


    const handleSignin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;
                const { displayName, photoURL, email } = user;
                // ...
                const singnedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL,
                };
                setUser(singnedInUser);


            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential =
                    GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    };

    const handleSingOut = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                const user = {
                    isSignedIn: false,
                    name: "",
                    email: "",
                    photo: "",
                };
                setUser(user);
                // Sign-out successful.
            })
            .catch((error) => {
                // An error happened.
            });
    };


    const handleBlur = (e) => {
        let isFieldValid = true;

        if (e.target.name === 'email') {
            isFieldValid = /^\S+@\S+\.\S+$/.test(e.target.value);
            //  console.log(isFieldValid);
        }
        if (e.target.name === 'password') {
            isFieldValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/.test(e.target.value);
            //   console.log(isFieldValid);
        }


        if (isFieldValid) {
            const newUserInfo = { ...user }
            newUserInfo[e.target.name] = e.target.value;
            //  console.log(newUserInfo);
            setUser(newUserInfo);
        }
    }

    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {

            const auth = getAuth();
            createUserWithEmailAndPassword(auth, user.email, user.password)
                .then((res) => {
                    // Signed in 

                    const newUserInfo = { ...user }
                    newUserInfo.error = "";
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    updateUserName(user.name)
                    console.log(user.name);

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage);
                    const newUser = { ...user }
                    newUser.error = errorMessage;
                    setUser(newUser);
                });


        }

        if (!newUser && user.email && user.password) {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, user.email, user.password)
                .then((res) => {
                    // Signed in 
                    const user = res.user;

                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    // ...
                    console.log(user);
                    navigate("/shipment");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        }
        e.preventDefault();
    }


    const handleNewUser = (e) => {
        setNewUser(!newUser);
    }

    const updateUserName = (name) => {
        //  console.log(name);
        const auth = getAuth();
        updateProfile(auth.currentUser, {
            displayName: name, photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(() => {
            // Profile updated!
            // ...

            console.log('profile update successful');
        }).catch((error) => {
            // An error occurred
            // ...
            console.log(error.message);
        });
    }


    return (
        <div className="App">
            {user.isSignedIn && (
                <div>
                    <img src={user.photo} alt="No image found" />
                    <p>Welcome {user.name}</p>
                    <p>Email : {user.email}</p>

                </div>
            )}
            {user.isSignedIn ? (
                <button onClick={handleSingOut}>Sign Out</button>
            ) : (
                <button onClick={handleSignin}>Sign in</button>
            )}
            <br />

            <h2>Our Authentication</h2>
            <p>name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Password: {user.password} </p>

            <form onSubmit={handleSubmit}>

                <input onChange={handleNewUser} type="checkbox" name="newUser" value="New User" />
                <label htmlFor="newUser">New User</label><br />

                {
                    newUser && <input type="text" onBlur={handleBlur} name="name" id="" placeholder="name" />
                }
                <br />
                <input onBlur={handleBlur} type="text" name="email" id="" placeholder="email" required /><br />

                <input onBlur={handleBlur} type="password" name="password" value="sharif123" required /><br />

                {
                    newUser ? <input type="submit" value="Sign Up" /> : <input type="submit" value="Sign In" />
                }


            </form>
            <p>{user.error}</p>
            {
                user.success && <p>Account created successfully </p>
            }


        </div>
    );
}

export default Login;
