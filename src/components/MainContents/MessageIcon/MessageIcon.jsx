import React, { useState, useEffect } from 'react';
import './MessageIcon.css';
import axios from 'axios';
import { useAuthContext } from '../../../context/AuthContext';
import defaultImage from '../../../assets/img/default-profile-Img.png';
import Modal from 'react-modal';

const MessageIcon = ({ content, comments }) => {
    // ユーザ情報
    const { user } = useAuthContext();
    const userId = user.uid;

    // likeCount, likeFlgをstateとして持つ
    const [likeCount, setLikeCount] = useState(content.likeCount);

    // コメント表示
    const [commentShowFlg, setCommentShowFlg] = useState(false);

    // モーダルウィンドウ情報
    const [showModal, setShowModal] = useState(false);
    const [commentText, setCommentText] = useState('');

    // モーダルウィンドウを開く
    const handleOpenModal = () => {
        setShowModal(true);
    };

    // モーダルウィンドウを閉じる
    const handleCloseModal = () => {
        setShowModal(false);
    }

    // コメントの開閉機能
    const handleShowComment = () => {
        setCommentShowFlg(!commentShowFlg); 
    }

    /**
     * いいね処理
     * 
     */
    const handleLike = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/like', {
                userId: userId,
                reportId: content.id
            })
            console.log(response.data.likesCount);
            setLikeCount(response.data.likesCount);
        } catch (error) {
            console.error('Error deleting post:', error)
        }
    }

    /**
     * コメント送信
     * 
     */
    const handleSendComment = async () => {
        try {
            // コメント送信のAPIを呼び出す
            await axios.post('http://localhost:8080/api/comment', {
                userId: userId,
                reportId: content.id,
                commentText: commentText
            });

            // モーダルを閉じる
            handleCloseModal();
        } catch (error) {
            console.error('Error sending comment:', error)
        }
    }

    /**
     * 投稿の削除機能
     * 
     */
    const handleDelete = async () => {
        const confirmDelete = window.confirm("本当にこの投稿を削除しますか？");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/api/delete/${content.id}`);
                window.location.reload();
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        }
    }

    return (
        <>
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
                            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                        </svg>
                    </button>
                    {likeCount !== 0 && <p className="like-count">{likeCount}</p>}
                    <button type="button" onClick={handleOpenModal} className="comment-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5a1 1 0 0 0-.8.4l-1.9 2.533a1 1 0 0 1-1.6 0L5.3 12.4a1 1 0 0 0-.8-.4H2a2 2 0 0 1-2-2V2zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z"/>
                        </svg>
                    </button>
                    {userId === content.userId && (
                        <button type="button" onClick={handleDelete} className="delete-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                            </svg>
                        </button>
                    )}
                </div>
                {comments.length !== 0 && 
                    <button type="button" onClick={handleShowComment} className="reply-button">
                        reply...
                    </button>
                }
                
            </div>

            <Modal
                isOpen={showModal}
                contentLabel="コメント送信"
                onRequestClose={handleCloseModal}
                className="modal"
                overlayClassName="overlay"
            >
                <div>
                    <h2>Comment</h2>
                    <textarea className="comment-area" value={commentText} onChange={(e) => setCommentText(e.target.value)} />
                    <button onClick={handleSendComment} className="send-button">
                        SEND
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" className="send-icon" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                        </svg>
                    </button>
                    <button onClick={handleCloseModal} className="close-button">
                        CLOSE
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="close-icon" viewBox="0 0 16 16">
                            <path d="M12 1a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2a1 1 0 0 1 1-1h8zm-2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                        </svg>
                    </button>
                </div>
            </Modal>

            {commentShowFlg === true && comments.map(comment => (
                <div className="comment">
                    <div className="userInf">
                        {comment.profileImageUrl === '' ?
                            <img
                                src={defaultImage}
                                alt="Default Profile"
                                className="users-profile-Img"
                            /> :
                            <img
                                src={comment.profileImageUrl}
                                alt="Profile"
                                className="users-profile-Img"
                            />
                        }
                        <div className="comment-details">
                            <div className="comment-user-name">{comment.userName}</div>
                            <div className="comment-text">{comment.commentText}</div>
                        </div>
                    </div>
                </div>
            ))}

        </>

    );
}

export default MessageIcon;
