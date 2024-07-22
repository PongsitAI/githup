document.addEventListener('DOMContentLoaded', function () {
    const dropdownBtn = document.querySelector('.dropdown-btn');
    const dropdownMenu = document.querySelector('.dropdown-menu');
  
    dropdownBtn.addEventListener('click', function (e) {
      e.preventDefault();
      dropdownMenu.classList.toggle('show');
    });
  
    // Close the dropdown menu if the user clicks outside of it
    window.addEventListener('click', function (e) {
      if (!dropdownBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.remove('show');
      }
    });
  });

  
  const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

const CHANNEL_ACCESS_TOKEN = 'YOUR_CHANNEL_ACCESS_TOKEN';

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  const events = req.body.events;

  events.forEach(event => {
    if (event.type === 'message' && event.message.type === 'text') {
      const replyToken = event.replyToken;
      const userMessage = event.message.text;

      // ส่งข้อความกลับไปยังผู้ใช้
      replyMessage(replyToken, `คุณได้ส่งข้อความ: ${userMessage}`);
    }
  });

  res.sendStatus(200);
});

function replyMessage(replyToken, message) {
  axios.post(
    'https://api.line.me/v2/bot/message/reply',
    {
      replyToken: replyToken,
      messages: [
        {
          type: 'text',
          text: message
        }
      ]
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`
      }
    }
  ).then(response => {
    console.log('Reply message sent');
  }).catch(error => {
    console.error('Error sending reply message:', error);
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
