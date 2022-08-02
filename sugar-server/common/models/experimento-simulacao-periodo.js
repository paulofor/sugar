'use strict';

module.exports = function(Experimentosimulacaoperiodo) {


    /**
    * 
    * @param {number} idExperimento 
    * @param {array} lista 
    * @param {Function(Error, object)} callback
    */
    Experimentosimulacaoperiodo.AtualizaPorExperimento = function (idExperimento, lista, callback) {
        //var sqlQuantidade = "update GrupoAcao " +
        //" set quantidade = (select count(*) from RelGrupoAcao where GrupoAcao.id = RelGrupoAcao.grupoAcaoId) ";
        var sqlDelete = "delete from ExperimentoSimulacaoPeriodo where experimentoSimulacaoId = " + idExperimento;

        var ds = Experimentosimulacaoperiodo.dataSource;
        ds.connector.query(sqlDelete, (err1, result1) => {
        //console.log('Retorno 1: ', result1, " - Erro: ",)
        if (err1) {
            callback(err1, null);
            return;
        }
        let conta = 0;
        lista.forEach((rel) => {
            Experimentosimulacaoperiodo.create(rel);
            conta++;
            if (conta==lista.length) {
                callback(null, { 'result': 'ok' });
            }
        });
        });
    };
  
};
