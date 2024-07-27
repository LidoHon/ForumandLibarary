import React, { useState } from 'react';
import Book from './Book';
import { search } from './BooksAPI';

function SearchBooks({ onClose, onUpdateShelf }) {
	const [query, setQuery] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [error, setError] = useState('');

	const updateQuery = async (event) => {
		const query = event.target.value;
		setQuery(query);

		if (query) {
			try {
				const results = await search(query, 20);
				if (results.error) {
					setSearchResults([]);
					setError('No books found');
				} else {
					setSearchResults(results);
					setError('');
				}
			} catch (e) {
				console.error('Error searching books:', e);
				setError('Failed to fetch search results');
			}
		} else {
			setSearchResults([]);
			setError('');
		}
	};

	return (
		<div className="search-books">
			<div className="search-books-bar">
				<a className="close-search" onClick={onClose}>
					Close
				</a>
				<div className="search-books-input-wrapper">
					<input
						type="text"
						placeholder="Search by title, author, or ISBN"
						value={query}
						onChange={updateQuery}
					/>
				</div>
			</div>
			<div className="search-books-results">
				{error && <div className="error">{error}</div>}
				<ol className="books-grid">
					{searchResults.map((book) => (
						<Book key={book.id} book={book} onUpdateShelf={onUpdateShelf} />
					))}
				</ol>
			</div>
		</div>
	);
}

export default SearchBooks;
