#!/usr/bin/env node
var prerender = require('./lib');

var server = prerender({
  chromeLocation: '/usr/bin/chromium-browser',
  logRequests: true,
});


server.use(prerender.sendPrerenderHeader());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());
server.use(require('prerender-memory-cache'));

server.start();
