import React, { useState } from 'react';
import axios from 'axios';
import './Search.css';
import Header from '../Header/Header';
import MessageIcon from '../MainContents/MessageIcon/MessageIcon';
import { useAuthContext } from '../../context/AuthContext';
import { validateSecurity } from '../../common/Validation'

const Search = () => {
    // URL
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    // 検索用語
    const [searchTerm, setSearchTerm] = useState();

    // 投稿情報
    const [contents, setContents] = useState([]);

    // コメント情報
    const [comments, setComments] = useState([]);

    // エラーメッセージ
    const [errors, setErrors] = useState({});

    // ユーザ情報
    const { user } = useAuthContext();
    const userId = user.uid;

    /**
     * 検索処理
     * 
     */
    const handleSearch = async (event) => {
        event.preventDefault();

        // 入力チェック
        const validationErrors = {
            ...validateSecurity(searchTerm)
        };

        // エラーメッセージが存在するか確認
        if(Object.keys(validationErrors).length === 0) {
            // エラーメッセージリセット
            setErrors({});
            // 検索実行
            try {
                // 投稿情報
                const respReports = await axios.post(`${BACKEND_URL}/api/search`, {
                    userId: userId,
                    searchTerm: searchTerm
                });
                setContents(respReports.data);

                // コメント取得
                const respComments = await axios.get(`${BACKEND_URL}/api/getcomments`);
                setComments(respComments.data);
            } catch (error) {
                console.error('Error deleting post:', error)
            }
        } else {
            setErrors(validationErrors);
        }
    }

    return(
        <>
            <Header/>
            <div className="search-container">
                <div className="error-message">
                    {errors.securityError && <p className="error-message">{errors.securityError}</p>}
                </div>
                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <button type="submit" className="search-area-button">
                        <i className="fa fa-search">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        </i>
                    </button>
                </form>
            </div>
            {contents.map(content => (
                <MessageIcon 
                    key={content.id} 
                    content={content} 
                    comments={comments.filter(comment => comment.reportId === content.id)}
                />
            ))}
        </>
    )
}

export default Search;