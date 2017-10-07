import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';
import db from '../../models/index';
import {
  clearUserDatabase,
  testUser1,
  testUser2,
  testUser3,
  testUser4,
  testUser5,
  testUser6,
  incompleteUser1,
  signup
} from '../helper';

process.env.NODE_ENV = 'travis';

const user = db.Users;

const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);
clearUserDatabase();
let token = '';
// beforeEach((done) => {
//   clearUserDatabase();
//   // token = signup('funsho', 'funsho@gmail.com', 'asdf;lkj', '12345678901');
//   done();
// });

describe('Signup route POST /api/user/signup', () => [
  describe('Signup Positive Responses ', () => {
    it('it should return a status of 201 on successful signup', (done) => {
      chai.request(app)
      .post('/api/user/signup')
      .send(testUser1)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
    });
  }),

  describe('Signup Negative Responses ', () => {
    before((done) => {
      signup('funsho', 'funsho@gmail.com', 'asdf;lkj', '12345678901');
      // console.log(signup('funsho', 'funsho@gmail.com', 'asdf;lkj', '12345678901'))
      done();
    });

    it('it should return a status of 400 if nothing is sent to the route', (done) => {
      chai.request(app)
      .post('/api/user/signup')
      .send()
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });

    it('it should return a message Invalid credentials when no user object is given', (done) => {
      chai.request(app)
      .post('/api/user/signup')
      .send()
      .end((err, res) => {
        expect(res.body.message).to.equal('Invalid credentials');
        done();
      });
    });

    it('it should return a message Invalid credentials when a user object is incomplete', (done) => {
      chai.request(app)
      .post('/api/user/signup')
      .send(incompleteUser1)
      .end((err, res) => {
        expect(res.body.message).to.equal('Invalid credentials');
        done();
      });
    });

    it('it should return a status of 400 if username is already in use', (done) => {
      chai.request(app)
      .post('/api/user/signup')
      .send(testUser2)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });

    it('it should return a status of 400 if email is already in use', (done) => {
      chai.request(app)
      .post('/api/user/signup')
      .send(testUser3)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });

    it('it should return a status of 400 if telephone number is already in use', (done) => {
      chai.request(app)
      .post('/api/user/signup')
      .send(testUser4)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });
  })
]);

