import React, {useState, useEffect} from 'react'
import * as Constants from '../utils/Constants'
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchBar from "material-ui-search-bar";
import Grid from '@material-ui/core/Grid';
import axios from 'axios'
import Card from './Card'

function Layout() {
    const [data, setData] = useState<any[]>([])
    const [showSpinner, setShowSpinner] = useState(true);
    const [input, setInput] = useState('');
    const [searchText, setSearchText] = useState('Trending movies');

    useEffect(() => {
        fetchData(false);
    }, []);

    const fetchData = async (isSearch : boolean) => {
        let queryResult:any;
        if(isSearch){
            setShowSpinner(true)
            queryResult = await axios.post(
                Constants.GRAPHQL_API, {
                    query: Constants.FETCH_SEARCH_QUERY.replace('MovieName', input)
                }
            )
            setData(queryResult.data.data.searchMovies)
            setSearchText(`Search results for: ${input}`)
        }
        else{
            setShowSpinner(true)
            queryResult = await axios.post(
                Constants.GRAPHQL_API, {
                    query: Constants.FETCH_POPULAR_QUERY
                }
            );
            setData(queryResult.data.data.movies)
        }
        setShowSpinner(false)
    }

    const reset = () => {
        fetchData(false);
        setSearchText('Trending movies');
    }
    
    return (
        <div className="layout">
            <CircularProgress style={{display: showSpinner ? 'block' : 'none' }} className="spinner"/>

            <h2>Search for a movie</h2>

            <SearchBar onChange={(value) => setInput(value)}  className="searchBar" 
            onRequestSearch={() => fetchData(true)} placeholder="Interstellar" 
            onCancelSearch={() => reset()} cancelOnEscape
            />

            <h1>{searchText}</h1>

            <Grid className="grid" container spacing={4} alignItems="center" justify="center">
                {data.map((movie, i) => (
                    <Grid key={i} className="grid__item" item xs={12} sm={6} md={4} lg={3}>
                        <Card movie={movie}/>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default Layout
