import React, { useState } from 'react';
import { Link } from 'react-router-dom';
function Book({ book, onUpdateShelf }) {
	const { id, title, authors, imageLinks, shelf } = book;
	const Thumbnail = imageLinks
		? imageLinks.thumbnail
		: 'https://via.placeholder.com/128x193?text=No%20Image';
	const [showDetail, setShowDetail] = useState(false);

	const handleMouseEnter = () => {
		setShowDetail(true);
	};

	const handleMouseLeave = () => {
		setTimeout(() => {
			setShowDetail(false);
		}, 5000);
	};
	return (
		<div className="book">
			<div
				className="book-top"
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				<div
					className="book-cover"
					style={{
						width: 128,
						height: 193,
						backgroundImage: `url(${Thumbnail})`,
					}}
				></div>
				<div className="book-shelf-changer">
					<select
						value={shelf || 'none'}
						onChange={(e) => onUpdateShelf(book, e.target.value)}
					>
						<option value="none" disabled>
							Move to...
						</option>
						<option value="currentlyReading">Currently Reading</option>
						<option value="wantToRead">Want to Read</option>
						<option value="read">Read</option>

						<option value="none">None</option>
					</select>
				</div>
			</div>
			{showDetail && (
				<Link to={`/books/${id}`} className="see-more-link">
					Details
				</Link>
			)}

			<div className="book-title">{title}</div>
			<div className="book-authors">
				{authors ? authors.join(', ') : 'Unknown Author'}
			</div>
		</div>
	);
}

export default Book;
