import React from 'react'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {operation} from '../utils/Loader';

function Modal({movie, findSimilar}:any) {

    return (
        <div className="modal-content">
            <h1>{movie.name}</h1>
            <p>{movie.score}/10</p>
            <ButtonGroup size="large" variant="contained" color="primary" aria-label="contained primary button group">
                <Button target="_blank" href={movie.wiki}>Wikipedia</Button>
                <Button onClick={() => findSimilar(operation.SIMILAR, movie.id)}>Similar movies</Button>
                <Button target="_blank" href={`https://www.imdb.com/title/${movie.imdb}`}>IMDB</Button>
            </ButtonGroup>
        </div>
    )
}

export default Modal
