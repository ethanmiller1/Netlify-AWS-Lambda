# Netlify Sandbox

A simple Node.js wep app to explore serverless lambda functions using Netlify.

Based on Traversy Media's tutorial video [Serverless Lambda Functions](https://www.youtube.com/watch?v=drJwMlD9Mjo&list=PLYAz1Lwo4O59VpRXUKHUNvMSSHDXtawEG&index=4). Check out a clone of his github repository [here](https://github.com/akinhwan/netlify_aws_lambda/blob/master/package.json).

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