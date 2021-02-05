

  //Substitute MovieName for movie name
  export const GRAPHQL_API = "https://tmdb.sandbox.zoosh.ie/dev/graphql";

  export const WIKIPEDIA_SEARCH_QUERY = (movieName:string) => {
    return `https://en.wikipedia.org/api/rest_v1/page/summary/${movieName}?redirect=false`;
  }

  export const WIKIPEDIA_CONTENT_QUERY = (movieName:string) => {
    return `https://en.wikipedia.org/w/api.php?action=parse&page=${movieName}&formatversion=1&format=json`;
  }

  export const IMDB_TITLE_QUERY = (movieName:string) => {
    return `https://www.omdbapi.com/?apikey=6262df66&t=${movieName}`;
  }