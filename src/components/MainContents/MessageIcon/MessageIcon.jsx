import React from 'react';
import './MessageIcon.css';
import axios from 'axios';
import { useAuthContext } from '../../../context/AuthContext';

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
            <div className="text"><span>{content.userName}</span></div>
            <div className="text">投稿 : <span>{content.content}</span></div>
            <div className="text">ユーザ: <span>{content.userId}</span></div>
            
            {userId === content.userId &&
                <button type="button" onClick={handleDelete}>Delete</button>
            }
        </div>
    );
}

export default MessageIcon;
