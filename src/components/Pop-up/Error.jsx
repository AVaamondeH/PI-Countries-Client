import style from "./Popup.module.css"

// eslint-disable-next-line react/prop-types
const ErrorMessage = ({message}) => {
    return (
        <div className={style.container}>
            <div className={style.content}>
                <div className={style.text}>
                    <p>{message}</p>
                </div>

            </div>
        </div>
    )
};

export default ErrorMessage;