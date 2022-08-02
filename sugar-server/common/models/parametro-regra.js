'use strict';

module.exports = function(Parametroregra) {


/**
 * 
 * @param {number} idExperimento 
 * @param {Function(Error, array)} callback
 */

Parametroregra.ObtemPorExperimentoComValor = function(idExperimento, callback) {
    let sql1 = "select ParametroRegra.* from ParametroRegra " +
            " inner join RegraSimulacao on RegraSimulacao.id = ParametroRegra.regraSimulacaoId " +
            " inner join ExperimentoSimulacao on RegraSimulacao.id = ExperimentoSimulacao.regraSimulacaoId " +
            " where ExperimentoSimulacao.id = " + idExperimento;
    let ds = Parametroregra.dataSource;
    let cont = 0;
    ds.connector.query(sql1, (err, result2) => {
       for (let i=0; i<result2.length; i++) {
           result2[i].valorParametros = [];
           let sql2 = "select distinct ValorParametro.valorParametro " +
                    " from ValorParametro " +
                    " where parametroRegraId = " + result2[i].id + 
                    " and experimentoSimulacaoId = " + idExperimento
                    " order ValorParametro.valorParametro ";
            ds.connector.query(sql2, (err,result) => {
                result2[i].valorParametros = result;
                cont++;
                if (cont==result2.length) callback(err,result2);
            });
       }
       
    })
  };
};
