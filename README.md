# 10 Hours Lab GraphQL Server Forked from json-graphql-server

## Motivation

> This is a simple graphQl mock server and playground to get running with your task

Start playing with GraphQL right away with `json-graphql-server`, a testing and mocking tool for GraphQL. All it takes is a JSON of your data.

Inspired by the excellent [json-server](https://github.com/typicode/json-server).

## Example

Follow the guide below starting from scratch, or see the example live on StackBlitz:

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/fork/json-graphql-server)

First Create a mock storage of financial data `npm run generate-db` this will create the `database.json` file.

This data file export an object where the keys are the entity types. The values should be lists of entities, i.e. arrays of value objects with at least an `id` key. For instance:

```database.json
{
    posts: [
        { id: 1, title: "Lorem Ipsum", views: 254, user_id: 123 },
        { id: 2, title: "Sic Dolor amet", views: 65, user_id: 456 },
    ],
    users: [
        { id: 123, name: "John Doe" },
        { id: 456, name: "Jane Doe" }
    ],
    comments: [
        { id: 987, post_id: 1, body: "Consectetur adipiscing elit", date: new Date('2017-07-03') },
        { id: 995, post_id: 1, body: "Nam molestie pellentesque dui", date: new Date('2017-08-17') }
    ]
}
```

Start the GraphQL server on localhost, port 3000.

```sh
json-graphql-server database.json
```

To use a port other than 3000, you can run `json-graphql-server database.json --p <your port here>`
To use a host other than localhost, you can run `json-graphql-server database.json --h <your host here>`

Now you can query your data in graphql. For instance, to issue the following query:

```graphql
{
    Post(id: 1) {
        id
        title
        views
        User {
            name
        }
        Comments {
            date
            body
        }
    }
}
```

Go to http://localhost:3000/?query=%7B%20Post%28id%3A%201%29%20%7B%20id%20title%20views%20User%20%7B%20name%20%7D%20Comments%20%7B%20date%20body%20%7D%20%7D%20%7D. You'll get the following result:

```json
{
    "data": {
        "Post": {
            "id": "1",
            "title": "Lorem Ipsum",
            "views": 254,
            "User": {
                "name": "John Doe"
            },
            "Comments": [
                {
                    "date": "2017-07-03T00:00:00.000Z",
                    "body": "Consectetur adipiscing elit"
                },
                {
                    "date": "2017-08-17T00:00:00.000Z",
                    "body": "Nam molestie pellentesque dui"
                }
            ]
        }
    }
}
```

The json-graphql-server accepts queries in GET and POST. Under the hood, it uses [the `express-graphql` module](https://github.com/graphql/express-graphql). Please refer to their documentations for details about passing variables, etc.

Note that the server is [GraphiQL](https://github.com/graphql/graphiql) enabled, so you can query your server using a full-featured graphical user interface, providing autosuggest, history, etc.

![GraphiQL client using json-graphql-server](http://static.marmelab.com/graphiql-json.png)

How to Use

## Clone this Repo

```sh
git clone
```

## Install

```sh
npm install -g json-graphql-server
```

## Usage with Node

Install the module locally:

```sh
npm install --save-dev json-graphql-server
```

Then use the `jsonGraphqlExpress` express middleware:

```js
import express from 'express';
import jsonGraphqlExpress from 'json-graphql-server';

const PORT = 3000;
const app = express();
const data = {
    // ... your data
};
app.use('/graphql', jsonGraphqlExpress(data));
app.listen(PORT);
```

## Usage in browser with XMLHttpRequest

Useful when using XMLHttpRequest directly or libraries such as [axios](https://www.npmjs.com/package/axios).

### Install with a script tag

Add a `script` tag referencing the library:

```html
<script src="../lib/json-graphql-server.min.js"></script>
```

It will expose the `JsonGraphqlServer` as a global object:

```html
<script type="text/javascript">
    window.addEventListener('load', function() {
        const data = [...];

        const server = JsonGraphqlServer({
            data,
            url: 'http://localhost:3000/graphql'
        });

        server.start();

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:3000/graphql', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.onerror = function(error) {
            console.error(error);
        }
        xhr.onload = function() {
            const result = JSON.parse(xhr.responseText);
            console.log('data returned:', result);
            alert('Found ' + result.data.allPosts.length + ' posts');
        }
        const body = JSON.stringify({ query: 'query allPosts { allPosts { id } }' });
        xhr.send(body);
    });
</script>
```

### Use with a bundler (webpack)

```sh
npm install json-graphql-server
```

```js
import JsonGraphqlServer from 'json-graphql-server';

const data = [...];

const server = JsonGraphqlServer({
    data,
    url: 'http://localhost:3000/graphql'
});

server.start();

const xhr = new XMLHttpRequest();
xhr.open('POST', 'http://localhost:3000/graphql', true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.setRequestHeader('Accept', 'application/json');
xhr.onerror = function(error) {
    console.error(error);
}
xhr.onload = function() {
    const result = JSON.parse(xhr.responseText);
    console.log('data returned:', result);
    alert('Found ' + result.data.allPosts.length + ' posts');
}
const body = JSON.stringify({ query: 'query allPosts { allPosts { id } }' });
xhr.send(body);
```

## Usage in browser with fetch

```js
import fetchMock from 'fetch-mock';
import JsonGraphqlServer from 'json-graphql-server';

const data = [...];
const server = JsonGraphqlServer({ data });

fetchMock.post('http://localhost:3000/graphql', server.getHandler());

fetch({
    url: 'http://localhost:3000/graphql',
    method: 'POST',
    body: JSON.stringify({ query: 'query allPosts { allPosts { id } }' })
})
.then(response => response.json())
.then(json => {
    alert('Found ' + result.data.allPosts.length + ' posts');
})
```

## License

json-graphql-server is licensed under the [MIT Licence](https://github.com/marmelab/json-graphql-server/blob/master/LICENSE.md), sponsored and supported by [marmelab](http://marmelab.com).
