import express, { Router } from 'express';
import axios from 'axios';
import exp from 'constants';

const router = express.Router();

const apiKey = process.env.OPENAI_sAPI_KEY;
const openaiEndpoint = 'https://api.openai.com/v1/engines/davinci/completions';



export default router.post('/openai', async (req, res) => {
  try {
    const { prompt } = req.body;
    const data = {
      prompt,
      temperature: 0.7,
      max_tokens: 50,
    };

    const response = await axios.post(openaiEndpoint, data, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

