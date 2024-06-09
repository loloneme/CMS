import React from "react";
import style from "../styles/UsersPage.module.css"
import UserTable from "../components/UserTable";
import AddButton from "../components/AddButton";
import UserModal from "../components/UserModal";
import { NavLink } from "react-router-dom"

import Modal from "../components/Modal";
import { useState } from "react";

const UsersPage = () => {
    const [isEditMode, setIsEditMode] = useState(false)
    const [userModalIsOpen, setUserModalIsOpen] = useState(false)
    const [userInfo, setUserInfo] = useState({})

    const logout = () => {
        localStorage.removeItem("token")
    }

    const handleOpen = async (user) => {
        setUserInfo(user);
        setUserModalIsOpen(true)
        setIsEditMode(true)
    }

    return (
        <div className={style.back}>
            <div className={style.container}>
                <div style={{ marginTop: "30px", fontSize: '25px' }}>
                    Панель администратора
                    <div className={style.logout}>
                        <NavLink className={style.logout_link} to="/login" onClick={logout}>Выйти</NavLink>
                    </div>
                </div>
                <UserTable onClick={handleOpen} />
            </div>
            <AddButton onClick={() => {
                setIsEditMode(false)
                setUserModalIsOpen(true)
            }} />
            <Modal
                isOpen={userModalIsOpen}
                onClose={() => {
                    setUserModalIsOpen(false)
                    setIsEditMode(false)
                    setUserInfo(null)
                }}
                style={{ backgroundColor: "rgb(51 113 39)" }}
            >
                <UserModal userInfo={userInfo} setUserModalIsOpen={setUserModalIsOpen} isEditMode={isEditMode} />
            </Modal>
        </div>
    )
}

export default UsersPage