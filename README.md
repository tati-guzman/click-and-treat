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

## Future Features

- [ ] 

## Acknowledgements