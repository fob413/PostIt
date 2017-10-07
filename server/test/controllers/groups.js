// import chaiHttp from 'chai-http';
// import chai from 'chai';
// import app from '../app';
// import db from '../models/index';

// process.env.NODE_ENV = 'travis';

// const user = db.Users;
// const group = db.Groups;
// const members = db.Members;
// // const user = require('../models').Users;

// // const should = chai.should();
// const expect = chai.expect;

// chai.use(chaiHttp);

// // function that clears out user database
// const clearDatabase = () => {
//   user.destroy({
//     where: {},
//     truncate: true,
//     restartIdentity: true,
//     cascade: true,
//   });
//   group.destroy({
//     where: {},
//     truncate: true,
//     restartIdentity: true,
//     cascade: true,
//   });
//   members.destroy({
//     where: {},
//     truncate: true,
//     restartIdentity: true,
//     cascade: true,
//   });
// };

// // sample user used for testing
// const testUser = {
//   UserName: 'Bayo',
//   email: 'bayo@yahoo.com',
//   password: 'abcdefghij',
//   telephone: '08138498175'
// };


// // tests for create group route
// describe('Group route tests /api/group', () => {
//   // string to hold token returned when user signs up
//   let token = '';
//   before((done) => {
//     clearDatabase();
//     chai.request(app)
//     .post('/api/user/signup')
//     .send(testUser)
//     .end((err, res) => {
//       token = res.body.token;
//       done();
//     });
//   });

//   // test positive create group responses
//   describe('Positive create new group response ', () => {
//     // it should return a status code of 201
//     it('should return a status code of 201 on successfully creating a new group', (done) => {
//       // new group
//       const newGroup = {
//         GroupName: 'Test Group'
//       };
//       chai.request(app)
//       .post('/api/group')
//       .set('x-auth', token)
//       .send(newGroup)
//       .end((err, res) => {
//         res.should.have.status(201);
//         done();
//       });
//     });

//     // it should return the group name
//     it('should return the group name', (done) => {
//       // new group
//       const newGroup = {
//         GroupName: 'Test Group2'
//       };
//       chai.request(app)
//       .post('/api/group')
//       .set('x-auth', token)
//       .send(newGroup)
//       .end((err, res) => {
//         expect(res.body.GroupName).to.equal('Test Group2');
//         done();
//       });
//     });

//     // it should return the group's id
//     it('should return the group id', (done) => {
//       // new group
//       const newGroup = {
//         GroupName: 'Test Group3'
//       };
//       chai.request(app)
//       .post('/api/group')
//       .set('x-auth', token)
//       .send(newGroup)
//       .end((err, res) => {
//         expect(res.body.id).to.exist;
//         done();
//       });
//     });
//   });

//   describe('Negative create new group response ', () => {
//     // it should return a status code of 403 when token is not provided
//     it('should return a status code of 403 when token is not provided', (done) => {
//       // new group
//       const newGroup = {
//         GroupName: 'Test Group4'
//       };
//       chai.request(app)
//       .post('/api/group')
//       .send(newGroup)
//       .end((err, res) => {
//         res.should.have.status(403);
//         done();
//       });
//     });

//     // it should return a success message of false when token is not provided
//     it('should return a success of false when token is not provided', (done) => {
//       // new group
//       const newGroup = {
//         GroupName: 'Test Group4'
//       };
//       chai.request(app)
//       .post('/api/group')
//       .send(newGroup)
//       .end((err, res) => {
//         expect(res.body.success).to.be.false;
//         done();
//       });
//     });

//     // it should return a message when token is not provided
//     it('should return a message when token is not provided', (done) => {
//       // new group
//       const newGroup = {
//         GroupName: 'Test Group4'
//       };
//       chai.request(app)
//       .post('/api/group')
//       .send(newGroup)
//       .end((err, res) => {
//         expect(res.body.message).to.equal('no token provided');
//         done();
//       });
//     });

//     // it should return a status code of 403 if token fails authentication
//     it('should return a status code of 403 if token fails authentication', (done) => {
//       // new group
//       const newGroup = {
//         GroupName: 'Test Group4'
//       };
//       // fake token
//       const fakeToken = 'abcdefghijklmnopqrstuvwxyz';
//       chai.request(app)
//       .post('/api/group')
//       .set('x-auth', fakeToken)
//       .send(newGroup)
//       .end((err, res) => {
//         res.should.have.status(403);
//         done();
//       });
//     });

