import { operationPicker, operation } from './api/Loader';

const movieName = 'Interstellar';
const movieID = '157336';

test('Test Trending movies query', () => {
	return operationPicker(operation.TRENDING, ' ').then((response) => {
		const num = response.length;
		expect(num).toBeGreaterThan(0);
	});
});

test('Test Search movie query', () => {
	return operationPicker(operation.SEARCH, movieName).then((response) => {
		const num = response.length;
		expect(num).toBeGreaterThan(0);
	});
});

test('Test Similar movie query', async () => {
	return operationPicker(operation.SIMILAR, movieID).then((response) => {
		const num = response.length;
		expect(num).toBeGreaterThan(0);
	});
});
