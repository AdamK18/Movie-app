import React from 'react'

import Card from './Card'

import Grid from '@material-ui/core/Grid';

function MovieDisplay({movies, getMovie}:any) {
    return (
        <Grid className="grid" container spacing={4} alignItems="center" justify="center">
            {movies.map((movie:any, i:number) => (
                <Card movie={movie} key={i} getMovie={getMovie}/>
            ))}
        </Grid>
    )
}

export default MovieDisplay
