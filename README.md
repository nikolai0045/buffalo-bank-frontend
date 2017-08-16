# buffalo_bank_web

> Buffalo Bank Frontend

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Deploying on Heroku

* Install [`heroku-cli`](https://devcenter.heroku.com/articles/heroku-cli)
* Login using `heroku`
    ```sh
    heroku login
    # Input username/password
    ```
* Create an instance
    ```sh
    heroku create
    # Heroku will provide a random instance name
    ```
* Configure Heroku to install `devDependencies` too.
    ```sh
    heroku config:set NPM_CONFIG_PRODUCTION=false
    ```
* Push your changes to heroku
    ```sh
    git push heroku master
    ```
* Open the website in your browser
    ```sh
    heroku open
    ```
