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
        id
        name
        score
        img: poster {
          url: custom(size: "w185_and_h278_bestv2")
        }
        similar{id, name, score, img: poster {
          url: custom(size: "w185_and_h278_bestv2")
        }}
    }
  }`