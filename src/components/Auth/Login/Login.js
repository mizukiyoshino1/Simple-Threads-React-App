import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {

    // 入力情報
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // onChange
    const handleChangeEmail = (event) => {
        setEmail(event.currentTarget.value);
    };
    const handleChangePassword = (event) => {
        setPassword(event.currentTarget.value);
    };

    // 画面遷移
    const navigation = useNavigate();

    /**
     * ログイン処理
     * FirebaseAuthenticationに対してログインの実行をする
     * 
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password);
        navigation('/');
    };

    return (
        <div className="container">
            <div className="login-form">
                <h2>ログイン</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">メールアドレス</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleChangeEmail}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">パスワード</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handleChangePassword}
                            className="form-control"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        ログイン
                    </button>
                </form>
                <div className="signup-link">
                    アカウントをお持ちでないですか？ <Link to="/signup">こちらからサインアップ</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;