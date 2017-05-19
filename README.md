# Ostmodern Frontend Code Test

A Single page angular application which displays sample data from the Skylark API. 

The application requirements were to:
 * Create a page that lists the contents of the ‘Home’ set, and
 * Create a page that displays episode info.

Inside the supplied endpoint <http://feature-code-test.skylark-cms.qa.aws.ostmodern.co.uk:8000/>, there were a selection of sets available when you GET `/api/sets/`, and the home set had items which could be retrieved and displayed also. Because of the test nature of the endpoint, some of the sample data was missing for the home set items, most importantly the `image_urls` for each episode as these were not populated with data.

To illustrate my ability to use the episode/set images, instead of listing just the Home set on the front page, I have listed each set, as the sets had endpoints to render some imagery. Each Set has been configured to root to a Set detail page, listing the episodes (if any), which can then be clicked on to go through to the episode detail page.

I have rendered the number of episodes for each set on the front page, although these do not seem to be matching with the true number of items in the set. This will be the reason why the home set is showing '0 films' when in fact there are 20.

## Installation

The app server environment is configured with express and packages have been installed using `npm`. All dependencies have been saved in `package.json`. Other front end packages are being maintained with bower.

Please make sure you have Node, NPM and bower set up on your machine, as these will be needed to install the site. 

Install and fire up the server using the following commands

``` 
$ npm install
$ bower install
$ gulp dev
```

`gulp dev` runs the express server locally.

Once the server is running, go to your browser at <http://localhost:8080>

## Versions @ time of build

* Node v6.10.3
* npm v4.2.0
* bower v1.8.0

