import '../App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import noImage from '../images/download.jpeg';
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    Typography,
    Icon
  } from '@mui/material';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PaidIcon from '@mui/icons-material/Paid';
import Error from './Error';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../actions'

function Characters() {
    const collectors = useSelector((state) => state.collectors);
    const selectedCollector = collectors.find((collector) => collector.selected === true);
    //console.log(selectedCollector.collection)
    const dispatch = useDispatch();

    const regex = /(<([^>]+)>)/gi;
    const [loading, setLoading] = useState(true);
    const [searchData, setSearchData] = useState(undefined);
    const [showsData, setShowsData] = useState(undefined);
    const [searchTerm, setSearchTerm] = useState('');
    let [hasError,setError] = useState(false);
    let card = null;
    let page_player = useParams().page;
    const [b_disabled, setBDisable] = useState(false);

    const clickEvent = () => {
        setBDisable(true);
      };

    const handleCollect = (name,collectionID) => {
      dispatch(actions.addCollectionInCollector(name,collectionID));
    };

    const handleGiveUp = (name,collectionID) => {
      dispatch(actions.removeCollectionInCollector(name,collectionID));
    };
    
    useEffect(() => {
        const timer = setTimeout(() => {
          setBDisable(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [b_disabled]);

    useEffect(() => {
        async function fetchData() {
          try {
            const {data} = await axios.get(`http://localhost:3001/marvel-characters/page/${page_player}`);
            setShowsData(data);
            setLoading(false);
          } catch (e) {
            setLoading(false);
            setError(true);
          }
        }
        fetchData();
    }, [page_player]);

    const buildCard = (character) => {
        return (
          <Grid item xs={12} sm={7} md={5} lg={4} xl={3} key={character.id}>
            <Card
              //variant='outlined'
              sx={{
                maxWidth: 350,
                height: 'auto',
                maxHeight:400,
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop:5,
                boxShadow:
                  '0 15px 30px rgba(0,0,0,0.30), 0 10px 8px rgba(0,0,0,0.22);',
                textDecoration: 'none'
              }}
            >
              <CardActionArea>
                <Link className='Link-for-eventcard' to={`/character/${character.id}`}>
                <div className='eventcard-container'>
                  <CardMedia
                    sx={{
                      height: '250px',
                      width: '350px'
                    }}
                    component='img'
                    image={
                        character.thumbnail && character.thumbnail.path
                        ? character.thumbnail.path + '.' + character.thumbnail.extension
                        : noImage
                    }
                    title='show image'
                  />
                  <CardContent>
                    <Typography
                      sx={{
                        borderBottom: '1px solid #1e8678',
                        fontWeight: 'bold',
                        height:'60px',
                        textDecoration: 'none'
                      }}
                       gutterBottom
                      component='h2'
                    >
                      {character.name}
                    </Typography>
                  </CardContent>
                  </div>
                </Link>
              </CardActionArea>
                <div>
                  {selectedCollector.collection.includes(character.id)? 
                  <button
                    className='button'
                    onClick={() => {
                      handleGiveUp(selectedCollector.name,character.id)
                    }}
                  >
                    GiveUp
                  </button> 
                  :
                  <button
                    className='button'
                    onClick={() => {
                      //console.log('in on click')
                      handleCollect(selectedCollector.name,character.id)
                    }}
                  >
                    Collect
                  </button> }
                </div>
              
            </Card>
          </Grid>
        );
    };

    card = showsData && showsData.data.results.map((character) => {
      return buildCard(character);
    });
  
    if (loading) {
        return (
          <div>
            <h2>Loading....</h2>
          </div>
        );
      } else if(hasError){
        return (<Error error={' 404 Not Found'}/>);   
      } else {
        return (
            <div className='main-div'>
                  <div className='page-div'>
                      {page_player>1 && 
                      (<Link className='page_button' disabled={b_disabled} onClick={clickEvent} to={`/Characters/page/${Number(page_player) - 1}`}>
                        {/* <button className='page_button' type='button' disabled={b_disabled} onClick={clickEvent}> */}
                          previous
                        {/* </button> */}
                        </Link>)}
                      <h1 className='page_indicator'>{page_player}</h1>
                      {page_player<49 && 
                      (<Link className='page_button' disabled={b_disabled} onClick={clickEvent} to={`/Characters/page/${Number(page_player) + 1}`}>
                        {/* <button className='page_button' type='button' disabled={b_disabled} onClick={clickEvent}> */}
                          next
                        {/* </button> */}
                      </Link>)}
                      <br></br>
                      <br></br>
                  </div>
                <div>
                    <Grid 
                        container 
                        spacing={1}
                        sx={{
                            flexGrow: 1,
                            flexDirection: 'row'
                        }}>
                        {card}
                    </Grid>
                </div>
            </div>
        );
    }
}

export default Characters;