import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import style from './Detail.module.css';
import Popup from "../Pop-up/Popup"
import SuccessMessage from '../Pop-up/Success';
import ErrorMessage from '../Pop-up/Error';

const Detail = () => {
  const { id } = useParams();
  const [country, setCountry] = useState({});
  const [showPopup, setShowPopup] = useState({
    popup: false,
    success: false,
    error: false,
    showNotification: false
  });

  useEffect(() => {
    const getDetail = async (id) => {
      const { data } = await axios(`http://127.0.0.1:3001/countries/${id}`)
      if (!data.data.name) {
        return setCountry({});
      }

      setCountry(data.data);
    }
    getDetail(id)
  }, [id]);

  // ! Handlers
  const handleDeleteActivity = () => {
    setShowPopup({
      ...showPopup,
      popup: true
    })
  }

  const handleConfirmDelete = async (activityId) => {
    try {
      await axios.delete(`http://127.0.0.1:3001/activities?activityId=${activityId}&countryId=${id}`)

      setShowPopup({
        ...showPopup,
        success: true,
        popup: true
      });

      setTimeout(() => {
        setShowPopup({
          ...showPopup,
          success: false,
          popup: false
        });
        window.location.reload();
      }, 2000);

    } catch (error) {
      console.error('Error deleting activity:', error);
      setShowPopup({
        ...showPopup,
        error: true
      });

      setTimeout(() => {
        setShowPopup({
          ...showPopup,
          popup: false,
          error: false,
        });
      }, 3000);
    }
  };

  const handleCancelDelete = () => {
    setShowPopup({
      ...showPopup,
      popup: false
    });
  };

// * Render
  return (
    <div className={style.container}>
      <div className={style.details}>
        <div className={style.img_container}>
          <img src={country?.flagImg} alt="" className={style.img} />
        </div>
        <div className={style.text_container}>
          <h3 className={style.name}>{country?.name}</h3>
          <h3>Continent: {country?.continent}</h3>
          <h3>Capital: {country?.capital}</h3>
          <h3>Subregion: {country?.subregion}</h3>
          <h3>Area: {country?.area}</h3>
          <h3>Population: {country?.population}</h3>
        </div>
      </div>

      {/*Activities Render*/}
      <div>
        {country?.Activities ? (
          <div className={style.activities_container}>
            {country?.Activities.map(({ id, name, difficulty, duration, season }) => (
              <div key={id} className={style.activity_containerCard}>
                <div className={style.activity_card}>
                  <h3 className={style.activity_name}>{name}</h3>
                  <div className={style.activity_detail}>
                    <p>Difficulty: {difficulty}</p>
                    <p>Duration: {duration}</p>
                    <p>Season: {season}</p>
                  </div>
                  <div className={style.delete}>
                    <button onClick={() => handleDeleteActivity()}>Delete Activity</button>
                  </div>
                </div>

                {/* Confirmation Pop-up if delete*/}
                {showPopup.popup && (
                  <Popup
                    key={id}
                    message="You're sure want to delete this activity from this country? This action is irreversible"
                    onConfirm={() => handleConfirmDelete(id)}
                    onCancel={() => handleCancelDelete()}
                    successMessage="Aceptar"
                    cancelMessage="Cancelar"
                    toHome={false}
                  />
                )}
                {/* Notification */}
                {showPopup.success && (
                  <SuccessMessage
                    message="Activity deleted successfully!."
                  />
                )}
                {showPopup.error && (
                  <ErrorMessage
                    message="Error deleting activity. Please try again later."
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className={style.no_activities_message}>
            <h3>This country does not have activities</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detail;