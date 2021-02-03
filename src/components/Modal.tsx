import React, {useState, useEffect} from 'react'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {operation, getLinks} from '../utils/Loader';

function Modal({movie, findSimilar}:any) {

    const [currentMovie, setCurrentMovie] = useState(movie);

    useEffect(() => {
        getLinks(movie.name).then((data: any) => {
            movie.wiki = (data[1][3][0]);
            movie.imdb = (data[0].imdbID);
            setCurrentMovie(movie);
            console.log('asd')
        })
    });

    return (
        <div className="modal-content">
            <h1>{currentMovie.name}</h1>
            <p>{currentMovie.score}/10</p>
            <ButtonGroup size="large" variant="contained" color="primary" aria-label="contained primary button group">
                <Button target="_blank" href={currentMovie.wiki}>Wikipedia</Button>
                <Button onClick={() => findSimilar(operation.SIMILAR, currentMovie.id)}>Similar movies</Button>
                <Button target="_blank" href={`https://www.imdb.com/title/${currentMovie.imdb}`}>IMDB</Button>
            </ButtonGroup>
        </div>
    )
}

export default Modal
