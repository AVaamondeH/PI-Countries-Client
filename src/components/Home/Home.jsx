import style from './Home.module.css';
import Cards from "../Cards/Cards";
import Sidebar from "../Sidebar/Sidebar";


function Home() {

    return (
        <>
            <div className={style.home_container}>
                <div className={style.sidebar}>
                    <Sidebar />
                </div>
                <div className={style.cards_container}>
                    <Cards />
                </div>
            </div>
        </>
    );
}

export default Home;