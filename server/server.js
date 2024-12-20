//----------------------------------- General Set Up --------------------------------
import dotenv from 'dotenv';
dotenv.config();

//Import frameworks for app and log in
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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

// ********** PRODUCTION CODE *********
//PROD: Construct path to build folder in ES Modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

//PROD: Serve static build files from React
// app.use(express.static(path.join(__dirname, '../client/dist')));

//PROD: Ensure all routes are served the index.html file to allow React to manage the routing
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/dist', 'index.html'))
// })

//----------------------------------- All Routes --------------------------------

//********* ACCOUNT AND LOG IN SECTION **********

//Function to check access tokens before authorizing the route
const checkAccessToken = (req, res, next) => {
    //Pull access token from the request headers
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ authorized: false, details: "Error finding Access Token" });
    }

    try {
        //Verify the token that was sent
        const verifiedUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = verifiedUser;
        next();
    } catch (error) {
        res.status(403).json({ authorized: false, details: "Token not valid", error: error });
    }
}

//POST Route to create a new user account
app.post('/api/users/new', async (req, res) => {
    console.log("Creating new user account! Welcome!");
    
    try {
        //Deconstruct the request body to use in the queries
        const { name, email, password } = req.body;

        //Check that the user does not already exist
        const checkUserQuery = 'SELECT EXISTS(SELECT email FROM users WHERE email = $1)';
        const checkUser = await db.query(checkUserQuery, [email]);

        if (checkUser.rows.length < 1) {
            //If there is no response (should be true or false) send error to client
            throw new Error ("Error checking username existence");
        } else if (checkUser.rows[0].exists) {
            //If the response is true, this user already exists. Exit request and send status to client for error handling.
            res.json({ newUser: false });
        } else {
            //Create a hashed password using bcrypt and salt rounds
            const hashedPassword = await bcrypt.hash(password, 10);

            //Send query to post new user info with hashed password
            const createUserQuery = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING name, user_id';
            const createUser = await db.query(createUserQuery, [name, email, hashedPassword]);
            
            if (createUser.rows.length < 1) {
                throw new Error ("Error creating new user");
            } else {
                 //Store new values to send back to client for display
                const newUser = createUser.rows[0];
                const userId = newUser.user_id;
                const name = newUser.name;

                //Create JWT Access Token to use for authorization
                const accessToken = jwt.sign({ userId: userId } , process.env.ACCESS_TOKEN_SECRET);

                //Send back all needed info to sign user in immediately
                res.status(200).json({ newUser: true, name: name, userId: userId, accessToken: accessToken });
            }
        }
    } catch (error) {
        res.status(500).json({ message: "Unable to create new user", details: error });
    }
})

//POST Route to log user in
app.post('/api/users/login', async (req, res) => {
    console.log("Logging in user!");
    
    try {
        //Deconstruct the request body to use in the queries
        const { email, password } = req.body;

        //Check that the user exists and return user data if so
        const checkUserQuery = 'SELECT * FROM users WHERE email = $1';
        const checkUser = await db.query(checkUserQuery, [email]);

        if (checkUser.rows.length < 1) {
            //No rows are returned when the email is not found - send error handling
            res.json({ exists: false, error: "User details not found." });
        } else {
            //Pull out data returned from query
            const userData = checkUser.rows[0];

            //Compare the stored password with the password entered by user
            if (await bcrypt.compare(password, userData.password)) {
                //Pull out relevant variables from userData
                const userId = userData.user_id;
                const name = userData.name;

                //Create JWT Access Token to use for authorization
                const accessToken = jwt.sign({ userId: userId } , process.env.ACCESS_TOKEN_SECRET);
                
                //Send back the info we want and the access token
                res.status(200).json({ exists: true, authorized: true, userId: userId, name: name, accessToken: accessToken });
            } else {
                res.json({ exists: true, authorized: false, error: "Incorrect password" });
            }
        } 
    } catch (error) {
        res.status(500).send({ message: "Unable to log in user", details: error });
    }
})

//POST Route to check log in by checking username (using for testing only) - Also use for family connection!
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

        const userId = userDetails.rows[0].user_id;

        res.json({ exists: true, userId: userId, name: username });

    } catch (error) {
        res.status(500).json({ error: "Could not log in", details: error });
    }
})

