import style from './Card.module.css';
import { NavLink } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function Card ({ id, name, flagImg, continent }) {
    return ( 
    <>                     
    <NavLink 
        to={`/detail/${id}`} 
        className={style.links}
    >
            <div className={style.card}>
                <img src={flagImg} alt="Flag" />
                <h3>{name}</h3>
                <p>{continent}</p>
            </div>
    </NavLink>
    </> );
}

export default Card ;