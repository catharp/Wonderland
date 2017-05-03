const cluster = require('cluster');

if (cluster.isMaster) {
  const cpuCount = require('os').cpus().length;
  for (let i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }
  cluster.on('exit', function (worker) {
    console.log('Worker ' + worker.id + ' died :(');
    cluster.fork();
  });
}
else {
  const AWS = require('aws-sdk');
  const express = require('express');
  const bodyParser = require('body-parser');

  AWS.config.region = process.env.REGION;

  const sns = new AWS.SNS();
  const ddb = new AWS.DynamoDB();

  const ddbTable = process.env.SIGNUP_TABLE;
  const snsTopic = process.env.NEW_SIGNUP_TOPIC;
  const app = express();

  app.use(bodyParser.urlencoded({extended:false}));

  app.use(express.static('./'));
  app.use(express.static('build'));

  app.get('/', (req, res) => {
    console.log('getting...');
    res.sendFile(`${__dirname}/build/index.html`);
  });

  app.post('/signup', (req, res) => {
    const item = {
      'email': {'S': req.body.email},
    };

    ddb.putItem({
      'TableName': ddbTable,
      'Item': item,
      'Expected': { email: { Exists: false } }
    }, (err, data) => {
      if (err) {
        console.error('DDB Error:', err);
        res.status(err.code === 'ConditionalCheckFailedException' ? 409 : 500).send(err);
      } else {
        sns.publish({
          'Message': `Email: ${req.body.email}`,
          'Subject': 'New user sign up!!!',
          'TopicArn': snsTopic,
        }, (err, data) => {
          if (err) {
            console.error('SNS Error: ', err);
            res.status(500).end();
          } else {
            res.status(201).end();
          }
        });
      }
    });
  });

  const port = process.env.PORT || 3000;

  const server = app.listen(port, function () {
    console.log('Server running at http://127.0.0.1:' + port + '/');
  });
}
