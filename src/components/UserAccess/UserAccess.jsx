import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { useLocation ,useNavigate } from 'react-router-dom';
import './UserAccess.css';
import { auth } from '../../firebase';


function UserAccess({ onLogin }) {

    // // 入力情報
    // const [accountId, setAccountId] = useState('');
    // const [password, setPassword] = useState('');

    // //onChange
    // const onChangeAccountId = (e) => {
    //     setAccountId(e.target.value);
    //     console.log(accountId);
    // }
    // const onChangePassword = (e) => {
    //     setPassword(e.target.value);
    //     console.log(password);
    // }

    // // 画面遷移
    // const navigation = useNavigate();

    // // URLの取得 ('/login' or '/signup')
    // const currentUrl = useLocation().pathname;

    // // apiのURL
    // const api = 'http://localhost:8080/api';

    // /**
    //  * ユーザの新規登録・ログイン共通処理
    //  * 
    //  */
    // const handleUserAuthClick = async (e) => {
    //     //onSubmitのデフォルトの動作(ページリロード)をキャンセルする
    //     e.preventDefault();

    //     try{
    //         // 新規登録・ログイン共通処理
    //         const response = await axios.post(`${api}${currentUrl}`,{
    //             accountId: accountId,
    //             password: password
    //         });

    //         // ログイン結果確認処理
    //         if(response.status === 200){
    //             localStorage.setItem('isLogin', 'true');
    //             onLogin(true);
    //             navigation('/');
    //         } else {
    //             localStorage.setItem('isLogin', 'false');
    //             onLogin(false);
    //             navigation('/signup');
    //         }
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // }

    // return(
    //     <div className="user-access-container">
    //         {currentUrl === '/login' ? (
    //             <h2>Login</h2>
    //         ):(
    //             <h2>SignUp</h2>
    //         )}
    //         <form onSubmit={handleUserAuthClick}>
    //             <input type='text' onChange={onChangeAccountId} value={accountId} placeholder='account id'/>
    //             <input type='text' onChange={onChangePassword} value={password} placeholder='password'/>
    //             {currentUrl === '/login' ?(
    //                 <button>login</button>
    //             ):(
    //                 <button>signup</button>
    //             )}
    //         </form>
    //     </div>
    // );

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

    /**
     * ユーザ新規登録処理
     * FirebaseAuthenticationに登録する処理
     * 
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password);
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

export default UserAccess;