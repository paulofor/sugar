'use strict';

module.exports = function(Perguntaformulario) {


    Perguntaformulario.ListaAtiva = function(callback) {
        let sql = "select * from PerguntaFormulario"
        let ds = Perguntaformulario.dataSource;
        ds.connector.query(sql,callback);
    }
};
