#!/usr/bin/env node
var prerender = require('./lib');

var server = prerender({
  chromeLocation: '/usr/bin/chromium-browser',
  logRequests: false,
});


server.use(prerender.sendPrerenderHeader());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());
server.use(prerender.blockResources());
server.use(require('prerender-memory-cache'));

server.start();
