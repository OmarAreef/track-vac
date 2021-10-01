# Track-Vac


## Enviromental documentation: <br>
1. Make sure you have Mongo installed globally , video tutorial Link : https://www.youtube.com/watch?v=MCpbfYvvoPY <br>
2. Download Node.js <br> 
3. install git bash terminal.

note : make sure you have access to the internet at all times.
## How to start project locally: 
1. open your terminal in the folder you have the project in and run ( npm i ) to install dependencies this may take a few minutes.
2. open another terminal in your home directory ( running powershell on windows will open in the home directory by default ) then run ( mongod ) to open a connection to the DB.
3. in the terminal in the project folder run ( cd seeds ) then ( node index ) to populate the DB with dummy data.
4. then return to the project folder by ( cd ..) 
5. Then lastly run( node app ) to the start the app.

## Users & Admin credentials: 
to access admin pages you need to go to localhost:3000/admin/login , there is a ready admin with username : admin , password : password.

there are 3 user login in data : 
1. reg_num: 10008980771468, pass: 2233, this user is registered however still not vaccinated.
2. reg_num: 10008980121468, pass: 2233, this user is registered and took the 1st Dose.
3. reg_num: 10005060708090, pass: 2233, this user is registered and took the 2st Dose.

for site usages and functionalities refer to the FAQ page in the app.
