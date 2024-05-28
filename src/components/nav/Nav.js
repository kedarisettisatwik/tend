import {React,useState} from 'react';
import './nav.css';

function Nav(){

    const [page,setPage] = useState(0);

    return(

        <section className='nav board'>
            
            <div className='flex header'>
                <ul>
                    <li className={page === 0 ? "active" : ""} onClick={() => setPage(0)}>Home</li>
                    <li className={page === 1 ? "active" : ""} onClick={() => setPage(1)}>ToDo</li>
                    <li className={page === 4 ? "active" : ""} onClick={() => setPage(2)}>Events</li>
                    <li className={page === 2 ? "active" : ""} onClick={() => setPage(3)}>Notes</li>
                    <li className={page === 3 ? "active" : ""} onClick={() => setPage(4)}>Diary</li>
                    <li className={page === 5 ? "active" : ""} onClick={() => setPage(5)}>About Us</li>
                </ul>
            </div>
            

            
        </section>
    );
}

export default Nav;