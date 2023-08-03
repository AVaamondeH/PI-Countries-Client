import style from './Cards.module.css';
import Card from "../Card/Card";
import SearchBar from '../Searchbar/Searchbar';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage, filterAndOrder } from '../../redux/actions';
import { useEffect } from "react";

function Cards() {

    const { countries, totalPages, pageNumbers, filters, currentPage } = useSelector(state => state)
    const dispatch = useDispatch();

    // !Use Effect
    useEffect(() => {
        dispatch(filterAndOrder(currentPage, filters))
    }, [currentPage, dispatch, filters])

    // !Handlers
    const handleNextPage = () => {
        const page = currentPage + 1
        dispatch(setCurrentPage(page))
    };

    const handlePrevPage = () => {
        const page = currentPage - 1
        dispatch(setCurrentPage(page))

    };

    const handlePageClick = (page) => {
        dispatch(setCurrentPage(page));
    };

    const handleFirstPage = () => {
        dispatch(setCurrentPage(1));
    };

    const handleLastPage = () => {
        dispatch(setCurrentPage(totalPages));
    };

    // * Render

    if (!countries.length) {
        return (
            <div className={style.noActivity}>
                <h2>THERE ARE NO ACTIVITIES ON THIS CONTINENT</h2>
            </div>
        )
    }

    return (
        <>
            <div className={style.main_container}>
                <div className={style.searchbar}>
                    <SearchBar />
                </div>
                <div className={style.cards} >
                    {countries.map(({ id, name, flagImg, continent }) => {
                        return (
                            <Card
                                key={id}
                                id={id}
                                name={name}
                                flagImg={flagImg}
                                continent={continent}
                            />)
                    })}
                </div>
                {totalPages > 1 && (
                    <div className={style.pagination}>
                        
                        {/* Pagination buttons */}
                        <button onClick={handleFirstPage} disabled={currentPage === 1}>
                            First Page
                        </button>
                        <button onClick={handlePrevPage} disabled={currentPage === 1}>
                            Previous
                        </button>

                        {/* Enumeration buttons */}
                        {pageNumbers.map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageClick(page)}
                                disabled={currentPage === page}
                            >
                                {page}
                            </button>
                        ))}

                        {/* Pagination buttons */}
                        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                            Next
                        </button>
                        <button onClick={handleLastPage} disabled={currentPage === totalPages}>
                            Last Page
                        </button>
                    </div>
                )}
            </div>
        </>);
}

export default Cards;