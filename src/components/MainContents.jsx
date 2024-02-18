import React, { useState, useEffect } from 'react';
import axios from 'axios';

import MessageIcon from './MessageIcon';

function MainContents() {
    const [contents, setContents] = useState([]);

    /**
     * 初期化処理
     * 
     */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/contents');
                setContents(response.data); // データを設定する
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // 関数を呼び出す
    }, []); // 空の配列を依存リストに渡して初期化時にのみ実行するようにする

    return (
        <div className="main-contents">
            <a href="/new">
                <button className="new-button" type="button">New Post</button>
            </a>
            {contents.map(content => (
                <MessageIcon key={content.id} content={content} />
            ))}
        </div>
    );
}

export default MainContents;
