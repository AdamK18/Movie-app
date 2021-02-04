import React, {useState, useEffect} from 'react'
import Card from './Card'
import Modal from './Modal';
import Search from './Search'

import {operation, operationPicker} from '../utils/Loader';

import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import Rodal from 'rodal';
import 'rodal/lib/rodal.css';


function Layout() {
    const [movies, setMovies] = useState<any[]>([])
    const [inputText, setUserInputText] = useState('Trending movies');
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
            if(response.length === 0) setUserInputText("No movies found");
            else if(op === operation.SEARCH) setUserInputText(`Search result for ${param}`);
            else if(op === operation.SIMILAR) setUserInputText("Similar movies");
            else setUserInputText('Trending movies');
        });
    }

    const getMovie = (movie:any) => {
        setCurrentMovie(movie);
        setModalVisibility(true);
    }
    
    return (
        <div className="layout">
            <CircularProgress style={{display: spinnerVisibility ? 'block' : 'none' }} className="spinner"/>

            <Search updateMovies={updateMovies} inputText={inputText}/>

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
