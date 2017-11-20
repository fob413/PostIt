<p align="center">
  <img src="https://github.com/fob413/PostIt/blob/newDatabaseBadge/template/image/postitDsm.png">
</p>

[![Build Status](https://travis-ci.org/fob413/PostIt.svg?branch=newDatabaseBadge)](https://travis-ci.org/fob413/PostIt)
[![Code Climate](https://codeclimate.com/github/codeclimate/codeclimate/badges/gpa.svg)](https://codeclimate.com/github/fob413/PostIt)
[![Coverage Status](https://coveralls.io/repos/github/fob413/PostIt/badge.svg?branch=ch-test-coverage-153008557)](https://coveralls.io/github/fob413/PostIt?branch=ch-test-coverage-153008557)
=======

PostIt is a simple application that allows friends and colleagues create groups for notifications. The application allows people create accounts, creat groups, add registered users to the group and then send messages out to these groups whenever they want.

## Features
* User Sign-up
* User Sign-in
* Logged in user can create groups
* Notifications are sent to the users a the group when a message is posted
* Messages have priority levels (normal, urgent, critical)
* Notification for posted messages are in relation to the priority level
  - Normal: in-app notification
  - Urgent: in-app and email notification
  - Critical: in-app, email and sms notifications
* Users can see other users a group that have read messages sent out

## Installation
- Clone the repository
- Install NodeJs
- Install Postgres
- Navigate to directory `cd PostIt`
- Install the application's dependencies `npm install`
- Setup Database according to setting in `server/config/config.json`
- Migrate to database `sequelize db:migrate`
- To start the application, run `npm start`

## System Dependencies
- Node
- Postgres
- Npm

## Built With
### Front End
- React
- Redux
- React Materialize

### Back End
- Node
- Express
- Sequelize
- Postgres

## Tests
Tests were run with Mocha and Chai on all functions and Api routes for the back end and Jest for the front end. To run the tests after the installation of the application:
- For the back end, run `npm test`
- For the front end, run `npm run test:client`

## Api Documentation
The Documentation for the API can be found [here.](https://jsapi.apiary.io/previews/postitcp/reference)

## Frequently Asked Questions
Find the frequently asked questions [here.](https://github.com/fob413/PostIt/wiki/Frequently-Asked-Questions)

## Template Images
![Cover Image1](https://github.com/fob413/PostIt/blob/chore/feedback/template/image/cover1.jpg?raw=true)
![Cover Image2](https://github.com/fob413/PostIt/blob/chore/feedback/template/image/cover2.jpg?raw=true)
![Cover Image3](https://github.com/fob413/PostIt/blob/chore/feedback/template/image/cover3.jpg?raw=true)
![Sign Up](https://github.com/fob413/PostIt/blob/chore/feedback/template/image/Tsignin.png?raw=true)
![Sign In](https://github.com/fob413/PostIt/blob/chore/feedback/template/image/Tsignup.png?raw=true)
![Dashboard Board](https://github.com/fob413/PostIt/blob/chore/feedback/template/image/dashboard.png?raw=true)
![Message Board](https://github.com/fob413/PostIt/blob/chore/feedback/template/image/messageBoard.png?raw=true)

## Limitations
- Users don't get an invitation request when being added to a group
- Users cannot leave a group that they have been added to
- Users cannot send files to group
- Users cannot delete messages that have already been sent to a group

## Contributing
Feel free to dive in. Open an issue to request for a bug fix or additional feature or submit PRs. To contribute:
- Fork this repository
- Create your feature branch on your local machine: `git checkout -b your-feature-branch`
- Commit your changes: `git commit -m 'Add my feature'`
- Push your branch online: `git push origin your-feature-branch`
- Open a pull request to the `development` branch and describe how your feature works

Refer to this wiki for the preferred [GIT workflow.](https://github.com/andela/bestpractices/wiki)

Ensure your codes follow [AirBnB Javascript Style Guide.](https://github.com/airbnb/javascript)

### Author
Funsho Oluyole-Balogun

### License
ISC

### Acknowledgement
Andela for the direction needed in this project.

Many thanks to Scotch.IO for their tutorials and posts.
