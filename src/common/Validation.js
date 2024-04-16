/**
 * 必須入力チェック
 * 
 * @param {*} args メールアドレス
 * @param {*} title 項目名
 * @returns {Object} errors エラーメッセージ
 */

export const validateRequired = (args, title) => {
    const errors = {};

    // 空文字チェック
    if (!args.trim()) {
        errors.requiredError = `${title}は必須入力項目です`;
        return errors;
    } 

    return errors;
};

/**
 * メールアドレス入力チェック
 * 
 * @param {*} email メールアドレス
 * @returns {Object} errors エラーメッセージ
 */

export const validateEmail = (email) => {
    const errors = {};

    // 空文字チェック
    if (!email.trim()) {
        errors.emailError = 'メールアドレスを入力してください';
        return errors;
    } 
    
    // メールアドレス形式チェック
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;
    if (!emailRegex.test(email)) {
        errors.emailError = '有効なメールアドレスを入力してください';
        return errors;
    }

    return errors;
};

/**
 * パスワード入力チェック
 * 
 * @param {*} password 
 * @returns {Object} errors エラーメッセージ
 */
export const validatePassword = (password) => {
    const errors = {};

    // 空文字チェック
    if (!password.trim()) {
        errors.passwordError = 'パスワードを入力してください';
        return errors;
    } 
    
    // 文字数チェック
    if (password.length < 6) {
        errors.passwordError = 'パスワードは6文字以上で入力してください';
        return errors;
    }

    return errors;
};

/**
 * セキュリティチェック
 * 
 * @param {*} args 入力文字列
 * @returns {Object} errors エラーメッセージ
 */
export const validateSecurity = (args) => {
    const errors = {};

    // XSS攻撃対策チェック
    if (/(<\s*script\s*>|<\s*\/\s*script\s*>)/i.test(args)) {
        errors.securityError = '無効な文字が含まれています';
    }

    // SQLインジェクション対策チェック
    if (/[;'"`]/.test(args)) {
        errors.securityError = '無効な文字が含まれています';
    }

    return errors;
}