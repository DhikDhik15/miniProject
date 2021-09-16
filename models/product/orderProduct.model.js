module.exports = (sequelize, Sequelize) => {
    const OrderProduct = sequelize.define("order_product", {
        name_product: {
            type: Sequelize.STRING
        },
        id_supplier: {
            type: Sequelize.INTEGER
        },
        qty: {
            type: Sequelize.INTEGER
        },
        image: {
            type: Sequelize.STRING
        },
        date_order: {
            type: Sequelize.DATEONLY
        },
        description: {
            type: Sequelize.STRING
        }
    },{ freezeTableName: true });
    return OrderProduct;
}