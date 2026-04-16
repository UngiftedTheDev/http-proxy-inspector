# HTTP Proxy Inspector

A simple forward proxy built with Node.js (no frameworks).

It sits between a client and a server, forwards requests, and returns responses.

---

## What it does

* Takes an incoming request
* Sends it to a target server
* Streams the response back

---

## Why I built this

To understand how HTTP actually works under the hood:

* request/response flow
* headers
* streams (`.pipe()`)
* how proxies work

---


## Note

This is a learning project, not production-ready.
