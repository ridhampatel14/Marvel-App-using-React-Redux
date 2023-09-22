const express = require('express');
const router = express.Router();
const redis = require('redis');
const axios = require('axios');
const client = redis.createClient();
client.connect().then(() => {});
const md5 = require('blueimp-md5');
const publickey = 'd8930808fa283bf1738b0f468c090459';
const privatekey = 'e2572116442c10a0088796e6fade2dc6b0887581';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
//marvel stuff

router
    .route('/marvel-characters/page/:pagenum')
    .get(async (req, res)=> {
        const page_no= req.params.pagenum || 1;
        try{
            if(isNaN(page_no)){
                throw 'page number should be valid number'
            }
            if(page_no<1){
                throw 'page number should be greater than 1';
            }
            
        }catch(e){
            return res.status(400).json({error: e});
        }
        try{
            if(page_no>79){
                throw 'No more characters found!'
            }
        }catch(e){
            return res.status(404).json({error: e});
        }
        try{
            let offset=page_no*20-20
            const url = baseUrl + '?ts=' + ts + '&limit=20&offset=' + offset +'&apikey=' + publickey + '&hash=' + hash;
            const {data}=await axios.get(url);
            if(data!==null){
                //console.log('getting from the original API')
                await client.set('/marvel-characters/page/'+page_no,JSON.stringify(data));
                return res.status(200).json(data);
            }
        }catch(e){
            return res.status(404).json({error: e});
        }
        return res.status(500).send('Internal Server Error');
    })

router
    .route('/character/:id')
    .get(async (req, res)=> {
        const id= req.params.id || 1;
        try{
            const url = baseUrl + '/' + id + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
            const {data}=await axios.get(url);
            if(data!==null){
                //console.log('getting from the original API')
                await client.set('/character/'+req.params.id,JSON.stringify(data));
                return res.status(200).json(data);
            }
        }catch(e){
            return res.status(404).json({error:'can not find character with that ID'});
        }
        return res.status(500).send('Internal Server Error');
    })


module.exports = router;