const app = require('./app');

app.listen(app.get('port'), () => {
  console.log(`The Server is Running on Port ${app.get('port')}`);
});
