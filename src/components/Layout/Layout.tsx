import React, { useState, useEffect } from 'react';
import { Modal } from '../Modal';
import { MovieDisplay } from '../Movie';
import { Header } from '../Header';
import './layout.css';

import { operation, operationPicker } from '../../api/Loader';

import CircularProgress from '@material-ui/core/CircularProgress';

const Layout = () => {
	const [movies, setMovies] = useState<any[]>([]);
	const [searchTitleText, setSearchTitleText] = useState<string>('Trending movies');
	const [spinnerVisibility, setSpinnerVisibility] = useState<boolean>(true);
	const [modalVisibility, setModalVisibility] = useState<boolean>(false);
	const [currentMovie, setCurrentMovie] = useState<object>({ name: '' });

	useEffect(() => {
		updateMovies(operation.TRENDING, '', '');
	}, []);

	const updateMovies = (op: number, id: string, name: string) => {
		setModalVisibility(false);
		setSpinnerVisibility(true);
		operationPicker(op, id)
			.then((response: any) => {
				return response;
			})
			.then((response: any) => {
				setMovies(response);
				updateTitles(op, name, response.length);
			});
	};

	const updateTitles = (op: number, name: string, responseLength: number) => {
		setSpinnerVisibility(false);
		if (op === operation.SEARCH) setSearchTitleText(`Search result for ${name}`);
		else if (op === operation.SIMILAR) setSearchTitleText(`Similar movies like ${name}`);
		else setSearchTitleText('Trending movies');
	};

	const getMovie = (movie: any) => {
		setCurrentMovie(movie);
		setModalVisibility(true);
	};

	return (
		<div className="layout">
			<Header updateMovies={updateMovies} />

			<h1 className="layout__title">{searchTitleText}</h1>

			{!movies.length && 'No movies found'}

			<MovieDisplay movies={movies} getMovie={getMovie} />

			{modalVisibility && (
				<Modal modalVisibility={modalVisibility} setModalVisibility={setModalVisibility} currentMovie={currentMovie} updateMovies={updateMovies} />
			)}

			<div className="spinner-container">
				<CircularProgress style={{ display: spinnerVisibility ? 'block' : 'none' }} />
			</div>
		</div>
	);
};

export default Layout;
