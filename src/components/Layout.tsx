import React, {useState, useEffect} from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchBar from "material-ui-search-bar";
import {operation, operationPicker} from '../utils/Loader';
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
    const [currentMovie, setCurrentMovie] = useState('');

    useEffect(() => {
        updateMovies(operation.TRENDING,'');
    }, []);

    const updateMovies = (op:number, input:string) => {
        setShowSpinner(true);
        operationPicker(op, input).then((result:any) => {
            setData(result);
            setShowSpinner(false);
        });
    }

    const getMovie = (movie:any) => {
        setCurrentMovie(movie);
        setModalVisibility(true);
    }

    const findSimilar = (id:string) => {
        setModalVisibility(false);
        updateMovies(operation.SIMILAR, id);
    }
    
    return (
        <div className="layout">
            <CircularProgress style={{display: showSpinner ? 'block' : 'none' }} className="spinner"/>

            <h2>Search for a movie</h2>

            <SearchBar onChange={(value) => setInput(value)}  className="searchBar" 
            onRequestSearch={() => updateMovies(operation.SEARCH, input)} placeholder="Interstellar" 
            onCancelSearch={() => updateMovies(operation.TRENDING, '')} cancelOnEscape/>

            <h1>{searchText}</h1>

            <Grid className="grid" container spacing={4} alignItems="center" justify="center">
                {data.map((movie, i) => (
                    <Grid onClick={() => getMovie(movie)} key={i} className="grid__item" item xs={12} sm={6} md={4} lg={3}>
                        <Card movie={movie}/>
                    </Grid>
                ))}
            </Grid>

            <Rodal visible={modalVisibility} onClose={() => setModalVisibility(false)} closeOnEsc>
                <Modal movie={currentMovie} findSimilar={findSimilar}/>
            </Rodal>
        </div>
    )
}

export default Layout
