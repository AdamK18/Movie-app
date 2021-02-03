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
    const readableInput = input.replaceAll(" ", "_").trim();
    switch(op){
        case operation.SEARCH:{
            return fetchSearch(readableInput);
        }
        case operation.TRENDING:{
            return fetchTrending();
        }
        default :{
            return fetchSimilar(readableInput);
        }
    }
}

export const getLinks = (name:string) => {
    const readableName = name.replaceAll(" ", "_").trim();
    const IMDB_url = Queries.IMDB_TITLE_QUERY.replace('MovieName',readableName)
    const WIKI_url = Queries.WIKIPEDIA_SEARCH_QUERY.replace('MovieName',readableName)

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