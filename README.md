# Click and Treat 🐾

Click and Treat is a free training tracker to help pet owners structure and document their training sessions! Using Express, Node, and Postgres for the back-end and React and Vite for the front-end, it will allow users to add information about their pets, subscribe to training plans that break down how to teach individual skills, and keep track of each training session they have to teach that particular skill. 

## Installation

Follow these steps to run the Click and Treat project locally:

Open your terminal

Change directory to where you want to store the project

```
~/ cd new/Directory/on/your/machine
```

Clone this repository using the HTTPS URL

```
git clone https://github.com/tati-guzman/click-and-treat.git
```

Navigate into the client directory

```
cd ./client
```

Install all relevant dependencies

```
npm install
```

Navigate into the server directory

```
cd ../server/
```

Install all relevant dependencies

```
npm install
```

Restore DB Dump file

```
psql -f db.sql
```

Create a .env file

```
touch .env
```

Add in relevant configuration

```
DB_URI="postgresql://localhost/<nameofdatabase>"
```

Start the app concurrently from server directory

```
npm run dev
```

Navigate to [http://localhost:5173](http://localhost:5173) to interact with the front end of the app.

### Demo

### Initial Planning

**Wireframe Screenshots**

**JIRA Board - Time Management Plan**

[JIRA Board - Time Management Plan](https://tatig.atlassian.net/jira/software/projects/SCRUM/boards/1)

**Final Project Pitch Submission**

[Final Project Pitch Submission](https://docs.google.com/document/d/19jHNFmB-RNIfTSqL__L6Vild3wVimdt0VtsSXUiloRg/edit?tab=t.0)

## Built With

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

[Visual Studio Code](https://code.visualstudio.com/) - Source code editor

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

[JavaScript](https://www.javascript.com/) - Primary language used

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)

[HTML](https://html.com/) - Used to design web layout


![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

[@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
[@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

[Express.js](https://expressjs.com/) as a web framework for Node.js

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

[PostgreSQL](https://www.postgresql.org/docs/current/datatype-datetime.html) - Used for database design and implementation

## Future Features

- [ ] 

## Acknowledgements