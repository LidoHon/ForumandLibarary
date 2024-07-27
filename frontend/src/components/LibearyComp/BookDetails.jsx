import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as BookAPI from '../LibearyComp/BooksAPI.js';
import Spinners from '../Spinners.jsx';
import { Link } from 'react-router-dom';
const BookDetails = () => {
	const { id } = useParams();
	const [book, setBook] = useState(null);
	const [loading, setLoading] = useState(true);
	const [showFullDescription, setShowFullDescription] = useState(false);
	let description = '';

	useEffect(() => {
		const fetchBook = async () => {
			try {
				const fetchedBook = await BookAPI.get(id);
				setBook(fetchedBook);
			} catch (error) {
				console.error('Error fetching book details:', error);
			} finally {
				setLoading(false);
			}
		};
		fetchBook();
	}, [id]);

	if (loading) {
		return <Spinners />;
	}

	if (!book) {
		return <div>Book not found</div>;
	}

	if (book.description) {
		description = showFullDescription
			? book.description
			: book.description.substring(0, 200) + '...';
	}

	return (
		<div className="book-details">
			<h1>{book.title}</h1>
			<h2>Authors: {book.authors.join(', ')}</h2>
			<p>Publisher: {book.publisher}</p>
			<p>Published Date: {book.publishedDate}</p>
			<p>Description: {description}</p>
			<button
				className="description-link pb-5 "
				onClick={() => setShowFullDescription((prevState) => !prevState)}
			>
				{showFullDescription ? 'Less' : 'More'}
			</button>
			<p>Categories: {book.categories}</p>
			<p>Language: {book.language}</p>
			<p>Page Count: {book.pageCount}</p>
			<p>
				Preview Link:{' '}
				<Link to={book.previewLink} target="_blank">
					Preview
				</Link>
			</p>
			<p>
				Info Link:{' '}
				<Link to={book.infoLink} target="_blank">
					Info
				</Link>
			</p>
		</div>
	);
};

export default BookDetails;
