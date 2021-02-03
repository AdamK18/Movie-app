export const GRAPHQL_API = "https://tmdb.sandbox.zoosh.ie/dev/graphql";

export const FETCH_POPULAR_QUERY = `
query fetchPopular {
    movies: popularMovies {
      id
      name
      score
      img: poster {
        url: custom(size: "w185_and_h278_bestv2")
      }
    }
  }
  `;

  export const FETCH_SEARCH_QUERY= `query SearchMovies {
    searchMovies(query: "MovieName") {
      id
      name
      score
      img: poster {
        url: custom(size: "w185_and_h278_bestv2")
      }
    }
  }`

  export const FETCH_SIMILAR_QUERY = `query getMovie {
    movie(id: movieID) {
        similar{id, name, score, img: poster {
          url: custom(size: "w185_and_h278_bestv2")
        }}
    }
  }`

  //MovieName
  export const WIKIPEDIA_SEARCH_QUERY = "https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=MovieName&limit=1";
  //MovieName
  export const WIKIPEDIA_CONTENT_QUERY = "https://en.wikipedia.org/w/api.php?action=parse&page=MovieName&formatversion=1&format=json";
  //MovieName
  export const IMDB_TITLE_QUERY = "http://www.omdbapi.com/?apikey=6262df66&t=MovieName"