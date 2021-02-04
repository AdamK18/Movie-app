import React, {useState} from 'react'

import SearchBar from "material-ui-search-bar";

import {operation} from '../utils/Loader';

function Search({updateMovies, inputText}:any) {
    const [userInput, setUserInput] = useState('');

    return (
        <div>
            <h2 className="search-title">Search for a movie</h2>

            <SearchBar onChange={(value) => setUserInput(value)}  className="searchBar" placeholder="Interstellar" cancelOnEscape
            onRequestSearch={() => updateMovies(userInput === '' ? operation.TRENDING : operation.SEARCH, userInput)} 
            onCancelSearch={() => updateMovies(operation.TRENDING, '')} />

            <h1 className="search-title">{inputText}</h1>
        </div>
    )
}

export default Search
