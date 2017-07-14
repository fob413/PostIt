![alt text](https://raw.githubusercontent.com/username/projectname/branch/path/to/img.png)
# PostIt
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

## Template Images
![alt text](https://raw.githubusercontent.com/username/projectname/branch/path/to/img.png)

## Api Routes
1. Api routes for users to create accounts and login to the application
```
POST:/api/user/signup
```
- Username (req.body.username)
- Email (req.body.email)
- Password (req.body.password)
```
POST:/api/user/signin
```
- Username (req.body.username)
- Password (req.body.password)

2. Api route that allow users create broadcast groups
```
POST:api/group
```
-groupName (req.body.groupname)

3. Api route that allow users add other users to the groups
```
POST:/api/group/<group id>/user
```
- userId (req.body.userId)
- groupId (req.params.groupId)

4. Api route that allows a logged in user post messages to created groups.
```
POST:/api/group/<group id>/message
```
- messageContent (req.body.messageContent)
- groupId (req.params.groupId)
- userId (req.body.userId)

5. Api route that allows a logged in user retrieve messages that have been posted to groups they belong to
```
GET:/api/group/<groupid>/messages
```
- userId (req-header['user-id'])
- groupId (req.params.groupId)

## Tests
Tests were run with Mocha and Chai on all functions and Api routes

## Built With
UserInterface - Built with HTML, CSS, BOOTSTRAP 
NodeJs - Runs Javascript on server
Express - Web application framework that provides features for the application
Babel - Used to transpile Javascript written in ES6 down to ES5

### Author
Funsho Oluyole-Balogun

### License
ISC

### Acknowledgement
Andela for the direction needed in this project
Many thanks to Scotch.IO for their video tutorials
