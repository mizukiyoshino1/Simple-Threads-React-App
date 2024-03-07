import React from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth } from "firebase/auth";

const Header = () => {

    // 画面遷移
    const navigation = useNavigate();

    // ホーム画面(MainCOntents)へ遷移
    const goToHomeScreen = () => {
        navigation('/');
    }

    // いいね通知画面へ遷移
    const goToLikeNotificationScreen = () => {
        navigation('/likes');
    }

    // 新規投稿画面へ遷移
    const goToNewPostScreen = () => {
        navigation('/newpost');
    };

    // 検索画面へ遷移
    const goToSearchScreen = () => {
        navigation('/search')
    }

    // プロフィール画面へ遷移
    const goToProfileScreen = () => {
        navigation('/profile');
    }

    /**
     * ログアウト処理
     * 
     */
    const handleLogout = () => {
        const auth = getAuth()
        auth.signOut();
        navigation('/login');
    };

    return (
        <div className="header-container">
            <Link to="/" className="header-title-link">Threads App</Link>
            <div className="contents-button-area">
                <button className="home-button" type="button" onClick={goToHomeScreen}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z"/>
                    </svg>
                </button>
                <button className="like-notification-button" type="button" onClick={goToLikeNotificationScreen}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                    </svg>
                </button>
                <button className="new-button" type="button" onClick={goToNewPostScreen}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>
                <button className="search-button" type="button" onClick={goToSearchScreen}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                </button>
                <button className="profile-button" type="button" onClick={goToProfileScreen}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                    </svg>
                </button>
                <button className="logout-button" type="button" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}

export default Header;
