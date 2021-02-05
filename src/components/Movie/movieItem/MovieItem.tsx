import React from 'react'
import './movieItem.css'

import Grid from '@material-ui/core/Grid';

import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

const MovieItem = ({movie, getMovie} : any) => {
    return (
        <Grid onClick={() => getMovie(movie)} className="grid__item" item xs={12} sm={6} md={4} lg={3}>
            {movie.img === null ? ( 
            <div>
                <p>No image found</p>
                <SentimentVeryDissatisfiedIcon></SentimentVeryDissatisfiedIcon> 
            </div>
            ) : (
            <img className="grid__img" src={movie.img.url} alt={movie.name}/>
            )}
            <div className="grid__title">
                <h3>{movie.name}</h3>
                <p>{movie.score}/10</p>
            </div>
        </Grid>
    )
}

export default MovieItem
