import React from 'react'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {operation} from '../utils/Loader';

function Modal({currentMovie, findSimilar, links}:any) {

    return (
        <div key={currentMovie} className="modal-content">
            <h1>{currentMovie.name}</h1>
            <p>{currentMovie.score}/10</p>
            <ButtonGroup size="large" variant="contained" color="primary" aria-label="contained primary button group">
                <Button target="_blank" href={links.wiki}>Wikipedia</Button>
                <Button onClick={() => findSimilar(operation.SIMILAR, currentMovie.id)}>Similar movies</Button>
                <Button target="_blank" href={`https://www.imdb.com/title/${links.imdb}`}>IMDB</Button>
            </ButtonGroup>
        </div>
    )
}

export default Modal
