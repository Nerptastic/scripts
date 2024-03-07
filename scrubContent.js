require('dotenv').config();
const axios = require('axios');
const { JSDOM } = require('jsdom');

async function fetchContent(url) {
  const response = await axios.get(url);
  const dom = new JSDOM(response.data);
  const mainContent = dom.window.document.querySelector('main'); // Adjust selector based on your content structure
  return mainContent.textContent;
}

const axios = require('axios');

async function analyzeContent(text) {
  const apiKey = process.env.OPENAI_API_KEY; // Replace with your actual API key
  const response = await axios.post('https://api.openai.com/v1/completions', {
    model: 'text-davinci-003', // Choose the model best suited for your task
    prompt: `Check if the following text adheres to the use of serial commas: "${text}"`, // Tailor your prompt based on what you're checking
    temperature: 0.5,
    max_tokens: 60,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0
  }, {
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  });

  return response.data.choices[0].text.trim();
}

// Example usage
const url = 'http://example.com';
fetchContent(url).then(content => {
  analyzeContent(content).then(analysis => {
    console.log(analysis); // Do something with the analysis
  });
});