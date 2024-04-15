import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from '../../../common/Validation'
import './Login.css';

const Login = () => {

    // 入力情報
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // エラーメッセージ
    const [errors, setErrors] = useState({});

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


        // 入力チェック
        const validationErrors = {
            ...validateEmail(email),
            ...validatePassword(password),
        };

        // エラーメッセージが存在するか確認
        if(Object.keys(validationErrors).length === 0) {
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                // ホーム画面へ遷移
                navigation('/');
            })
            .catch((error) => {
                const errorCode = error.code;

                // ユーザの存在チェック
                if (errorCode === 'auth/user-not-found') {
                    return setErrors({ emailError: 'ユーザが見つかりませんでした。' });
                } 
                // 無効なユーザ情報
                else if (errorCode === 'auth/invalid-credential') {
                    return setErrors({ invalidError: '無効な情報です。正しいメールアドレスとパスワードを入力してください。' });
                }
                // パスワード不一致
                else if (errorCode === 'auth/wrong-password') {
                    return setErrors({ passwordError: 'パスワードが間違っています。' });
                } 
                // その他のエラー
                else {
                    setErrors({ otherError: 'システムでエラーが発生しました。運営会社に問い合わせてください。' });
                }
            })
            
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div className="container">
            <div className="login-form">
                <h2>ログイン</h2>
                <div className="error-message">
                    {errors.emailError && <p className="error-message">{errors.emailError}</p>}
                    {errors.invalidError && <p className="error-message">{errors.invalidError}</p>}
                    {errors.passwordError && <p className="error-message">{errors.passwordError}</p>}
                    {errors.otherError && <p className="error-message">{errors.otherError}</p>}
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">メールアドレス</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="email"
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
                            placeholder="password"
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