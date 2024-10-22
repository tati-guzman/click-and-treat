//Import frameworks for app
import express from 'express';
import cors from 'cors';

//PROD: Import frameworks for deployment
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

//Import database connection
import db from './db/db-connection.js';

//Standard set-up operations for Express and Node
const app = express();
const PORT = process.env.PORT || 8030;
app.use(cors());
app.use(express.json());

//PROD: Construct path to build folder in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//PROD: Serve static build files from React
app.use(express.static(path.join(__dirname, '../client/dist')));

//PROD: Ensure all routes are served the index.html file to allow React to manage the routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'))
})

//All Planned Routes

//POST Route to create a new user
//'/users'

//May Delete: GET Route to check username and password by checking via username
//'/users/:username'
app.post('/api/users/', async (req, res) => {
    console.log(req);
    // const { username } = req.params.username;

    //Simulate checking for the username and returning that the username exists
    res.json({ exists: true });
})

//GET Route to pull pet information for a particular user
//'/pets/:user_id'

//GET Route to pull all session data for each training plan
//'/sessions/history/:plan_id'

//POST Route to submit information for a new session
//'/sessions'

//PUT Route to edit session information (stretch goal)
//'/sessions/:session_id'

//PUT Route to edit user information
//'/users/:user_id'

//POST Route to create a new pet
//'/pets'

//PUT Route to update pet information
//'/pets/:pet_id

//DELETE Route to delete a pet
//'/pets/:pet_id

//POST Route to create a new association between two members (stretch goal)
//'/family'

//Third Party API Calls (3)

//GET request to fetch the motivational quote of the day
app.get('/quotes/daily', async (req, res) => {
    const url = 'https://zenquotes.io/api/today/';

    console.log("Fetching quote of the day!");
    //Server will fetch the quote from the url
    fetch(url)
        //Response is parsed into json format
        .then((res) => res.json())
        //JSON is sent to the front end
        .then((quote) => res.send(quote))
        //If there is an error, the details will be logged to the console FOR NOW
            //This needs to be updated to have better error handling
        .catch((err) => {
            console.error({ error: "Something went wrong fetching the quote of the day", details: err });
        })
})

//GET request to fetch a list of motivational quotes
app.get('/quotes/list', async (req, res) => {
    const url = 'https://zenquotes.io/api/quotes/';
    
    console.log("Fetching list of quotes!");

    //Server will fetch the quotes from the url
    fetch(url)
        //Response is parsed into json format
        .then((res) => res.json())
        //JSON is sent to the front end
        .then((quote) => res.send(quote))
        //If there is an error, the details will be logged to the console FOR NOW
            //This needs to be updated to have better error handling
        .catch((err) => {
            console.error({ error: "Something went wrong fetching the list of quotes", details: err });
        })
})

//GET request to fetch a single random quote
app.get('/quotes/random', async (req, res) => {
    const url = 'https://zenquotes.io/api/random/';

    console.log("Fetching single random quote!");
    //Server will fetch the quote from the url
    fetch(url)
        //Response is parsed into json format
        .then((res) => res.json())
        //JSON is sent to the front end
        .then((quote) => res.send(quote))
        //If there is an error, the details will be logged to the console FOR NOW
            //This needs to be updated to have better error handling
        .catch((err) => {
            console.error({ error: "Something went wrong fetching a quote!", details: err });
        })
})

//Print PORT location when active PORT is detected (server is running properly)
app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
})