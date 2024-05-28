import React, { useEffect, useState } from 'react';
import {auth} from '../../firebase';

// pages
import SignIn from '../signIn/SignIn';
import SignUp from '../signIn/SignUp';
import Nav from '../nav/Nav';

// styles
import './main.css';

function Main(){
    const [presentUser, setPresentUser] = useState(null);
    const [signInPage,setSignInPage] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setPresentUser(user);
        })
    })

    return(
        <section className='main'>
            { ( presentUser ? <Nav/> 
                : (signInPage ? <SignIn changeForm={() => {setSignInPage(false)}}/> 
                        : <SignUp changeForm={() => {setSignInPage(true)}}/>
                    ) 
                )
            }
        </section>
    );
}

export default Main;