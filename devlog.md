# Devlog

## Day 1

Built a basic proxy.

It receives a request, forwards it to another server, and sends the response back.

Main thing I learned:
A proxy is both a server and a client at the same time.

Also understood how `.pipe()` streams data instead of storing everything in memory.

Next: add logging so I can see what’s happening inside.

# Devlog

## Day 2

Added request logging with method, path, status, and response time.

Now I can see the full request lifecycle instead of guessing.

Ran into a real issue with headers:
Forwarding the `Host` header directly caused Cloudflare to reject requests (error 1003). Fixed it by overriding the host to match the target server.

Also learned that not all headers should be forwarded (some are connection-specific).

Main takeaway:
Even small details like headers can completely break a working system.

## Day 3

Added simple in-memory caching for GET requests.

Now repeated requests don’t always hit the upstream server.

Learned how to store responses and reuse them with a TTL.

Also had to stop streaming and buffer the response to cache it.
