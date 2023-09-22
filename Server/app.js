const express = require('express');
const app = express();
const configRoutes = require('./routes');
const cors = require('cors');
// const session = require('express-session');
const redis = require('redis');
const client = redis.createClient();
client.connect().then(() => {});

app.use(express.json());
app.use(cors());
app.use('/character/:id',async (req, res,next) => {
    //console.log('in /character/:id middleware')
    let exist=await client.exists('/character/'+req.params.id);
    if(exist){
      let result=await client.get('/character/'+req.params.id);
      //console.log('sending from catch...');
      return res.status(200).json(JSON.parse(result));
    }
    next();
});

app.use('/marvel-characters/page/:pagenum', async(req, res, next) => {
    //console.log('in /marvel-characters/page/:pagenum middleware');
    let exist=await client.exists('/marvel-characters/page/'+req.params.pagenum);
    if (exist) {
        let result=await client.get('/marvel-characters/page/'+req.params.pagenum);
        //console.log('sending from catch...');
        return res.status(200).json(JSON.parse(result));
    }
    next();
});

configRoutes(app);

app.listen(3001, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3001');
});