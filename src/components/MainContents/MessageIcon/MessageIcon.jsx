import React from 'react';
import './MessageIcon.css';
import axios from 'axios';
import { useAuthContext } from '../../../context/AuthContext';
import defaultImage from '../../../assets/img/default-profile-Img.png';

const MessageIcon = ({ content }) => {
    // ユーザ情報
    const { user } = useAuthContext();
    const userId = user.uid;

    /**
     * 投稿の削除機能
     * 
     */
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/delete/${content.id}`);
            window.location.reload();
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    }

    return (
        <div className="message-icon">
            <div className="userInf">
                {content.profileImageUrl === '' ?
                    <img
                        src={defaultImage}
                        alt="Default Profile"
                        className="users-profile-Img"
                    /> :
                    <img
                        src={content.profileImageUrl}
                        alt="Profile"
                        className="users-profile-Img"
                    />
                    }
                <div>
                    <div className="text"><span>{content.userName}</span></div>
                    <div className="content-text"><span>{content.content}</span></div>
                </div>
            </div>
            {userId === content.userId &&
                <button type="button" onClick={handleDelete}>Delete</button>
            }
        </div>
    );
}

export default MessageIcon;
