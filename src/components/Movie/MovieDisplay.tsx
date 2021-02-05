import React from 'react';

import MovieItem from './movieItem/MovieItem';
import './movie.css';

import Grid from '@material-ui/core/Grid';

const MovieDisplay = ({ movies, getMovie }: any) => {
	return (
		<Grid
			className="grid"
			container
			spacing={4}
			alignItems="center"
			justify="center"
		>
			{movies.map((movie: any, i: number) => (
				<MovieItem movie={movie} key={i} getMovie={getMovie} />
			))}
		</Grid>
	);
};

export default MovieDisplay;
