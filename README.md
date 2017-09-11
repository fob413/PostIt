<p align="center">
  <img src="https://github.com/fob413/PostIt/blob/newDatabaseBadge/template/image/postitDsm.png">
</p>

[![Build Status](https://travis-ci.org/fob413/PostIt.svg?branch=newDatabaseBadge)](https://travis-ci.org/fob413/PostIt)
[![Code Climate](https://codeclimate.com/github/codeclimate/codeclimate/badges/gpa.svg)](https://codeclimate.com/github/fob413/PostIt)
[![Coverage Status](https://coveralls.io/repos/github/fob413/PostIt/badge.svg?branch=feedback)](https://coveralls.io/github/fob413/PostIt?branch=feedback)
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
Tests were run with Mocha and Chai on all functions and Api routes
### Run Tests
- After Installation of the application, run `npm test`

## Api Documentation
The Documentation for the API can be found [here.](https://jsapi.apiary.io/previews/postitcp/reference)

## Template Images
![Cover Image1](https://github.com/fob413/PostIt/blob/feedback/template/image/cover1.jpg)
![Cover Image2](https://github.com/fob413/PostIt/blob/feedback/template/image/cover2.jpg)
![Cover Image3](https://github.com/fob413/PostIt/blob/feedback/template/image/cover3.jpg)
![Sign Up](https://github.com/fob413/PostIt/blob/newDatabaseBadge/template/image/Tsignup.png)
![Sign In](https://github.com/fob413/PostIt/blob/newDatabaseBadge/template/image/Tsignin.png)
![Message Board](https://github.com/fob413/PostIt/blob/newDatabaseBadge/template/image/Tmessageboard.png)
![Create Group](https://github.com/fob413/PostIt/blob/newDatabaseBadge/template/image/Tcreategroup.png)
![Post Message](https://github.com/fob413/PostIt/blob/newDatabaseBadge/template/image/Tpostmessage.png)

### Author
Funsho Oluyole-Balogun

### License
ISC

### Acknowledgement
Andela for the direction needed in this project.

Many thanks to Scotch.IO for their tutorials and posts.