//GET Route to pull pet information for a particular user
app.get('/api/pets/:userId', async (req, res) => {
    console.log('Pulling pet information');
    console.log('Parameters', req.params);

    try {
        //Pull User ID from the parameters
        const userId = req.params.userId;

        //Query to pull all pet ids that have this user listed as a primary or secondary user
        const petIdQuery = 'SELECT pet_id FROM family WHERE user_id_primary = $1 OR user_id_secondary = $1';
        const petListData = await db.query(petIdQuery, [userId]);

        //Make sure there are pets associated with this account
        if (petListData.rowCount === 0) {
            res.json([{ pets: false }]);
        } else {
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
        }

        
    } catch (error) {
        res.status(500).json({ error: "Unable to pull pet information", details: error });
    }
})

//POST Route to create new training plan (stretch goal)
app.post('/api/plans', async (req, res) => {
    console.log("Creating your new plan!");

    try {
        //Create array with column names using request body fields
        const fields = Object.keys(req.body);

        //Create array with values using request body values
        const values = Object.values(req.body);

        //Create placeholders based on fields length
        const placeholders = fields.map((_, index) => `$${index + 1}`).join(", ");

        //Compile query statement with field names and placeholders
        const queryInsert = `INSERT INTO plans (${fields}) VALUES (${placeholders}) RETURNING plan_id`;

        //Send query to database with values array
        const newPlan = await db.query(queryInsert, values);

        if (newPlan.rowCount < 1) {
            throw new Error ("Error creating new plan");
        } else {
            const newPlanId = newPlan.rows[0].plan_id;
            //NEED TO ADD ANOTHER QUERY TO NOW IMMEDIATELY CREATE A SUBSCRIPTION BETWEEN THIS USER, SELECTED PET, AND NEW PLAN ID
            res.status(200).json({newPlanId});
        }
    } catch (error) {
        res.status(500).json({ error: "Unable to create new training plan", details: error });
    }
})

//GET Route to pull all training plans that a user is subscribed to
app.get('/api/plans/:userId/:petId', async (req, res) => {
    console.log("Pulling all relevant subscriptions");

    try {
        //Pull the userId and petId from the parameters
        const userId = req.params.userId;
        const petId = req.params.petId;

        //Query statement to get all subscriptions for this user/pet pair
        const getSubscriptionsQuery = 'SELECT * FROM subscriptions WHERE user_id = $1 AND pet_id = $2 ORDER BY last_updated DESC';

        //Send query to database
        const subscriptionsQuery = await db.query(getSubscriptionsQuery, [userId, petId]);

        if (subscriptionsQuery.rowCount < 1) {
            //Send subscription status if none are found
            res.status(200).json([{ subscriptions: false }]);
        } else {
            //Loop through the subscriptions to pull and add the plan titles
            const allSubscriptionInfo = await Promise.all(subscriptionsQuery.rows.map(async (subscription) => {
                //Pull the plan ID for the subscription
                const planId = subscription.plan_id;

                //Query the plans table for the title and stages of the plan
                const planDetailsQueryInsert = 'SELECT title, stages FROM plans WHERE plan_id = $1';
                const planDetails = await db.query(planDetailsQueryInsert, [planId]);

                if (planDetails.rowCount < 1) {
                    //Error handling in case no title is found - it's a NOT NULL column so should always have a title
                    throw new Error ("Error pulling plan titles");
                } else {
                    //Return an adjusted object to add on the title and stages of the plan
                    return { ...subscription, ...planDetails.rows[0] };
                }
            }))

            //Send the subscription status along with each subscription and its respective information
            res.status(200).json([ { subscriptions: true }, ...allSubscriptionInfo ]);
        }
    } catch (error) {
        res.status(500).json({ message: "Unable to pull all training plans", details: error });
    }
})

//GET Route to pull all session data for each subscription
//'/api/sessions/history/:subscriptionId'
app.get('/api/sessions/history/:subscriptionId', async (req, res) => {
    console.log("Getting all history for this pet and training plan");
    
    try {
        //Pull information from parameters to pull appropriate training history
        const subscriptionId = req.params.subscriptionId;

        //Query for all sessions associated with this pet and plan
        const allSessionsQuery = `SELECT * FROM sessions WHERE subscription_id = ${subscriptionId} ORDER BY date ASC`;
        const allSessions = await db.query(allSessionsQuery);

        //Query for latest status from subscription table
        const statusQuery = `SELECT status FROM subscriptions WHERE subscription_id = ${subscriptionId}`;
        const statusResponse = await db.query(statusQuery);

        //If no sessions, return sessions as false but include current subscription status
        if (allSessions.rowCount < 1) {
            res.status(200).send({ sessions: false, status: statusResponse.rows[0].status });
        } else {
            //Pull out just the session details to send back as an array of objects
            const sessionDetails = Object.values(allSessions.rows);
            res.status(200).send({ sessions: true, status: statusResponse.rows[0].status, sessionDetails: sessionDetails });
        }
    } catch (error) {
        res.status(500).json({ error: "Unable to get all history data", details: error });
    }
})

