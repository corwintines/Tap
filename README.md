<h1>New Media Independent Study - TAP</h1>

<h2>Project Description</h2>
<p>Tap is a web application using a javascript stack and an Arduino to represent fluvial flow data.
This application uses flow sensors for the Arduino, and a Node.js library called Johnny-five to
gather flow sensor data and store this information in a MongoDB database. Node.js was used to create the server for the 
application. jQuery, Javascript, and Ajax were used to create the front end application 
to display the flow data in the browser.</p>
<p>The application in mind for this project is to use this type of technology in a tap house setting.
This web app simulates a tap house, which would have these flow sensors attached to the kegs
of beer, and display in real time information about these individual kegs of beer. This can be
both beneficial for a customer and owner of a tap house. Customers are able to see what is on
tap at any given time. The information a customer can receive includes the name of the beer,
brewery, alcohol percent, description, and amount left in the keg. This can benefit tap houses
which frequently rotate their taps, since a user can check their website whenever to see whats
on tap so that they don’t miss out on their favourite brew. Furthermore the owner can receive
some very valuable detail about the flow data. On top of what the customers can see, owners
are able to get information about waste, glasses poured, keg size, etc. The owners also have an
interface to hookup and detach sensors from kegs as they become empty and are tapped with a
new keg.</p>
<p>This application was created as an independent study and isnt "complete" by any means. It was used 
to create a proof of concept, and could use work to tie things all together. Not to deter anyone from 
looking, but dont expect a finished product from this repository ;)</p>

<h2>Installation</h2>
<p>Clone the repository:
<br><em>git clone https://github.com/CSSmitty/Tap.git</em>
<br>Navigate to application directory where appliaction is cloned in your terminal and 
install application dependencies from the package.json from the terminal:
<br><em>npm install</em></p>

<h2>Setup</h2>
<h3>Database</h3>
<p>This application was built using MongoDB. The database is pretty simple to create for this application as 
it only uses one collection in this current state. The collection you will need to create is "keg".<p>
<h3>Server</h3>
<p>All dependencies should be installed when running <em>npm install</em> in the route folder.
<br>The server API file <em>flow_data_server.js</em> is located in the BOH folder. The url variable will need 
the url to your database that has been setup.</p>
<h3>Johnny-Five Arduino Application</h3>
<p>All dependencies should be installed when running <em>npm install</em> in the route folder.
<br>The Arduno application file <em>flow_sensing.js</em> is located in BOH/arduino. The API_ROUTE variable will 
need the url to where your server is running.</p>
<h3>Client Side Routes</h3>
<p>There are two client side route files: <em>home_routes.js</em> and <em>keg_routes.js</em>. These files 
are located at FOH/routes. Both of these files contain an API_ROUTE variable which will need the url to 
where the your server is running.</p>

<h2>Run</h2>
<h3>Gulp File</h3>
<p>All dependencies should be installed when running <em>npm install</em> in the route folder.
<br>The gulp file will be used to launch a local version of the client code. This gulp file 
include live reloading of the browser using browser-sync. This function will run and refresh 
the page every time a css, javascript, or html file has been changed.
<br>To run the gulpfile.js navigate to the route directory which contains the gulpfile.js in the 
terminal, and simply run the command <em>gulp</em></p>
<h3>Node Flow Data Server</h3>
<p>All dependencies should be installed when running <em>npm install</em> in the route folder.
<br>The API used for this application runs with the <em>flow_data_server.js</em> file located in BOH. 
To run this server navigate to the BOH folder, and run the command <em>node flow_data_server.js</em>.
<h3>Node Johnny-Five Arduino</h3>
<p>All dependencies should be installed when running <em>npm install</em> in the route folder.
<br>The API used for this application runs with the <em>flow_sensing.js</em> file located in BOH/arduino. 
To run this application navigate to the BOH/arduino folder, and run the command <em>node flow_sensing.js</em>.</p>
<h2>Stack</h2>
<p><strong>Node.js</strong> - Node.js was used as the server for this project. It accepted routes from the front end,
and was used to create an API to access the database for the frontend, and the Arduino.
<br>
<p><strong>Express</strong> - Express is a Node.js library that helps organize a web application to use MVC. I used
it to control all my routes, and requests between all the components of my application. Express
ran on the node server, and provide managment for the requests and routes send to the node
server.</p>
<br>
<p><strong>
