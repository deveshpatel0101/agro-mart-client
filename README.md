## My Blog

## Table of Contents

* [Description](#description)
* [Dependencies](#dependencies)
* [Instructions](#instructions)
* [Contributing](#contributing)

### Description

Create simple blogs. Give title and description to your blog. You can share it with your friends too by making that blog publicly accessible. 

### Dependencies

1. React
2. Material-UI
3. React-router-dom
4. Redux
5. React-redux
6. Validator
7. Bcrypt
8. Jsonwebtoken
9. Express
10. Mongoose
11. Passport
12. Cookie-session and cookie-parser

### Instructions

*Note*: Root directory of app contains files related to server while client folder contains files related to front end react.

1. Clone or download this repo.
2. Run `npm install` in root directory of app and even in client directory.
3. Now create `.env` file in root directory of app.
4. Get api keys from google.
5. Edit your newly created `.env` file.
```

GOOGLE_CLIENT_ID = YOUR_GOOGLE_CLIENT_ID_HERE
GOOGLE_CLIENT_SECRET = YOUR_GOOGLE_CLIENT_SECRET_HERE
COOKIE_KEY = SOME_RANDOM_STRING
HASH_KEY = SOME_RANDOM_STRING
JWT_KEY = SOME_RANDOM_STRING

```
6. Now you are good to go once file is modified like above. 
7. Open terminal in root directory of application and run `npm run dev` to start development server
*Note*: Front end server will start on [localhost:3000](http://localhost:3000) and backend server will start on [localhost:5000](http://localhost:3000)

### Contributing

This project was more of a private practice purpose. Hence we are most likely to not accept pull requests.