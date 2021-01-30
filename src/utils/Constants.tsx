export const GRAPHQL_API = "https://tmdb.sandbox.zoosh.ie/dev/graphql";

export const FETCH_POPULAR_QUERY = `
query fetchPopular {
    movies: popularMovies {
      id
      name
      overview
      releaseDate
      img: poster {
        url: custom(size: "w185_and_h278_bestv2")
      }
      reviews {
        id
        author
        content
        language {
          code
          name
        }
      }
    }
  }
  `;

  export const FETCH_SEARCH_QUERY= `query SearchMovies {
    searchMovies(query: "fight club") {
      id
      name
      overview
      releaseDate
      cast {
        id
        person {
          name
        }
        role {
          ... on Cast {
            character
          }
        }
      }
    }
  }`