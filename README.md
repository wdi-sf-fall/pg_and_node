
## Node and Postgres

###Goals for today

- Learn how to use postgres package to talk to databases
- Practice DRY and OO design
- Implement first full stack web app!

#### Resources

[pg package](https://github.com/brianc/node-postgres) on GitHub.

####Setup 

Fork, clone [pg_and_node](git@github.com:wdi-sf-fall/pg_and_node.git) repo.
 
Setup sample DB used in today's lecture. In examples folder, fire up `psql` and run:

	\i setup.sql

Use `psql` commands to check that table and sample data was created.
	

###Installing pg

No surprise here:

	npm install pg


In order to use pg, require it in js file.

	var pg = require('pg');

###Configure db connection

```
var config = {
    database: "library_example_app",
    port: 5432,
    host: "localhost"
};
```

###Connecting to DB

Generally you will access the postgres server through a pool of `clients`. The `connect` method provides a callback that has a handle to a fresh `client` object. 

`Client` is the main interface point with the postgres server. It's used to run SELECT, INSERT, UPDATE and DELETE queries against the database. See [Client API reference](https://github.com/brianc/node-postgres/wiki/Client).


```
pg.connect(config, function(err, client, done){
	// We are connected to the DB ...
	// ... check 'err' to make sure!
	// 'client' represents the connection
	// When done, call 'done()' to release client back to pool.
}
```

### Running queries

Let's explore `basic.js`.

```
// SELECT SOME DATA
pg.connect(config, function(err, client, done){
		// Check for errors
        if (err) {
             console.error("OOOPS!!! SOMETHING WENT WRONG!", err);
        }
        // Client object represents a connection object
        // Let's retrieve all books
        client.query("SELECT * FROM BOOKS", function(err, resultSet){
	        if (err) {
	            console.log(err);
	        }
	        // resulSet represents, well, the set of results returned from the DB.
	        // It's an array containing rows
        	resultSet.rows.forEach(function(aRow){
          		console.log(aRow);
        	});
        });

        //call `done()` to release the client back to the pool
        done();
});
```

**That's not very DRY!** We can do better than that.

```
git checkout dry
```

Let's explore `dry.js`.

```
var db = {};
db.config = {
    database: "library_example_app",
    port: 5432,
    host: "localhost"
};

db.connect = function(runAfterConnecting) {
  pg.connect(db.config, function(err, client, done){
      if (err) {
           console.error("OOOPS!!! SOMETHING WENT WRONG!", err);
      }
      runAfterConnecting(client);
      done();
  });
};

db.query = function(statement, params, callback){
  db.connect(function(client){
    client.query(statement, params, callback);
  });
};
```


**Where are the Objects? ... SUPERDRY!** 

```
git checkout superdry
```

Let's explore `mydb_lib.js` and `superdry.js`.

###Exercise

Make *books* node app from Wednesday truly persistent. Store and retrieve book data from postgres. Use `mydb_lib.js`.


