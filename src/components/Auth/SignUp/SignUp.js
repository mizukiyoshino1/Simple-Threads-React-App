import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';

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
            <h2>SignUp</h2>
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
                    <button>登録</button>
                </div>
            </form>
        </div>
    );
}

export default SignUp;