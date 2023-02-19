import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkSearchSpots } from '../../../store/spots';
import searchlogo from '../../../images/searchlogo.PNG';
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
        const response = await dispatch(thunkSearchSpots(keyword))
        // console.log("response.Spots----------", response.Spots.length)
        if (!response.Spots?.length) {
            await window.alert(`There are no place match your search for ${keyword}`)
            history.push('/')
        }
        if (response.Spots?.length) {
            history.push(`/spots/search/${keyword}`)
        }
        setKeyword("")
    }



    return (
        <div className="search-bar">

            <form onSubmit={handleSearch} className={`spot-search-form`}>
                {/* <div className="search-left-c">All</div> */}
                <div className="search-bar-input">
                    <input
                        type="text"
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
