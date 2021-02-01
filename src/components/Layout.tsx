import React, {useState, useEffect} from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchBar from "material-ui-search-bar";
import {operation, operationPicker, getWiki} from '../utils/Loader';
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
        asd()
    }, []);

    const asd = async () => {
        const resp = await fetch('/api/imdb/?q=foo');
        const results = await resp.json().then((result:any) => {
            console.log(result)
        });
    }

    const updateMovies = (op:number, param:string) => {
        setShowSpinner(true);
        operationPicker(op, param).then((result:any) => {
            setData(result);
            setShowSpinner(false);
            if(op == operation.SEARCH) setSearchText(`Search result for "${param}"`);
            else setSearchText('Trending movies');
        });
    }

    const getMovie = (movie:any) => {
        setShowSpinner(true);
        const movieWithUrl = movie;
        getWiki(movie.name).then((data:any) => {
            movieWithUrl.wiki = data[3][0];
            setCurrentMovie(movieWithUrl);
            setShowSpinner(false);
            setModalVisibility(true);
        })
    }

    const findSimilar = (id:string) => {
        setModalVisibility(false);
        updateMovies(operation.SIMILAR, id);
    }
    
    return (
        <div className="layout">
            <CircularProgress style={{display: showSpinner ? 'block' : 'none' }} className="spinner"/>

            <h2>Search for a movie</h2>

            <SearchBar onChange={(value) => setInput(value)}  className="searchBar" placeholder="Interstellar" cancelOnEscape
            onRequestSearch={() => updateMovies(input == '' ? operation.TRENDING : operation.SEARCH, input)} 
            onCancelSearch={() => updateMovies(operation.TRENDING, '')} />

            <h1>{searchText}</h1>

            <Grid className="grid" container spacing={4} alignItems="center" justify="center">
                {data.map((movie, i) => (
                    <Card movie={movie} key={i} getMovie={getMovie}/>
                ))}
            </Grid>

            <Rodal visible={modalVisibility} onClose={() => setModalVisibility(false)} closeOnEsc>
                <Modal movie={currentMovie} findSimilar={findSimilar}/>
            </Rodal>
        </div>
    )
}

export default Layout
