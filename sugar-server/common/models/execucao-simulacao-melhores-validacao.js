'use strict';

var app = require('../../server/server');

module.exports = function(Execucaosimulacaomelhoresvalidacao) {


    /**
    * 
    * @param {number} idPeriodo 
    * @param {Function(Error, object)} callback
    */
     Execucaosimulacaomelhoresvalidacao.CriaMelhorValidacaoPeriodo = function(idPeriodo, callback) {
        app.models.PeriodoExperimento.findById(idPeriodo, (err,result) => {
            console.log('result:', result )
            let periodo = result;
            let sql = 
            " insert into ExecucaoSimulacaoMelhoresValidacao (  " +
            "    execucaoSimulacaoId,  " +
            "    ticker,  " +
            "    resultado,  " + 
            "    simulacaoQtdeLucro,  " +
            "    simulacaoQtdePrejuizo,  " +
            "    target,  " +
            "    stop,  " +
            "    tipo,  " +
            "    experimentoSimulacaoId,  " +
            "    periodoExperimentoId  " +
            "    )  " +
            " select distinct simulacao.id as simulacaoId, " +
            " simulacao.ticker as ticker, " +
            " simulacao.resultado as simulacaoResultado, " + 
            " simulacao.quantidadeLucro as simulacaoLucro, " +
            " simulacao.quantidadePrejuizo as simulacaoPrejuizo, " + 
            " simulacao.target as target, " +
            " simulacao.stop as stop, " +
            " simulacao.tipo as tipo, " +
            " simulacao.experimentoSimulacaoId as experimentoSimulacaoId, " +
            " simulacao.periodoExperimentoId " +
            " from ExecucaoSimulacao simulacao " +
            " where simulacao.periodoExperimentoId = " + idPeriodo +
            " and simulacao.resultado >= " + periodo.minimoPontoValidacao;
            console.log('sql: ' , sql);
            let ds = Execucaosimulacaomelhoresvalidacao.dataSource;
            ds.connector.query(sql,(err,result) => {
                let sqlupdate = " update ExecucaoSimulacaoMelhoresValidacao " +
                                " set validacaoQtdeLucro = ( " +
                                " select distinct quantidadeLucro from ExecucaoSimulacaoValidacao " +
                                " where ExecucaoSimulacaoValidacao.execucaoSimulacaoId =  ExecucaoSimulacaoMelhoresValidacao.execucaoSimulacaoId), " +
                                " validacaoQtdePrejuizo = ( " +
                                " select distinct quantidadePrejuizo from ExecucaoSimulacaoValidacao  " +
                                " where ExecucaoSimulacaoValidacao.execucaoSimulacaoId =  ExecucaoSimulacaoMelhoresValidacao.execucaoSimulacaoId) " +
                                " where periodoExperimentoId = " + idPeriodo; 
                ds.connector.query(sqlupdate, (err,result) => {
                    let sqlsaldo =  " update ExecucaoSimulacaoMelhoresValidacao " +
                                    " set validacaoDiferenca = (validacaoQtdeLucro - validacaoQtdePrejuizo) " +
                                    " where periodoExperimentoId = " + idPeriodo +
                                    " and validacaoQtdeLucro is not null";
                    ds.connector.query(sqlsaldo,callback);
                })
            });
        });
    };

};
