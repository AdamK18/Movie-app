export const FETCH_TRENDING_QUERY = `
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
`

export const FETCH_SEARCH_QUERY = (movieName:string) =>  {
  return `query SearchMovies {
    searchMovies(query: "${movieName}") {
      id
      name
      score
      img: poster {
        url: custom(size: "w185_and_h278_bestv2")
      }
    }
  }
`}

export const FETCH_SIMILAR_QUERY = (movieName:string) => {
  return `query getMovie {
    movie(id: ${movieName}) {
        id
        name
        similar{id, name, score, img: poster {
          url: custom(size: "w185_and_h278_bestv2")
        }}
    }
  }
`}