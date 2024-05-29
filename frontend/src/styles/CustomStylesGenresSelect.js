const CustomStyles = {
    container: (provided) => ({
        ...provided,
        fontSize: '15px',
        height: '30px', 
      }),
    control: (provided) => ({
      ...provided,
      height: '30px',
      minHeight: '30px',
      boxSizing: 'border-box',
      border: '1px solid rgb(255, 255, 255)',
      borderRadius: '20px',
      background: 'rgba(158, 152, 152, 0.25)',
    }),
    valueContainer: (provided) => ({
        ...provided,
        fontSize: '15px',
        height: '30px',
      }),
      input: (provided) => ({
        ...provided,
        color: 'black',
        fontSize: '15px',
        margin: '0',
        padding: '0',
      }),
      indicatorsContainer: (provided) => ({
        ...provided,
        fontSize: '15px',
        height: '30px',
      }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '0 0 20px 20px',
    }),
    option: (provided) => ({
      ...provided,
      padding: '5px',
      height: '30px'
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white', 
      cursor: 'pointer',
    }),
    menu: (provided) => ({
        ...provided,
        maxHeight: '150px',
        overflowY: 'auto',
        zIndex: '2000',
        color: 'black'
    })
  };

export default CustomStyles;