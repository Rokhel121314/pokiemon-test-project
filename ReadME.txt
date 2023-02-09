

1. clone the git repository to your local machine
2.change to the directory of the cloned repository
3. install dependecies.
*for front end
-change directory to frontend folder
-install the following node packages
	a. npm i axios
	b. npm install --save-dev http-proxy-middleware

*for server
-change directory to server folder
-install the following node packages/dependencies
	a. npm i cors
	b. npm i dotenv
	c. npm i express
	d. npm i mongoose
	e. npm i nodemon

4. setting up your mongoDB
	- create a .env file on server folder same level with your package.json files
	- inside put MONGO_URI=mongodb+srv://yourusername:yourpassword@crud.64rybr2.mongodb.net/PokemonDB?retryWrites=true&w=majority
	- database name "PokemonDB"
	- on your mongoDB Collection tab create a database 

5. start the app using npm start command on frontend directory
6. start the server using npm run devStart command to server directory