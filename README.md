##dependancy graph

1) www depends on app.js
2) app.js depends on ./routes/index.js
3) ./routes/index.js depends on ../models/database.js
4) ../models/database.js has no dependancies


5) all of the files in /public depend on app.js to be served by the server
6) /public/main.js depends on public/Controller.js
7) /public/Controller.js depends on public/Auth.js and public/view.js
8) public/view.js depends on index.html and public/Controller.js
9) public/Auth.js has no dependancies