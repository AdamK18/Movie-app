import React, {useState, useEffect} from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import * as Constants from '../utils/Constants'
import axios from 'axios'

function Layout() {
    const [data, setData] = useState<any[]>([])
    const [showSpinner, setShowSpinner] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const queryResult = await axios.post(
                Constants.GRAPHQL_API, {
                    query: Constants.FETCH_POPULAR_QUERY
                }
            );
            const result = queryResult.data.data;
            setData(result.movies)
            setShowSpinner(false);
            console.log(data)
        }

        fetchData();
    }, []);
    
    return (
        <div className="layout">
            <CircularProgress style={{display: showSpinner ? 'block' : 'none' }} className="spinner"/>

            <Grid className="grid" container spacing={4} alignItems="center" justify="center">
                {data.map(movie => (
                    <Grid className="grid__item" item xs={12} sm={6} md={4} lg={3}>
                        <img className="grid__img" src={movie.img.url} alt={movie.name}/>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default Layout
