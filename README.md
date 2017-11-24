# Federalist

[![CircleCI](https://circleci.com/gh/18F/federalist.svg?style=svg)](https://circleci.com/gh/18F/federalist)
[![Code Climate](https://codeclimate.com/github/18F/federalist/badges/gpa.svg)](https://codeclimate.com/github/18F/federalist)
[![Test Coverage](https://codeclimate.com/github/18F/federalist/badges/coverage.svg)](https://codeclimate.com/github/18F/federalist/coverage)
[![Dependency Status](https://gemnasium.com/badges/github.com/18F/federalist.svg)](https://gemnasium.com/github.com/18F/federalist)

***Federalist is updated regularly.  Contact us via [email]() or [Join our public chat room](https://chat.18f.gov/) to talk to us and stay informed. Or, check our our [documentation](https://federalist-docs.18f.gov/).***

## About Federalist

Federalist helps government agencies publish basic websites quickly and seamlessly.  It provides a simple interface for managing simple website content that is compliant with federal guidelines.  More complex tasks are automated behind the scenes, providing a way for users to more easily create and launch government websites.  Federalist is built on top of Github and Amazon Web Services.   

Federalist-core is a node.js application that allows government users to add and configure basic websites. 

## Examples

Partner agencies across the federal government use Federalist to host websites.  A few examples include: 

- [College Scorecard] (https://collegescorecard.ed.gov/)
- [Natural Resources Revenue Data] (https://revenuedata.doi.gov/)
- [NSF Small Business Innovation Research program] (https://seedfund.nsg.gov)

More examples can be found [here] (https://federalist-docs.18f.gov/pages/about-federalist/example-sites/). 

## Getting started

This section will walk you through how to install Federalist locally onto your own machine or within your own environment.  Depending on your familiarity with the dependencies and process, this may take anywhere between an hour or two to the better part of a day.  If you need help, [contact us](). 

### Dependencies / Tooling
Before you start, ensure you have the following installed:

- [node](https://nodejs.org/en/download/package-manager/#osx)
- [nvm](https://github.com/creationix/nvm#installation) or [n](https://github.com/tj/n#installation)
- [yarn](https://yarnpkg.com/)
- [Postgres](https://www.postgresql.org/)
- [Cloud Foundry CLI](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html)

Most of these dependencies can be installed relatively quickly if you don't already have them.  Most can also be installed via terminal using popular package managers like [brew](https://brew.sh/). 

### Setting up a local development environment on your own machine

This section will walk you through downloading the Federalist code, making sure you are running the correct version of node, and creating a copy of the configuration file you'll edit later. 

1. To get started, you'll need to first create your own copy of the Federalist code.  Download or clone the `18F/federalist` repository from Github using command line in terminal or by clicking on the *clone or download* button above. 
1. Next, open terminal on your computer, and browse to the directory where you copied the repository.  (Hint: you can use the `cd` command to move to that directory in terminal. For example: `cd federalist` will change your working directory to the federalist folder.)

1. Next, we'll want to make sure you're using the right version of [node](https://nodejs.org/en/download/package-manager/#osx). From terminal, type `nvm use`.  If you aren't using the correct version, the message prompt will instruct you on setting the correct version for the federalist install. 
1. Next, type `yarn` to load modules and install Jekyll dependencies.
1. You'll need to make a copy of the `config/local.sample.js` file, which is a template we'll fill out with information specific for your own Federalist site.   To do this, type: 
`cp config/local.sample.js config/local.js`  
This will create a copy of the `local.sample.js` file in the `config` directory and rename it to `local.js`.  

We'll now edit the `local.js` to include your S3 and SQS configurations, which are used to tell Federalist where to store your files among other things.  To do that, we have to get a few variables as you continue setting up your Federalist application. 

#### Editing the configuration file 
In this section we'll walk you through the steps necessary to get all the varialbes you'll need to put in the `local.js` configuration file you've just created.  

1. First, [register a new OAuth application on GitHub](https://github.com/settings/applications/new). You'll want to use `http://localhost:1337/auth` as the "Authorization callback url". Once you have created the application, you'll see a `Client ID` and `Client Secret` on the next screen. Add these values to `config/local.js`.  Next, add 'http://localhost:1337/auth/github/callback' as the value for the 'callbackURL'. 

You can edit `local.js` either through terminal (e.g. `vi config.js`) or by using a text editor.  Using your preferred method, find and replace the these values with those provided by Github: 

    ```js
    passport: {
      github: {
        options: {
          clientID: 'VALUE FROM GITHUB',
          clientSecret: 'VALUE FROM GITHUB',
          callbackURL: 'http://localhost:1337/auth/github/callback'
        }
      }
    }
    ```
1. [Register or create a new GitHub organization](https://github.com/settings/organizations). Find your organization's ID by visiting `https://api.github.com/orgs/<your-org-name>`.  Next, copy the value shown for `id` into the whitelist section of `organizations` in `config/local.js`.
    ```js
    organizations: [
      99999999 // your org added here
    ]
    ```
1. Type `cf login --sso -a https://api.fr.cloud.gov -o gsa-18f-federalist -s staging` in terminal.
1. Visit https://login.fr.cloud.gov/passcode to get a one time passcode.  You'll need to login using your cloud.gov credentials.
1. Enter your passcode back into terminal.  (Note: if you have a problem at this point it's likely because you don't have permissions.  [Contact us] for help.)
1. Type `cf apps`.  This will list the current, running applications. 
1. Type `cf env federalist-staging` to get environment variables.
1. Find the section in the listing of environment variables that starts with `"s3": [` and look for the following values and paste those values into the S3 section in your `local.js` file.  (Hint: you may have to scroll up to the top of the file to find the S3 environment variables.)
    - `access_key_id`
    - `bucket`
    - `secret_access_key`
1. Next, we'll enter some environment variables for SQS.  Under credentials (listed just under the S3 section of the document), find the following values and paste those values into the SQS section in your `local.js` file.
    - `FEDERALIST_AWS_BUILD_KEY` is `accessKeyId`
    - `FEDERALIST_SESSION_SECRET` is `secreyAccessKey`
    - `FEDERALIST_SQS_QUEUE` is `queue`
You're done!  You've now successfully set all the environment variables for your new Federalist development environment.  Next, we'll set up the databases necessary to run Federalist.   

#### Creating the databases for your local development environment  
1. Create Postgres databases by running (note: if you don't already have Postgres insalled, you can [download it here]). 
    - Run `createdb federalist`
    - Run `createdb federalist-test`
    
### Check to see if everything is working correctly    
1. If you've successfully completed all of the stepsThe Federalist app is now ready to run locally! :tada:
    - Run `yarn`
    - Run `yarn build`
    - Run `yarn start`
1. You should now be able to see Federalist running at http://localhost:1337/

**Pro tips:**
- You can use `yarn watch` to automatically restart the server and rebuild front end assets on file change, which is useful for development.
- You can use `yarn test` to run local testing on the app.

## Build the server and the front-end

If you are working on the front-end of the application, the things you need to know are:

1. It is a React based application
1. It is built with `webpack`
1. It lives in `/frontend`

To analyze the contents of the front end JavaScript bundle, use `yarn analyze-webpack` after a build. This will launch a browser window showing a visualization of all the code that makes up the bundle.

### Environment variables

#### In Production

We have a few environment variables that the application uses.
In production, those variables are provided to the application either through the Cloud Foundry environment or through Cloud Foundry services.

To inspect the way the environment is provided to the application in production and staging, look at `manifest.yml` and `staging_manifest.yml` respectively.
To see how the application receives those configurations, looks at `config/env/production.js`.

The following environment variables are set on the Cloud Foundry environment in the application manifest:

- `NODE_ENV`: The node environment where the app should run. When running in Cloud Foundry this should always be set to production, even for the staging environment
- `APP_ENV`: The application environment in which the app should run. Valid values are `production` and `staging`.
- `LOG_LEVEL`: Sets the log level for the app.
- `NPM_CONFIG_PRODUCTION`: This should be set to true in Cloud Foundry to prevent Yarn/NPM from installing dev dependencies
- `NODE_MODULES_CACHE`: This should be set to true in Cloud Foundry to prevent caching node modules since those are vendored by Federalist
- `APP_NAME`: The name of the Cloud Foundry application
- `APP_COMAIN`: The hostname where the application runs in Cloud Foundry

Secrets cannot be kept in the application manifest so they are provided by Cloud Foundry services.
The app expects the following user provided services to be provided:

- `federalist-<environment>-redis`: A cloud.gov brokered service that allows the application to use redis for its session store
- `federalist-<environment>-rds`: A cloud.gov brokered service that allows the application to use RDS Postgres for its database
- `federalist-<environment>-s3`: A cloud.gov brokered service that allows the application to work with the S3 bucket where Federalist's sites live
- `federalist-<environment>-env`: A user-provided service that provides the application with secrets that cannot be added to `manifest.yml` b/c that file is under version control; this service provides the following:
  - `FEDERALIST_AWS_BUILD_KEY`: The AWS access key federalist uses to communicate with SQS
  - `FEDERALIST_AWS_BUILD_SECRET`: The AWS secret key federalist uses to communicate with SQS
  - `FEDERALIST_BUILD_CALLBACK`: The URL to which build containers should callback to with updates on their status
  - `FEDERALIST_SESSION_SECRET`: The session secret used to sign entries in Federalist's session store
  - `FEDERALIST_SQS_QUEUE`: The URL for the SQS queue that Federalist uses to communicate with federalist-builder
  - `FEDERALIST_SQS_REGION`: The AWS region for the SQS queue that Federalist uses to communicate with federalist-builder
  - `GITHUB_CALLBACK_URL`: The callback URL used for GitHub authentication
  - `GITHUB_CLIENT_ID`: The client ID used for GitHub authentication
  - `GITHUB_CLIENT_SECRET`: The client secret used for GitHub authentication
  - `GITHUB_WEBHOOK_SECRET`: The secret used to sign and verify webhook requests from GitHub
  - `GITHUB_WEBHOOK_URL`: The url where GitHub webhook requests should be sent
  - `NEW_RELIC_APP_NAME`: The app name to report to New Relic
  - `NEW_RELIC_LICENSE_KEY`: The license key to use with New Relic

Here `<environment>` refers the value set for the `APP_ENV` environment variable.

#### Using Postgres

By default, the application should use local disk storage in place of a database. This is easier to get started and isn't a problem for local development. In production, the app uses Postgres as the data store. To use Postgres in your local dev environment:

0. First, you'll need to [install Postgres](http://www.postgresql.org/download/).
0. Next, you'll have to create the `federalist` database for the application. `$ createdb federalist` should do the trick. If you wish to run the tests, do the same, but for a database named `federalist-test`.
0. Add postgres to your `/config/local.js` file

```js
connections: {
  postgres: {
    database: 'federalist'
  }
},
models: {
  connection: 'postgres'
}
```

### Testing and linting

When making code changes, be sure to write new or modify existing tests to cover your changes.

The full test suite of both front and back end tests can be run via:

```sh
yarn test
```

You can also just run back or front end tests via:

```sh
yarn test:server  # for back end tests
yarn test:client  # for front end tests
yarn test:client:watch  # to watch and re-run front end tests
```

To lint the files you have changed (with `eslint`), run:

```sh
yarn lint:diff
```

For the full list of available commands that you can run with `yarn` or `npm`, see the `"scripts"` section of `package.json`.

## Initial proposal

Federalist is new open source publishing system based on proven open source components and techniques. Once the text has been written, images uploaded, and a page is published, the outward-facing site will act like a simple web site -- fast, reliable, and easily scalable. Administrative tools, which require authentication and additional interactive components, can be responsive with far fewer users.

Regardless of the system generating the content, all websites benefit from the shared editor and static hosting, which alleviates the most expensive requirements of traditional CMS-based websites and enables shared hosting for modern web applications.

From a technical perspective, a modern web publishing platform should follow the “small pieces loosely joined” API-driven approach. Three distinct functions operate together under a unified user interface:

1. **Look & feel of the website**
Templates for common use-cases like a departmental website, a single page report site, API / developer documentation, project dashboard, and internal collaboration hub can be developed and shared as open source repositories on GitHub. Agencies wishing to use a template simply create a cloned copy of the template, add their own content, and modify it to suit their needs. Social, analytics, and accessibility components will all be baked in, so all templates are in compliance with the guidelines put forth by SocialGov and Section 508.

2. **Content editing**
Content editing should be a separate application rather than built into the web server. This allows the same editing interface to be used across projects. The editing interface only needs to scale to match the load from *editors*, not *visitors*.

3. **Publishing infrastructure**
Our solution is to provide scalable, fast, and affordable static hosting for all websites. Using a website generator like Jekyll allows for these sites to be built dynamically and served statically.

## Related reading

- [18F Blog Post on Federalist's platform launch](https://18f.gsa.gov/2015/09/15/federalist-platform-launch/)
- [Building CMS-Free Websites](https://developmentseed.org/blog/2012/07/27/build-cms-free-websites/)
- [Background on relaunch of Healthcare.gov’s front-end](http://www.theatlantic.com/technology/archive/2013/06/healthcaregov-code-developed-by-the-people-and-for-the-people-released-back-to-the-people/277295/)
- [HealthCare.gov uses lightweight open source tools](https://www.digitalgov.gov/2013/05/07/the-new-healthcare-gov-uses-a-lightweight-open-source-tool/)
- [A Few Notes on NotAlone.gov](https://18f.gsa.gov/2014/05/09/a-few-notes-on-notalone-gov/)

## Public domain

This project is in the worldwide [public domain](LICENSE.md). As stated in [CONTRIBUTING](CONTRIBUTING.md):

> This project is in the public domain within the United States, and copyright and related rights in the work worldwide are waived through the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).
>
> All contributions to this project will be released under the CC0 dedication. By submitting a pull request, you are agreeing to comply with this waiver of copyright interest.
