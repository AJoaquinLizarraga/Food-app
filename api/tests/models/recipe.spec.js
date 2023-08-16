const { Recipe, conn } = require('../../src/db');
const { expect } = require('chai');

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  
  describe('Recipe attributes', async () => {
    it('should contain attributes: id, title, summary, healthScore, stepbystep, image', async () => {
      const recipe = await Recipe.findOne({ where: { title: 'prueba' } });
      expect(recipe.dataValues).to.have.own.property('id');
      expect(recipe.dataValues).to.have.own.property('title');
      expect(recipe.dataValues).to.have.own.property('summary');
      expect(recipe.dataValues).to.have.own.property('healthScore');
      expect(recipe.dataValues).to.have.own.property('stepbystep');
      expect(recipe.dataValues).to.have.own.property('image');
    });

    it('property summary must be of type string', async () => {
      const recipe = await Recipe.findOne({ where: { title: 'prueba' } });
      expect(recipe.dataValues.summary).to.be.a('string');
    });

    it('property stepbystep must be of type JSON', async () => {
      const recipe = await Recipe.findOne({ where: { title: 'prueba' } });
      expect(recipe.dataValues.stepbystep).to.be.a('object');
    });
  });
});