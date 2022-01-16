# drinks_api

## Factsheet

| **Category**              | **Value**                                 |
| ------------------------- | ---------------------------------------- |
| **Contact**               | @cavalost
| **Language / Framework**  | Node
| **Deployment type**       | Heroku
| **Production URL**     | [https://drinks-api-clau.herokuapp.com](https://drinks-api-clau.herokuapp.com)|
## Configuration

Configuration is via the following environment variables:

| Env var      | Example      | Purpose                   |
| ------------ | ------------ | ------------------------- |
| `MONGO_URI` | `mongodb+srv://<username>:<password>@uri` | To fetch and insert data to the DB
| `MONGO_DB_NAME` | `drinks` | MongoDB database name


## Requirements
Node >= 8
Create a MongoDB endpoint with Atlas/other service

## How to run the server
```
npm run start
```

### Project description

This server fetch the events that we stored in our DB using the
[cron job](https://github.com/cavalost/drinks_cron) uploaded in PipeDream
