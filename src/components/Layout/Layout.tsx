import React, {useState, useEffect} from 'react'
import {Modal} from '../Modal';
import {Search} from '../Search'
import {MovieDisplay} from '../Movie'
import './layout.css'

import {operation, operationPicker} from '../../api/Loader';

import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

const Layout = () => {
    const [movies, setMovies] = useState<any[]>([])
    const [searchTitleText, setSearchTitleText] = useState('Trending movies');
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
            updateTitles(op, param, response.length);
        });
    }

    const updateTitles = (op:number, param:string, responseLength:number) => {
        setSpinnerVisibility(false);
        if(responseLength === 0) setSearchTitleText("No movies found");
        else if(op === operation.SEARCH) setSearchTitleText(`Search result for ${param}`);
        else if(op === operation.SIMILAR) setSearchTitleText("Similar movies");
        else setSearchTitleText('Trending movies');
    }

    const getMovie = (movie:any) => {
        setCurrentMovie(movie);
        setModalVisibility(true);
    }
    
    return (
        <div className="layout">
            <CircularProgress style={{display: spinnerVisibility ? 'block' : 'none' }} className="spinner"/>

            <Search updateMovies={updateMovies} inputText={searchTitleText}/>
            
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
