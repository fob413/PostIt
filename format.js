import db from './server/models';

db.sequelize.sync({ force: true })
    .then(() => {
      console.log('synced');
    })
    .catch((error) => {
      console.log(error);
    });
