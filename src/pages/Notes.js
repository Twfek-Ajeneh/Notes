import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import NoteCard from '../components/NoteCard';
import Masonry from 'react-masonry-css';

export default function Notes() {
	const [data , setData] = useState(null);

	useEffect(() => {
		fetch('http://localhost:8000/notes')
		.then(res => res.json())
		.then(e => setData(e));	
	} , []);

	const handleDelete = async (id) => {
		await fetch('http://localhost:8000/notes/' + id , {
			method: 'DELETE'
		});
		const newData = data.filter((e) => e.id !== id);
		setData(newData);
	}

	const breakPoints = {
		default: 3,
		1100: 2,
		700: 1,
	};

	return (
		<Container>
			<Masonry
				breakpointCols={breakPoints}
				className="my-masonry-grid"
				columnClassName="my-masonry-grid_column"
			>
				{data && data.map(note => (
					<div key={note.id}>
						<NoteCard note={note} handleDelete={handleDelete}/>
					</div>
				))}
			</Masonry>
		</Container>
	)
} 
