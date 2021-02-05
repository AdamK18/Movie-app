import React, { useState, useEffect } from 'react';
import { Modal } from '../Modal';
import { MovieDisplay } from '../Movie';
import { Header } from '../Header';
import './layout.css';

import { operation, operationPicker } from '../../api/Loader';

import CircularProgress from '@material-ui/core/CircularProgress';

const Layout = () => {
	const [movies, setMovies] = useState<any[]>([]);
	const [searchTitleText, setSearchTitleText] = useState('Trending movies');
	const [spinnerVisibility, setSpinnerVisibility] = useState(true);
	const [modalVisibility, setModalVisibility] = useState(false);
	const [currentMovie, setCurrentMovie] = useState({ name: '' });

	useEffect(() => {
		updateMovies(operation.TRENDING, '');
	}, []);

	const updateMovies = (op: number, param: string) => {
		setModalVisibility(false);
		setSpinnerVisibility(true);
		operationPicker(op, param)
			.then((response: any) => {
				return response;
			})
			.then((response: any) => {
				setMovies(response);
				updateTitles(op, param, response.length);
			});
	};

	const updateTitles = (op: number, param: string, responseLength: number) => {
		setSpinnerVisibility(false);
		if (responseLength === 0) setSearchTitleText('No movies found');
		else if (op === operation.SEARCH)
			setSearchTitleText(`Search result for ${param}`);
		else if (op === operation.SIMILAR) setSearchTitleText('Similar movies');
		else setSearchTitleText('Trending movies');
	};

	const getMovie = (movie: any) => {
		setCurrentMovie(movie);
		setModalVisibility(true);
	};

	return (
		<div className="layout">
			<Header updateMovies={updateMovies} inputText={searchTitleText} />

			<h1 className="search-title">{searchTitleText}</h1>

			<MovieDisplay movies={movies} getMovie={getMovie} />

			{modalVisibility && (
				<Modal
					modalVisibility={modalVisibility}
					setModalVisibility={setModalVisibility}
					currentMovie={currentMovie}
					findSimilar={updateMovies}
				/>
			)}

			<CircularProgress
				style={{ display: spinnerVisibility ? 'block' : 'none' }}
				className="spinner"
			/>
		</div>
	);
};

export default Layout;
