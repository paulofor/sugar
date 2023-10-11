'use strict';

module.exports = function(Baby) {


    Baby.ListaAtivoBaby = function(callback) {
        let sql = "select * from Baby";
        let ds = Baby.dataSource;
        ds.connector.query(sql,callback);
    }

    Baby.CalculaTraco = function(email, callback) {
        let sql = "insert into TracoBaby (emailBaby,tracoPersonalidadeId,valorTotal) " +
            " select '" + email + "', id , 0 " +
            " from TracoPersonalidade";
        let ds = Baby.dataSource;
        ds.connector.query(sql,(err,result) => {
            let sql2 = " update TracoBaby " +
                " set valorTotal = ( " +
                " select sum(RespostaFormulario.valorResposta * PerguntaFormulario.pesoTraco) from RespostaFormulario " +
                " inner join PerguntaFormulario on RespostaFormulario.perguntaFormularioId = PerguntaFormulario.id "+ 
                " where RespostaFormulario.emailBaby = TracoBaby.emailBaby and " +
                " TracoBaby.tracoPersonalidadeId = PerguntaFormulario.tracoPersonalidadeId " +
                " ) " +
                " where TracoBaby.emailBaby = '" + email + "'";
            ds.connector.query(sql2,callback);
        });
    }
};
