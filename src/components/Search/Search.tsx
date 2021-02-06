import React, { useState } from 'react';

import SearchBar from 'material-ui-search-bar';

import './search.css';

import { operation } from '../../api/Loader';

const Search = ({ updateMovies }: any) => {
	const [userInput, setUserInput] = useState('');

	return (
		<SearchBar
			value={userInput}
			onChange={(value) => setUserInput(value)}
			className="searchBar"
			placeholder="Interstellar"
			cancelOnEscape
			onRequestSearch={() => updateMovies(userInput === '' ? operation.TRENDING : operation.SEARCH, userInput)}
			onCancelSearch={() => updateMovies(operation.TRENDING, '')}
		/>
	);
};

export default Search;
