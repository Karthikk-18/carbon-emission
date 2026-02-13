import express from 'express';
import { calculateCarbonStats } from './cec-logic.js';

const app = express();
const port = 8080;

app.use(express.json());

app.post('/calculate', (req, res) => {
    try {
        const result = calculateCarbonStats(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({error : error.message});
    }
});

app.listen(port, () => {
    console.log(`WEBSITE is running on http://localhost:${port}`);
});