import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MainContents.css';
import Header from '../Header/Header';
import MessageIcon from './MessageIcon/MessageIcon';
import { useAuthContext } from '../../context/AuthContext';

function MainContents() {
    // URL
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    // 投稿情報
    const [contents, setContents] = useState([]);

    // コメント情報
    const [comments, setComments] = useState([]);

    // ユーザ情報
    const { user } = useAuthContext();
    const userId = user.uid;

    /**
     * 初期化処理
     * 
     */
    useEffect(() => {
        const fetchData = async () => {
            try {
                // レポート取得
                const respReports = await axios.post(`${BACKEND_URL}/api/contents`,{userId:userId});
                setContents(respReports.data);

                // コメント取得
                const respComments = await axios.get(`${BACKEND_URL}/api/getcomments`);
                setComments(respComments.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Header />
            <div className="main-contents">
                {contents.map(content => (
                    <MessageIcon 
                        key={content.id} 
                        content={content} 
                        comments={comments.filter(comment => comment.reportId === content.id)}
                    />
                ))}
            </div>
        </>
    );
}

export default MainContents;
