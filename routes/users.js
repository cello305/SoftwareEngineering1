import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const users = []

router.get('/', (req, res) => {
    
    res.send(users);
});

router.post('/', (req, res) => {
    const user = req.body;

    users.push({...user, id: uuidv4()});

    res.send(`User with the username ${user.firstName} added to the database!`);
});

export default router;