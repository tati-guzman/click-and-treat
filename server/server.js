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

//All Routes: Need to add more pseudocode

//Print PORT location when active PORT is detected (server is running properly)
app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
})