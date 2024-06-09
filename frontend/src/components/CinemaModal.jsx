import { useState, useRef, useEffect } from "react";
import React from "react";
import CreatableSelect from 'react-select/creatable';
import CustomStylesSelect from '../styles/CustomStylesSelect';
import { convertToBase64 } from "../utils/utils";
import PhoneInput from 'react-phone-number-input/input';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

import style from "../styles/AddModal.module.css";
import { createCinema, getAllCategories, getAllHallCategories, updateCinema, deleteCinema } from "../utils/DataFetching";
import { useUser } from "../utils/UserContext";

const AddCinemaModal = ({ setAddCinemaModalIsOpen, cinemaInfo, isEditMode }) => {
    const fileInputRef = useRef(null)
    const {user} = useUser();


    const [cinemaData, setCinemaData] = useState(cinemaInfo || {
        cinema_name: '',
        address: '',
        cinema_image: '',
        cinema_phone: '',
        category_name: '',
        halls: [{ hall_name: '', hall_seats: 0, hall_category_name: '' }]
    });

    const [categories, setCategories] = useState([])
    const [hallCategories, setHallCategories] = useState([])
    
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
            alert(data.message)
        } catch (error) {
            console.error('Error creating cinema:', error);
        }
    };

    const handleChangeCinema = async (e) => {
        try {
            const data = await updateCinema(cinemaData);
            alert(data.message)
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
            alert(data.message)
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
                            <img className={style.image} style={{ objectFit: "contain" }} src="film.svg" onClick={handleFileInput} />
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
                            placeholder="Номер телефона"
                            value={cinemaData.cinema_phone}
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
                <div style={{ marginTop: "10px" }}>Залы</div>

                <div className={style.halls_container}>
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
                                defaultValue={hall.hall_seats !== 0 && hall.hall_seats}
                                placeholder='Количество мест'
                                onChange={(ev) => handleHallChange(index, 'hall_seats', parseInt(ev.target.value))}
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
                            <img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAsMCwyNTYsMjU2IgpzdHlsZT0iZmlsbDojMDAwMDAwOyI+CjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxnIHRyYW5zZm9ybT0ic2NhbGUoMTAuNjY2NjcsMTAuNjY2NjcpIj48cGF0aCBkPSJNNC45OTAyMywzLjk5MDIzYy0wLjQwNjkyLDAuMDAwMTEgLTAuNzczMjEsMC4yNDY3NiAtMC45MjYzMywwLjYyMzc3Yy0wLjE1MzEyLDAuMzc3MDEgLTAuMDYyNTUsMC44MDkyMSAwLjIyOTA3LDEuMDkzMDNsNi4yOTI5Nyw2LjI5Mjk3bC02LjI5Mjk3LDYuMjkyOTdjLTAuMjYxMjQsMC4yNTA4MiAtMC4zNjY0NywwLjYyMzI3IC0wLjI3NTExLDAuOTczNzFjMC4wOTEzNiwwLjM1MDQ0IDAuMzY1MDMsMC42MjQxMSAwLjcxNTQ3LDAuNzE1NDdjMC4zNTA0NCwwLjA5MTM2IDAuNzIyODksLTAuMDEzODggMC45NzM3MSwtMC4yNzUxMWw2LjI5Mjk3LC02LjI5Mjk3bDYuMjkyOTcsNi4yOTI5N2MwLjI1MDgyLDAuMjYxMjQgMC42MjMyNywwLjM2NjQ4IDAuOTczNzEsMC4yNzUxMmMwLjM1MDQ0LC0wLjA5MTM2IDAuNjI0MTEsLTAuMzY1MDMgMC43MTU0NywtMC43MTU0N2MwLjA5MTM2LC0wLjM1MDQ0IC0wLjAxMzg4LC0wLjcyMjg5IC0wLjI3NTEyLC0wLjk3MzcxbC02LjI5Mjk3LC02LjI5Mjk3bDYuMjkyOTcsLTYuMjkyOTdjMC4yOTU3NiwtMC4yODc0OSAwLjM4NDY5LC0wLjcyNzA3IDAuMjIzOTMsLTEuMTA2OTFjLTAuMTYwNzUsLTAuMzc5ODUgLTAuNTM4MjEsLTAuNjIyMDQgLTAuOTUwNSwtMC42MDk4OGMtMC4yNTk4LDAuMDA3NzQgLTAuNTA2MzgsMC4xMTYzMiAtMC42ODc1LDAuMzAyNzNsLTYuMjkyOTcsNi4yOTI5N2wtNi4yOTI5NywtNi4yOTI5N2MtMC4xODgyNywtMC4xOTM1MyAtMC40NDY4LC0wLjMwMjcyIC0wLjcxNjgsLTAuMzAyNzN6Ij48L3BhdGg+PC9nPjwvZz4KPC9zdmc+"/>


                            </button>
                        </div>
                    ))}

                </div>
                <button type="button" onClick={handleAddHall} className={style.add_hall_button}>
                        <img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAsMCwzMDAsMTUwIgpzdHlsZT0iZmlsbDojMDAwMDAwOyI+CjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxnIHRyYW5zZm9ybT0ic2NhbGUoMTAuNjY2NjcsMTAuNjY2NjcpIj48cGF0aCBkPSJNMTEsMnY5aC05djJoOXY5aDJ2LTloOXYtMmgtOXYtOXoiPjwvcGF0aD48L2c+PC9nPgo8L3N2Zz4=" />                    </button>


                <div className={style.buttons} style={isEditMode  && user && user.role === "INFO_SERVICE" ? { gridTemplateColumns: "100px auto 100px" } : { gridTemplateColumns: "auto" }}>
                    {isEditMode && user && user.role === "INFO_SERVICE" &&
                        <button className={style.delete_button} onClick={() => handleDelete()}>Удалить</button>
                    }
                    <button type="submit" className={style.button}>Сохранить</button>
                </div>

            </form>
        </div>
    )
}

export default AddCinemaModal