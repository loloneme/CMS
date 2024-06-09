const CustomStylesSelect = {
    container: (provided) => ({
        ...provided,
        fontSize: '15px',
        height: '30px', 
      }),
      control: (provided) => ({
        ...provided,
        fontSize: '15px',
        minHeight: '30px', // Изменение минимальной высоты элемента управления
        height: '30px', // Установка фиксированной высоты
      }),
      valueContainer: (provided) => ({
        ...provided,
        fontSize: '15px',
        height: '30px', // Высота контейнера значений
        padding: '0 8px',
      }),
      input: (provided) => ({
        ...provided,
        color: 'black',
        fontSize: '15px',
        margin: '0', // Убедитесь, что нет внешних отступов
        padding: '0', // Убедитесь, что нет внутренних отступов
      }),
      indicatorsContainer: (provided) => ({
        ...provided,
        fontSize: '15px',
        height: '30px', // Высота контейнера индикаторов (иконок)
      }),
      singleValue: (provided) => ({
        ...provided,
        color: 'black',
        fontSize: '15px',
        height: '30px', // Высота контейнера для одного значения
        display: 'flex',
        alignItems: 'center', // Центровка текста по вертикали
      }),
      option: (provided, state) => ({
        ...provided,
        fontSize: '15px',
        color: state.isSelected ? 'rgba(0, 0, 0)' : 'black', // Цвет текста для выделенной опции и невыделенных опций
        backgroundColor: state.isSelected ? 'rgba(120, 122, 123, 0.6)' : state.isFocused ? 'lightgray' : 'white', // Фон для выделенной опции и невыделенных опций
        cursor: 'pointer'
    })
};

export default CustomStylesSelect;