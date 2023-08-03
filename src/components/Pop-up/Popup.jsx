import { NavLink } from "react-router-dom";
import style from "./Popup.module.css"

// eslint-disable-next-line react/prop-types
const ConfirmationPopup = ({ message, onConfirm, onCancel, successMessage, cancelMessage, toHome }) => {
    return (
        <div className={style.container}>
            <div className={style.content}>
                <div className={style.text}>
                    <p>{message}</p>
                </div>
                {toHome
                    ? (
                        <div className={style.buttons}>
                            <NavLink to="/home">
                                <button onClick={onConfirm}>{successMessage}</button>
                            </NavLink>
                            <button onClick={onCancel}>{cancelMessage}</button>
                        </div>
                    )
                    : (
                        <div className={style.buttons}>
                            <button onClick={onConfirm}>{successMessage}</button>
                            <button onClick={onCancel}>{cancelMessage}</button>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default ConfirmationPopup;