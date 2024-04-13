import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LikeNotification.css';
import Header from '../Header/Header';
import { useAuthContext } from '../../context/AuthContext';
import defaultImage from '../../assets/img/default-profile-Img.png';

const LikeNotification = () => {

    // ユーザ情報
    const { user } = useAuthContext();
    const userId = user.uid;

    // 通知情報
    const [notifications, setNotifications] = useState([]);

    /**
     * 初期化処理
     * 
     */
    useEffect(() => {
        const fetchData = async () => {
            try {
                // レポート取得
                const respReports = await axios.post('http://localhost:8080/api/notifications',{userId:userId});
                setNotifications(respReports.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return(
        <>
            <Header/>
            <div className="like-notification">
                {notifications.map(notification => (
                    <div key={notification.reportId} className="notification-item">
                        {notification.profileImageUrl === '' ?
                            <img
                                src={defaultImage}
                                alt="Default Profile"
                                className="users-profile-Img"
                            /> :
                            <img
                                src={notification.profileImageUrl}
                                alt="Profile"
                                className="users-profile-Img"
                            />
                        }
                        <div>
                            <h3>{notification.userName} liked your report</h3>
                            <p>
                                {notification.content.length > 20 ?
                                    notification.content.slice(0, 20) + '...' :
                                    notification.content}
                            </p>

                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default LikeNotification;