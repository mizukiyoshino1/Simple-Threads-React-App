import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './NewPost.css';
import Header from '../Header/Header';
import { useAuthContext } from '../../context/AuthContext';

function NewPost() {

    // ユーザ情報
    const { user } = useAuthContext();
    const userId = user.uid;
    const userName = user.displayName;

    // 入力情報
    const [content, setContent] = useState('');

    // onChange
    const onChangeContent = (e) => {
        setContent(e.target.value);
    }

    // 画面遷移
    const navigation = useNavigate();

    /**
     * 投稿処理
     * 
     */
    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:8080/api/add',{
                content: content,
                userId: userId
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }

        // Top画面に画面遷移
        navigation('/');
    }

    /**
     * トップ画面へ戻る処理
     * 
     */
    const backToTop = () => {
        navigation('/');
    }

    return (
        <>
            <Header />
            <div className="new-post-container">
                <h2>New Post</h2>
                <form onSubmit={onSubmit}>
                    <label>content</label>
                    <textarea className="content-input" onChange={onChangeContent} value={content} size="20" maxLength="200"></textarea>
                    <input type="submit" value="Post" className="post-button" />
                </form>
                <button onClick={backToTop} className="back-button">Back</button>
            </div>
        </>
    );
}

export default NewPost;
