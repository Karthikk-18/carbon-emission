import express from 'express';
import { calculateCarbonStats } from './cec-logic.js';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

//serve static files using frintend directory
app.use(express.static('frontend'));

app.post('/calculate', (req, res) => {
    try {

        if(!req.body || typeof req.body !== 'object'){
            return res.status(400).json({error : 'Invalid request Body'});
        }

        const result = calculateCarbonStats(req.body);
        res.json(result);
    } catch (error) {
        console.log("calculation error : ",error);
        return res.status(400).json({error: "failed to calculate emissions, Please check your Input values"});
    }
});

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});