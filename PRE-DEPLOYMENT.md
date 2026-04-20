# DevBlog – Node.js, MongoDB & Docker Project

This project is a **DevBlog backend application** built with **Node.js, Express, MongoDB**, and **Docker**.  
It includes user management, admin authentication, MongoDB integration, and containerized deployment.

The goal of this project was to:
- Set up a Node.js backend
- Connect MongoDB locally and inside Docker
- Create users via a CLI tool
- Implement admin authentication
- Debug real-world Docker and environment issues
- Learn container networking and session handling

---

## Tech Stack

- **Node.js** (v19)
- **Express.js**
- **MongoDB**
- **Mongoose**
- **EJS** (views)
- **Docker & Docker Compose**
- **MongoDB Compass / Mongo Express**
- **express-session**
- **dotenv**

---

## Project Structure
```bash
devblog/
├── app.js
├── bin/
│ └── www
├── routes/
│ ├── index.js
│ └── admin.js
├── models/
│ └── User.js
├── utils/
│ └── db.js
├── views/
│ ├── admin/
│ └── error.ejs
├── public/
├── create-user-cli.js
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── .env
├── package.json
└── README.md
```



#Environment Variables

Create a `.env` file in the project root:

```bash
.env
MONGO_URI=mongodb://127.0.0.1:27017/devblog npm start
```

### Running the App Locally (Without Docker)
Install dependencies
```bash
nvm install 19
node -v
npm -v
nvm use 19
```

## Start MongoDB (Windows)
After installing MongoDB, you start the service

```bash
Get-Service MongoDB
Start-Service MongoDB
```

## Creating Users via CLI

A CLI tool was created to insert users directly into MongoDB.

```bash
Run the CLI
node create-user-cli.js
```

## Docker Setup
Dockerfile (Node + Alpine)

The app is containerized using a lightweight Node Alpine image.
I wrote a Dockerfile from the project root directory.

![](./Images/1.%20dockerfile.png)


Build the image
```bash
docker build -t devblog .
```

## Run container

```bash
docker run --rm --name devblog -p 3000:3000 devblog:latest

or

docker run -p 3000:3000 --env-file .env devblog
```

![](./Images/3.%20devblog3000.png)


## Docker Compose

Docker Compose is used to manage the application container.

Build and start 

```bash
docker compose up --build

docker ps

Stop services
docker compose down --remove-orphans
```

![](./Images/5.%20dockerps.png)


## To access or navigate into the container
```bash
docker exec -it devblog-web-1 sh
```
I noticed that alpine linux does not include `bash` by default it uses `sh`to naviagte into the container.


`error from docker exec` `bash`

![](./Images/6.%20exec-bash.png)

access with `sh`

![](./Images/7.%20exec-sh.png)


## MongoDB & Mongo Express

MongoDB
Runs locally on Windows

``` bash
Port: 27017
```

Accessed via Mongoose

MongoDB Compass

Used to visually inspect databases and collections.

Mongo Express

Run Mongo Express on my terminal to view MongoDB in the browser:

```bash
docker run -d \
  --name mongo-express \
  -p 8081:8081 \
  -e ME_CONFIG_MONGODB_SERVER=host.docker.internal \
  -e ME_CONFIG_BASICAUTH=false \
  mongo-express
  ```

Access:
```bash
http://localhost:8081
```

![](./Images/2.%20Mongodb.png)


## Admin Authentication Sessions

Admin authentication uses express-session.
meanwhile I was finding it difficult to login as an admin. then I added this line in the `app.js file`

Installed with:

```bash
npm install express-session --save

Configured in app.js:

app.use(session({
  secret: "devblog-secret-key",
  resave: false,
  saveUninitialized: false
}));
```
- Admin access

![](./Images/4.%20adminlogin.png)

## Routes

```bash
Admin login:

/login


Admin dashboard (protected):

/admin


Middleware ensures only authenticated users can access admin routes.
```


## NEXT: docker-compose.yml

I created my yml file

![](./Images/8.%20docker.yml.png)

- ran `docker compose up`

created a user cli

- `node create-user-cli.js`

![](./Images/9.%20mongodbuser.png)



# **NEXT `START.SH` Project**
