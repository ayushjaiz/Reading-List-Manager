import dotenv from "dotenv";
dotenv.config();

import app from "./app";
const port = process.env.APP_PORT || 3001;

app.listen(port, async() => {
    console.log('App running on port ' + port);
})
