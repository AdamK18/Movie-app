import React from 'react';

import './header.css';
import { operation } from '../../api/Loader';

import { Search } from '../Search';

const Header = ({ updateMovies }: any) => {
	return (
		<div className="header">
			<h1
				onClick={() => {
					updateMovies(operation.TRENDING, '');
				}}
				className="header__text"
			>
				Movie Picker
			</h1>

			<Search updateMovies={updateMovies} />
		</div>
	);
};

export default Header;
