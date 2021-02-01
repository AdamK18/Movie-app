import axios from 'axios'
import * as Constants from '../utils/Constants'

export const fetchData = (isSearch : boolean, input: string) => {
    return new Promise((resolve) => {
        if(!isSearch || (isSearch && input == '')){
            axios.post(
                Constants.GRAPHQL_API, {
                    query: Constants.FETCH_POPULAR_QUERY
                }
            ).then((data) => {
                resolve(data.data.data.movies)
            });
        }
        else{
            axios.post(
                Constants.GRAPHQL_API, {
                    query: Constants.FETCH_SEARCH_QUERY.replace('MovieName', input)
                }
            ).then((data) => {
                resolve(data.data.data.searchMovies)
            })
        }
    })
}