1- Create a new empty folder.
2- Run npm init in that folder.
3- Just press enter on all the asked questions.
4- Once the process completed, run following commands
 "npm i express" 
 "npm i mongoose" 
 "npm i body-parser" 
 to install required libs in the project.
5- After that, create a new JS file named as index.js in your diractory.
6- Go to package.json, In the scripts object create a new property to run our server like this:
	 "scripts": {
    			"test": "echo \"Error: no test specified\" && exit 1",
    			"start": "node index.js             <=========================
  		    }

7- Finally run "npm start" to run your server.