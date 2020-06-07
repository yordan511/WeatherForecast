# Weather forecast Web Application

## Libraries and tools 🛠

<li> React for the UI, Javascript and NodeJs for the backend </li>
<li> Koa for the web server <a href="https://koajs.com">KOA js</a> </li>
<li> the Open Weather API for the weather forecasts <a href="https://openweathermap.org/api">Open weaher API</a> </li>

## Setup application for development

<pre>
For backend:
    1. Run  <b>cd ./server; npm i;</b> from project root folder
    2. create .env file in /server root folder You can follow instruction and schema from ./server/env.example
    3. Run npm run start:dev
    4. Create test data with: <b> npx sequelize-cli db:seed:all</b>
    5. The app will run on http://localhost:8000
For frontend:
    1. Run <b>cd ./client; npm i; </b> from project root folder
    2. Run <b>npm start</b>
    3. The application will start on http://localhost:3000 
</pre>
