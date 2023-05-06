import express from 'express';

import { calculateResult, generateResultText } from './util/resultText.js';
import { extractNumbers, extractResultQueryParam } from './src/parser.js';

const app = express();

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    // get result
  const result = extractResultQueryParam(req);
  let resultText = generateResultText(result);

  const htmlContent = `
    <html>
      <head>
        <title>Testing Basics</title>
        <style>
          html {
            font-family: sans-serif;
          }
          
          body {
            margin: 2rem;
          }

          div, label {
            display: block;
            margin-bottom: 0.5rem;
          }
        </style>
      </head>
      <body>
        <form action="/calculate" method="POST">
          <div>
            <label for="num1">First Number</label>
            <input id="num1" name="num1" type="numeric">
          </div>
          <div>
            <label for="num2">Second Number</label>
            <input id="num2" name="num2" type="numeric">
          </div>
          <button>Calculate</button>
        </form>
        <div>
          ${resultText}
        </div>
      </body>
    </html>
  `;

  res.send(htmlContent);
});

app.post('/calculate', (req, res) => {

  // get input
  const numberInputs = extractNumbers(req);
  
  const result = calculateResult(numberInputs)

  const resultText = generateResultText(result);

  res.redirect('/?result=' + resultText);
});

app.listen(3000);
