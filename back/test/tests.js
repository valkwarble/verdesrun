var request = require('supertest');
describe('Test Backend functions and Controllers using super test api', function () {
  var server;
  beforeEach(function () {
    server = require('./makeserver')();
  });
  afterEach(function (done) {
    server.close(done);
  });
  it('responds to /api/message get ', function testSlash(done) {
  request(server)
    .get('/api/message')
    .expect(200, done);
  });
    it('responds to /api/followermessages get', function testSlash(done) {
  request(server)
    .get('/api/followermessages')
    .expect(200, done);
  });
  it('responds to /api/message post', function testSlash(done) {
  request(server)
    .post('/api/message')
    .expect(200, done);
  });
  it('responds to /api/register', function testSlash(done) {
  request(server)
    .post('/api/register')
    .expect(200, done);
  });
  it('responds to /api/login', function testSlash(done) {
  request(server)
    .post('/api/login')
    .expect(200, done);
  });
  
  it('responds to /api/follow', function testSlash(done) {
  request(server)
    .post('/api/follow')
    .expect(200, done);
  });

  it('responds to /api/retweet', function testSlash(done) {
  request(server)
    .post('/api/retweet')
    .expect(200, done);
  });
  it('404 everything else', function testPath(done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
});

