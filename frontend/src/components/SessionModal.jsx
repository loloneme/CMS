import React, { useState, useEffect } from "react";
import style from "../styles/AddModal.module.css";
import Select from 'react-select/creatable';
import { useUser } from "../utils/UserContext";
import { getCinema, deleteSession, updateSession, createSession } from "../utils/DataFetching";
import CustomStyles from "../styles/CustomStylesSelect";
import { getDateTimeNow, convertToCorrectDateTime } from "../utils/utils";


const SessionModal = ({ sessionInfo, setSessionModalIsOpen, isEditMode, movies }) => {
  const { user } = useUser()

  const isEditable = user && user.role === 'CINEMA_WORKER';


  const [sessionData, setSessionData] = useState(sessionInfo || {
    hall_id: '',
    movie_id: '',
    session_date: '',
    cost: 0,
    booked_seats: 0
  })

  const [cinemaInfo, setCinemaInfo] = useState({})

  useEffect(() => {
    const fetchCinema = async () => {
      try {
        const data = await getCinema(user.cinemaId);
        setCinemaInfo(data);
      } catch (error) {
        console.error('Error fetching cinema:', error);
      }
    };

    if (isEditable) {
      fetchCinema();
    }
  }, [])

  const handleChange = (field, value) => {
    setSessionData({
      ...sessionData,
      [field]: value
    })
  }

  const handleChangeSession = async (e) => {
    try {
      const data = await updateSession(sessionData)
      alert(data.message)
    } catch (error) {
      console.error('Error updating session')
    }
  }

  const handleAddSession = async (e) => {
    try {
      console.log(sessionData)
      const data = await createSession(sessionData)
      alert(data.message)
    } catch (error) {
      console.error('Error creating session')
    }
  }


  const submit = async (e) => {
    e.preventDefault();

    if (isEditMode) {
      handleChangeSession()
    } else {
      handleAddSession()
    }

    setSessionModalIsOpen(false)
    window.location.reload()
  }

  const handleDelete = async () => {
    try {
      const data = await deleteSession(sessionData.session_id);
      alert(data.message)
    } catch (error) {
      console.error('Error deleting session:', error);
    }
    setSessionModalIsOpen(false)
    window.location.reload()
  }

  return (
    <div className={style.container} >
      <div className={style.title}>{isEditMode ? "Информация о сеансе" : "Добавить сеанс"}</div>

      <div className={style.form} style={{ display: "block" }}>

        <form onSubmit={submit}>
          <div className={style.info} style={{ maxWidth: "100%", width: "350px" }}>
            <div style={{ display: "flex", flexDirection: "column", rowGap: "10px" }}>
              Фильм:
              <Select
                options={movies.map((item) => ({
                  value: item.movie_id,
                  label: item.movie_name
                }))}
                onChange={(newValue) => handleChange('movie_id', newValue.value)}
                placeholder="Выбрать"
                defaultValue={sessionData.movie_id &&
                {
                  value: sessionData.movie_id,
                  label: movies.find(m => m.movie_id === sessionData.movie_id).movie_name
                }}
                styles={CustomStyles}
                isDisabled={!isEditable}

              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", rowGap: "10px" }}>
              Зал:
              <Select
                options={cinemaInfo && Array.isArray(cinemaInfo.halls) ? cinemaInfo.halls.map((item) => ({
                  value: item.hall_id,
                  label: `${item.hall_name} ${item.hall_category_name}`
                })) : []}
                onChange={(newValue) => handleChange('hall_id', parseInt(newValue.value))}
                placeholder="Выбрать"
                defaultValue={sessionData.hall_id && { value: sessionData.hall_id, label: `${sessionData.hall_name} ${sessionData.hall_category_name}` }}
                styles={CustomStyles}
                isDisabled={!isEditable}

              />
            </div>


            {
              sessionData.hall_id && (
                <div style={{ display: "flex", flexDirection: "column", rowGap: "10px" }}>
                  Свободные места:
                  <input className={style.input}
                    defaultValue={sessionData && sessionData.hall_seats - sessionData.booked_seats}
                    type="number"
                    min={0}
                    max={cinemaInfo.halls && cinemaInfo.halls.find(h => h.hall_id === sessionData.hall_id).hall_seats}
                    onChange={(ev) => handleChange('booked_seats', parseInt(sessionData.hall_seats - ev.target.value))}
                    disabled={!isEditable}
                    required
                  />
                </div>
              )
            }

            <div style={{ display: "flex", flexDirection: "column", rowGap: "10px" }}>
              Цена билета:
              <input className={style.input}
                defaultValue={sessionData.cost || null}
                type="number"
                min={0}
                placeholder='Цена'
                onChange={(ev) => handleChange('cost', parseInt(ev.target.value))}
                disabled={!isEditable}
                required
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", rowGap: "10px" }}>
              Дата и время сеанса:
              <input type="datetime-local" className={style.input}
                defaultValue={convertToCorrectDateTime(sessionData.session_date) || getDateTimeNow()}
                min={getDateTimeNow()}
                onChange={(ev) => {
                  const localDate = new Date(ev.target.value);
                  const utcDate = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000)
                  handleChange('session_date', utcDate)
                }
                }
                disabled={!isEditable}
                required
              />
            </div>
          </div>


          <div className={style.buttons} style={isEditMode ? { gridTemplateColumns: "100px auto 100px" } : { gridTemplateColumns: "auto" }}>
            {
              isEditable && (
                (isEditMode ?
                  <>
                    <button className={style.delete_button} onClick={() => handleDelete()}>Удалить</button>
                    <button type="submit" className={style.button}>Сохранить</button>
                  </>
                  : <button type="submit" className={style.button}>Сохранить</button>
                )
              )
            }

          </div>
        </form>

      </div>
    </div>
  )
}

export default SessionModal;