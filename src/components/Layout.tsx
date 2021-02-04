import React, {useState, useEffect} from 'react'
import Modal from './Modal';
import Search from './Search'
import MovieDisplay from './MovieDisplay'

import {operation, operationPicker} from '../utils/Loader';

import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

function Layout() {
    const [movies, setMovies] = useState<any[]>([])
    const [inputText, setUserInputText] = useState('Trending movies');
    const [spinnerVisibility, setSpinnerVisibility] = useState(true);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [currentMovie, setCurrentMovie] = useState({name:''});

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
            
            <MovieDisplay movies={movies} getMovie={getMovie}/>

            <Button style={{display: movies.length > 0 ? "none" : 'block'}} 
                    onClick={() => updateMovies(operation.TRENDING, '')}>RELOAD
            </Button>
            
            <Modal modalVisibility={modalVisibility} setModalVisibility={setModalVisibility} 
            currentMovie={currentMovie} findSimilar={updateMovies}/>
        </div>
    )
}

export default Layout
