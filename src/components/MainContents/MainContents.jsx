import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MainContents.css';
import Header from '../Header/Header';
import MessageIcon from './MessageIcon/MessageIcon';
import { useAuthContext } from '../../context/AuthContext';

function MainContents() {
    // 投稿情報
    const [contents, setContents] = useState([]);

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
                const response = await axios.post('http://localhost:8080/api/contents',{userId:userId});
                setContents(response.data);
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
                    <MessageIcon key={content.id} content={content} />
                ))}
            </div>
        </>
    );
}

export default MainContents;
