module.exports = (sequelize, Sequelize) => {
  const Opname = sequelize.define("opname_product", {
    id_product: {
      type: Sequelize.INTEGER
    },
    count_product_out: {
      type: Sequelize.INTEGER
    },
    left_product: {
      type: Sequelize.INTEGER
    },
    req_product: {
      type: Sequelize.INTEGER
    },
    in_product: {
      type: Sequelize.INTEGER
    },
    description: {
      type: Sequelize.STRING
    }
  },
{ freezeTableName: true, });
  return Opname;
};
