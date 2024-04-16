import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { validateRequired, validateEmail, validatePassword } from '../../../common/Validation';
import './SignUp.css';
import axios from 'axios';

function SignUp() {

    // URL
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    // 入力情報
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');

    // エラーメッセージ
    const [errors, setErrors] = useState({});

    // onChange
    const handleChangeEmail = (event) => {
        setEmail(event.currentTarget.value);
    };
    const handleChangePassword = (event) => {
        setPassword(event.currentTarget.value);
    };
    const handleChangeDisplayName = (event) => {
        setDisplayName(event.currentTarget.value);
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

        // 入力チェック
        const validationErrors = {
            ...validateRequired(displayName, 'ユーザ名'),
            ...validateEmail(email),
            ...validatePassword(password),
        };

        // エラーメッセージが存在するか確認
        if(Object.keys(validationErrors).length === 0) {
            const auth = getAuth();
            const user = await createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Firebaseにユーザーのプロフィール情報を登録
                    updateProfile(userCredential.user, {displayName: displayName});

                    // PostgreSQLにユーザIdとユーザ名を登録
                    axios.post(`${BACKEND_URL}/api/adduser`,{
                        userId: userCredential.user.uid,
                        userName: displayName
                    });

                    // ホーム画面へ遷移
                    navigation('/');
                })
                .catch((error) => {
                    const errorCode = error.code;

                    // メールアドレスの重複エラー
                    if (errorCode === 'auth/email-already-in-use') {
                        return setErrors({ emailError: 'このメールアドレスは既に使用されています' });
                    } 
                    // パスワードのセキュリティエラー
                    else if (errorCode === 'auth/weak-password') {
                        return setErrors({ passwordError: 'パスワードが弱すぎます' });
                    } 
                    // その他のエラー
                    else {
                        setErrors({ otherRrror: 'システムでエラーが発生しました。正しい情報を入力してください。'});
                    }
                });
        } else {
            setErrors(validationErrors);
        }
    };

    return(
        <div className="user-access-container">
            <div className="signup-form"> 
                <h2>SignUp</h2>
                <div className="error-message">
                    {errors.requiredError && <p className="error-message">{errors.requiredError}</p>}
                    {errors.emailError && <p className="error-message">{errors.emailError}</p>}
                    {errors.passwordError && <p className="error-message">{errors.passwordError}</p>}
                    {errors.otherRrror && <p className="error-message">{errors.otherRrror}</p>}
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group"> 
                        <label>ユーザー名</label>
                        <input
                            className="form-control" 
                            name="displayName"
                            type="text"
                            placeholder="name"
                            onChange={(event) => handleChangeDisplayName(event)}
                        />
                    </div>
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