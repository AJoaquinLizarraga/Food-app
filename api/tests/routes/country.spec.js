/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
});
describe('GET /recipes/:id', () => {
    it('should get 200', () =>{
    return  agent.get('/recipes/715594')
    .then(res => {
      expect(res.status).to.equal(200)
    })
  });
  });
