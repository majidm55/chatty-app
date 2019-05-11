Chatty
=====================

Chatty is a client-side single-page application that allows multiple users to chat with each other. Users are able to set their username and chat in real-time through through the Websocket server.

## Final App
![Screenshot from 2019-05-10 20-12-56](https://user-images.githubusercontent.com/39141671/57562617-413cbe80-7362-11e9-9c61-c6218327b9eb.png)

![Screenshot from 2019-05-10 20-14-35](https://user-images.githubusercontent.com/39141671/57562620-4568dc00-7362-11e9-81e7-695d9fdc1358.png)

![Screenshot from 2019-05-10 20-15-12](https://user-images.githubusercontent.com/39141671/57562623-4994f980-7362-11e9-976f-dc70c1b35439.png)

### Usage

Clone the repo to your local machine.
```
git clone https://github.com/majidm55/chatty-app
cd chatty-app
```
Install the dependencies and start the server.
```
npm install
npm start
open http://localhost:3000 for the express server

``````
node chatty-server.js --- to start the websocket server on http://localhost:3001


```



### Dependencies
* ReactJS
* Parcel
* Babel
* SASS
* Express
* Websockets
* Moment
* UUID