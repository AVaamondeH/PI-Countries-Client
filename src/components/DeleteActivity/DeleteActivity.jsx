import style from './DeleteActivity.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getActivities } from '../../redux/actions';
import Popup from "../Pop-up/Popup"
import SuccessMessage from '../Pop-up/Success';
import ErrorMessage from '../Pop-up/Error';



function DeleteActivity() {

    const dispatch = useDispatch()
    const { activities } = useSelector(state => state)
    const [showPopup, setShowPopup] = useState({
        popup: false,
        success: false,
        error: false,
        showNotification: false
    });


    useEffect(() => {
        dispatch(getActivities())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    // ! Handlers
    const handleDeleteActivity = () => {
        setShowPopup({
            ...showPopup,
            popup: true
        })
    }

    const handleConfirmDelete = async (activityId) => {
        // Lógica para eliminar la actividad
        // ...
        try {
            const { data } = await axios.delete(`http://127.0.0.1:3001/activities?activityId=${activityId}`)
            console.log(data);
            // Ocultar el pop-up después de eliminar
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
            }, 3000);
            
            window.location.reload();

        } catch (error) {
            console.error('Error deleting activity:', error);
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

    const handleCancelDelete = () => {
        // Cancelar la eliminación, ocultar el pop-up
        console.log(showPopup);
        setShowPopup({
            ...showPopup,
            popup: false
        });
    };



    return (
        <div className={style.container}>
            <div className={style.activities_container}>
                {activities.map(({ id, name, difficulty, duration, season }) => (
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
                        {/* Confirmation Pop-up */}
                        {showPopup.popup && (
                            <Popup
                                key={id}
                                message="You're sure want to delete this activity? This will delete this activity from all countries."
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

        </div>
    );
}

export default DeleteActivity;