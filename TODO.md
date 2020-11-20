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
    [] id, name, todo, completed(y/n), time posted automatic? (may want to use later), time completed? (may want to use later), complete by?
    [] make .sql file in the repository 
[] Index file
    [] header
    [] input fields to enter todo item
        [] think of other things to put in input fields, urgency w/ corresponding color?
    [] area to append table
    [] footer

[] client.js
    [] function to append the table from the sql DB when page loads
        [] ajax GET route
    [] click handler for submit button
        [] runs ajax post route, adds input to the database
        [] check to ensure inputs are full
    [] click handler for complete button eventually
        [] when clicked, background color of the task will change to indicate completion.
        [] toggles 'complete' column in database will change on click
        [] <td> row class will be based on the y/n data, background color etc.
    [] click handler for delete button eventually

[] README