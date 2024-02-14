import React from 'react';

const NewPost = () => {
    const handleSubmit = (event) => {
        // フォームの送信処理を記述する
        event.preventDefault();
        // 送信処理が完了した後の処理を記述する
    };

    return (
        <div>
            <div className="header-contents">
                <h2>New Post</h2>
            </div>
            <div className="main-contents">
                <form method="post" action="/add" onSubmit={handleSubmit}>
                    <div className="form-area">
                        <label>content</label>
                        <textarea className="tweet-box" name="content" rows="4" cols="50" maxLength="200"></textarea><br />
                        <input type="submit" value="post" />
                    </div>
                </form>
            </div>
            <div className="footer-contents">
                <form action="/">
                    <input type="submit" value="back" />
                </form>
            </div>
        </div>
    );
}

export default NewPost;
