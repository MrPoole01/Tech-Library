![Think Tank Books](public/images/book.png)
# Think Tank Book
Think Tank is an app for those who would love to save a collection of their favorite tech related books. Now you are able to make a running list of those beloved selections. 

Link to Live site => https://papyrus-books.herokuapp.com/

## Technology Used:
- HTML5
- CSS3
- JavaScript ES6
- Knex JS
- Handlebars
- Bookshelf ORM
- Heroku
- PostgreSQL

## Set up a local postgres database 
- npm install knex -g
- npm install
- knex migrate:latest
- knex seed:run
- npm run dev-start
- Go to port 3000 in your browser :)
- Deploy your own version to Heroku

## Set up a Heroku app for your project
- Set up a Heroku postgres database
- C- reate a .env file, use .env.example as a reference
- knex migrate:latest --env production
- knex seed:run --env production

Handlebars http://handlebarsjs.com/

Bookshelf https://github.com/bookshelf/bookshelf
