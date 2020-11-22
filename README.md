![MIT LICENSE](https://img.shields.io/github/license/julianbooher/weekend-sql-to-do-list.svg?style=flat-square)
![REPO SIZE](https://img.shields.io/github/repo-size/julianbooher/weekend-sql-to-do-list.svg?style=flat-square)
![TOP_LANGUAGE](https://img.shields.io/github/languages/top/julianbooher/weekend-sql-to-do-list.svg?style=flat-square)
![FORKS](https://img.shields.io/github/forks/julianbooher/weekend-sql-to-do-list.svg?style=social)

# To-Do list!

## Description

_Duration: Weekend_

Web app that allows the user to add tasks to a to-do list. From there, they can be marked as complete, marked as incomplete, or deleted.

## Screen Shot

![Wireframe](calculator.png)

## Installation

To initialize the database, create a new database in your local/localhost route called "weekend-to-do-app". Inside of that database, using Postico or another SQL app, run the SQL queries provided in database.sql to get the initial table up and running with some test data.

Download the repository and [node.js](https://nodejs.org/en/download/).  With the folder open in your terminal, run 'npm install' inside the terminal window. Run 'npm start' instide the terminal window to launch the local server, and then you can access the web app through http://localhost:5000/.

## Usage

- Input fields at the top of the page allow the user to submit a name and task, which will be appended to the DOM.
- If the user fails to input one or both of those values, an error message will appear directing them to correct the mistake.
- Once a task is appended to the DOM, the user can choose to complete the task or delete it.
- If the task is completed, it will move to a seperate area below the incomplete tasks, and it will have a new background color, and a button to mark it incomplete rather than complete.
- When the user attempts to delete a task, using sweetalert2, the user is prompted to ensure that they meant to delete.

## Built With

HTML, CSS, javascript, jQuery, node, express, bootstrap, sweetalert2, postgresql.

## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality.
