import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './NewPost.css';

function NewPost() {

    // 入力情報
    const [content, setContent] = useState('');

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
                content: content
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

    // onChange
    const onChangeContent = (e) => {
        setContent(e.target.value);
    }

    return (
        <div className="new-post-container">
            <h2>New Post</h2>
            <form onSubmit={onSubmit}>
                <label>content</label>
                <textarea className="content-input" onChange={onChangeContent} value={content} size="20" maxlength="200"></textarea>
                <input type="submit" value="Post" className="post-button" />
            </form>
            <button onClick={backToTop} className="back-button">Back</button>
        </div>
    );
}

export default NewPost;
