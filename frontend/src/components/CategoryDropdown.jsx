import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from '../styles/Dropdown.module.css'


function CategoryDropdown({selectedCategory, setSelectedCategory}) {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getCategories()
    }, []);

    const getCategories = async () => {
        await axios.get("http://localhost:8080/handler/cinema/categories", {
        })
            .then((response) => {
                setCategories(response.data)
            }
            )
            .catch(error => {
                console.error("ПИЗДЕЦ")
            })
    }

    return (
        <div>
            <select id="category" value={selectedCategory}
            className={style.container} 
            onChange={(ev) => setSelectedCategory(ev.target.value)}>
                {categories.map((category) => (
                    <option value={category.category_id}>{category.category_name}</option>
                ))}
            </select>
        </div>
    );
}

export default CategoryDropdown;
