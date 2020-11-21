-- if you need to drop the table
DROP TABLE todos;
-- creates the todos table, inside of the weekend-to-do-app db.
CREATE TABLE todos(
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (12) NOT NULL,
	"todo" VARCHAR (120) NOT NULL,
	"date_added" VARCHAR (20),
	"date_completed" VARCHAR (20)
);

-- some garbage values to insert, just to initialize the table for the web app.
INSERT INTO todos (name, todo, date_added) VALUES ('Julian', 'Clean the dishes.', '11/20/20');
INSERT INTO todos (name, todo, date_added) VALUES ('Teaghan', 'Clean the bathroom.', '11/20/20');
INSERT INTO todos (name, todo, date_added) VALUES ('Henri', 'Clean the cat litter.', '11/20/20');
INSERT INTO todos (name, todo, date_added) VALUES ('Miro', 'Play with the string.', '11/20/20');

-- Current select as of 11/21/20
SELECT * FROM todos ORDER BY date_completed DESC, date_added, id;