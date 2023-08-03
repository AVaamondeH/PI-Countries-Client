import style from "./Landing.module.css"
import { NavLink } from "react-router-dom"


function Landing() {

    return (
        <div className={style.container}>
            <div className={style.text}>
                <h1>Welcome to the countries of the world</h1>
                <h3>click on the globe to continue</h3>
            </div>
            <iframe src="https://www.youtube.com/embed/NtOwzU5Rpp8?controls=0&autoplay=1&mute=1&playsinline=1&playlist=NtOwzU5Rpp8&loop=1"></iframe>
            <NavLink to="/home">
                <div className={style.earth}></div>
            </NavLink>
        </div>
    )
}

export default Landing
