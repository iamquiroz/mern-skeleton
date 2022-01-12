import express from "express";
import path from 'path'
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import Template from "./../template";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";

// comment out before building for production
import devBundle from './devBundle'

const CURRENT_WORKING_DIR = process.cwd()
const app = express();

// comment out before building for production
devBundle.compile(app)
/* ... configure express ... */

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
// secure apps by settins variuous HTTP headers
app.use(helmet());
// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

// mount routes
app.use("/", userRoutes);
app.use("/", authRoutes);

app.get("/", (req, res) => {
  res.status(200).send(Template());
});

// Catch unauthorised errors

/*
- The code is trying to authorize a user with the username "admin".
- If it is successful, then the code sends back an HTTP response with status 
  code 200 and JSON data.
- The data contains information about the user's account such as their 
  email address and password.

- The first thing that happens in this function is that we check if there
   was an error by checking for err.name === 'UnauthorizedError'.
- If there was no error, then we send back a success message with
 status code 200 and JSON data containing information about the
  user's account such as their email address and password.
–
- The code will send a 401 Unauthorized error to the client if they are 
  not authorized.
  */
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});
export default app;
