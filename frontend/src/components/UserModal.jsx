import React, { useState, useEffect } from "react";
import { createUser, deleteUser, getAllCinemaNames, getRoles, updateUser } from "../utils/DataFetching";
import Select from 'react-select/creatable';
import CustomStyles from "../styles/CustomStylesSelect";
import style from "../styles/AddModal.module.css"
import PhoneInput from 'react-phone-number-input/input';
import { parsePhoneNumberFromString } from 'libphonenumber-js';



const UserModal = ({ userInfo, setUserModalIsOpen, isEditMode }) => {
    const [userData, setUserData] = useState(userInfo || {
        email: "",
        password: "",
        role_id: 0,
        role_name: "",
        cinema_id: "",
        full_name: "",
        phone: ""
    })

    const [cinemas, setCinemas] = useState([])
    const [roles, setRoles] = useState([])

    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    useEffect(() => {
        const fetchCinemas = async () => {
            try {
                const data = await getAllCinemaNames();
                setCinemas(data.map((item) => ({
                    value: item.cinema_id,
                    label: item.cinema_name
                })));
            } catch (error) {
                console.error('Error fetching cinema:', error);
            }
        };

        const fetchRoles = async () => {
            try {
                const data = await getRoles();
                setRoles(data.map((item) => ({
                    value: item.role_id,
                    label: item.role
                })));
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };

        fetchCinemas();
        fetchRoles();
    }, [])

    const handleChange = (field, value) => {
        setUserData(prevState => ({
            ...prevState,
            [field]: value
        }));
    }

    const handleAddUser = async () => {
        try {
            const data = await createUser(userData);
            alert(data.message)
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const handleChangeUser = async (e) => {
        try {
            const data = await updateUser(userData);
            alert(data.message)
        } catch (error) {
            console.error('Error updating user:', error);
        }
    }

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const submit = async (e) => {
        e.preventDefault();

        if (!isValidEmail(userData.email)) {
            setEmailError('Пожалуйста, введите корректный адрес эл. почты')
            return
        }

        if (userData.password.length < 7) {
            setPasswordError('Длина пароля должна быть больше 8 символов')
            return
        }

        if (isEditMode) {
            handleChangeUser()
        } else {
            handleAddUser()
        }

        setUserModalIsOpen(false)
        window.location.reload()
    }


    return (
        <div className={style.container}>
            <div className={style.title}>{isEditMode ? "Информация о пользователе" : "Добавить пользователя"}</div>
            <div className={style.form} style={{ display: "block" }}>


                <form onSubmit={submit}>
                    <div className={style.info} style={{ maxWidth: "100%", width: "350px" }}>
                        <div style={{ display: "flex", flexDirection: "column", rowGap: "5px" }}>
                            Роль:
                            <Select
                                options={roles}
                                onChange={(newValue) => {
                                    handleChange('role_id', parseInt(newValue.value))
                                    handleChange('role_name', newValue.label)
                                }}
                                placeholder="Выбрать"
                                value={userData.role_id ? { value: userData.role_id, label: userData.role_name } : null}
                                styles={CustomStyles}
                                isDisabled={isEditMode}

                            />
                        </div>


                        {
                            (userData && userData.role_name === 'CINEMA_WORKER') &&
                            <div>
                                <Select
                                    options={cinemas}
                                    onChange={(newValue) => handleChange('cinema_id', newValue.value)}
                                    placeholder="Выбрать"
                                    styles={CustomStyles}
                                />
                            </div>

                        }

                        <div style={{ display: "flex", flexDirection: "column", rowGap: "5px" }}>
                            Адрес эл. почты:
                            <input className={style.input}
                                value={userData.email}
                                type="text"
                                placeholder='Эл. почта'
                                onChange={(ev) => handleChange('email', ev.target.value)}
                                required
                            />
                            <label >{emailError}</label>

                        </div>

                        {
                            !isEditMode &&

                            <div style={{ display: "flex", flexDirection: "column", rowGap: "5px" }}>
                                Пароль:
                                <input className={style.input}
                                    value={userData.password}
                                    type="text"
                                    placeholder='Не менее 8 символов'
                                    onChange={(ev) => handleChange('password', ev.target.value)}
                                    required
                                />
                                <label>{passwordError}</label>

                            </div>
                        }



                        <div style={{ display: "flex", flexDirection: "column", rowGap: "5px" }}>
                            Номер телефона:
                            <PhoneInput
                                country="RU"
                                countryCallingCodeEditable={false}
                                style={{
                                    padding: '5px 10px',
                                    height: '20px',
                                    border: 'none',
                                    color: 'black',
                                    fontFamily: 'Forum, sans-serif',
                                    borderRadius: '4px',
                                    fontSize: '15px',

                                }}
                                placeholder="Ввести"
                                value={userData.phone}
                                onChange={(value) => {
                                    if (value !== '') {
                                        const phoneNumber = parsePhoneNumberFromString(value, 'RU');
                                        if (phoneNumber && phoneNumber.isValid()) {
                                            handleChange("phone", value);
                                        }
                                    }
                                }}
                                required
                            />
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", rowGap: "5px" }}>
                            ФИО:
                            <input className={style.input}
                                value={userData.full_name}
                                type="text"
                                placeholder='Ввести'
                                onChange={(ev) => handleChange('full_name', ev.target.value)}
                                required
                            />
                        </div>


                        <div className={style.buttons} style={{ gridTemplateColumns: "auto" }}>
                            {
                                <button type="submit" className={style.button}>Сохранить</button>
                            }
                        </div>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default UserModal