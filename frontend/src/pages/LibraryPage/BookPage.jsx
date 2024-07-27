import { useState, useEffect } from 'react';
import * as BookAPI from '../../components/LibearyComp/BooksAPI.js';
import BookShelf from '../../components/LibearyComp/Bookshelf.jsx';
import SearchBooks from '../../components/LibearyComp/SearchBooks.jsx';
import Spinners from '../../components/Spinners.jsx';
import './library.css';
function BookPage() {
	const [showSearchPage, setShowSearchpage] = useState(false);
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchBooks = async () => {
			try {
				const books = await BookAPI.getAll();
				setBooks(books);
			} catch (error) {
				console.error('error fetching books', error);
			} finally {
				setLoading(false);
			}
		};
		fetchBooks();
	}, []);

	const updateBookShelf = async (book, shelf) => {
		try {
			await BookAPI.update(book, shelf);
			const newBookShelf = books.map((b) =>
				b.id === book.id ? { ...b, shelf } : b
			);
			setBooks(newBookShelf);
		} catch (error) {
			console.error('error updating the book', error);
		}
	};

	const closeSearchPage = () => {
		setShowSearchpage(false);
	};

	return (
		<div className="app">
			{loading ? (
				<Spinners />
			) : showSearchPage ? (
				<SearchBooks
					onClose={closeSearchPage}
					onUpdateShelf={updateBookShelf}
				/>
			) : (
				<div className="list-books">
					<div className="list-books-title">
						<h1>MyReads</h1>
					</div>
					<div className="list-books-content">
						<BookShelf
							title="Currently Reading"
							books={books.filter((book) => book.shelf === 'currentlyReading')}
							onUpdateShelf={updateBookShelf}
						/>
						<BookShelf
							title="Want to Read"
							books={books.filter((book) => book.shelf === 'wantToRead')}
							onUpdateShelf={updateBookShelf}
						/>
						<BookShelf
							title="Read"
							books={books.filter((book) => book.shelf === 'read')}
							onUpdateShelf={updateBookShelf}
						/>
					</div>
					<div className="open-search">
						<a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
					</div>
				</div>
			)}
		</div>
	);
}

export default BookPage;
