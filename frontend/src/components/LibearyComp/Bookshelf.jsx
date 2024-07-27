import React from 'react';
import Book from './Book';

function Bookshelf({ title, books, onUpdateShelf }) {
	return (
		<div className="bookshelf">
			<h2 className="bookshelf-title">{title}</h2>
			<div className="bookshelf-books">
				<ol className="books-grid">
					{books.map((book) => (
						// this is where the ol would go
						<Book key={book.id} book={book} onUpdateShelf={onUpdateShelf} />
					))}
				</ol>
			</div>
		</div>
	);
}

export default Bookshelf;
