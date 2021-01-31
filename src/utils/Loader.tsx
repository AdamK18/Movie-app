import axios from 'axios'
import * as Constants from '../utils/Constants'

export const fetchData = (isSearch : boolean, input: string) => {
    const promise = new Promise((resolve) => {
        if(isSearch){
            axios.post(
                Constants.GRAPHQL_API, {
                    query: Constants.FETCH_SEARCH_QUERY.replace('MovieName', input)
                }
            ).then((data) => {
                resolve(data.data.data.searchMovies)
            })
        }
        else{
            axios.post(
                Constants.GRAPHQL_API, {
                    query: Constants.FETCH_POPULAR_QUERY
                }
            ).then((data) => {
                resolve(data.data.data.movies)
            });
        }
    })
    return promise
}