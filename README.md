# Usage
Make sure you've installed Node.js and NPM. Install the Handlebars compiler with

```
sudo npm install -g handlebars
```

If you are on Windows, run the `npm install -g handlebars` command instead in a 
command prompt that you are running as administrator.

Make sure you've installed [MongoDB](https://www.mongodb.com/download-center?jmp=nav#community).

Here are the [Windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/),
[Linux](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-linux/),
and [OS X](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/) installation instructions.
Once you've installed MongoDB, launch the ModelDB Server (`mongod`).

Open another terminal window and navigate to the directory containing this repo's code.
Then, install the app dependencies with

```
npm install
```

To start the app, run

```
npm start
```

Finally, navigate your browser to [`http://localhost:3000`](http://localhost:3000).

# Handlebars

We'll be using the [Handlebars](http://handlebarsjs.com/) templating libary to
avoid putting HTML code in our JavaScript. Handlebars is very similar to Mustache,
which is another templating library. Here's how we'll use Handlebars. We define
templates in the `templates/` directory that contain HTML with slots for data
(e.g. `{{something}}`). We will compile these templates (see `package.json`) using the Handlebars
compiler and we'll put the compiled templates into `public/js/templates.js`. Then,
we will include this `templates.js` file in our client side code. Then, when we
want to generate the HTML, we will do the following:

```
var html = Handlebars.templates['template_name'](data_needed_for_template);
```

We can then add the generated HTML to the DOM. Notice that this keeps HTML code in
the templates rather than putting it into the JavaScript files. Further observe
that the HTML code is being generated on the client side. It's also possible to
templating on the server side. The disadvantage with server side templating is that
the server has to serve HTML to the client, rather than just serving JSON data,
which is easier to debug, more performant, and allows other apps to use the server.
