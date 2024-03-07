import React from 'react';
import './LikeNotification.css';
import Header from '../Header/Header';

const LikeNotification = () => {

    return(
        <>
            <Header/>
            <div className="like-notification">
                <h2>Like +1</h2>
                <h2>Like +2</h2>
                <h2>Like +3</h2>
            </div>
        </>
    )
}

export default LikeNotification;