import style from './UpdateActivity.module.css';
import { useState, useEffect } from 'react';
import { validate } from "../Form/validations"
import { useDispatch, useSelector } from 'react-redux';
import { getActivities, getAllCountries, getAssociations } from '../../redux/actions';
import axios from 'axios';
import Popup from "../Pop-up/Popup"
import SuccessMessage from '../Pop-up/Success';
import ErrorMessage from '../Pop-up/Error';

const UpdateActivity = () => {

  const dispatch = useDispatch()
  const { activities, allCountries, associations } = useSelector(state => state)
  const [activity, setActivity] = useState({
    id: 0,
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  });
  const [duration, setDuration] = useState({
    hours: "",
    minutes: ""
  })
  const [errors, setErrors] = useState({
    name: "",
    difficulty: "",
    hours: "",
    minutes:"",
    duration:"",
    season: "",
  });
  const [render, setRender] = useState({
    selectedActivity: "",
    show: false
  })
  const [showPopup, setShowPopup] = useState({
    popup: false,
    success: false,
    error: false,
    showNotification: false,
    redirect: false
  });
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [searchText, setSearchText] = useState("");

  // ! UseEffects
  useEffect(() => {
    dispatch(getAssociations())
    dispatch(getActivities())
    dispatch(getAllCountries())
  }, [dispatch]);

  useEffect(() => {
    // Actualizar el estado de 'activity' cada vez que 'duration' cambie
    const updatedActivity = {
      ...activity,
      duration: duration.hours.padStart(2, '0') + ":" + duration.minutes.padStart(2, '0'),
    };

    setActivity(updatedActivity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration]);

  useEffect(() => {
    // Actualizar el estado de 'activity' cada vez que 'selectedCountries' cambie
    const updatedActivity = {
      ...activity,
      countries: selectedCountries.map(countryId => countryId.id)
    };

    setActivity(updatedActivity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountries]);

  // ! Handlers
  const handleActivitySelect = (event) => {
    const selectedActivityName = event.target.value

    const selectedActivity = activities.find(activity => activity.name === selectedActivityName)
    const {id, name, difficulty, season} = selectedActivity
    const activityDuration = selectedActivity.duration
    const associatedCountrys = associations.filter(association => association.ActivityId === id)
    const selectedActivityCountries = allCountries.filter(country => associatedCountrys.map(assoc => assoc.CountryId).includes(country.id));

    setActivity({
      ...activity,
      id, 
      name, 
      difficulty, 
      duration: activityDuration, 
      season,
      countries: selectedActivityCountries.map(country => country.id),

    });
    setDuration({
      hours: activityDuration.slice(0,2),
      minutes: activityDuration.slice(3,5)
    })
    setSelectedCountries(selectedActivityCountries) 
    setRender({
      selectedActivity: selectedActivityName,
      show: true
    });
  }

  const handleCountryChange = (event) => {
    const { value } = event.target;
    setSearchText(value);
  };

  const addCountry = (country) => {
    setSelectedCountries([...selectedCountries, country]);
    setSearchText("");
    if (errors.countries) {
      setErrors({
        ...errors,
        countries: ""
      }
      )
    }
  };

  const removeCountry = (country) => {
    setSelectedCountries(selectedCountries.filter((c) => c.id !== country.id));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setActivity({
      ...activity,
      [name]: value,
    });
    onInputValidations(event)
  };

  const handleDuration = (event) => {
    const { name, value } = event.target;
    setDuration({
      ...duration,
      [name]: value
    })
    onInputValidations(event)
  };

  const handleClickDisable = () => {

    console.log("Button clicked!");
      // // Realizar cualquier acción que desees aquí
      const error = validate(null, null, activity, duration)

      if (!Object.keys(error).length) { //se verifica si el error tiene o no propiedades para proceder a setear nuevamente el error en un objeto vacio

        setErrors({});
        return;
      }
      setErrors({
        ...error
      })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Aquí puedes enviar los datos al backend mediante una solicitud POST
      // Por ejemplo:
      const response = await axios.put('http://127.0.0.1:3001/activities', activity);
      console.log('Activity created successfully:', response.data);
      
      
      setShowPopup({
        ...showPopup,
        success: true,
      });

      setTimeout(() => {
        setShowPopup({
          ...showPopup,
          success: false,
          popup: true
        });
      }, 3000);
    } catch (error) {
      console.error('Error creating activity:', error);
      setShowPopup({
        ...showPopup,
        error: true
      });
  
      // Ocultar el pop-up después de mostrar el mensaje de error
      setTimeout(() => {
        setShowPopup({
          ...showPopup,
          popup: false,
          error: false,
        });
      }, 3000); // Mostrar el mensaje de error durante 3 segundos
    }
  };

  const handletoHome = () => {
    setShowPopup({
      ...showPopup,
      popup: false
    })
  };

  const handleStay = () => {
    setShowPopup({
      ...showPopup,
      popup: false
    });
    window.location.reload();
  };

  // !Validations
  const onInputValidations = (event) => {
    const { name, value } = event.target;
    const error = validate(name, value, duration)
    console.log(name);
    if (!(name in error)) { 
      setErrors({
        ...errors,
        [name]: "",
        duration: ""
      });
      return
    }
    setErrors({
      ...errors,
      ...error
    })
    
  }

  const onInputDuration = (event) => {
    let { value, name } = event.target
    if (name === "hours" && value > 72) value = 72
    if (name === "minutes" && value > 59) value = 59
    if (value.length > 2) value = value.slice(0, 2);
    event.target.value = value;

    onInputValidations(event)
  }

  // * Render
  return (
    <div className={style.container}>
      {render.show 
      ? (
          <form onSubmit={handleSubmit} className={style.form_container}>
            <h2>Update an activity!</h2>
            <p>Fields with * cannot be empty</p>
            <select
              name="activity"
              className={style.select_activity}
              value={render.selectedActivity}
              onChange={handleActivitySelect}
            >
              <option value="" disabled>Select an activity to update</option>
              {activities.map(({ id, name }) => {
                return (
                  <option key={id} value={name}>{name}</option>
                )
              })}
            </select>

            <label>
              Name: *
              <input
                name='name'
                type="text"
                value={activity.name}
                onChange={handleChange}
              />
              <div className={style.error_container}>
                {errors.name && <p>{errors.name}</p>}
              </div>
            </label>
            <br />
            <label className={style.label}>Difficulty: *
              <select
                className={style.input}
                type="number"
                name="difficulty"
                value={activity.difficulty}
                onChange={handleChange}
              >
                <option value="" disabled> Select difficulty</option>
                <option value="1">⭐ ✰ ✰ ✰ ✰</option>
                <option value="2">⭐⭐ ✰ ✰ ✰</option>
                <option value="3">⭐⭐⭐ ✰ ✰</option>
                <option value="4">⭐⭐⭐⭐ ✰</option>
                <option value="5">⭐⭐⭐⭐⭐</option>
              </select>
              <div className={style.error_container}>
                {errors.difficulty && <p>{errors.difficulty}</p>}
              </div>
            </label>
            <br />
            <label className={style.duration_input}>
              Duration (HH:mm): *
              <input
                type="number"
                name="hours"
                size={2}
                min={0}
                value={duration.hours}
                onChange={handleDuration}
                onInput={onInputDuration}
                placeholder='00' />
              :
              <input
                type="number"
                name="minutes"
                size={2}
                min={0}
                value={duration.minutes}
                onChange={handleDuration}
                onInput={onInputDuration}
                placeholder='00' />
              <br />
              <div className={style.error_container}>
                {errors.duration && <p>{errors.duration}</p>}
              </div>
            </label>
            <br />
            <label>
              Season: *
              <select
                name="season"
                value={activity.season}
                onChange={handleChange}
              >
                <option value="" disabled>Select a season</option>
                <option value="spring">Spring</option>
                <option value="summer">Summer</option>
                <option value="autumn">Autumn</option>
                <option value="winter">Winter</option>
              </select>
              <div className={style.error_container}>
                {errors.season && <p>{errors.season}</p>}
              </div>
            </label>
            <br />
            <label>
              Select countries:
              <input
                type="text"
                value={searchText}
                onChange={handleCountryChange}
                placeholder="Search for a country"
              />
              {searchText.length > 0 && ( // Aquí agregamos la condición para mostrar la lista
                <ul className={style.results}>
                  {allCountries.filter((country) =>
                    country.name.toLowerCase().includes(searchText.toLowerCase())
                  )
                    .map((country) => (
                      <li key={country.id}>
                        <img src={country.flagImg} alt={country.name} />
                        {country.name}
                        <div className={style.buttonDiv}>
                          {selectedCountries.some((countr) => countr.id === country.id) ? (
                            <button type="button" onClick={() => removeCountry(country)}>
                              Remove
                            </button>
                          ) : (
                            <button type="button" onClick={() => addCountry(country)}>
                              Add
                            </button>
                          )}
                        </div>
                      </li>
                    ))}
                </ul>
              )}
              <div className={style.error_container}>
                {errors.countries && <p>{errors.countries}</p>}
              </div>
            </label>
            <br />
            <div className={style.selectedCountriesText}>
              <label >Selected countries: *</label>
            </div>
            {/* Texto "Selected Countries" solo si no hay países seleccionados */}
            {selectedCountries.length === 0 && (
              <div className={style.selected_countries}>
              </div>
            )}
            {selectedCountries.length > 0 &&
              (console.log(selectedCountries),
                <div className={style.selected_countries}>
                  {selectedCountries.map((country) => (
                    <button
                      key={country.id}
                      type="button"
                      onClick={() => removeCountry(country)}
                    >
                      <span>
                        {country.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            <br />
            <div className={style.disableDiv}>
          <div
            className={style.disableClick}
            onClick={handleClickDisable}
          >Create Activity
          </div>

          <button
            type="submit"
            disabled={
              !activity.name ||
              !activity.difficulty ||
              !activity.season ||
              !activity.countries.length ||
              !duration.hours ||
              !duration.minutes ||
              errors.name ||
              errors.difficulty ||
              errors.season ||
              errors.countries ||
              errors.duration
            }

          >Create Activity

          </button>
        </div>
          </form>
          
      )
      : (
          <form onSubmit={handleSubmit} className={style.form_container}>
            <h2>Update an activity!</h2>
            <p>Fields with * cannot be empty</p>
            <select
              name="activity"
              className={style.select_activity}
              value={render.selectedActivity}
              onChange={handleActivitySelect}
            >
              <option value="" disabled>Select an activity to update</option>
              {activities.map(({ id, name }) => {
                return (
                  <option key={id} value={name}>{name}</option>
                )
              })}
            </select>
          </form>
      )
    }
{/* Confirmation Pop-up */}
{showPopup.popup && (
        <Popup
          message=""
          onConfirm={() => handletoHome()}
          onCancel={() => handleStay()}
          successMessage= "Go Home" 
          cancelMessage= "Stay"
          toHome= {true}
        />
      )}
      {/* Notification */}
      {showPopup.success && (
        <SuccessMessage
          message="Activity Created successfully!."
        />
      )}
      {showPopup.error && (
        <ErrorMessage
          message="Error creating activity. Please try again later."
        />
      )}

    </div>
  );
};


export default UpdateActivity;