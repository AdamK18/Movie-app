import React from 'react';

import './header.css';

import { Search } from '../Search';
import { operation } from '../../api/Loader';

import ReplayIcon from '@material-ui/icons/Replay';
import Button from '@material-ui/core/Button';

const Header = ({ updateMovies, searchTitleText }: any) => {
	return (
		<div className="header">
			<h1
				className="header__text"
				onClick={() => updateMovies(operation.TRENDING, '')}
			>
				Movie Picker
			</h1>

			<div className="header__search-container">
				<Button
					className="header__reload-btn"
					onClick={() => updateMovies(operation.TRENDING, '')}
				>
					<ReplayIcon />
				</Button>
				<Search updateMovies={updateMovies} inputText={searchTitleText} />
			</div>
		</div>
	);
};

export default Header;
