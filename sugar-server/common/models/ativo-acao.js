'use strict';

var app = require('../../server/server');

module.exports = function (Ativoacao) {

    /**
    * 
    * @param {Function(Error, object)} callback
    */
     Ativoacao.VerificaPossuiResultado = function(callback) {
        let sql = "update AtivoAcao " +
                    " set possuiIntradayResultado = " + 
                    " (select count(distinct ticker) from CotacaoIntradayAcaoResultado " + 
                    " where CotacaoIntradayAcaoResultado.ticker = AtivoAcao.ticker ";
        let ds = Cotacaointradayindice.dataSource;
        ds.connector.query(sql, callback);
    };


    /**
    * 
    * @param {Function(Error, array)} callback
    */
    Ativoacao.ListaComResultadoMaisRecente = function(callback) {
        let filtro = {
            'where' : {'possuiIntradayResultado' : '1'},
            'order' : 'ticker',
            'include' : [
                        {   'relation' : 'cotacaoIntradayAcaoResultados' , 
                            'scope' : {
                                'order' : 'dataHora desc',
                                'limit' : 1,
                                'where' : {'valor' : {'neq':null}}
                            }
                        },
                        {
                            'relation' : 'relGrupoAcaos',
                            'scope' : {'include' : 'grupoAcao'}
                        }
                    ]
        }
        Ativoacao.find(filtro,callback);
    };



    /**
    * 
    * @param {number} idExperimento 
    * @param {Function(Error, array)} callback
    */
    Ativoacao.MelhorParaValidacao = function(idExperimento, callback) {
        console.log('Inicio MelhorParaValidacao id#' , idExperimento);
        app.models.ExperimentoSimulacao.findById(idExperimento, (err,experimento) => {
            console.log('err1' ,  err);
            app.models.PeriodoExperimento.findById(experimento.periodoExperimentoId, (err,periodo) => {
                console.log('err2' , err);
                Ativoacao.MelhorSimulacaoPorExperimentoSimplificada(idExperimento,periodo.id, periodo.minimoPontoValidacao,(err,res) => {
                    console.log('err3' , err);
                    console.log('Finalizou MelhorParaValidacao');
                    callback(err,res);
                })
            })
        })
       
    };

    Ativoacao.MelhorSimulacaoPorExperimentoSimplificada = function(idExperimento, idPeriodo,  cortePontos, callback) {
        let filtro = {
            'include' : {
                'relation' : 'execucaoSimulacaos' , 'scope' : {
                        'where' : { 'and' : [{'experimentoSimulacaoId' : idExperimento } , {'periodoExperimentoId' : idPeriodo} , {'resultado' : { gte : cortePontos }}  ]},
                        'order' : 'resultado desc'
                        //'include' : {'relation' : 'combinacaoParametro' , 'scope' : {
                        //    'include' : ['regraSimulacao' , {'relation' : 'valorParametros' , 'scope' : {'include' : 'parametroRegra'}}]
                        //}} 
                }
            },
        }
        Ativoacao.find(filtro,(err,result) => {
            console.log('terminou consulta');
            let lista = result.filter(function (item)  {
                let json = JSON.stringify(item);
                let tam = JSON.parse(json).execucaoSimulacaos.length
                return (tam > 0);
            })
            callback(err,lista);
        });
    };


 /**
    * 
    * @param {number} idPeriodo 
    * @param {number} cortePontos 
    * @param {number} qtdeExecucao 
    * @param {Function(Error, array)} callback
    */
  Ativoacao.MelhorSimulacaoPorExperimento = function(idExperimento, idPeriodo,  cortePontos, qtdeExecucao, callback) {
    /*
    let filtro = {
        'include' : {
            'relation' : 'execucaoSimulacaos' , 'scope' : {
                'where' : { and : [ {'experimentoSimulacaoId': idExperimento } , {'resultado' : { gt: cortePontos } }]}
            }
        }
       
    }
    */
    let filtro = {
        'include' : {
            'relation' : 'execucaoSimulacaos' , 'scope' : {
                    'limit' : qtdeExecucao,
                    'where' : { 'and' : [{'experimentoSimulacaoId' : idExperimento } , {'periodoExperimentoId' : idPeriodo} , {'resultado' : { gte : cortePontos }}  ]},
                    'order' : 'resultado desc'
                    //'include' : {'relation' : 'combinacaoParametro' , 'scope' : {
                    //    'include' : ['regraSimulacao' , {'relation' : 'valorParametros' , 'scope' : {'include' : 'parametroRegra'}}]
                    //}} 
            }
        },
    }
    Ativoacao.find(filtro,(err,result) => {
        console.log('terminou consulta');
        let lista = result.filter(function (item)  {
            let json = JSON.stringify(item);
            let tam = JSON.parse(json).execucaoSimulacaos.length
            return (tam > 0);
        })
        callback(err,lista);
    });
    
    };



    /**
    * 
    * @param {number} idPeriodo 
    * @param {number} cortePontos 
    * @param {number} qtdeExecucao 
    * @param {Function(Error, array)} callback
    */
    Ativoacao.MelhorSimulacaoPorPeriodo = function(idPeriodo, cortePontos, qtdeExecucao, callback) {
        /*
        let filtro = {
            'include' : {
                'relation' : 'execucaoSimulacaos' , 'scope' : {
                    'where' : { and : [ {'periodoExperimentoId': idPeriodo } , {'resultado' : { gt: cortePontos } }]}
                }
            }
           
        }
        */
        let filtro = {
            'include' : {
                'relation' : 'execucaoSimulacaos' , 'scope' : {
                        'limit' : qtdeExecucao,
                        'where' : { 'and' : [{'resultado' : { gt : cortePontos }} , {'periodoExperimentoId' : idPeriodo } ]},
                        'order' : 'resultado desc',
                        'include' : {'relation' : 'combinacaoParametro' , 'scope' : {'include' : 'regraSimulacao'}}
                }
            },

        }
        Ativoacao.find(filtro,(err,result) => {
            let lista = result.filter(function (item)  {
                let json = JSON.stringify(item);
                let tam = JSON.parse(json).execucaoSimulacaos.length
                return (tam > 0);
            })
            callback(err,lista);
        });
        
    };


    /**
     * 
     * @param {Function(Error, array)} callback
     */

    Ativoacao.ListaColetaIntraday = function (callback) {
        var lista;
        // TODO
        callback(null, lista);
    };

    /**
    * 
    * @param {number} idGrupo 
    * @param {Function(Error, array)} callback
    */
    Ativoacao.ListaPorGrupo = function(idGrupo, callback) {
        let sql = "select AtivoAcao.* from AtivoAcao " +
                " inner join RelGrupoAcao on AtivoAcao.ticker = RelGrupoAcao.ticker " +
                " where RelGrupoAcao.grupoAcaoId =  " + idGrupo + 
                " order by AtivoAcao.ticker";
        let ds = Ativoacao.dataSource;
        ds.connector.query(sql,callback);
    };
  


    /**
     * 
     * @param {Function(Error, object)} callback
     */

    Ativoacao.AtualizaPosDiario = function (callback) {
        let sqlFechameentoAtual = " update AtivoAcao " +
                    " set fechamentoAtual = ( " +
                    " select fechamento from CotacaoDiarioAcao " +
                    " where ticker = AtivoAcao.ticker " +
                    " and data = (select max(data) from CotacaoDiarioAcao where ticker = AtivoAcao.ticker ) " +
                    " ) ";
        let sqlMaximo3 = " update AtivoAcao " +
                    " set max3Mes = ( " +
                    " select max(maximo) from CotacaoDiarioAcao " +
                    " where ticker = AtivoAcao.ticker " +
                    " and data >= (select DATE_SUB(now(), INTERVAL 3 month)) " +
                    ") ";   
        let sqlMinimo3 = " update AtivoAcao " +
                    " set min3Mes = ( " +
                    " select min(minimo) from CotacaoDiarioAcao " +
                    " where ticker = AtivoAcao.ticker " +
                    " and data >= (select DATE_SUB(now(), INTERVAL 3 month)) " +
                    ") "; 
        let sqlMediaNegocio3 = " update AtivoAcao " +
                    " set mediaNegocio3Mes = ( " +
                    " select avg(negocios) from CotacaoDiarioAcao " +
                    " where ticker = AtivoAcao.ticker " +
                    " and data >= (select DATE_SUB(now(), INTERVAL 3 month)) " +
                    ") "; 
        let sqlSpread3 = "update AtivoAcao " +
                    " set spread3Mes = ((max3Mes - min3Mes) / max3Mes) * 100;"
        
        let sqlMaximo1 = " update AtivoAcao " +
                    " set max1Mes = ( " +
                    " select max(maximo) from CotacaoDiarioAcao " +
                    " where ticker = AtivoAcao.ticker " +
                    " and data >= (select DATE_SUB(now(), INTERVAL 1 month)) " +
                    ") ";   
        let sqlMinimo1 = " update AtivoAcao " +
                    " set min1Mes = ( " +
                    " select min(minimo) from CotacaoDiarioAcao " +
                    " where ticker = AtivoAcao.ticker " +
                    " and data >= (select DATE_SUB(now(), INTERVAL 1 month)) " +
                    ") "; 
        let sqlMediaNegocio1 = " update AtivoAcao " +
                    " set mediaNegocio1Mes = ( " +
                    " select avg(negocios) from CotacaoDiarioAcao " +
                    " where ticker = AtivoAcao.ticker " +
                    " and data >= (select DATE_SUB(now(), INTERVAL 1 month)) " +
                    ") "; 
        let sqlSpread1 = "update AtivoAcao " +
                    " set spread1Mes = ((max1Mes - min1Mes) / max1Mes) * 100;";

        app.models.OrdemCompra.LimpaGeral((err,result) => {

        });
        app.models.TradeReal.AtualizaDiaAberto((err,result) => {
            
        });
        app.models.FundoImobiliario.AtualizaMetricaFundoImobiliario((err,result) => {
            
        })
        app.models.ExecucaoSimulacao.CalculaMaximoMedioGeral((err,result) => {

        })
        //app.models.ExperimentoSimulacao.ProcessaPermiteEdicaoExperimento((err,result) => {
        //})

        var ds = Ativoacao.dataSource;
        ds.connector.query(sqlFechameentoAtual, (err1, result1) => {
            ds.connector.query(sqlMaximo1, (errMax1, resultMax1) => {
                ds.connector.query(sqlMinimo1, (errMin1, resultMin1) => {
                    ds.connector.query(sqlSpread1, (errSpread1, resultSpread1)=> {

                    })
                })
            });
            ds.connector.query(sqlMediaNegocio1, (errMediaNegocio1,resultMediaNegocio1) => {

            });
            ds.connector.query(sqlMaximo3, (errMax3, resultMax3) => {
                ds.connector.query(sqlMinimo3, (errMin3, resultMin3) => {
                    ds.connector.query(sqlSpread3, (errSpread3, resultSpread3) => {
                        
                    })
                })
            });
            ds.connector.query(sqlMediaNegocio3, (errMediaNegocio3,resultMediaNegocio3) => {
                
            })
            callback(null,{'result' : 'ok'})
        });
    };


    /**
    * 
    * @param {string} ticker 
    * @param {string} nome 
    * @param {string} tipo 
    * @param {number} quantidadeTeorica 
    * @param {number} participacao 
    * @param {string} indice 
    * @param {Function(Error, object)} callback
    */
    Ativoacao.InsereAcaoIndice = function (ticker, nome, tipo, quantidadeTeorica, participacao, indice, callback) {
        var saida;
        // TODO
        callback(null, saida);
    };


    /**
    * 
    * @param {string} nomeGrupo 
    * @param {Function(Error, array)} callback
    */
    Ativoacao.ListaPorNomeGrupo = function(nomeGrupo, callback) {
        let sql = " select AtivoAcao.* from AtivoAcao " + 
                " inner join RelGrupoAcao on RelGrupoAcao.ticker = AtivoAcao.ticker " +
                " inner join GrupoAcao on GrupoAcao.id = RelGrupoAcao.grupoAcaoId " +
                " where GrupoAcao.nome = '" + nomeGrupo + "' ";
        let ds = Ativoacao.dataSource;
        ds.connector.query(sql,callback);
    };

};
