'use strict';

module.exports = function(Perguntaformulario) {


    Perguntaformulario.ListaAtivoPergunta = function(callback) {
        let sql = "select * from PerguntaFormulario"
        let ds = Perguntaformulario.dataSource;
        ds.connector.query(sql,callback);
    }
};
