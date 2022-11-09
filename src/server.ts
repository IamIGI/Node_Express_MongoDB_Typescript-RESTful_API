import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import config from './config/config';

const router = express();

mongoose
    .connect(config.mongo.url!)
    .then(() => {
        console.log('connected to DB');
    })
    .catch((error) => {
        console.log(error);
    });
