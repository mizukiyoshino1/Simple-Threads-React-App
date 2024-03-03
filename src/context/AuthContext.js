import { createContext, useState, useContext, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

/**
 * Contextオブジェクトを生成
 *  実態はAuthProvider
 * 
 */
const AuthContext = createContext();

/**
 * 現在の認証コンテキストの値を取得するためのフック
 * 
 * @returns {Object} 現在の認証コンテキストの値
 */
export function useAuthContext() {
    return useContext(AuthContext);
}

/**
 * 認証情報とローディング状態を管理する
 * 
 * @param {JSX.Element} children <App/> で管理しているすべてのコンポーネント
 * @returns {JSX.Element} AuthProviderコンポーネント
 */
export function AuthProvider({ children }) {
    // ユーザ情報
    const [user, setUser] = useState('');

    // ローディング状態
    const [loading, setLoading] = useState(true);

    /**
     * サインイン、サインアウトを監視する処理
     *   サインイン → user = userに関する情報
     *   サインアウト → user = null
     * 
     */
    useEffect(() => {
        // ユーザ認証
        const auth = getAuth();
        // サインイン、サインアウトが行われる毎に実行する
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            console.log(user);
            setUser(user);
            setLoading(false);//ローディング状態解除
        });
        return () => {
            unsubscribed();
        };  
    }, []);

    // ローディング中は何も表示せずに待機する
    if(loading){
        return null;
    }

    // ユーザ情報の更新
    const value = {user};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}