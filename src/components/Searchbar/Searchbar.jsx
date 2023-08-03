import { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import style from "./Searchbar.module.css"


function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [errors, setErrors] = useState(false);



  useEffect(() => {
    const searchHandler = async (searchValue) => {
      try {
        // Realiza la solicitud al backend solo si el valor de búsqueda no está vacío.
        if (searchValue.trim() !== '') {
          const encodedSearchValue = encodeURIComponent(searchValue.trim());
          const { data } = await axios.get(`http://localhost:3001/countries/search?name=${encodedSearchValue}`);
          if (data.data.length) {
            setFilteredCountries(data.data);
            setErrors(false); // Si hay resultados, restablece el estado de "countryNotFound"
          } else {
            setFilteredCountries([]); // Si no hay resultados, muestra una lista vacía
            setErrors(true); // Actualiza el estado de "countryNotFound" a true
          }
        } else {
          // Si el valor de búsqueda está vacío, muestra una lista vacía.
          setFilteredCountries([]);
          setErrors(false);
        }

      } catch (error) {
        setErrors(true)
      }
    };
    // Convertir el valor de búsqueda a minúsculas antes de realizar la búsqueda
    const formattedSearchValue = searchValue.toLowerCase();
    searchHandler(formattedSearchValue);
  }, [searchValue]);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);
  };

  return (
    <div className={style.search_container}>
      <input
        type="text"
        placeholder="Search country..."
        value={searchValue}
        onChange={handleInputChange}
      />
      <ul className={style.results}>
        {errors
          ? (
            <li>Country not found</li>
          )
          : (
            filteredCountries.map((country) => (
              <li key={country.id}>
                <div className={style.divL}>
                  <img src={country.flagImg} alt="" />
                </div>
                <div className={style.divR}>
                  <NavLink to={`/detail/${country.id}`}>
                    <h3>{country.name}</h3>
                  </NavLink>
                  <p>({country.continent})</p>
                </div>
              </li>
            ))
          )}
      </ul>
    </div>
  );
}

export default SearchBar;
