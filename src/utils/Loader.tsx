import axios from 'axios'
import * as Queries from './Queries'

const fetchSearch = (input: string) => {
    return new Promise((resolve) => {
        axios.post(
            Queries.GRAPHQL_API, {
                query: Queries.FETCH_SEARCH_QUERY.replace('MovieName', input)
            }
        ).then((data) => {
            resolve(data.data.data.searchMovies)
        })
    })
}

const fetchTrending = () => {
    return new Promise((resolve) => {
        axios.post(
            Queries.GRAPHQL_API, {
                query: Queries.FETCH_POPULAR_QUERY
            }
        ).then((data) => {
            resolve(data.data.data.movies)
        });
    })
}

const fetchSimilar = (id: string) => {
    return new Promise((resolve) => {
        axios.post(
            Queries.GRAPHQL_API, {
                query: Queries.FETCH_SIMILAR_QUERY.replace('movieID', id)
            }
        ).then((data) => {
            resolve(data.data.data.movie.similar)
        });
    })
}

export enum operation{
    TRENDING = 0,
    SEARCH = 1,
    SIMILAR = 2
  }

export const operationPicker = async(op: number, input: string) => {
    switch(op){
        case operation.SEARCH:{
            return fetchSearch(input);
        }
        case operation.TRENDING:{
            return fetchTrending();
        }
        default :{
            return fetchSimilar(input);
        }
    }
}

export const getLinks = (name:string) => {
    const IMDB_url = Queries.IMDB_TITLE_QUERY.replace('MovieName',name)
    const WIKI_url = Queries.WIKIPEDIA_SEARCH_QUERY.replace('MovieName',name)

    return Promise.all([
        new Promise((resolve,reject) => {
            fetch(IMDB_url).then((result:any)=> {
                return result.json();
            }).then((result:any) => {
                resolve(result)
            })
        }),
        new Promise((resolve,reject) => {
            fetch(WIKI_url).then((result:any)=> {
                return result.json();
            }).then((result:any) => {
                resolve(result)
            })
        })
    ])
}