//     // it should return success as false if token fails authentication
//     it('should return success as false if token fails authentication', (done) => {
//       // new group
//       const newGroup = {
//         GroupName: 'Test Group4'
//       };
//       // fake token
//       const fakeToken = 'abcdefghijklmnopqrstuvwxyz';
//       chai.request(app)
//       .post('/api/group')
//       .set('x-auth', fakeToken)
//       .send(newGroup)
//       .end((err, res) => {
//         expect(res.body.success).to.be.false;
//         done();
//       });
//     });

//     // it should return a status code of 400 if the groupname is blank
//     it('should return a status code of 400 if the groupname is blank', (done) => {
//       // new group
//       const newGroup = {
//         GroupName: ''
//       };
      
//       chai.request(app)
//       .post('/api/group')
//       .set('x-auth', token)
//       .send(newGroup)
//       .end((err, res) => {
//         res.should.have.status(400);
//         done();
//       });
//     });

//     // it should return success as false if the groupname is blank
//     it('should return a status code of 400 if the groupname is blank', (done) => {
//       // new group
//       const newGroup = {
//         GroupName: ''
//       };
      
//       chai.request(app)
//       .post('/api/group')
//       .set('x-auth', token)
//       .send(newGroup)
//       .end((err, res) => {
//         expect(res.body.success).to.be.false;
//         done();
//       });
//     });

//     // it should return a validation error
//     it('should return a status code of 400 if the groupname is not unique', (done) => {
//       // new group
//       const newGroup = {
//         GroupName: 'Test Group'
//       };
      
//       chai.request(app)
//       .post('/api/group')
//       .set('x-auth', token)
//       .send(newGroup)
//       .end((err, res) => {
//         res.should.have.status(400);
//         done();
//       });
//     });

//     // it should return a validation error
//     it('should return a success of false if the groupname is not unique', (done) => {
//       // new group
//       const newGroup = {
//         GroupName: 'Test Group'
//       };
      
//       chai.request(app)
//       .post('/api/group')
//       .set('x-auth', token)
//       .send(newGroup)
//       .end((err, res) => {
//         expect(res.body.success).to.be.false;
//         done();
//       });
//     });
//   });
// });

// // tests lists groups user belongs to
// describe('Group route tests /api/group/:groupId/user/list', () => {
//   // string to hold token returned when user signs up
//   let token = '';
//   before((done) => {
//     clearDatabase();
//     chai.request(app)
//     .post('/api/user/signup')
//     .send(testUser)
//     .end((err, res) => {
//       token = res.body.token;
//       done();
//     });
//   });

//   describe('Positive list groups user belongs to response ', () => {
//     before((done) => {
//       chai.request(app)
//       .post('/api/user/signin')
//       .send(testUser)
//       .end((err, res) => {
//         token = res.body.token;
//       });

//       // create a group
//       const newGroup = {
//         GroupName: 'Test Group'
//       };
//       chai.request(app)
//       .post('/api/group')
//       .set('x-auth', token)
//       .send(newGroup)
//       .end((err, res) => {
//       });

//       // create another group
//       const newGroup2 = {
//         GroupName: 'Test Group2'
//       };
//       chai.request(app)
//       .post('/api/group')
//       .set('x-auth', token)
//       .send(newGroup2)
//       .end((err, res) => {
//         done();
//       });
//     });

//     // return a status 200
//     it('should return a status of 200 on listing the groups the user belongs to', () => {
//       chai.request(app)
//       .get('/api/group/list')
//       .end((err, res) => {
//         res.should.have.status(200);
//       });
//     });
//   });
// });

// // tests add users to a particular group
// describe('Group route tests /api/group/:groupId/user', () => {
//   // string to hold token returned when user signs up
//   let token = '';
//   before((done) => {
//     clearDatabase();
//     chai.request(app)
//     .post('/api/user/signup')
//     .send(testUser)
//     .end((err, res) => {
//       token = res.body.token;
//       done();
//     });
//   });

//   describe('Positive add user to group response ', () => {

//     before((done) => {
//       chai.request(app)
//       .post('/api/user/signin')
//       .send(testUser)
//       .end((err, res) => {
//         token = res.body.token;
//       });

