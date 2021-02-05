import axios from 'axios';
import * as Queries from './queries';
import * as URL from './baseURLs';

export enum operation {
	TRENDING = 0,
	SEARCH = 1,
	SIMILAR = 2,
}

export const operationPicker = async (op: number, input: string) => {
	const readableInput = input.replaceAll(' ', '_').trim();
	switch (op) {
		case operation.TRENDING: {
			return fetchTrending();
		}
		case operation.SEARCH: {
			return fetchSearch(readableInput);
		}
		default: {
			return fetchSimilar(readableInput);
		}
	}
};

const fetchTrending = () => {
	return new Promise((resolve) => {
		axios
			.post(URL.GRAPHQL_API, {
				query: Queries.FETCH_TRENDING_QUERY,
			})
			.then((data) => {
				resolve(data.data.data.movies);
			});
	});
};

const fetchSearch = (input: string) => {
	return new Promise((resolve) => {
		axios
			.post(URL.GRAPHQL_API, {
				query: Queries.FETCH_SEARCH_QUERY(input),
			})
			.then((data) => {
				resolve(data.data.data.searchMovies);
			});
	});
};

const fetchSimilar = (id: string) => {
	return new Promise((resolve) => {
		axios
			.post(URL.GRAPHQL_API, {
				query: Queries.FETCH_SIMILAR_QUERY(id),
			})
			.then((data) => {
				resolve(data.data.data.movie.similar);
			});
	});
};

export const getLinks = (name: string) => {
	const readableName = name.replaceAll(' ', '_').trim();
	const IMDB_url: string = URL.IMDB_TITLE_QUERY(readableName);
	const WIKI_url = URL.WIKIPEDIA_SEARCH_QUERY(readableName);

	return Promise.all([
		new Promise((resolve, reject) => {
			fetch(IMDB_url)
				.then((result: any) => {
					return result.json();
				})
				.then((result: any) => {
					resolve(result);
				});
		}),
		new Promise((resolve, reject) => {
			fetch(WIKI_url)
				.then((result: any) => {
					return result.json();
				})
				.then((result: any) => {
					resolve(result);
				});
		}),
	]);
};
