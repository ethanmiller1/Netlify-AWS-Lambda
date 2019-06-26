const axios = require('axios');

exports.handler = function(event, context, callback){
  const API_URL = 'https://api.github.com/users';
  const API_CLIENT_ID = 'a5c1aed823e638132792';
  const API_CLIENT_SECRET = '19c85a1d9b150792549a01a84fd75b61b01b84be';

  const URL = `${API_URL}?client_id=${API_CLIENT_ID}&client_secret=${API_CLIENT_SECRET}`;

  // Send user response.
  const send = body => {
    callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
          'Origin, X-Requested-With, Content-Type, Accept'
      },
      body: JSON.stringify(body)
    });
  }

  // Perform API call.
  const getUsers = () => {
    axios.get(URL)
      .then(res => send(res.data))
      .catch(err => send(err));
  }

  // Make sure method is GET.
  if(event.httpMethod == 'GET') {
    getUsers();
  }
}