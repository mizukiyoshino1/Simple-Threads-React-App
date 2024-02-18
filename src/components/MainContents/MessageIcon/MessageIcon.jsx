import React from 'react';
import './MessageIcon.css';

const MessageIcon = ({ content }) => {
    return (
        <div className="message-icon">
            <div>ID : <span>{content.id}</span></div>
            <div className="text">投稿 : <span>{content.content}</span></div>
        </div>
    );
}

export default MessageIcon;
