import React, { useState, useEffect } from "react";
import { deleteUser, getUsers } from "../utils/DataFetching";
import style from "../styles/UserTable.module.css";


const UserTable = ({onClick}) => {

    const [data, setData] = useState([])


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                setData(data);
            } catch (error) {
                console.error('Error fetching cinema:', error);
            }
        };

        fetchUsers();

    }, [])
    
    const handleDelete = async (id) => {
        try{
            const data = await deleteUser(id)
            alert(data.message)
        } catch(error){
            console.error('Error deleting user:', error);
        }
        window.location.reload()
    };

    return (
        <>
            <div className={style.container}>
                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>Название кинотеатра</th>
                            <th>Имя</th>
                            <th>Эл. почта</th>
                            <th>Телефон</th>
                            <th>Название роли</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user) => (
                            <tr key={user.user_id}>
                                <td>{user.cinema_name}</td>
                                <td>{user.full_name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.role_name}</td>
                                <td>
                                    <button onClick={() => onClick(user)}>Редактировать</button>
                                    <button onClick={() => handleDelete(user.user_id)}>Удалить</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>

    )
}

export default UserTable