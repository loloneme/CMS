const CustomStyles = {
    control: (provided) => ({
        ...provided,
        //   maxWidth: '95%',
        overflow: 'hidden',
        fontSize: '15px',
        marginTop: '5px'
    }),
    valueContainer: (provided) => ({
        ...provided,
        minHeight: '20px',
        overflowY: 'auto',
        fontSize: '15px',
    }),
    multiValue: (provided) => ({
        ...provided,
        fontSize: '15px',
        backgroundColor: 'rgba(120, 122, 123, 0.6)'
    }),
    multiValueLabel: (provided) => ({
        ...provided,
        color: 'black',
        fontSize: '15px'

    }),
    multiValueRemove: (provided) => ({
        ...provided,
        fontSize: '15px',
        color: 'black',
        ':hover': {
            backgroundColor: 'rgba(0, 0, 0)',
            color: 'rgba(120, 122, 123, 0.6)'
        }
    }),
    menuList: (provided) => ({
        ...provided,
        fontSize: '15px',
        color: 'black' // Цвет текста для всех опций
    }),
    option: (provided, state) => ({
        ...provided,
        fontSize: '15px',
        color: state.isSelected ? 'rgba(0, 0, 0)' : 'black', // Цвет текста для выделенной опции и невыделенных опций
        backgroundColor: state.isSelected ? 'rgba(120, 122, 123, 0.6)' : state.isFocused ? 'lightgray' : 'white', // Фон для выделенной опции и невыделенных опций
        cursor: 'pointer'
    }),
    menu: (provided) => ({
        ...provided,
        maxHeight: '150px',
        overflowY: 'auto'
    }),
};

export default CustomStyles;