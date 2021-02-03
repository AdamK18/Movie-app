import React, {useState,useEffect} from 'react'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {operation, getLinks} from '../utils/Loader';

function Modal({currentMovie, findSimilar}:any) {
    const [movieContent, setContentMovie] = useState({wiki: "", imdb: ""});

    useEffect(() => {
        getLinks(currentMovie.name).then((data:any) => {
            movieContent.wiki = data[1][3][0]
            movieContent.imdb = data[0].imdbID
            setContentMovie({wiki: data[1][3][0], imdb: data[0].imdbID})
        });
    }, [currentMovie]);

    return (
        <div key={currentMovie} className="modal-content">
            <h1>{currentMovie.name}</h1>
            <p>{currentMovie.score}/10</p>
            <ButtonGroup size="large" variant="contained" color="primary" aria-label="contained primary button group">
                <Button target="_blank" href={movieContent.wiki}>Wikipedia</Button>
                <Button onClick={() => findSimilar(operation.SIMILAR, currentMovie.id)}>Similar movies</Button>
                <Button target="_blank" href={`https://www.imdb.com/title/${movieContent.imdb}`}>IMDB</Button>
            </ButtonGroup>
        </div>
    )
}

export default Modal
