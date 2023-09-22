import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import noImage from '../images/download.jpeg';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    CardHeader
  } from '@mui/material';
import '../App.css';
import Error from './Error';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../actions'

const Character = (props) => {
  const [eventData, setEventData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  let [hasError,setError] = useState(false);
  let {id} = useParams();

  const collectors = useSelector((state) => state.collectors);
  const selectedCollector = collectors.find((collector) => collector.selected === true);
  //console.log(selectedCollector.collection)
  const dispatch = useDispatch();

  const formatDate = (showdate) => {
    var year = showdate.substring(0, 4);
    var month = showdate.substring(5, 7);
    var day = showdate.substring(8, 10);
    return month + '/' + day + '/' + year;
  };

  const handleCollect = (name,collectionID) => {
    dispatch(actions.addCollectionInCollector(name,collectionID));
  };

  const handleGiveUp = (name,collectionID) => {
    dispatch(actions.removeCollectionInCollector(name,collectionID));
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const {data} = await axios.get(`http://localhost:3001/character/${id}`);
        setEventData(data);
        setLoading(false);
      } catch (e) {
        //console.log(e);
        setLoading(false);
        setError(true);
      }
    }
    fetchData();
  }, [id]);  

  if (loading) {
    return (
      <div>
        <h2>Loading....</h2>
      </div>
    );
  } else if(hasError){
    return (<Error error={' 404 Not Found'}/>);   
  }else {
    return (
      <Card
        variant='outlined'
        sx={{
          maxWidth: 600,
          height: 'auto',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop:5,
          marginBottom: 10,
          boxShadow:
            '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
        }}
      >
        <CardHeader
          title={eventData.data.results[0].name}
          sx={{
            borderBottom: '1px solid #1e8678',
            fontWeight: 'bold'
          }}
        />
        <CardMedia
          component='img'
          image={
            eventData.data.results[0] && eventData.data.results[0].thumbnail
              ? eventData.data.results[0].thumbnail.path + '.' + eventData.data.results[0].thumbnail.extension
              : noImage
          }
          title='show image'
        />
        <div>
              {selectedCollector.collection.includes(eventData.data.results[0].id)?  <button
                className='button'
                onClick={() => {
                    handleGiveUp(selectedCollector.name,eventData.data.results[0].id)
                }}
                  >
                    GiveUp
                  </button> 
                  :
                  <button
                    className='button'
                    onClick={() => {
                      handleCollect(selectedCollector.name,eventData.data.results[0].id)
                    }}
                  >
                    Collect
                  </button> }
                </div>
      </Card>
    );
  }
}

export default Character;