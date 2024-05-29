import { useState, useRef, useEffect } from "react";
import React from "react";
import CreatableSelect from 'react-select/creatable';
import CustomStylesSelect from '../styles/CustomStylesSelect';
import { convertToBase64 } from "../utils/utils";

import style from "../styles/AddCinemaModal.module.css";
import { createCinema, getAllCategories, getAllHallCategories, updateCinema, deleteCinema } from "../utils/DataFetching";

const AddCinemaModal = ({ setAddCinemaModalIsOpen, cinemaInfo, isEditMode }) => {
    const fileInputRef = useRef(null)

    const [cinemaData, setCinemaData] = useState(cinemaInfo || {
        cinema_name: '',
        address: '',
        cinema_image: '',
        cinema_phone: '',
        category_name: '',
        halls: [{ hall_name: '', hall_seats: '', hall_category_name: '' }]
    });

    const [categories, setCategories] = useState([])
    const [hallCategories, setHallCategories] = useState([])


    // const [selectedCategory, setSelectedCategory] = useState("")
    // const [selectedCity, setSelectedCity] = useState("")


    useEffect(() => {

        const fetchCategories = async () => {
            try {
                const data = await getAllCategories();
                if (data != null) {

                    setCategories(data.map((category) => ({
                        value: category.category_id,
                        label: category.category_name
                    })));
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }

        const fetchHallCategories = async () => {
            try {
                const data = await getAllHallCategories();
                if (data != null) {
                    setHallCategories(data.map((category) => ({
                        value: category.hall_category_id,
                        label: category.hall_category
                    })));
                }
            } catch (error) {
                console.error('Error fetching hall categories:', error);
            }
        }

        fetchCategories()
        fetchHallCategories()
    }, []);


    const handleFileInput = () => {
        fileInputRef.current.click();
    }

    const handleAddCinema = async () => {
        try {
            const data = await createCinema(cinemaData);
        } catch (error) {
            console.error('Error creating cinema:', error);
        }
    };

    const handleChangeCinema = async (e) => {
        try {
            const data = await updateCinema(cinemaData);
        } catch (error) {
            console.error('Error creating cinema:', error);
        }
    }


    const submitAddCinema = async (e) => {
        e.preventDefault();

        if (isEditMode) {
            handleChangeCinema()
        } else {
            handleAddCinema()
        }

        setAddCinemaModalIsOpen(false)
        window.location.reload()
    }

    const handleDelete = async () => {
        try {
            const data = await deleteCinema(cinemaData.cinema_id);
        } catch (error) {
            console.error('Error creating cinema:', error);
        }
        setAddCinemaModalIsOpen(false)
        window.location.reload()
    }

    const handleChange = (field, value) => {
        setCinemaData({
            ...cinemaData,
            [field]: value
        })
    }


    const handleAddHall = () => {
        setCinemaData({
            ...cinemaData,
            halls: [...cinemaData.halls, { hall_name: '', hall_seats: 0, hall_category_name: '' }]
        })
    };

    const handleHallChange = (index, field, value) => {
        const updatedHalls = [...cinemaData.halls];
        updatedHalls[index][field] = field === 'hall_seats' ? parseInt(value) : value
        setCinemaData({
            ...cinemaData,
            halls: updatedHalls
        });
    };

    const handleRemoveHall = (index) => {
        const updatedHalls = cinemaData.halls.filter((_, i) => i !== index);
        setCinemaData({
            ...cinemaData,
            halls: updatedHalls
        });;
    };


    return (
        <div className={style.container}>
            <div style={{ fontSize: "20px" }}>{isEditMode ? "Редактирование кинотеатра" : "Добавить кинотеатр"}</div>

            <form onSubmit={submitAddCinema}>
                <div className={style.form}>
                    <div className={style.image_uploading}>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={async (e) => {
                                try {
                                    const converted = await convertToBase64(e.target.files[0])
                                    handleChange("cinema_image", converted)
                                } catch (error) {
                                    console.log(error)
                                }
                            }
                            }
                        />
                        <label htmlFor="fileInput">Выберите фото:</label>
                        {cinemaData.cinema_image == "" || cinemaData.cinema_image == null ?
                            <img className={style.image} style={{objectFit: "contain"}} src="film.svg" onClick={handleFileInput} />
                            : <img className={style.image} src={`data:image/png;base64,${cinemaData.cinema_image}`} onClick={handleFileInput} />}
                    </div>
                    <div className={style.info}>
                        <input className={style.input}
                            type="text"
                            value={cinemaData.cinema_name}
                            placeholder='Название кинотеатра'
                            onChange={(ev) => handleChange("cinema_name", ev.target.value)}
                            required></input>


                        <input className={style.input}
                            type="text"
                            value={cinemaData.address}
                            placeholder='Адрес'
                            onChange={(ev) => handleChange("address", ev.target.value)}
                            required></input>

                        <input className={style.input}
                            type="text"
                            value={cinemaData.cinema_phone}
                            placeholder='Номер телефона'
                            onChange={(ev) => handleChange("cinema_phone", ev.target.value)}
                            required></input>

                        {/* <label htmlFor="status">Выберите категорию:</label> */}

                        <CreatableSelect isClearable
                            styles={CustomStylesSelect}
                            required
                            defaultValue={cinemaData.category_id ? { value: cinemaData.category_id, label: cinemaData.category_name } : null}


                            placeholder="Категория"
                            formatCreateLabel={(inputValue) => `Создать "${inputValue}"`}
                            options={categories}
                            onChange={(newValue) => handleChange("category_name", newValue.label)}
                            noOptionsMessage={() => { return "Нет вариантов" }}
                        />


                    </div>
                </div>

                <div className={style.halls_container}>
                    <div style={{ marginTop: "10px" }}>Залы</div>
                    {cinemaData.halls.map((hall, index) => (
                        <div key={index} className={style.hall}>
                            <input className={style.input}
                                type="text"
                                value={hall.hall_name}
                                placeholder='Название зала'
                                onChange={(ev) => handleHallChange(index, 'hall_name', ev.target.value)}
                                required
                            />
                            <input className={style.input}
                                type="number"
                                min={0}
                                value={hall.hall_seats}
                                placeholder='Количество мест'
                                onChange={(ev) => handleHallChange(index, 'hall_seats', ev.target.value)}
                                required
                            />
                            <CreatableSelect isClearable
                                placeholder="Категория"
                                formatCreateLabel={(inputValue) => `Создать "${inputValue}"`}
                                options={hallCategories}
                                styles={CustomStylesSelect}
                                defaultValue={cinemaData.halls[index] && cinemaData.halls[index].hall_category_id ? { value: cinemaData.halls[index].hall_category_id, label: cinemaData.halls[index].hall_category_name } : null}
                                required


                                onChange={(newValue) => handleHallChange(index, 'hall_category_name', newValue ? newValue.label : '')}
                                noOptionsMessage={() => { return "Нет вариантов" }}
                            />
                            <button className={style.delete} type="button" onClick={() => handleRemoveHall(index)}>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
                                    <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
                                </svg>
                            </button>
                        </div>
                    ))}

                    <button type="button" onClick={handleAddHall} className={style.add_hall_button}>
                        <img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAsMCwzMDAsMTUwIgpzdHlsZT0iZmlsbDojMDAwMDAwOyI+CjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxnIHRyYW5zZm9ybT0ic2NhbGUoMTAuNjY2NjcsMTAuNjY2NjcpIj48cGF0aCBkPSJNMTEsMnY5aC05djJoOXY5aDJ2LTloOXYtMmgtOXYtOXoiPjwvcGF0aD48L2c+PC9nPgo8L3N2Zz4=" />                    </button>
                </div>

                <div className={style.buttons} style={isEditMode ? {gridTemplateColumns: "100px auto 100px"} : {gridTemplateColumns: "auto"}}>
                        {isEditMode &&
                        <button className={style.delete_button} onClick={() => handleDelete()}>Удалить</button>
                        }
                    <button type="submit" className={style.button}>Сохранить</button>
                </div>

            </form>
        </div>
    )
}

export default AddCinemaModal