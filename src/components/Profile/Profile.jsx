import React, { useState, useEffect } from 'react';
import './Profile.css';
import axios from 'axios';
import Header from '../Header/Header';
import MessageIcon from '../MainContents/MessageIcon/MessageIcon';
import { useAuthContext } from '../../context/AuthContext';

import defaultImage from '../../assets/img/default-profile-Img.png';

const Profile = () => {
    // 投稿情報
    const [contents, setContents] = useState([]);

    // ユーザ情報
    const { user } = useAuthContext();
    const displayName = user.displayName;
    const email = user.email;
    const userId = user.uid;
    
    // ユーザのプロフィール画像
    const [userImg, setUserImg] = useState(defaultImage);

    /**
     * 初期化処理(ユーザに紐づく情報を取得)
     * 
     */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:8080/api/getmyreports',{
                    userId: userId
                });
                setContents(response.data); // データを設定する
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // 関数を呼び出す
    }, []); // 空の配列を依存リストに渡して初期化時にのみ実行するようにする

    return(
        <>
            <Header/>
            <div className="profile-container">
                <div className="profile">
                    <div className="user-detail">
                        <img
                            src={userImg}
                            alt="Default Profile"
                            className="profileImage"
                        />
                        <div>
                            <h2>{displayName}</h2>
                            <h4>{email}</h4>
                        </div>
                    </div>
                    <p>
                        テストテストテストテストテストテストテストテスト
                        テストテストテストテストテストテストテストテスト
                        テストテストテストテストテストテストテストテスト
                        テストテストテストテストテストテストテストテスト
                    </p>
                    <button className="editProfileButton">
                        プロフィールを編集
                    </button>
                    
                </div>
                {contents.map(content => (
                    <MessageIcon key={content.id} content={content} />
                ))}
            </div>
        </>
    )
}

export default Profile;