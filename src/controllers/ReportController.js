const { Op } = require('sequelize')

const User = require('../models/User')

module.exports = {
  async show(request, response) {
    // Encontrar usuarios que tem email que termina com @gmail.com 
    // Desses usuarios, buscar todos que moram na em tal rua ""
    // Desses usuarios, buscar as tecnologias que que começa com React

    const users = await User.findAll({
      attributes: ['name', 'email'],
      where: {
        email: {
          [Op.like]: '%@gmail.com'
        }
      },
      include: [
        {
          association: 'addresses',
          attributes: ['id', 'zipcode', 'street', 'number', 'user_id'],
          where: {
            street: 'Rua Teste'
          }
        },
        {
          association: 'techs',
          attributes: ['id', 'name'],
          required: false,
          where: {
            name: {
              [Op.like]: 'React%'
            }
          }
        },
      ]
    })

    return response.json(users);
  }
}