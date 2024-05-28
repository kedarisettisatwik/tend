import React, { useState } from 'react';
import {auth,db} from '../../firebase';
import { setDoc, doc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

function SignUp({changeForm}){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [userName,setUserName] = useState("");
    const [repassword,setrePassword] = useState("");
    const [errMessage,setErrMessage] = useState("");

    const createAccount = async (e) => {
        e.preventDefault();
        if (repassword === password && password.length >= 6){
            try{
                await createUserWithEmailAndPassword(auth,email,password);
                const user = auth.currentUser;
                console.log(user);
                if (user) {
                    await setDoc(doc(db,"Users",user.uid),{
                        emai : user.email,
                        userName : userName
                    });
                }
            } catch (err){
                console.log(err.message);
                setErrMessage(err.message);
            }
        }
        else if (repassword !== password){
            setErrMessage("Password is not matching with rePassword !");
        }
        else if (password.length < 6){
            setErrMessage("Password should have atleast 6 characters !");
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
    

    return(
        <section className='signIn flex'>
            <div className='intro flex'>
                <p>@ Demo</p>
                <div>
                    <span>We are excited to see you here</span>
                    <h1>Unlock the Experience</h1>
                </div>
            </div>
            <div className='form2 flex'>
                <h1>Register Account</h1>
                <form className='flex' onSubmit={createAccount}>
                    <div className='box'>
                        <span>What you are called ? </span>
                        <input type='text'value={userName} onChange={(e) => {setUserName(e.target.value)}} placeholder='UserName' required/>
                    </div>
                    <div className='box'>
                        <span>Email Address </span>
                        <input type='email'value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder='example@gmail.com' required/>
                    </div>
                    <div className='box'>
                        <span>Password of atleast 6 characters </span>
                        <input type='password'value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder='******' required/>
                    </div>
                    <div className='box'>
                        <span>Re enter the Password </span>
                        <input type='text'value={repassword} onChange={(e) => {setrePassword(e.target.value)}} placeholder='confirm password' required/>
                    </div>
                    <i onClick={changeForm}>Already a Member ?</i>
                    <input type='submit' value="Happy to Join ->" />
                </form>
                <p onClick={googleSign}>Continue With Google Account</p>
                <div className='error'>
                    { errMessage.length > 0 ? <div>{errMessage}</div> : <></> }
                </div>
            </div>
        </section>
    );
}

export default SignUp;