//       // signup another user on the platform
//       const user2 = {
//         UserName: 'Funsho',
//         email: 'funsho@yahoo.com',
//         password: 'abcdefghij',
//         telephone: '08038498175'
//       };
//       chai.request(app)
//       .post('/api/user/signup')
//       .send(user2)
//       .end((err, res) => {
//       });

//       // create a group using the first users credentials
//       const newGroup = {
//         GroupName: 'Test Group'
//       };
//       chai.request(app)
//       .post('/api/group')
//       .set('x-auth', token)
//       .send(newGroup)
//       .end((err, res) => {
//         done();
//       });
//     });
    
//     //it should return a status of 201 when a user is added to the group
//     it('should return a status of 201 when a user is added to the group', (done) => {
//       // user to be added
//       const addUser = {
//         userId: '2'
//       };

//       chai.request(app)
//       .post('/api/group/1/user')
//       .set('x-auth', token)
//       .send(addUser)
//       .end((err, res) => {
//         res.should.have.status(201);
//         done();
//       });
//     });
//   });

//   describe('Negative add user to group response ', () => {

//     before((done) => {
//       chai.request(app)
//       .post('/api/user/signin')
//       .send(testUser)
//       .end((err, res) => {
//         token = res.body.token;
//       });

//       // signup another user on the platform
//       const user2 = {
//         UserName: 'Funsho',
//         email: 'funsho@yahoo.com',
//         password: 'abcdefghij',
//         telephone: '08038498175'
//       };
//       chai.request(app)
//       .post('/api/user/signup')
//       .send(user2)
//       .end((err, res) => {
//       });

//       // create a group using the first users credentials
//       const newGroup = {
//         GroupName: 'Test Group'
//       };
//       chai.request(app)
//       .post('/api/group')
//       .set('x-auth', token)
//       .send(newGroup)
//       .end((err, res) => {
//         done();
//       });
//     });

//     // when token is not provided
//     it('should return a status code of 403 when token is not provided', (done) => {
//       // user to be added to the group
//       const addUser = {
//         userId: '2'
//       };

//       chai.request(app)
//       .post('/api/group/1/user')
//       .send(addUser)
//       .end((err, res) => {
//         res.should.have.status(403);
//         done();
//       });
//     });

//     // when token is not provided
//     it('should return success of false when token is not provided', (done) => {
//       // user to be added to the group
//       const addUser = {
//         userId: '2'
//       };

//       chai.request(app)
//       .post('/api/group/1/user')
//       .send(addUser)
//       .end((err, res) => {
//         expect(res.body.success).to.be.false;
//         done();
//       });
//     });
//   });
// });

// // tests for list users in a group route
// describe('List users in a group tests /api/group/:groupId/user/list', () => {
//   // string to hold token returned when user signs up
//   let token = '';
//   before((done) => {
//     clearDatabase();
//     chai.request(app)
//     .post('/api/user/signup')
//     .send(testUser)
//     .end((err, res) => {
//       token = res.body.token;
//       done();
//     });
//   });

//   // list users in a group positive responses
//   describe('Positive list group members response ', () => {

//     before((done) => {
//       chai.request(app)
//       .post('/api/user/signin')
//       .send(testUser)
//       .end((err, res) => {
//         token = res.body.token;
//         console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>', err.message);
//       });

//       // signup another user on the platform
//       const user2 = {
//         UserName: 'Funsho',
//         email: 'funsho@yahoo.com',
//         password: 'abcdefghij',
//         telephone: '08038498175'
//       };
//       chai.request(app)
//       .post('/api/user/signup')
//       .send(user2)
//       .end((err, res) => {
//       });

//       // create a group using the first users credentials
//       const newGroup = {
//         GroupName: 'Test Group'
//       };
//       chai.request(app)
//       .post('/api/group')
//       .set('x-auth', token)
//       .send(newGroup)
//       .end((err, res) => {
//       });

//       // add user to the group
//       // user to be added
//       const addUser = {
//         userId: '2'
//       };

//       chai.request(app)
//       .post('api/group/1/user')
//       .set('x-auth', token)
//       .send(addUser)
//       .end((err, res) => {
//         done();
//       });
//     });

//     // it should return a status code of 200 when successful
//     it('should return a status code of 200 on listing users in a group', (done) => {
//       chai.request(app)
//       .get('/api/group/1/user/list')
//       .set('x-auth', token)
//       .end((err, res) => {
//         res.should.have.status(200);
//         done();
//       });
//     });
//   });
// });
