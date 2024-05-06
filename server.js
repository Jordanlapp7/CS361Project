require('dotenv').config() // Create process.env object
const PORT = process.env.PORT; // Determine port

const express = require('express') // Create Express app
const app = express()

app.use(express.json()) // Middleware to parse JSON bodies
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))

const OpenAI = require('openai') // Create OPENAI instance
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

// Route to handle question submission
app.get('/', (req, res) => {
  res.sendFile('/index.html');
});

app.post('/generate', async (req, res) => {
  console.log('POST Received')
    try {
      const date = req.body.date;
      const sportsLeague = req.body['sports-league'];
      const articleLength = req.body['article-length'];
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `Generate a ${articleLength}-sized report on games that occurred on ${date} for the following sports leagues: ${sportsLeague}.`,
          }
        ],
        max_tokens: 1000,
      });
  
      console.log(response.choices[0].message)
      res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Generated Report</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>  
        <h1>Generated Report</h1>
        <p style="white-space: pre-wrap;">${response.choices[0].message.content}</p>
        <a href="/" >Generate Another Report!</a>
      </body>
      </html>
      `);
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      res.status(500).json({ message: 'Failed to fetch response' });
    }
  });



app.listen(PORT, () => console.log(`Server running on https://localhost:${PORT}`))