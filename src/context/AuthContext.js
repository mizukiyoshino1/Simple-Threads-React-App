import { createContext, useState, useContext, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export function useAuthContext() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    // ユーザ情報
    const [user, setUser] = useState('');
    const value = {user};

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
            if (user) {
                setUser(user);
            } else {
                // User is signed out
            }
        });
        return () => {
            unsubscribed();
        };  
    }, []);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}