import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchSpotsThunk } from '../../../store/spots';
import './SearchBar.css'


function SearchBar() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [keyword, setKeyword] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault()
        if (keyword.trim().length === 0) {
            return
        }
        const response = await dispatch(searchSpotsThunk(keyword))
        // console.log("response.Spots----------", response.Spots.length)
        if (!response.Spots.length) {
            await window.alert(`There are no place match your search for ${keyword}`)
            history.push('/')
        }
        if (response.Spots.length) {
            history.push(`/spots/search/${keyword}`)
        }
        setKeyword("")
    }



    return (
        <div className="nav-search-bar">

            <form onSubmit={handleSearch} className={`spot-search-form`}>
                {/* <div className="search-left-c">All</div> */}
                <div className="nav-search-bar-c">
                    <input
                        type="text"
                        className="spot-search"
                        placeholder='Search for Anywhere'
                        onChange={(e) => setKeyword(e.target.value)}
                        value={keyword}
                        maxLength='100'
                    />
                    <div className="search-icon">
                        <button type='submit'><img className="search-icon" src={searchlogo} /></button>
                    </div>
                </div>

            </form>

        </div>
    );
}

export default SearchBar;
