# JWT Introduction

## Module Learnings

- Recap Private Route and JWT Core Concepts
- Types of JWT Tokens (Refresh and Access Tokens) and how to create Access Tokens using Crypto node modules and JWT Sign
- Understanding Browser Cookies and using expressJS Cookie Parser for server-side cookie management
- Setting JWT token secret and sending tokens securely between client and server via HTTP-only cookies with credentials
- Building Simple Custom Middleware in express app and developing middleware to verify JWT tokens. Sending HTTP requests based on user authentication.
- Others.

## Set CORS Options

```javascript
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
```

## Custom Middlewares

```javascript
const verifyTokens = async (req, res, next) => {
  const token = req.cookies.token;
  console.log('Value of token in middleware:', token);
  if (!token) {
    res.status(401).send({ message: 'Not authorized' });
  }
  jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send({ message: 'Unauthorized' });
    }
    console.log('Value in the token:', decoded);
    req.user = decoded; // ensure that it is valid
    next();
  });
};
```

## JWT Auth Related POST API

```javascript
app.post(`/jwt`, logger, async (req, res) => {
  const user = req.body;
  console.log(user);
  const token = jwt.sign(user, process.env.TOKEN_SECRET_KEY, {
    expiresIn: '1h',
  });

  res
    .cookie('token', token, {
      httpOnly: true,
      secure: false, // false in dev and true in prod
    })
    .send({ success: true });
});
```

## Implementation of Custom Tokens for Verifying JWT Tokens

```javascript
app.get('/api/bookings/', logger, verifyTokens, async (req, res) => {
  console.log(req.query.email);
  let query = {};
  console.log(`Valid token user:`, req.user); // valid user from jwt
  if (req.query.email !== req.user.email) {
    // verify specific user try to load his data
    return res.status(403).send({ message: 'Forbidden access' });
  }
  if (req.query?.email) {
    query = { email: req.query.email };
  }
  const cursor = bookingsCollection.find(query);
  const result = await cursor.toArray();
  res.send(result);
});
```

## Additional Resources

- [Server Side Code](https://github.dev/ahnaf4D/ph-cardoctors-server-jwt/blob/main/index.js)
- [Client Side Code](https://github.com/ahnaf4D/ph-cars-doctors-client-jwt)
