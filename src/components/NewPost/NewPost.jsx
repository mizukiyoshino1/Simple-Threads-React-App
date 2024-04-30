import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { validateRequired, validateSecurity } from '../../common/Validation'
import './NewPost.css';
import Header from '../Header/Header';
import { useAuthContext } from '../../context/AuthContext';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function NewPost() {

    // URL
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    // ユーザ情報
    const { user } = useAuthContext();
    const userId = user.uid;
    const userName = user.displayName;

    // エラーメッセージ
    const [errors, setErrors] = useState({});

    // 入力情報
    const [content, setContent] = useState('');

    // 画像情報
    const [files, setFiles] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);

    // 画面遷移
    const navigation = useNavigate();

    // onChange
    const onChangeContent = (e) => {
        setContent(e.target.value);
    }

    /**
     * 画像取り下げ(削除処理)
     * 
     */
    const removeImage = (indexToRemove) => {
        // ファイルとURLから指定されたインデックスの要素を削除
        setFiles(files.filter((_, index) => index !== indexToRemove));
        setImageUrls(imageUrls.filter((_, index) => index !== indexToRemove));
    };

    /**
     * ファイル選択時の処理
     * 
     * 
     */ 
    const onFileChange = (e) => {
        if (files.length >= 6) {
            alert('You can only upload up to 6 images.');
            return;
        }
        
        const file = e.target.files[0]; // 1枚ずつ選択
        if (file) {
            setFiles([...files, file]);

            const reader = new FileReader();
            reader.onload = (event) => {
                setImageUrls([...imageUrls, event.target.result]);
            };
            reader.readAsDataURL(file);
        }
    };

    /**
     * 投稿処理
     * 
     */
    const onSubmit = async (e) => {
        e.preventDefault();
        
        const confirmPost = window.confirm("この内容で投稿してもよろしいですか？");

        if(confirmPost){
            // 入力チェック
            const validationErrors = {
                ...validateRequired(content, '投稿内容'),
                ...validateSecurity(content)
            };

            // エラーメッセージが存在するか確認
            if(Object.keys(validationErrors).length === 0) {
                try {
                    // 画像URLを配列で取得
                    const imageUrls = await Promise.all(files.map(async file => {
                        const timestamp = new Date().getTime();
                        const fileRef = ref(storage, `images/${timestamp}_${file.name}`);
                        await uploadBytes(fileRef, file);
                        return getDownloadURL(fileRef);
                    }));

                    await axios.post(`${BACKEND_URL}/api/add`,{
                        content: content,
                        userId: userId,
                        imageUrls: imageUrls
                    });
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
                // Top画面に画面遷移
                navigation('/');
            } else {
                setErrors(validationErrors);
            }
        }
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
                <div className="error-message">
                    {errors.requiredError && <p className="error-message">{errors.requiredError}</p>}
                    {errors.securityError && <p className="error-message">{errors.securityError}</p>}
                </div>
                <form onSubmit={onSubmit}>
                    <label>Content</label>
                    <textarea className="content-input" onChange={onChangeContent} value={content}></textarea>
                    <div className="file-input">
                        <div className="preview-container">
                            {imageUrls.map((url, index) => (
                                <div key={index} className="image-preview">
                                    <img src={url} alt={`Preview ${index}`} className="preview-image" />
                                    <button type="button" onClick={() => removeImage(index)} className="remove-image">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="action-area">
                        <input type="submit" value="Post" className="post-button" />
                        <div className="file-button-container">
                            {files.length < 6 && (
                                <>
                                    <label htmlFor="file-upload">
                                        <svg className="file-upload-svg" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                                            <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4 a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3 a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z"/>
                                        </svg>
                                    </label>
                                    <input id="file-upload" type="file" onChange={onFileChange} style={{display: 'none'}} />
                                </>
                            )}
                        </div>
                    </div>

                </form>
                <button onClick={backToTop} className="back-button">Back</button>
            </div>
        </>
    );
}

export default NewPost;
