import express from 'express';
import {googleController} from '../controllers/main.controllers.js'

export const google = express.Router();
google.post('/register-attendance', googleController.registerAttendance)