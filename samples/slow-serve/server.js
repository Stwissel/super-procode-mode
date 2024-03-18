const express = require('express');
const ReadLine = require('n-readlines');

const app = express();
const lineSource = new ReadLine('./sampleData.txt');

let respStarted = false;

app.get('/', (req, res) => {
  if (!respStarted) {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Transfer-Encoding': 'chunked'
    });
    res.write('[\n');
    respStarted = true;
  }

  let line = lineSource.next();
  handleOneLine(line, res);
});

const handleOneLine = (line, res) => {
  if (line) {
    res.write(line);
    res.write(',\n');
    setTimeout(() => {
      handleOneLine(lineSource.next(), res);
    }, 500 /* 0.5 seconds delay */);
  } else {
    res.write(']\n');
    res.end();
  }
};

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
