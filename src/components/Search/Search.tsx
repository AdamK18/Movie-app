import React, { useState } from 'react';

import SearchBar from 'material-ui-search-bar';
import ReplayIcon from '@material-ui/icons/Replay';
import Button from '@material-ui/core/Button';

import './search.css';

import { operation } from '../../api/Loader';

const Search = ({ updateMovies }: any) => {
	const [userInput, setUserInput] = useState('');

	return (
		<div className="header__search-container">
			<Button
				className="header__reload-btn"
				onClick={() => {
					setUserInput('');
					updateMovies(operation.TRENDING, '');
				}}
			>
				<ReplayIcon />
			</Button>

			<SearchBar
				value={userInput}
				onChange={(value) => setUserInput(value)}
				className="searchBar"
				placeholder="Interstellar"
				cancelOnEscape
				onRequestSearch={() =>
					updateMovies(
						userInput === '' ? operation.TRENDING : operation.SEARCH,
						userInput
					)
				}
				onCancelSearch={() => updateMovies(operation.TRENDING, '')}
			/>
		</div>
	);
};

export default Search;
