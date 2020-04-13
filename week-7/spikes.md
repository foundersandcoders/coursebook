# Technical spikes

## Cross-origin Resource Sharing

What is CORS?

### Questions to consider

- Why would it be dangerous for browsers to allow arbitrary cross-origin requests?
- How can we configure our server to allow requests from a specific different domain? What about _any_ domain?

### Useful resources

- [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

## Performance

How can we maximise the performance of our Express servers?

### Questions to consider

- What is gzip?
- How does caching help reduce server load?

### Useful resources

- [Production best practices: performance and reliability
  ](https://expressjs.com/en/advanced/best-practice-performance.html)

## Security

How can we ensure our production server is secure?

### Questions to consider

- What is a content security policy (CSP)?
- How might we prevent a brute-force attack against our log in endpoint?

### Useful resources

- [Production Best Practices: Security](https://expressjs.com/en/advanced/best-practice-security.html)

## Error-handling

How should we handle errors in our Express apps?

### Questions to consider

- What kinds of errors can we attempt to recover from? When should we not attempt to recover?
- Which of the various JS error-handling methods should we use with Express (e.g. `try`/`catch`, `.catch`, `next(error)`)

### Useful resources

- [Error-handling | Joyent](https://www.joyent.com/node-js/production/design/errors)
