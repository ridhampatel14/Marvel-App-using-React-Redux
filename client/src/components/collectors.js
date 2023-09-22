import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import noImage from '../images/download.jpeg';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../actions'
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    CardHeader
  } from '@mui/material';
import '../App.css';
import Error from './Error';
import Character from './character';
import CharacterForCollector from './characterForSelector';

const Collectors = (props) => {
    const collectors = useSelector((state) => state.collectors);
    const dispatch = useDispatch();
    

    const handleClick = (name) => {
		dispatch(actions.addCollector(name));
	};
	const handleSelect = (name) => {
		dispatch(actions.selectCollector(name));
	};
	const handleUnselect = (name) => {
		dispatch(actions.unselectCollector(name));
	};
	const handleDelete = (name) => {
		dispatch(actions.deleteCollector(name));
        console.log(collectors)
	};

    let cards = collectors?.map((collector) => {
		return (
			<div key={collector.name}>
				<div><h1>{collector.name}</h1></div>
				{collector.selected ? null : (
					<button className='button' onClick={() => {handleDelete(collector.name)}}>
						Delete
					</button>
				)}

				{collector.selected ? (
					<button className='button' onClick={() => {handleUnselect(collector.name)}}>
						Selected
					</button>
				) : (
					<button className='button' onClick={() => {handleSelect(collector.name)}}>
						Select
					</button>
				)}

                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {collector.collection.map(collectionID => (
                    <CharacterForCollector key={collectionID} id={collectionID} />
                    ))}
                </div>
			</div>
		);
	});
    let name;
    return (
		<div>
            <br/>
            <form className='form' id='add-employee'
                onSubmit={(e) => {
                    e.preventDefault();
                    console.log(name.value);
                    handleClick(name.value);
                    name.value = '';
                }}>
                <div className='form-group'>
                <label>
                    name:  
                    <input
                    ref={(node) => {
                        name = node;
                    }}
                    required
                    autoFocus={true}
                    />
                </label>
                </div>
                <br />
                <button className='button add-button' type='submit'>
                Add Collector
                </button>
            </form>
            <div>{cards}</div>
		</div>
	);
}

export default Collectors;