'use strict';

var app = require('../../server/server');

module.exports = function(Execucaosimulacao) {  



    /**
    * 
    * @param {number} idExperimento 
    * @param {number} idPeriodo 
    * @param {string} ticker 
    * @param {Function(Error, array)} callback
    */
     Execucaosimulacao.ConsolidadoPorResultado = function(idExperimento, idPeriodo, ticker, callback) {
        let ds = Execucaosimulacao.dataSource;
        let sql = "select resultado, ticker, experimentoSimulacaoId, target, stop, count(*) as qtde " +
            " from ExecucaoSimulacao " +
            " where periodoExperimentoId = " + idPeriodo +
            (idExperimento?" experimentoSimulacaoId = " + idExperimento : "") +
            (ticker?"ticker = " + ticker : "") +
            " group by resultado, ticker, experimentoSimulacaoId, target, stop " +
            " order by resultado, ticker, experimentoSimulacaoId, target, stop";
            ds.connector.query(sql,callback);

    };




    /**
    * Faz todos os procedimentos necessários para a criação de um novo item de monitoria
    * @param {number} idExecucao 
    * @param {Function(Error, object)} callback
    */
    Execucaosimulacao.LigaMonitoria = function(idExecucao, callback) {
        var saida;
        // TODO
        callback(null, saida);
    };
  
    /**
    * Retorna todas as execuções que foram marcadas recentemente para monitoria e não estão com ValorMonitoria ainda.
    * @param {Function(Error, array)} callback
    */
    Execucaosimulacao.ListaNovaMonitoria = function(callback) {
        var listaItem;
        // TODO
        callback(null, listaItem);
    };
  

    Execucaosimulacao.ObtemMelhoresPontoEntradaPorTikcer = function(ticker,quantidade, tipo, callback) {
        let ordem = '';
        if (tipo=='C') ordem = 'asc'
        else ordem = 'desc'
        let sql = "select ExecucaoSimulacao.*, PeriodoExperimento.dataNumFinal " +
                " from ExecucaoSimulacao  " +
                " inner join PeriodoExperimento on PeriodoExperimento.id = ExecucaoSimulacao.periodoExperimentoId " +
                " where ticker = '" + ticker + "' " +
                " and tipo = '" + tipo + "'" +
                " and precoEntrada is not null " +
                " and monitorar = 1 " +
                " order by PeriodoExperimento.dataNumFinal, resultado desc, precoEntrada  " + ordem +
                " limit " + quantidade;
        let ds = Execucaosimulacao.dataSource;
        ds.connector.query(sql,callback);
    }

    /**
    * 
    * @param {number} idExecucao 
    * @param {number} diaNum 
    * @param {number} preco 
    * @param {Function(Error, object)} callback
    */
    Execucaosimulacao.AtualizaMonitoria = function(idExecucao, diaNum, preco, callback) {
        let sql = "update ExecucaoSimulacao set precoEntrada = " + preco +
        ", dataNumEntrada = " + diaNum + " where id = " + idExecucao;
        let ds = Execucaosimulacao.dataSource;
        ds.connector.query(sql,callback);
    };


    /**
     * 
     * @param {array} lista 
     * @param {Function(Error)} callback
     */

    Execucaosimulacao.ListaMonitorar = function(callback) {
        let filtro = { 
                        'where' : { 'monitorar' : '1' },
                        'include' : [
                            {
                            'relation' : 'combinacaoParametro' , 
                            'scope' : {
                                'include' : [
                                    {'relation' : 'regraSimulacao'},
                                    {'relation' : 'valorParametros', 'scope' : {'include' : 'parametroRegra'}}
                                    ] 
                                }
                            },
                            { 'relation' : 'ativoAcao'},
                            { 
                                'relation' : 'tradeReals',
                                'scope' : { 'where' : {'posicaoAtual' : '1' } }
                            }
                        ] 
                    }

        Execucaosimulacao.find(filtro,callback);
    };
  
    /**
    * 
    * @param {number} idExecucao 
    * @param {Function(Error, object)} callback
    */
    Execucaosimulacao.ObtemMonitorarPorId = function(idExecucao, callback) {
        let filtro = { 
            'where' : { 'id' : idExecucao },
            'include' : [
                {
                'relation' : 'combinacaoParametro' , 
                'scope' : {
                    'include' : [
                        {'relation' : 'regraSimulacao'},
                        {'relation' : 'valorParametros', 'scope' : {'include' : 'parametroRegra'}}
                        ] 
                    }
                }
            ] 
        }
        Execucaosimulacao.findOne(filtro,callback);
    };
     /**
    * 
    * @param {number} idExecucao 
    * @param {Function(Error, object)} callback -- IGUAL DE CIMA !!!
    */
      Execucaosimulacao.ObtemComRegraParametros = function(idExecucao, callback) {
        let filtro = {
            'where' : {'id' : idExecucao},
            'include' : {'relation' : 'combinacaoParametro' , 'scope' : {
                'include' : ['regraSimulacao' , {'relation' : 'valorParametros' , 'scope' : {'include' : 'parametroRegra'}}]
            }}}
        Execucaosimulacao.findOne(filtro,callback)
    };
/**
* 
* @param {object} execucao 
* @param {Function(Error, object)} callback
*/
Execucaosimulacao.InsereExecucaoSimulacao = function(execucao, callback) {
    //console.log('Execucao:' , execucao);
    Execucaosimulacao.create(execucao, (err,result) => {
        for (let i=0;i<execucao.trades.length;i++) {
            execucao.trades[i]['execucaoSimulacaoId'] = result.id;
            app.models.Trade.create(execucao.trades[i]);
        };
        callback(err,{'trades' : execucao.trades.length});
    })
};
  


    /**
     * 
     * @param {Function(Error, object)} callback
     */

    Execucaosimulacao.ObtemProximoMonitorar = function (callback) {
        let sql = "select id " +
            " from ExecucaoSimulacao " +
            " where monitorar = 1 " +
            " and id not in (select execucaoSimulacaoId from ValorMonitoria) " +
            " limit 1 ";
        let ds = Execucaosimulacao.dataSource;
        ds.connector.query(sql, (err, result) => {
            if (result.length == 0) {
                callback(err, {})
            } else {
                //callback(err,{});
                Execucaosimulacao.ObtemMonitorarPorId(result[0].id, callback);
            }
        })
    };

    /**
    * 
    * @param {Function(Error, object)} callback
    */
    Execucaosimulacao.CalculaMaximoMedioGeral = function (callback) {
        let sql = "update ExecucaoSimulacao " +
            " set maximoDiaTrade = (select max(quantidadeDia) from Trade where Trade.execucaoSimulacaoId = ExecucaoSimulacao.id), " +
            " mediaDiaTrade = (select avg(quantidadeDia) from Trade where Trade.execucaoSimulacaoId = ExecucaoSimulacao.id) " +
            " where monitorar = 1";
        let ds = Execucaosimulacao.dataSource;
        ds.connector.query(sql, callback);
    };
  

     /**
    * 
    * @param {number} idPeriodo 
    * @param {Function(Error, array)} callback
    */
      Execucaosimulacao.MelhorValidacaoPeriodo = function(idPeriodo, callback) {
        app.models.PeriodoExperimento.findById(idPeriodo, (err,result) => {
            let periodo = result;
            let filtro = {
                'where' : { 'and' : [
                    {'resultado' : { gte : periodo.minimoPontoValidacao }} , 
                    {'periodoExperimentoId' : idPeriodo} ]
                },
                'order' : 'ticker',
                'include' : ['execucaoSimulacaoValidacaos','experimentoSimulacao']
            }
            Execucaosimulacao.find(filtro,callback);
        })
    };


    /**
    * 
    * @param {number} idPeriodo 
    * @param {Function(Error, array)} callback
    */
    Execucaosimulacao.MelhorValidacaoPeriodoFlat = function(idPeriodo, callback) {
        app.models.PeriodoExperimento.findById(idPeriodo, (err,result) => {
            console.log('result:', result )
            let periodo = result;
            let sql = "select simulacao.id as simulacaoId, " +
            " simulacao.ticker as ticker, " +
            " simulacao.resultado as simulacaoResultado, " + 
            " simulacao.quantidadeLucro as simulacaoLucro, " +
            " simulacao.quantidadePrejuizo as simulacaoPrejuizo, " + 
            " simulacao.target as target, " +
            " simulacao.stop as stop, " +
            " simulacao.tipo as tipo, " +
            " simulacao.experimentoSimulacaoId as experimentoSimulacaoId, " +
            " validacao.quantidadeLucro as validacaoLucro, " +
            " validacao.quantidadePrejuizo as validacaoPrejuizo, " +
            " (validacao.quantidadeLucro - validacao.quantidadePrejuizo) as saldoValidacao " +
            " from ExecucaoSimulacao simulacao " +
            " left outer join ExecucaoSimulacaoValidacao  validacao on " + 
            " simulacao.id = validacao.execucaoSimulacaoId " +
            " where simulacao.periodoExperimentoId = " + idPeriodo +
            " and simulacao.resultado >= " + periodo.minimoPontoValidacao;
            console.log('sql: ' , sql);
            let ds = Execucaosimulacao.dataSource;
            ds.connector.query(sql,(err,result) => {
                console.log('erro', err);
                console.log('obteve resultado' , result);
                callback(err,result);
            });
        });
    };


    Execucaosimulacao.MelhorValidacaoPeriodoFlatPorTicker = function(idPeriodo, limiteTicker, tipo, callback) {
        let listaSaida = [];
        let ds = Execucaosimulacao.dataSource;
        app.models.PeriodoExperimento.findById(idPeriodo, (err,result) => {
            //console.log('result:', result )
            let periodo = result;
            let sqlTicker = "select distinct ticker from ExecucaoSimulacao simulacao where periodoExperimentoId = " +
                idPeriodo + " and simulacao.resultado >= " + periodo.minimoPontoValidacao + " and tipo ='" + tipo + "'";
            
            ds.connector.query(sqlTicker, (err,result2) => {
                //console.log('Ticker:' , result2.length);
                let cont = 1;
                for (let i=0;i<result2.length;i++) {
                    let sql2 = "select simulacao.id as simulacaoId, " +
                    " simulacao.ticker as ticker, " +
                    " simulacao.resultado as simulacaoResultado, " + 
                    " simulacao.quantidadeLucro as simulacaoLucro, " +
                    " simulacao.quantidadePrejuizo as simulacaoPrejuizo, " + 
                    " simulacao.target as target, " +
                    " simulacao.stop as stop, " +
                    " simulacao.tipo as tipo, " +
                    " simulacao.monitorar as monitorar, " +
                    " simulacao.experimentoSimulacaoId as experimentoSimulacaoId, " +
                    " validacao.quantidadeLucro as validacaoLucro, " +
                    " validacao.quantidadePrejuizo as validacaoPrejuizo, " +
                    " (validacao.quantidadeLucro - validacao.quantidadePrejuizo) as saldoValidacao " +
                    " from ExecucaoSimulacao simulacao " +
                    " left outer join ExecucaoSimulacaoValidacao  validacao on " + 
                    " simulacao.id = validacao.execucaoSimulacaoId " +
                    " where simulacao.periodoExperimentoId = " + idPeriodo +
                    " and simulacao.resultado >= " + periodo.minimoPontoValidacao +
                    " and simulacao.ticker = '" + result2[i].ticker + "' " +
                    " order by simulacao.resultado desc " +
                    " limit " + limiteTicker;
                    ds.connector.query(sql2, (err,result3) => {
                        //console.log('Tamanho sublista:' , result3.length);
                        listaSaida= listaSaida.concat(result3);
                        //console.log('Tamanho listaSaida:' , listaSaida.length);
                        if (cont++==(result2.length)) {
                            callback(null,listaSaida);
                        }
                    })
                }

            })
        })
    }

    Execucaosimulacao.MonitorarMelhorValidacaoPeriodoFlatPorTicker = function(idPeriodo,limitePorTicker,tipo, callback) {
        console.log('iniciou execucao');
        let sqlLimpeza = "update ExecucaoSimulacao set monitorar = 0 where periodoExperimentoId = " + idPeriodo +
            " and tipo = '" + tipo + "'";
        let ds = Execucaosimulacao.dataSource;
        ds.connector.query(sqlLimpeza, (err,result) => {
            Execucaosimulacao.MelhorValidacaoPeriodoFlatPorTicker(idPeriodo,limitePorTicker,tipo, (err,result) => {
                var where = "(" + result[0].simulacaoId;
                console.log('Tamanho: ' , result.length);
                let cont =2;
                for (let i=1;i<result.length;i++) {
                    where += "," + result[i].simulacaoId;
                    /*
                    let sqlUpdate = "update ExecucaoSimulacao set monitorar = 1 where id = " + result[i].simulacaoId;
                    console.log('sqlUpdate:', sqlUpdate , '[' , i , ']');
                    ds.connector.query(sqlUpdate, (err,result) => {
                       console.log('err:' , err , '[' , i , ']');
                    })
                    */
                    if (cont++==(result.length)) {
                        where += ')'
                        let sqlUpdate = "update ExecucaoSimulacao set monitorar = 1 where id in " + where;
                        console.log('sqlUpdate' , sqlUpdate);
                        ds.connector.query(sqlUpdate, callback);
                    }
                }
               
            })
        })
        
    }

    Execucaosimulacao.TotaisPorCombinacao = function(idRegraSimulacao,idPeriodo, callback) {
        let ds = Execucaosimulacao.dataSource;
        let sql = "SELECT C.id, C.descricao, sum(E.quantidadeLucro) lucro, sum(E.quantidadePrejuizo) prejuizo " + 
                    " FROM ExecucaoSimulacao E " +
                    " inner join CombinacaoParametro C on C.id = E.combinacaoParametroId " +
                    " where E.periodoExperimentoId = " + idPeriodo +  
                    " and E.regraSimulacaoId = " + idRegraSimulacao +
                    " group by C.id, C.descricao";
        ds.connector.query(sql,callback);
    }


        /*
        app.models.PeriodoExperimento.findById(idPeriodo, (err,result) => {
            console.log('result:', result )
            let periodo = result;
            let sql = "select simulacao.id as simulacaoId, " +
            " simulacao.ticker as ticker, " +
            " simulacao.resultado as simulacaoResultado, " + 
            " simulacao.quantidadeLucro as simulacaoLucro, " +
            " simulacao.quantidadePrejuizo as simulacaoPrejuizo, " + 
            " simulacao.target as target, " +
            " simulacao.stop as stop, " +
            " simulacao.tipo as tipo, " +
            " simulacao.experimentoSimulacaoId as experimentoSimulacaoId, " +
            " validacao.quantidadeLucro as validacaoLucro, " +
            " validacao.quantidadePrejuizo as validacaoPrejuizo, " +
            " (validacao.quantidadeLucro - validacao.quantidadePrejuizo) as saldoValidacao " +
            " from ExecucaoSimulacao simulacao " +
            " left outer join ExecucaoSimulacaoValidacao  validacao on " + 
            " simulacao.id = validacao.execucaoSimulacaoId " +
            " where simulacao.periodoExperimentoId = " + idPeriodo +
            " and simulacao.resultado >= " + periodo.minimoPontoValidacao;
            console.log('sql: ' , sql);
            let ds = Execucaosimulacao.dataSource;
            ds.connector.query(sql,(err,result) => {
                console.log('erro', err);
                console.log('obteve resultado' , result);
                callback(err,result);
            });
        });
        */
 

   
  
  
};
