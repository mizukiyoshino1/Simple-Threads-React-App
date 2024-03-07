import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';

function SignUp() {

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
     * ユーザ新規登録処理
     * FirebaseAuthenticationに登録する処理
     * 
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password);
        navigation('/');
    };

    return(
        <div className="user-access-container">
            <div className="signup-form"> 
                <h2>SignUp</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group"> 
                        <label>メールアドレス</label>
                        <input
                            className="form-control" 
                            name="email"
                            type="email"
                            placeholder="email"
                            onChange={(event) => handleChangeEmail(event)}
                        />
                    </div>
                    <div className="form-group"> 
                        <label>パスワード</label>
                        <input
                            className="form-control" 
                            name="password"
                            type="password"
                            placeholder="password"
                            onChange={(event) => handleChangePassword(event)}
                        />
                    </div>
                    <div className="form-group"> 
                        <button className="btn-primary" type="submit">登録</button> 
                    </div>
                </form>
                <div className="login-link"> 
                    ログインは<Link to={'/login'}>こちら</Link>から
                </div>
            </div>
        </div>
    );
}

export default SignUp;