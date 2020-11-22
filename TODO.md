[] Initial file tree.
    [x] pool.js
    [x] css + bootstrap
    [x] client.js
    [x] jquery
    [x] routes - todo router
    [x] server.js
[] initialize db
    [x] create db 'weekend-to-do-app'
    [x] create table for todos
    [x] id, name, todo, completed(y/n), time posted automatic? (may want to use later), time completed? (may want to use later), complete by?
    [] make .sql file in the repository 
[] Index file
    [x] header
    [x] input fields to enter todo item
        [] think of other things to put in input fields, urgency w/ corresponding color?
    [x] area to append table
    [] footer

[] client.js
    [x] function to append the table from the sql DB when page loads
        [x] ajax GET route
    [x] click handler for submit button
        [x] runs ajax post route, adds input to the database
        [x] check to ensure inputs are full
    [x] click handler for complete button eventually
        [] when clicked, background color of the task will change to indicate completion.
        [x] toggles 'complete' column in database will change on click
        [] <td> row class will be based on the y/n data, background color etc.
    [x] click handler for delete button eventually

[x] README