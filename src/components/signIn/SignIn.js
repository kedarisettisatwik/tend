import React, { useState } from 'react';
import {auth, db} from "../../firebase";
import { setDoc, doc } from 'firebase/firestore';
import './signIn.css';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail } from 'firebase/auth';

function SignIn({changeForm}){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [errMessage,setErrMessage] = useState("");

    const checkAccount = async (e) => {
        e.preventDefault();
        try{
            await signInWithEmailAndPassword(auth,email,password);
            const user = auth.currentUser;
            console.log(user);
        } catch (err){
            console.log(err.message);
            setErrMessage("Invalid details !");
        }
    }

    const googleSign = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth,provider)
        .then((result) => {
            const user = result.user;
            if (user){
                setDoc(doc(db,"Users",user.uid),{
                    emai : user.email,
                    userName : user.displayName
                });
            }
            console.log(user);
        }).catch((error) => {
            console.log(error.message);
            setErrMessage(error.message);
        })
    }

    const resetPassword = () => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        const isValidEmail = emailRegex.test(email);
        if (email.length > 0 && isValidEmail){
            sendPasswordResetEmail(auth,email)
            .then(() => {
                console.log("mail sent");
                setErrMessage("A link to reset password has been sent to the above email.");
            }).catch((err) => {
                console.log(err.message);
                setErrMessage(err.message);
            })
        }
        else{
            setErrMessage("Enter a valid email !");
        }
    }
    
    return(
        <section className='signIn flex'>
            <div className='intro flex'>
                <p>@ Demo</p>
                <div>
                    <span>Nice to see you again</span>
                    <h1>WELCOME BACK</h1>
                </div>
            </div>
            <div className='form1 flex'>
                <h1>Login Account</h1>
                <form className='flex' onSubmit={checkAccount}>
                    <div className='box'>
                        <span>Email Address </span>
                        <input type='email'value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder='example@gmail.com' required/>
                    </div>
                    <div className='box'>
                        <span>Password</span>
                        <input type='password'value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder='******' required/>
                    </div>
                    <i onClick={changeForm}>Don't have Account ?</i>
                    <i onClick={resetPassword}>Forgot Password</i>
                    <input type='submit' value="Get Me In ->" />
                </form>
                <p onClick={googleSign}>Continue With Google Account</p>
                <div className='error'>
                    { errMessage.length > 0 ? <div>{errMessage}</div> : <></> }
                </div>
            </div>
        </section>
    );
}

export default SignIn;