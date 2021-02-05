import React, {useState,useEffect} from 'react'
import {operation, getLinks} from '../../api/Loader';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CircularProgress from '@material-ui/core/CircularProgress';

import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import './modal.css'

const Modal  = ({currentMovie, findSimilar, modalVisibility, setModalVisibility}:any) => {
    const [movieContent, setMovieContent] = useState({wiki: "", imdb: "", extract: ""});

    useEffect(() => {
        if(currentMovie.name==='') return

        getLinks(currentMovie.name).then((data:any) => {
            const content = {wiki: data[1].content_urls.desktop.page, extract:data[1].extract, imdb: data[0].imdbID}
            setMovieContent(content);
        }).catch((data:any) => {
            const content = {wiki: "", extract: "Error loading movie details", imdb: ""}
            setMovieContent(content);
        });
    }, [currentMovie]);

    let disableWiki = movieContent.wiki === "";
    let disableImdb = movieContent.imdb === "";
    const imdbBaseUrl = "https://www.imdb.com/title/"

    return (
        <Rodal className="modal-content" visible={modalVisibility} onClose={() => setModalVisibility(false)} closeOnEsc>
            <h1>{currentMovie.name}</h1>
            <p>{currentMovie.score}/10</p>

            <ButtonGroup size="large" variant="contained" color="primary" aria-label="contained primary button group">
                <Button target="_blank" href={movieContent.wiki} disabled={disableWiki}>Wikipedia</Button>
                <Button onClick={() => findSimilar(operation.SIMILAR, currentMovie.id)}>Similar movies</Button>
                <Button target="_blank" href={imdbBaseUrl + movieContent.imdb} disabled={disableImdb}>IMDB</Button>
            </ButtonGroup>

            {movieContent.extract === "" ? (
                <CircularProgress/>
            ) : (
                <p>{movieContent.extract}</p>
            )}
        </Rodal>
    )
}

export default Modal
