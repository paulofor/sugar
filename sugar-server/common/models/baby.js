'use strict';

module.exports = function(Baby) {


    Baby.ListaAtivoBaby = function(callback) {
        let sql = "select * from Baby";
        let ds = Baby.dataSource;
        ds.connector.query(sql,callback);
    }
};
