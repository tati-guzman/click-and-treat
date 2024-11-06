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

**User Dashboard**

<img width="884" alt="Screenshot 2024-11-05 at 6 54 02 PM" src="https://github.com/user-attachments/assets/f3b016a1-6f34-4e54-b132-aba6772ca424">


**Session Form**

<img width="830" alt="Screenshot 2024-11-05 at 6 53 37 PM" src="https://github.com/user-attachments/assets/19f467ad-7941-469d-80bc-c8667164e285">


### Initial Planning

**Database Schema**

![Screenshot 2024-10-30 at 2 06 03 PM](https://github.com/user-attachments/assets/c7f25337-c052-4e80-9e43-70c0633be22d)

**Wireframe Screenshots**

![Screenshot 2024-10-30 at 2 05 10 PM](https://github.com/user-attachments/assets/1b06a502-fd40-44b0-9404-84abaa8557f4)

**JIRA Board - Time Management Plan**

[JIRA Board - Time Management Plan](https://tatig.atlassian.net/jira/software/projects/SCRUM/boards/1)

![Screenshot 2024-10-30 at 2 07 13 PM](https://github.com/user-attachments/assets/e54a881d-927d-48b1-a4c1-8b7a70786dff)

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

- [X] Training History Page: A component to list out all saved sessions for a pet, including sessions completed with connected users
- [X] Session Details: The ability to view all saved session details for prior sessions
- [X] [ZenQuotes API](https://docs.zenquotes.io/zenquotes-documentation/) Implementation: Users will be able to view motivational quotes provided by the ZenQuotes API
- [X] About Page & Example Training Plans: Users will have access to information about Techtonica, dog training, the inspiration behind the site, and available plans
- [ ] Log In Component: The current iteration of this project does not have an established account creation or log-in component. That is pending!
- [ ] User Connection: Users will be able to connect a specific pet to another user's accounts. This will allow them to view any training session completed by the other user for that particular pet. The goal of this feature is to facilitate organization and cooperation amongst household members who are all participating in the training of that pet.

## Acknowledgements

* Techtonica & the H2 2024 Cohort
* My pets, Daisy, Luke, and Han, for being my constant inspirations and sources of joy (and stress)
