import React, { useState, useEffect } from 'react';
import './Profile.css';
import axios from 'axios';
import Header from '../Header/Header';
import MessageIcon from '../MainContents/MessageIcon/MessageIcon';
import { useAuthContext } from '../../context/AuthContext';
import { getAuth, updateProfile } from "firebase/auth";
import defaultImage from '../../assets/img/default-profile-Img.png';
import Modal from 'react-modal';

const Profile = () => {
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
        // Firebaseのプロフィール名を更新
        updateProfile(userCredential, {displayName: modalDisplayName});

        // PostgreSQLのuserName, profileImgUrl,profileTextを更新
        try {
            await axios.post('http://localhost:8080/api/useredit',{
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
    };

    /**
     * 初期化処理(ユーザに紐づく情報を取得)
     * 
     */
    useEffect(() => {
        const fetchData = async () => {
            try {
                // 投稿情報を取得
                const response = await axios.post('http://localhost:8080/api/getmyreports',{
                    userId: userId
                });

                // 投稿情報をセット
                if(response.data !== null){
                    setContents(response.data);
                }

                // ユーザプロフィール情報を取得
                const userInfo = await axios.post('http://localhost:8080/api/userinfo',{
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
                    <p>
                        {userBio}
                    </p>
                    <button className="editProfileButton" onClick={handleOpenModal}>
                        プロフィールを編集
                    </button>
                    
                </div>
                {contents.map(content => (
                    <MessageIcon key={content.id} content={content} />
                ))}
            </div>
            <Modal
                isOpen={showModal}
                contentLabel="プロフィールを編集"
                onRequestClose={handleCloseModal}
                className="modal"
                overlayClassName="overlay"
            >
                <div className="modal-content">
                    <form>
                        <div className="form-group user-top">
                            <div className="user-info">
                                <label htmlFor="username">ユーザ名</label>
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
                            <label htmlFor="bio">自己紹介</label>
                            <textarea
                                id="bio"
                                value={modalBio}
                                onChange={onChangeBio}
                                className="input-field"
                            ></textarea>
                        </div>
                        <button type="button" className="submit-button" onClick={handleSaveChanges}>保存</button>
                    </form>
                    <button onClick={handleCloseModal} className="close-button">閉じる</button>
                </div>
            </Modal>
        </>
    )
}

export default Profile;