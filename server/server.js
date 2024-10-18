//Import frameworks for app
import express from 'express';
import cors from 'cors';

//Import database connection
import db from './db/db-connection.js';

//Standard set-up operations for Express and Node
const app = express();
const PORT = process.env.PORT || 8030;
app.use(cors());
app.use(express.json());

//All Planned Routes

//POST Route to create a new user
//'/users'

//May Delete: GET Route to check username and password by checking via username
//'/users/:username'
app.post('/api/users/:username', async (req, res) => {
    console.log(req);
    const { username } = req.params.username;

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

//Print PORT location when active PORT is detected (server is running properly)
app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
})