describe('Signin route POST /api/user/signin', () => [
  describe('Signin Positive Responses ', () => {
    before((done) => {
      signup('funsho', 'funsho@gmail.com', 'asdf;lkj', '12345678901');
      done();
    });

    it('it should return a status 200 on successful signin', (done) => {
      chai.request(app)
      .post('/api/user/signin')
      .send(testUser2)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  }),

  describe('Siginin Negative Responses ', () => {
    before((done) => {
      clearUserDatabase();
      signup('funsho', 'funsho@gmail.com', 'asdf;lkj', '12345678901');
      done();
    });

    it('it should return a status 400 if no user object is sent', (done) => {
      chai.request(app)
      .post('/api/user/signin')
      .send()
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });

    it('it should return a status 400 when user is not found', (done) => {
      chai.request(app)
      .post('/api/user/signin')
      .send(testUser1)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
    });

    it('it should return a status 400 when password is wrong', (done) => {
      chai.request(app)
      .post('/api/user/signin')
      .send(testUser5)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
    });
  })
]);

describe('Forgot password route POST /api/forgot/password', () => [
  describe('Forgot password positive responses ', () => {
    before((done) => {
      signup('funsho', 'funsho@gmail.com', 'asdf;lkj', '12345678901');
      done();
    });

    it('should return status 200', (done) => {
      chai.request(app)
      .post('/api/forgot/password')
      .send(testUser6)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  }),
  describe('Forgot password negative responses ', () => {
    before((done) => {
      clearUserDatabase();
      done();
    });

    it('should return status 400 if no user object is sent', (done) => {
      chai.request(app)
      .post('/api/forgot/password')
      .send()
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });

    it('should return status 400 when no user is not found', (done) => {
      chai.request(app)
      .post('/api/forgot/password')
      .send(testUser1)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });
  })
]);

// import chaiHttp from 'chai-http';
// import chai from 'chai';
// import app from '../app';
// import db from '../models/index';

// process.env.NODE_ENV = 'travis';

// const user = db.Users;
// const group = db.Groups;
// // const user = require('../models').Users;

// const should = chai.should();
// const expect = chai.expect;

// chai.use(chaiHttp);

// /*
// describe('user', () => {
// beforeEach((done) => {
//   user.destroy({
//     where: {},
//     truncate: true,
//     restartIdentity: true,
//     cascade: true,
//   });
//   done();
// });
// */

// // function that clears out user database
// const clearUserDatabase = () => {
// user.destroy({
//   where: {},
//   truncate: true,
//   restartIdentity: true,
//   cascade: true,
// });
// };

// // sample user used for testing
// const testUser = {
// UserName: 'Bayo',
// email: 'bayo@yahoo.com',
// password: 'abcdefghij',
// telephone: '08138498175'
// };

// // sample user to signin
// const testUser3 = {
// UserName: 'Bayo',
// password: 'abcdefghij'
// };

// describe('user', () => {
// beforeEach((done) => {
//   clearUserDatabase();
//   done();
// });

// describe('Api Works', () => {
//   it('it should return a response 200', (done) => {
//     chai.request(app)
//     .get('/api')
//     .end((err, res) => {
//       res.should.have.status(200);
//       done();
//     });
//   });
// });
// });

// // signup route tests
// // test signup positive responses
// describe('SignUp Positive Responses', () => {
// beforeEach((done) => {
//   clearUserDatabase();
//   done();
// });

// describe('POST /api/user/signup', () => {
//   it('it should create a new user', (done) => {
//     chai.request(app)
//     .post('/api/user/signup')
//     .send(testUser)
//     .end((err, res) => {
//       res.body.should.be.a('object');
//       done();
//     });
//   });

//   it('it should create a new user with status code 201', (done) => {
//     chai.request(app)
//     .post('/api/user/signup')
//     .send(testUser)
//     .end((err, res) => {
//       res.should.have.status(201);
//       done();
//     });
//   });

//   it('It should create a user with the UserName given', (done) => {
//     chai.request(app)
//     .post('/api/user/signup')
//     .send(testUser)
//     .end((err, res) => {
//       res.should.have.status(201);
//       expect(res.body.UserName).to.equal('Bayo');
//       done();
//     });
//   });

//   it('It should create and user with the email given', (done) => {
//     chai.request(app)
//     .post('/api/user/signup')
//     .send(testUser)
//     .end((err, res) => {
//       res.should.have.status(201);
//       expect(res.body.email).to.equal('bayo@yahoo.com');
//       done();
//     });
//   });

//   it('It should create and user with the phone number given', (done) => {
//     chai.request(app)
//     .post('/api/user/signup')
//     .send(testUser)
//     .end((err, res) => {
//       res.should.have.status(201);
//       expect(res.body.telephone).to.equal('08138498175');
//       done();
//     });
//   });

//   it('It should create a user and return a token', (done) => {
//     chai.request(app)
//     .post('/api/user/signup')
//     .send(testUser)
//     .end((err, res) => {
//       res.should.have.status(201);
//       expect(res.body.token).to.be.a('string');
//       done();
//     });
//   });
// });
// });

// describe('SignUp Negative Responses', () => {
// beforeEach((done) => {
//   clearUserDatabase();
//   done();
// });

// it(`It should return a status code of 400
// when UserName is not given`, (done) => {
//   const testUser2 = {
//     email: 'bayo@yahoo.com',
//     password: 'abcdefghij'
//   };
//   chai.request(app)
//   .post('/api/user/signup')
//   .send(testUser2)
//   .end((err, res) => {
//     res.should.have.status(400);
//     done();
//   });
// });

// it('It should return a message about UserName not given', (done) => {
//   const testUser2 = {
//     email: 'bayo@yahoo.com',
//     password: 'abcdefghij',
//     telephone: '08138498175'
//   };
//   chai.request(app)
//   .post('/api/user/signup')
//   .send(testUser2)
//   .end((err, res) => {
//     expect(res.body.message).to.equal('Invalid credentials');
//     done();
//   });
// });

// it(`It should return a status code of 400
// when email is not given`, (done) => {
//   const testUser2 = {
//     UserName: 'Bayo',
//     password: 'abcdefghij',
//     telephone: '08138498175'
//   };
//   chai.request(app)
//   .post('/api/user/signup')
//   .send(testUser2)
//   .end((err, res) => {
//     res.should.have.status(400);
//     done();
//   });
// });

// it(`It should return a message about email not given
// when email is not given`, (done) => {
//   const testUser2 = {
//     UserName: 'Bayo',
//     password: 'abcdefghij',
//     telephone: '08138498175'
//   };
//   chai.request(app)
//   .post('/api/user/signup')
//   .send(testUser2)
//   .end((err, res) => {
//     expect(res.body.message).to.equal('Invalid credentials');
//     done();
//   });
// });

// it(`It should return a status code of 400
// when password is less than 8 characters`, (done) => {
//   const testUser2 = {
//     UserName: 'Bayo',
//     email: 'bayo@yahoo.com',
//     password: 'abcd',
//     telephone: '08138498175'
//   };
//   chai.request(app)
//   .post('/api/user/signup')
//   .send(testUser2)
//   .end((err, res) => {
//     res.should.have.status(400);
//     done();
//   });
// });

// it(`It should return a message about password length
// when password length is less than 8 characters`, (done) => {
//   const testUser2 = {
//     UserName: 'Bayo',
//     email: 'bayo@yahoo.com',
//     password: 'abcd',
//     telephone: '08138498175'
//   };
//   chai.request(app)
//   .post('/api/user/signup')
//   .send(testUser2)
//   .end((err, res) => {
//     expect(res.body.message).to.equal('Invalid credentials');
//     done();
//   });
// });

// it(`It should return a status code of 400 when
//   telephone number is not given`, (done) => {
//   const testUser2 = {
//     UserName: 'Bayo',
//     email: 'bayo@yahoo.com',
//     password: 'abcdefghij'
//   };
//   chai.request(app)
//   .post('/api/user/signup')
//   .send(testUser2)
//   .end((err, res) => {
//     res.should.have.status(400);
//     done();
//   });
// });

// it(`It should return a message when
// telephone number is not given`, (done) => {
//   const testUser2 = {
//     UserName: 'Bayo',
//     email: 'bayo@yahoo.com',
//     password: 'abcdefghij'
//   };
//   chai.request(app)
//   .post('/api/user/signup')
//   .send(testUser2)
//   .end((err, res) => {
//     expect(res.body.message).to.equal(`Invalid credentials`);
//     done();
//   });
// });

// it(`It should return a status code of 400 when
// password is not given`, (done) => {
//   const testUser2 = {
//     UserName: 'Bayo',
//     email: 'bayo@yahoo.com',
//     telephone: '08138498175'
//   };
//   chai.request(app)
//   .post('/api/user/signup')
//   .send(testUser2)
//   .end((err, res) => {
//     res.should.have.status(400);
//     done();
//   });
// });

// it(`It should return a message when
//   password is not given`, (done) => {
//   const testUser2 = {
//     UserName: 'Bayo',
//     email: 'bayo@yahoo.com',
//     telephone: '08138498175'
//   };
//   chai.request(app)
//   .post('/api/user/signup')
//   .send(testUser2)
//   .end((err, res) => {
//     expect(res.body.message).to.equal('Invalid credentials')
//     done();
//   });
// });
// });

// // // tests for signin route
// // describe('Signin route tests', () => {
// //   before((done) => {
// //     clearUserDatabase();
// //     chai.request(app)
// //     .post('/api/user/signup')
// //     .send(testUser)
// //     .end((err, res) => {
// //       done();
// //     });
// //   });

// //   // test signin positive responses
// //   describe('Signin positive responses', () => {

// //     it(`It should return a status code of 200 on successful signin`, (done) => {
// //       chai.request(app)
// //       .post('/api/user/signin')
// //       .send(testUser3)
// //       .end((err, res) => {
// //         res.should.have.status(201);
// //         done();
// //       });
// //     });

// //   });

// // });

// describe('Group API works', () => {
// it('it should return a response 200', (done) => {
//   chai.request(app)
//   .get('/api/group')
//   .end((err, res) => {
//     res.should.have.status(200);
//     done();
//   });
// });
// });

// // describe('Group Positive Responses', () => {
// //   beforeEach((done) => {
// //     group.destroy({
// //       where: {},
// //       truncate: true,
// //       restartIdentity: true,
// //       cascade: true
// //     });
// //     user.destroy({
// //       where: {},
// //       truncate: true,
// //       restartIdentity: true,
// //       cascade: true
// //     });
// //     done();
// //   });

// //   describe('POST /api/group', () => {
// //     it('it should create a new group', (done) => {
// //       const testUser = {
// //         UserName: 'Funsho',
// //         email: 'funsho@yahoo.com',
// //         password: 'abcdefghij'
// //       };
// //       chai.request(app)
// //       .post('/api/user/signup')
// //       .send(testUser);
// //       const testGroup = {
// //         userId: 1,
// //         GroupName: 'Sample Group',
// //         Description: 'Short description about the created sample group'
// //       };
// //       chai.request(app)
// //       .post('/api/group')
// //       .send(testGroup)
// //       .end((err, res) => {
// //         console.log('===========>>>>>>>>>>>>>!!!!!!!!!', res.body);
// //         res.should.have.status(201);
// //         done();
// //       });
// //     });

// //     it('it should create a new group with the name given', (done) => {
// //       const testUser = {
// //         UserName: 'Bayo',
// //         email: 'bayo@yahoo.com',
// //         password: 'abcdefghij'
// //       };
// //       const testGroup = {
// //         userId: 1,
// //         GroupName: 'Sample Group',
// //         Description: 'Short description about the created sample group'
// //       };
// //       chai.request(app)
// //       .post('/api/user/signup', '/api/group')
// //       .send(testUser, testGroup)
// //       .end((err, res) => {
// //         res.should.have.status(201);
// //         expect(res.body.GroupName).to.equal('Sample Group');
// //         done();
// //       });
// //     });
// //   });
// // });
