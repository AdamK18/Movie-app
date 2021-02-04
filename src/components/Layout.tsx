import React, {useState, useEffect} from 'react'
import Card from './Card'
import Modal from './Modal';

import {operation, operationPicker} from '../utils/Loader';

import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import SearchBar from "material-ui-search-bar";

import Rodal from 'rodal';
import 'rodal/lib/rodal.css';


function Layout() {
    const [movies, setMovies] = useState<any[]>([])
    const [input, setInput] = useState('');
    const [inputText, setInputText] = useState('Trending movies');
    const [spinnerVisibility, setSpinnerVisibility] = useState(true);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [currentMovie, setCurrentMovie] = useState({});

    useEffect(() => {
        updateMovies(operation.TRENDING,'');
    }, []);

    const updateMovies = (op:number, param:string) => {
        setModalVisibility(false);
        setSpinnerVisibility(true);
        operationPicker(op, param).then((response:any) => {
            return response;
        }).then((response:any) => {
            setMovies(response);
            setSpinnerVisibility(false);
            if(response.length === 0) setInputText("No movies found");
            else if(op === operation.SEARCH) setInputText(`Search result for ${param}`);
            else if(op === operation.SIMILAR) setInputText("Similar movies");
            else setInputText('Trending movies');
        });
    }

    const getMovie = (movie:any) => {
        setCurrentMovie(movie);
        setModalVisibility(true);
    }
    
    return (
        <div className="layout">
            <CircularProgress style={{display: spinnerVisibility ? 'block' : 'none' }} className="spinner"/>

            <h2>Search for a movie</h2>

            <SearchBar onChange={(value) => setInput(value)}  className="searchBar" placeholder="Interstellar" cancelOnEscape
            onRequestSearch={() => updateMovies(input === '' ? operation.TRENDING : operation.SEARCH, input)} 
            onCancelSearch={() => updateMovies(operation.TRENDING, '')} />

            <h1>{inputText}</h1>

            <Grid className="grid" container spacing={4} alignItems="center" justify="center">
                {movies.map((movie, i) => (
                    <Card movie={movie} key={i} getMovie={getMovie}/>
                ))}
            </Grid>

            {movies.length === 0 ? (
                <Button onClick={() => updateMovies(operation.TRENDING, '')}>RELOAD</Button>
            ) : ''}

            {modalVisibility ? (
                <Rodal visible={modalVisibility} onClose={() => setModalVisibility(false)} closeOnEsc>
                    <Modal currentMovie={currentMovie} findSimilar={updateMovies}/>
                </Rodal>
            ) : ''}
        </div>
    )
}

export default Layout