//POST Route to submit information for a new session
//'/sessions/:userId'
app.post('/api/sessions',async (req, res) => {
    console.log("Creating new session record woohoo");

    try {
        //Hold the request information in a new variable
        const request = req.body;
        console.log("request body", request);
        
        //Pull out the status into its own variable and delete it from the request object
        const newStatus = request.status;
        delete request.status;

        //Pull all fields from request
        const fields = Object.keys(request);

        //Map into a string with field names and replace camel case with PSQL naming
        const fieldQueryInsert = fields.map((field) => `${field.replace("Id", "_id")}`).join(", ");

        //Pull out values from request
        const values = Object.values(request);

        //Create placeholders for each value
        const placeholders = values.map((_,index) => `$${index + 1}`).join(", ");

        //Compile query statement with field names and value placeholders
        const newSessionQuery = `INSERT INTO sessions (${fieldQueryInsert}) VALUES (${placeholders})`;
        //Send request to database with values array
        const newSessionInfo = await db.query(newSessionQuery, values);

        //Error handling - if no response, send error
        if (newSessionInfo.rowCount < 1) {
            throw new Error ("Error creating session");
        } else {
            //If that query is successful, check to see if the status needs to be updated
            if (newStatus) {
                //Create query statement to update the status and last updated columns for this subscription
                const subscriptionUpdateInsert = 'UPDATE subscriptions SET status = $1, last_updated = $2 WHERE subscription_id = $3 RETURNING *';
                
                //Send query with relevant variables
                const subscriptionUpdateQuery = await db.query(subscriptionUpdateInsert, [newStatus, request.date, request.subscriptionId]);

                //If there is an error, send back error to trigger client-side error handling message
                if (subscriptionUpdateQuery.rowCount < 1) {
                    throw new Error ("Error updating subscription table");
                } else {
                    //If successful, send Status 200 OK
                    res.status(200).send();
                }
            } else {
                res.status(200).send();
            }  
        }
    } catch (error) {
        res.status(500).json({ error: "Unable to record this session's details", details: error});
    }
})

//PUT Route to edit session information (stretch goal)
//'/sessions/:session_id'
app.put('/api/sessions/:sessionId', async (req, res) => {
    console.log("Updating session details");

    try {
        //Pull session ID from parameters
        const sessionId = req.params.sessionId;
        
        //Pull all fields from request
        const fields = Object.keys(req.body);
        //Replace camel case with PSQL naming
        const fieldsRenamed = fields.map((field) => field.replace("Id", "_id"));
        //Create query insert with field names
        const fieldQueryInsert = fieldsRenamed.map((field, index) => `"${field}" = $${index + 1}`).join(', ');

        //Pull out values from request body
        const values = Object.values(req.body);

        //Compile query statement with field names and session Id
        const updateSessionQuery = `UPDATE sessions SET ${fieldQueryInsert} WHERE session_id = ${sessionId} RETURNING *`;

        //Send request to database with values array
        const updateSession = await db.query(updateSessionQuery, values);

        //Error handling - if no response, send error
        if (updateSession.rowCount < 1) {
            throw new Error ("Error updating session");
        } else {
            //Otherwise, send Status 200 OK and new session information
            res.status(200).send(updateSession.rows[0]);
        }
    } catch (error) {
        res.status(500).json({ error: "Unable to record this session's details", details: error});
    }
})

//DELETE Route to delete a session
app.delete('/api/sessions/:sessionId', async (req, res) => {
    console.log("Deleting session!");

    try {
        //Pull Session ID from parameters
        const sessionId = req.params.sessionId;

        //Create query to delete this pet id
        const deleteSessionQuery = `DELETE FROM sessions WHERE session_id = '${sessionId}'`;
        const deletedSession = await db.query(deleteSessionQuery);

        if (deletedSession.rowCount < 1) {
            throw new Error ("Error deleting session from database");
        } else {
            res.status(200).send();
        }
    } catch (error) {
        res.status(500).json({ error: "Unable to delete session", details: error });
    }
})

//PUT Route to edit user information
//'/users/:user_id'
//This will be created once log in is established and we can create users.

