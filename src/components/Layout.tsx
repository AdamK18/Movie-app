import React, {useState, useEffect} from 'react'
import * as Constants from '../utils/Constants'
import CircularProgress from '@material-ui/core/CircularProgress';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SearchBar from "material-ui-search-bar";
import Grid from '@material-ui/core/Grid';
import axios from 'axios'

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
            setShowSpinner(false)
            setData(queryResult.data.data.searchMovies)
            setSearchText(`Search results for: ${input}`)
        }
        else{
            queryResult = await axios.post(
                Constants.GRAPHQL_API, {
                    query: Constants.FETCH_POPULAR_QUERY
                }
            );
            setData(queryResult.data.data.movies)
            setShowSpinner(false)
        }
    }
    
    return (
        <div className="layout">
            <CircularProgress style={{display: showSpinner ? 'block' : 'none' }} className="spinner"/>

            <h2>Search for a movie</h2>

            <SearchBar onChange={(value) => setInput(value)} className="searchBar" onRequestSearch={() => fetchData(true)} placeholder="Interstellar" cancelOnEscape
            />

            <h1>{searchText}</h1>

            <Grid className="grid" container spacing={4} alignItems="center" justify="center">
                {data.map(movie => (
                    <Grid className="grid__item" item xs={12} sm={6} md={4} lg={3}>
                        <div className="grid__title">
                            <h3>{movie.name}</h3>
                        </div>
                        {movie.img === null ? ( 
                            <div>
                                <p>No image found</p>
                                <SentimentVeryDissatisfiedIcon></SentimentVeryDissatisfiedIcon> 
                            </div>
                         ) : (
                            <img className="grid__img" src={movie.img.url} alt={movie.name}/>
                        )}
                        
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default Layout
