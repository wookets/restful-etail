# restful-etail

[![Greenkeeper badge](https://badges.greenkeeper.io/wookets/restful-etail.svg)](https://greenkeeper.io/)

A trivial example of a RESTful web-service using node.js and express. 

# install 

```
git clone git@github.com:wookets/restful-etail.git .
npm i
```

Make sure you are using the latest version of node and npm.


# usage

## starting the server

```
npm start
# you should get a message that the server was started on PORT 3000
```

## running tests

```
npm test
```

Tests are written using jest testing framework. Mocha is fine too, but jest has nice sandboxing. :) 

# missing data

It looks like few of the provided sample products are no longer valid. The server doesn't attempt to handle these errors quite yet, but logging and graceful fallback shouhld be added to handle these cases.