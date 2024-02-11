<!-- https://youtu.be/-42K44A1oMA -->
cd backend
npm init -y
add "type": "module",   in package.json
npm i express nodemon

update in package.json "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },

  create index.js file in backend

=>  add in index.js
import express from 'express';
const App = express();

create config.js
add => export const PORT = 5555;

<!-- updated index.js file -->
import express from 'express';
import {PORT} from './config.js'

const app = express();
app.listen(PORT, ()=>{
    console.log(`App is listening to port ${PORT}`);
});

=> npm run dev



-------------Create first HTTP route--------------
<!-- updated index.js file -->
import express from 'express';
import {PORT} from './config.js'

const app = express();

app.get('/',(request, response)=>{
    console.log(request);
    return response.status(200).send('Welcome to the mern stack tutorial');
});

app.listen(PORT, ()=>{
    console.log(`App is listening to port ${PORT}`);
});


-----------Add mongoDB and mongoose to nodejs----------
use online DB =>https://account.mongodb.com/account/login

mongoDB connection string 
<!-- mongodb+srv://root:<password>@books-store-mern-stack.crcyyc2.mongodb.net/?retryWrites=true&w=majority -->



<!-- -----------Create boooks modal in mongoose------- -->

<!-- express router -->

<!-- Install cors -->
npm i cors



<!-- create drontend project -->

npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
