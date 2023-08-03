import style from './Home.module.css';
import { useState } from 'react';
import Cards from "../Cards/Cards";
import Sidebar from "../Sidebar/Sidebar";


function Home () {

    const [currentPage, setCurrentPage] = useState(1);
    return ( 
        <>
            <div className={style.home_container}>

                <div className={style.sidebar}>
                    <Sidebar
                        setCurrentPage={setCurrentPage}
                    />
                </div>
                <div className={style.cards_container}>
                    <Cards
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>
        </>
    );
}

export default Home ;

/** Se usan estados aca en el Home para pararlos por props a los componentes que los van a utilizar
 * entre si
 */
