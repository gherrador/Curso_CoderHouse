exports.up = function(knex) {
    return knex.schema.createTable('items', (table) => {
        table.increments('id').notNullable().primary();
        table.string('Nombre').notNullable();
        table.string('Categoria').notNullable();
        table.integer('Stock');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('items');
};