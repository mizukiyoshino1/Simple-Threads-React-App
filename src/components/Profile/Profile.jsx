import React, { useState, useEffect } from 'react';
import './Profile.css';
import axios from 'axios';
import Header from '../Header/Header';
import MessageIcon from '../MainContents/MessageIcon/MessageIcon';
import { useAuthContext } from '../../context/AuthContext';
import { getAuth, updateProfile } from "firebase/auth";
import { validateRequired, validateSecurity } from '../../common/Validation';
import defaultImage from '../../assets/img/default-profile-Img.png';
import Modal from 'react-modal';

const Profile = () => {
    // URL
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    // エラーメッセージ
    const [errors, setErrors] = useState({});

    // 投稿情報
    const [contents, setContents] = useState([]);

    // ユーザ情報
    const { user } = useAuthContext();
    const [displayName, setDisplayName] = useState(user.displayName);
    const [email] = useState(user.email);
    const [userId] = useState(user.uid);
    const [userImg, setUserImg] = useState(defaultImage);
    const auth = getAuth();
    const userCredential = auth.currentUser;
    const [userBio, setUserBio] = useState('');

    // モーダル内でのユーザ情報
    const [modalDisplayName, setModalDisplayName] = useState('');
    const [modalBio, setModalBio] = useState('');
    const [modalUserImg, setModalUserImg] = useState(defaultImage);

    // モーダルウィンドウ情報
    const [showModal, setShowModal] = useState(false);

    // モーダルウィンドウを開く
    const handleOpenModal = () => {
        setShowModal(true);
        setModalDisplayName(displayName);
        setModalBio(userBio);
        setModalUserImg(userImg);
    };

    // モーダルウィンドウを閉じる
    const handleCloseModal = () => {
        setShowModal(false);
    }

    // コメント情報
    const [comments, setComments] = useState([]);

    // onChange
    const onChangeUserName = (event) => {
        setModalDisplayName(event.target.value);
    };
    const onChangeBio = (event) => {
        setModalBio(event.target.value);
    };

    /**
     *  モーダル内でのプロフィール画像変更処理
     * 
     * 
     **/
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setModalUserImg(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    /**
     * 保存ボタン押下処理
     * 
     * 
     **/ 
    const handleSaveChanges = async () => {
        // 入力チェック
        const validationErrors = {
            ...validateRequired(modalDisplayName, 'ユーザ名'),
            ...validateSecurity(modalDisplayName),
            ...validateSecurity(modalBio),
        };

        // エラーメッセージが存在するか確認
        if(Object.keys(validationErrors).length === 0) {
            const confirmUpdateProfile = window.confirm("現在の内容でプロフィールを更新してもよろしいですか？");
            if (confirmUpdateProfile) {
                // Firebaseのプロフィール名を更新
                updateProfile(userCredential, {displayName: modalDisplayName});

                // PostgreSQLのuserName, profileImgUrl,profileTextを更新
                try {
                    await axios.post(`${BACKEND_URL}/api/useredit`,{
                        userId: userId,
                        userName: modalDisplayName,
                        profileImgUrl: modalUserImg,
                        profileText: modalBio,
                    });
                } catch (error) {
                    console.error('Error fetching data:', error);
                }

                // setDisplayName(modalDisplayName);
                setUserImg(modalUserImg);

                // モーダルを閉じる
                setShowModal(false);

                // リロード
                window.location.reload();
            }
        } else {
            setErrors(validationErrors);
        }

        
    };

    /**
     * 初期化処理(ユーザに紐づく情報を取得)
     * 
     */
    useEffect(() => {
        const fetchData = async () => {
            try {
                // 投稿情報を取得
                const respReports = await axios.post(`${BACKEND_URL}/api/getmyreports`,{
                    userId: userId
                });

                // 投稿情報をセット
                if(respReports.data !== null){
                    setContents(respReports.data);
                }

                // コメント取得
                const respComments = await axios.get(`${BACKEND_URL}/api/getcomments`);

                // コメント情報をセット
                if(respComments !== null){
                    setComments(respComments.data);
                }

                // ユーザプロフィール情報を取得
                const userInfo = await axios.post(`${BACKEND_URL}/api/userinfo`,{
                    userId: userId
                });

                // プロフィール情報をセット
                if(userInfo.data.profileImageUrl !== ''){
                    setUserBio(userInfo.data.profileText);
                    setUserImg(userInfo.data.profileImageUrl);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // 関数を呼び出す
    }, []); // 空の配列を依存リストに渡して初期化時にのみ実行するようにする

    return(
        <>
            <Header/>
            <div className="profile-container">
                <div className="profile">
                    <div className="user-detail">
                        <img
                            src={userImg}
                            alt="Default Profile"
                            className="profileImage"
                        />
                        <div>
                            <h2>{displayName}</h2>
                            <h4>{email}</h4>
                        </div>
                    </div>
                    <p className="userBio-text">
                        {userBio}
                    </p>
                    <button className="editProfileButton" onClick={handleOpenModal}>
                        Edit Profile
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="editProfileIcon" viewBox="0 0 16 16">
                            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
                        </svg>
                    </button>
                    
                </div>
                {contents.map(content => (
                    <MessageIcon 
                        key={content.id} 
                        content={content} 
                        comments={comments.filter(comment => comment.reportId === content.id)}
                    />
                ))}
            </div>
            <Modal
                isOpen={showModal}
                contentLabel="プロフィールを編集"
                onRequestClose={handleCloseModal}
                className="userInfo-modal"
                overlayClassName="overlay"
            >
                <div className="modal-content">
                    <form>
                        <div className="form-group user-top">
                            <div className="user-info">
                                {errors.requiredError && <p className="error-message">{errors.requiredError}</p>}
                                {errors.securityError && <p className="error-message">{errors.securityError}</p>}
                                <label htmlFor="username">User Name</label>
                                <input
                                    type="text"
                                    id="username"
                                    value={modalDisplayName}
                                    onChange={onChangeUserName}
                                    className="input-field"
                                />
                            </div>
                            <img
                                src={modalUserImg}
                                alt="Profile"
                                className="profileImage2"
                                onClick={() => document.getElementById('profileImage').click()}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                id="profileImage"
                                onChange={handleImageChange}
                                className="image-upload visually-hidden"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="bio">About Me</label>
                            <textarea
                                id="bio"
                                value={modalBio}
                                onChange={onChangeBio}
                                className="input-field"
                            ></textarea>
                        </div>
                        <button type="button" className="submit-button" onClick={handleSaveChanges}>SAVE</button>
                    </form>
                    <button onClick={handleCloseModal} className="modal-close-button">CLOSE</button>
                </div>
            </Modal>
        </>
    )
}

export default Profile;