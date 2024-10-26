//Import frameworks for app
import express from 'express';
import cors from 'cors';

//PROD: Import frameworks for deployment
// import path, { dirname } from 'path';
// import { fileURLToPath } from 'url';

//Import database connection
import db from './db/db-connection.js';

//Standard set-up operations for Express and Node
const app = express();
const PORT = process.env.PORT || 8030;
app.use(cors());
app.use(express.json());

//PROD: Construct path to build folder in ES Modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

//PROD: Serve static build files from React
// app.use(express.static(path.join(__dirname, '../client/dist')));

//PROD: Ensure all routes are served the index.html file to allow React to manage the routing
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/dist', 'index.html'))
// })

//All Planned Routes

//POST Route to create a new user
//'/users'

//POST Route to check log in by checking username (using for testing only)
app.post('/api/users/', async (req, res) => {
    console.log("Pulling user id");

    try {
        //Print request into console
        // console.log(req);

        //Pull username from request
        const { username } = req.body;

        //Structure database query
        const query = 'SELECT user_id FROM users WHERE name=$1';

        //Send query to pull user id of the test user
        const userDetails = await db.query(query, [username]);

        //Error handling if it gets stuck here
        if (userDetails.rows.length === 0) {
            res.status(404).json({ exists: false, error: "User details not found." })
        }

        const userID = userDetails.rows[0].user_id;

        res.json({ exists: true, userID: userID });

    } catch (error) {
        res.status(500).json({ error: "Could not log in", details: error });
    }
})

//GET Route to pull pet information for a particular user
//'/pets/:user_id'
app.get('/api/pets/:user_id', async (req, res) => {
    console.log('Pulling pet information');
    console.log('Parameters', req.params);

    try {
        //Pull User ID from the parameters
        const userID = req.params.user_id;

        //Query to pull all pet ids that have this user listed as a primary or secondary user
        const petIDquery = 'SELECT pet_id FROM family WHERE user_id_primary = $1 OR user_id_secondary = $1';
        const petListData = await db.query(petIDquery, [userID]);

        //Make sure there are pets associated with this account
        if (petListData.rowCount === 0) {
            res.json([{ pets: false }]);
        }

        //Convert the returned data into an array of IDs
        //petListData [{pet_id: 1, pet_id: 2}] -> petListArray [1, 2]
        const petListArray = petListData.rows.map((row => row.pet_id));
       
        //Compile query string with array of pet ids to check
        const petInfoQuery = `SELECT * FROM pets WHERE pet_id IN (${petListArray})`;
        
        //Query database for information
        const petInfo = await db.query(petInfoQuery);

        //Second layer of finding no pets associated with account
        if (petInfo.rowCount === 0) {
            res.json([{ pets: false }]);
        } else {
            //Send back all the information pulled from the pets table
            res.json([{ pets: true }, ...petInfo.rows]);
        }
    } catch (error) {
        res.status(500).json({ error: "Unable to pull pet information", details: error });
    }
})

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