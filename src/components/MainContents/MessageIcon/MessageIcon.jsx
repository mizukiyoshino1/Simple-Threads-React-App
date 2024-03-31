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
     * いいね処理
     * 
     */
    const handleLike = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/like', {
                userId: userId,
                reportId: content.id,
                likeFlag: 1
            })
            console.log(response.data);
        } catch (error) {
            console.error('Error deleting post:', error)
        }
    }

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
            <div className="border-area">
                <button type="button" onClick={handleLike} className="like-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                    </svg>
                </button>
                {content.likeCount !== 0 && <p className="like-count">{content.likeCount}</p>}
                {userId === content.userId && (
                    <button type="button" onClick={handleDelete} className="delete-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
}

export default MessageIcon;
