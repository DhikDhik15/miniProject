module.exports = (sequelize, Sequelize) => {
    const Supplier = sequelize.define("supplier", {
        supplier_name: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.INTEGER
        },
        brand: {
            type: Sequelize.STRING
        },
        id_category: {
            type: Sequelize.INTEGER
        },
        description: {
            type: Sequelize.STRING
        }
    },{ freezeTableName: true });
    return Supplier;
};