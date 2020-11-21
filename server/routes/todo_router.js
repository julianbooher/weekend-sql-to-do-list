const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// TODO GET route
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM todos ORDER BY date_completed DESC, date_added, id;'
    pool.query(queryText).then(result => {
        // sends back results in an object
        res.send(result.rows);
    })
    .catch((error) => {
        console.log('error getting todos', error);
        res.sendStatus(500);
    })
})

// TODO POST route
router.post('/', (req, res) => {
    let newTodo = req.body;
    console.log('Adding newTodo', newTodo);
    let queryText = `INSERT INTO todos (name, todo, date_added) VALUES ($1, $2, $3)`
    pool.query(queryText, [newTodo.name, newTodo.todo, newTodo.date_added])
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('Error adding new todo', error);
            res.sendStatus(500);
        });
})
// TODO DELETE route
router.delete('/:id', (req, res) => {
    let id = req.params.id; // id of the thing to delete
    console.log('Delete route called with id of', id);
    let sqlText = `DELETE FROM todos WHERE id=$1`
    pool.query(sqlText, [id])
      .then( (result) => {
        res.sendStatus(200);
      })
      .catch( (error) => {
        console.log ('Error from db:', error);
        res.sendStatus(500);
      })
})


// TODO PUT route
router.put('/:id', (req, res) => {
    let id = req.params.id // id of the todo to be updated
    let newCompletion = req.body.completion
    // If there isn't a newCompletion, we want to make it null so it's null in the SQL table (for other if/else);
    if(!newCompletion){
        newCompletion = null;
    }
    // Make a SQL query to update the corresponding completion status, either to today's date, or to null.
    let sqlText = `UPDATE todos SET date_completed=$1 WHERE id=$2;`;
    pool.query(sqlText, [newCompletion, id])
    .then( (result) => {
      res.sendStatus(200);
    })
    .catch( (error) => {
      console.log ('Error from db:', error);
      res.sendStatus(500);
    })
    console.log(`Updating todos ${id} with `, newCompletion);

})


module.exports = router;