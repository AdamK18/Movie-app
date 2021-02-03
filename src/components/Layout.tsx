import React, {useState, useEffect} from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchBar from "material-ui-search-bar";
import {operation, operationPicker, getLinks} from '../utils/Loader';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import Grid from '@material-ui/core/Grid';
import Card from './Card'
import Modal from './Modal';

function Layout() {
    const [data, setData] = useState<any[]>([])
    const [input, setInput] = useState('');
    const [searchText, setSearchText] = useState('Trending movies');
    const [showSpinner, setShowSpinner] = useState(true);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [currentMovie, setCurrentMovie] = useState({});
    const [links, setLinks] = useState({});

    useEffect(() => {
        updateMovies(operation.TRENDING,'');
    }, []);

    const updateMovies = (op:number, param:string) => {
        setModalVisibility(false);
        setShowSpinner(true);
        operationPicker(op, param).then((result:any) => {
            setData(result);
            setShowSpinner(false);
            if(op === operation.SEARCH) setSearchText(`Search result for "${param}"`);
            else setSearchText('Trending movies');
        });
    }

    const getMovie = (movie:any) => {
        setCurrentMovie(movie);
        setModalVisibility(true);
        getLinks(movie.name).then((data:any) => {
            setLinks({wiki: data[1][3][0], imdb: data[0].imdbID})
        });
    }
    
    return (
        <div className="layout">
            <CircularProgress style={{display: showSpinner ? 'block' : 'none' }} className="spinner"/>

            <h2>Search for a movie</h2>

            <SearchBar onChange={(value) => setInput(value)}  className="searchBar" placeholder="Interstellar" cancelOnEscape
            onRequestSearch={() => updateMovies(input === '' ? operation.TRENDING : operation.SEARCH, input)} 
            onCancelSearch={() => updateMovies(operation.TRENDING, '')} />

            <h1>{searchText}</h1>

            <Grid className="grid" container spacing={4} alignItems="center" justify="center">
                {data.map((movie, i) => (
                    <Card movie={movie} key={i} getMovie={getMovie}/>
                ))}
            </Grid>

            {modalVisibility ? (
                <Rodal visible={modalVisibility} onClose={() => setModalVisibility(false)} closeOnEsc>
                    <Modal links={links} currentMovie={currentMovie} findSimilar={updateMovies}/>
                </Rodal>
            ) : ''}
        </div>
    )
}

export default Layout
