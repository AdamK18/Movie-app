import React, { useState, useEffect } from 'react';
import { operation, getLinks } from '../../api/Loader';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CircularProgress from '@material-ui/core/CircularProgress';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import './modal.css';

const Modal = ({
	currentMovie,
	findSimilar,
	modalVisibility,
	setModalVisibility,
}: any) => {
	const [movieContent, setMovieContent] = useState({
		wiki: '',
		imdb: '',
		extract: '',
	});

	useEffect(() => {
		getLinks(currentMovie.name)
			.then((data: any) => {
				const content = {
					wiki: data[1].content_urls.desktop.page,
					extract: data[1].extract,
					imdb: data[0].imdbID,
				};
				setMovieContent(content);
			})
			.catch((data: any) => {
				const content = {
					wiki: '',
					extract: 'Error loading movie details',
					imdb: '',
				};
				setMovieContent(content);
			});
	}, [currentMovie]);

	let disableWiki = movieContent.wiki === '';
	let disableImdb = movieContent.imdb === '';
	const imdbBaseUrl = 'https://www.imdb.com/title/';

	return (
		<Rodal
			className="modal"
			visible={modalVisibility}
			onClose={() => setModalVisibility(false)}
			closeOnEsc
		>
			<div className="modal__content">
				{currentMovie.img === null ? (
					<div>
						<p>No image found</p>
						<SentimentVeryDissatisfiedIcon></SentimentVeryDissatisfiedIcon>
					</div>
				) : (
					<img className="modal__img" src={currentMovie.img.url} alt="" />
				)}
				<div className="modal__text">
					<h1>{currentMovie.name}</h1>
					<p>{currentMovie.tagline}</p>
					<p>{currentMovie.score}/10</p>
					<div className="modal__extract">
						{movieContent.extract === '' ? (
							<CircularProgress />
						) : (
							<p>{movieContent.extract}</p>
						)}
					</div>
				</div>
			</div>

			<div className="modal__extract--mobile">
				{movieContent.extract === '' ? (
					<CircularProgress />
				) : (
					<p>{movieContent.extract}</p>
				)}
			</div>

			<ButtonGroup
				size="large"
				variant="contained"
				color="primary"
				aria-label="contained primary button group"
				className="modal__button-group"
			>
				<Button
					className="modal__button"
					target="_blank"
					href={movieContent.wiki}
					disabled={disableWiki}
				>
					Wikipedia
				</Button>
				<Button
					className="modal__button"
					onClick={() => findSimilar(operation.SIMILAR, currentMovie.id)}
				>
					Similar movies
				</Button>
				<Button
					className="modal__button"
					target="_blank"
					href={imdbBaseUrl + movieContent.imdb}
					disabled={disableImdb}
				>
					IMDB
				</Button>
			</ButtonGroup>
		</Rodal>
	);
};

export default Modal;
