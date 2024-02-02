import express from 'express';
import dotenv from "dotenv";
import ViteExpress from "vite-express";

dotenv.config();

const app = express();

app.get("/message", (_, res) => res.send("Hello from express!"));

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));
