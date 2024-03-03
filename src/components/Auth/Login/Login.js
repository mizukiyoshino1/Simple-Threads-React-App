import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';

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
    <div>
        <h1>ログイン</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label>メールアドレス</label>
                <input
                    name="email"
                    type="email"
                    placeholder="email"
                    onChange={(event) => handleChangeEmail(event)}
                />
            </div>
            <div>
                <label>パスワード</label>
                <input
                    name="password"
                    type="password"
                    placeholder="password"
                    onChange={(event) => handleChangePassword(event)}
                />
            </div>
            <div>
                <button>ログイン</button>
            </div>
            <div>
                ユーザ登録は<Link to={'/signup'}>こちら</Link>から
            </div>
        </form>
    </div>
    );
};

export default Login;