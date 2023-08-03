import style from './Sidebar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { filterAndOrder, getActivities, updateFilters, setCurrentPage } from '../../redux/actions';
import { useEffect } from "react";

function Sidebar() {

    const dispatch = useDispatch()
    const { activities, filters, currentPage } = useSelector(state => state)

    useEffect(() => {
        dispatch(getActivities())
        document.getElementById("continent-select").value = filters.continent;
        document.getElementById("order-select").value = filters.order;
        document.getElementById("activity-select").value = filters.activity;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    const handleClick = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        const toFilter = {
            ...filters,
            [name]: value
        }
        dispatch(updateFilters(toFilter));
        dispatch(setCurrentPage(1))
        dispatch(() => filterAndOrder(currentPage, { order: value }));
    }

    const handleReset = () => {
        const reset = {
            continent: 'All',
            order: 'asc',
            activity: '',
        }
        dispatch(setCurrentPage(1))
        dispatch(updateFilters(reset))

        document.getElementById("continent-select").value = "All";
        document.getElementById("order-select").value = 'asc';
        document.getElementById("activity-select").value = "";
    }

    return (
        <>
            <div className={style.container} >
                <div className={style.sidebar}>
                    <h3>Filter by:</h3>
                    <select name="continent" onChange={handleClick} id="continent-select">
                        <option value="All">All</option>
                        <option value="Africa">Africa</option>
                        <option value="Antarctica">Antarctica</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="North America">North America</option>
                        <option value="South America">South America</option>
                        <option value="Oceania">Oceania</option>
                    </select>

                    <h3>Order by:</h3>
                    <select name="order" onChange={handleClick} id="order-select">
                        <option value="asc">Ascendant</option>
                        <option value="dsc">Descendant</option>
                        <option value="Hpopu">Highest Population</option>
                        <option value="Lpopu">Lowest Population</option>
                    </select>

                    <h3>Activity:</h3>
                    <select name="activity" onChange={handleClick} id="activity-select">
                        <option value="" >None</option>
                        {activities.map(({ id, name }) => {
                            return (
                                <option key={id} value={name}>{name}</option>
                            )
                        })}
                    </select>
                    <div className={style.reset}>
                        <button onClick={handleReset}>Reset filters</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sidebar;