//POST Route to create a new pet
app.post('/api/pets/new/:userId', async (req, res) => {
    //Print message to console to use for troubleshooting
    console.log("Creating new pet!");

    try {
        //Pull name and species of new pet from request body
        const name = req.body.petName;
        const species = req.body.species;

        //Create query string that creates a new row in the pets table
        const newPetQuery = 'INSERT INTO pets (name, species) VALUES ($1, $2) RETURNING pet_id';
        const addPet = await db.query(newPetQuery, [name, species]);

        //Error handling in case the new record could not be created
        if (addPet.rowCount < 1) {
            throw new Error ("Error creating new pet");
        } else {
            //If the record is created, it should return the new pet_id
            const petId = addPet.rows[0].pet_id;

            //Pull the userId from the original request parameters
            const userId = req.params.userId;

            //Use the petId and userId to create a new family record for this user and this pet
            const newFamilyQuery = 'INSERT INTO family (user_id_primary, pet_id) VALUES ($1, $2)';
            const familyConnection = await db.query(newFamilyQuery, [userId, petId]);

            //Error handling in case new family connection could not be created
            if (familyConnection.rowCount < 1) {
                throw new Error ("Error establishing family connection");
            } else {
                //Send back petId to client
                res.send({ petId: petId });
            }
        }
    } catch {
        res.status(500).json({ error: "Unable to create new pet", details: error });
    }
})

//PUT Route to update pet information
app.put('/api/pets/update/:petId', async (req, res) => {
    console.log("Updating this pet's information!");

    try {
        //Pull petId from parameters
        const petId = req.params.petId;

        //Pull updated information from request body
        const petName = req.body.petName;
        const species = req.body.species;

        //Compile query string to update all information
        const updatePetQuery = `UPDATE pets SET name = '${petName}', species = '${species}' WHERE pet_id = '${petId}' RETURNING *`;

        //Send query to database to update info
        const updatedPetInfo = await db.query(updatePetQuery);

        //Error handling - all information should be returned
        if (updatedPetInfo.rowCount < 1) {
            throw new Error ("Error retrieving all updated information");
        } else {
            res.send(updatedPetInfo.rows);
        }
    } catch (error) {
        res.status(500).json({ error: "Unable to update pet", details: error });
    }
})

//DELETE Route to delete a pet
app.delete('/api/pets/delete/:petId', async (req, res) => {
    console.log("Sadly deleting this pet now!");

    try {
        //Pull Pet ID from parameters
        const petId = req.params.petId;

        //Create query to delete this pet id
        const deletePetQuery = `DELETE FROM pets WHERE pet_id = '${petId}'`;
        const deletedPet = await db.query(deletePetQuery);

        if (deletedPet.rowCount < 1) {
            throw new Error ("Error deleting pet from database");
        } else {
            res.status(200).send();
        }
    } catch (error) {
        res.status(500).json({ error: "Unable to delete pet", details: error });
    }
})

//PUT Route to create a new association between two members (stretch goal)
app.put('/api/family', async (req, res) => {
    //Print message to console for potential troubleshooting
    console.log("Creating family connection!");

    try {
        //Pull all relevant ID's from request body
        const primaryUser = req.body.primaryUserId;
        const secondaryUser = req.body.secondaryUserId;
        const pet = req.body.petId;

        //Create database query string using request body variables
        const addConnectionQuery = `UPDATE family SET user_id_secondary = ${secondaryUser} WHERE user_id_primary = ${primaryUser} AND pet_id = ${pet}`

        //Send query to database to add in the secondary user
        const connectionRequest = await db.query(addConnectionQuery);
        
        //Error handling in case the query is not successful
        if(connectionRequest.rowCount < 1) {
            throw new Error("Error updating table");
        } else {
            //Send back 200 OK status to end route
            res.status(200).json();
        }
    } catch (error) {
        res.status(500).json({ error: "Unable to create row in family table", details: error });
    }
})


//********** Third Party API Calls (3) **********
//GET request to fetch the motivational quote of the day
app.get('/api/quotes/daily', async (req, res) => {
    const url = 'https://zenquotes.io/api/today/';

    console.log("Fetching quote of the day!");
    //Server will fetch the quote from the url
    fetch(url)
        //Response is parsed into json format
        .then((res) => res.json())
        //JSON is sent to the front end
        .then((quote) => res.send({quote: quote[0].q, author: quote[0].a}))
        //If there is an error, the details will be logged to the console FOR NOW
            //This needs to be updated to have better error handling
        .catch((err) => {
            console.error({ error: "Something went wrong fetching the quote of the day", details: err });
        })
})

//GET request to fetch a list of motivational quotes
app.get('/api/quotes/list', async (req, res) => {
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
app.get('/api/quotes/random', async (req, res) => {
    const url = 'https://zenquotes.io/api/random/';

    console.log("Fetching single random quote!");
    //Server will fetch the quote from the url
    fetch(url)
        //Response is parsed into json format
        .then((res) => res.json())
        //JSON is sent to the front end
        .then((quote) => res.send({quote: quote[0].q, author: quote[0].a}))
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