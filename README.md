# Netlify Sandbox

A simple Node.js wep app to explore serverless lambda functions using Netlify.

Based on Traversy Media's tutorial video [Serverless Lambda Functions](https://www.youtube.com/watch?v=drJwMlD9Mjo&list=PLYAz1Lwo4O59VpRXUKHUNvMSSHDXtawEG&index=4). Check out a clone of his github repository [here](https://github.com/akinhwan/netlify_aws_lambda).

## Tutorial

Create a project directory and install netlify locally.

``` bash
npm i netlify-lambda
```

Configure the `package.json` "scripts" to use Netlify (see [usage](https://github.com/netlify/netlify-lambda#usage) page). 

``` json
  "scripts": {
    "lambda-serve": "netlify-lambda serve functions",
    "lambda-build": "netlify-lambda build functions"
  },
```

Create a folder named `functions,` and a file called `getusers.js.`

Create a settings file called `netlify.toml` in the project root.

(Tip: Review the Netlify [documentation](https://www.netlify.com/docs/functions/) page to explore the structure of the handler method.)

Use the example handler method in the docs for `getusers.js` to test the connection.

``` js
exports.handler = function(event, context, callback) {
    callback(null, {
    statusCode: 200,
    body: "Hello, World"
    });
}
```

Edit the `netlify.toml` file.

``` toml
[build]
  functions = "lambda"
```

Run the lambda function and make a request to your page at [http://localhost:9000/getusers](http://localhost:9000/getusers).

``` bash
npm run lambda-serve
```

### Use [Postman](https://www.getpostman.com/) to test your function's response with an HTTP request.

Postman allows you to make API calls without a front-end application. (Watch [this tutorial](https://www.youtube.com/watch?v=q78_AJBGrVw) if you're new to API requests/responses.) We will use it to test our backend functionality before created a front-end interface.

1. Create a [free account](https://identity.getpostman.com/signup?continue=dashboard%3Fevent%3D).
1. Create a new workspace
1. [Download](https://www.getpostman.com/downloads/) Postman for Mac, Windows, or Linux. (Don't use the Chrome app.)
1. Sign in and select your workspace.
1. Leave the HTTP verb as a GET request and make a request to http://localhost:9000/getusers.

You should get a 200 status response and "Hello World" printed in the body.

### Send data to your function

1. Change the HTTP verb to a POST request.
1. In the `Headers` tab write `Content-Type` for the KEY and `application/json` for the VALUE.
1. In the `Body` tab change the type to `raw` and write the following:

``` json
{
    "name": "Ethan"
}
```
3. Catch that data in your function by assigning it to a constant in your funciton...
 ``` js
const { name } = JSON.parse(event.body);
```
4. and output the data back to the client by replacing the body command with the following: 
``` js
body: 'Hello ' + name
```

Note: usually you want to return a JSON with your API (lambda function). To accomplish this, use the stringify method on a JSON object.

``` js
body: JSON.stringify({msg: 'Hello ' + name})
```

The final state of your function is the following:

``` js
exports.handler = function(event, context, callback){
  const { name } = JSON.parse(event.body);

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({msg: 'Hello ' + name})
  });
}
```

### Get a client secret on Github

1. Register for a client ID on [Github](https://github.com/settings/applications/new).

![](https://github.com/king-melchizedek/Netlify-AWS-Lambda/raw/master/images/client_id_registration.PNG)

2. Copy the Client ID and Client Secret to your API url.

![](https://github.com/king-melchizedek/Netlify-AWS-Lambda/raw/master/images/client_id_secret.PNG)

``` url
https://api.github.com/users?client_id=a5c1aed823e638132792&client_secret=19c85a1d9b150792549a01a84fd75b61b01b84be
```

(Note: Github allows ~15 requests per hour without requiring a client ID / Secret.)

### Link your lambda function to your Github client ID and Secret

Install [Axios](https://github.com/axios/axios) locally

``` bash
npm i axios
```

Rewrite your lambda function to use Axios:

``` js
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
```

Test function with a GET request in Postman.

### Create a front-end user interface

Create `index.html` in root, and a folder called `js` for our front-end JavaScript, containing `main.js`. (See files in repository.)

### Oops, we got an error!

Cross-Origin Resource Sharing (CORS) should have blocked your client app from accessing server data and provided this error message:

``` bash
Access to fetch at 'http://localhost:9000/getUsers' from origin 'http://127.0.0.1:5500' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
```

Circumvent CORS policy for development testing by adding a `headers` value in your user response.

``` js
headers: {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'Origin, X-Requested-With, Content-Type, Accept'
},
```

You may need to restart your server to see results.