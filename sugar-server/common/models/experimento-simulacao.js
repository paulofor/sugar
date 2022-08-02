'use strict';

var app = require('../../server/server');

module.exports = function(Experimentosimulacao) {

    let posicao = 0;
    let listaComb = [];


    /**
    * 
    * @param {number} idExperimento 
    * @param {object} resultado 
    * @param {Function(Error, object)} callback
    */

    Experimentosimulacao.Reinicializa = function(idExperimento, callback) {
        let sqlCombinacao = "delete FROM CombinacaoParametro " +
                " where experimentoSimulacaoId = " + idExperimento;
        let sqlExperimento = "update ExperimentoSimulacao set quantidadeCombinacao = 0 , " +
                " permiteEdicao = 1 " +
                " where id = " + idExperimento;
        let ds = Experimentosimulacao.dataSource;
        ds.connector.query(sqlCombinacao, (err1,result1) => {
            ds.connector.query(sqlExperimento, callback);
        })
    };
  


    /**
    * 
    * @param {number} idExperimento 
    * @param {Function(Error, object)} callback
    */
    Experimentosimulacao.ColocaEmExecucao = function(idExperimento, callback) {
        let sql1 = "update ExperimentoSimulacao set emExecucao = 0 ";
        let sql2 = "update ExperimentoSimulacao set emExecucao = 1 where id = " + idExperimento;
        let ds = Experimentosimulacao.dataSource;
        ds.connector.query(sql1, (err1,result1) => {
            ds.connector.query(sql2, callback);
        })
    };
  
  
    /**
    * 
    * @param {number} idExperimento 
    * @param {Function(Error, object)} callback
    */
     Experimentosimulacao.ColocaEmValidacao = function(idExperimento, callback) {
        let sql1 = "update ExperimentoSimulacao set emValidacao = 0 ";
        let sql2 = "update ExperimentoSimulacao set emValidacao = 1 where id = " + idExperimento;
        let ds = Experimentosimulacao.dataSource;
        ds.connector.query(sql1, (err1,result1) => {
            ds.connector.query(sql2, callback);
        })
    };
  

    /**
    * 
    * @param {number} idExperimento 
    * @param {number} idPeriodo 
    * @param {Function(Error, object)} callback
    */
    Experimentosimulacao.InicioExecucao = function(idExperimento, idPeriodo, callback) {
        let sql = "update ExperimentoSimulacao set permiteEdicao = 0 " +
            " where id = " + idExperimento;
        let ds = Experimentosimulacao.dataSource;
        ds.connector.query(sql, (err,result) => {
            callback(err,result);
        })
    };
    
    /**
    * 
    * @param {number} idExperimento 
    * @param {Function(Error, object)} callback
    */
   Experimentosimulacao.FechaExperimento = function(idExperimento, callback) {
        let sql1 = "update ExperimentoSimulacao set dataExecucao = now() where id = " + idExperimento;
        let sql2 = "update CombinacaoParametro " +
            " set regraSimulacaoId = " +
            " (select regraSimulacaoId from ExperimentoSimulacao where ExperimentoSimulacao.id = CombinacaoParametro.experimentoSimulacaoId) " +
            " where experimentoSimulacaoId = " + idExperimento;

        let ds = Experimentosimulacao.dataSource;
        ds.connector.query(sql1, (err1,result1)=> {
            
        });
        
        ds.connector.query(sql2, callback);
        //callback(null,"{ 'resultado' : 'executando'}");
    };

    /**
     * 
     * @param {number} idExperimento 
     * @param {number} inicioBloco 
     * @param {string} finalBloco 
     * @param {Function(Error, object)} callback
     */

    Experimentosimulacao.GerarCombinacoesBloco =  function(idExperimento, inicioBloco, finalBloco, callback) {
        listaComb = [];
        let ds = Experimentosimulacao.dataSource;
        let filtro = {
            'where' : { 'experimentoSimulacaoId' : idExperimento },
            'order' : 'parametroRegraId'

        }
        Experimentosimulacao.findOne({'where' : {'id' : idExperimento} }, (err,experimento) => {
            app.models.ExperimentoParametro.find(filtro, (err1, parametros) => {
                console.log('Erro1: ' , err1);
                if (inicioBloco==1) {
                    let sqlLimpeza = "delete from CombinacaoParametro where experimentoSimulacaoId = " + idExperimento;
                    ds.connector.query(sqlLimpeza, (err,result) => {
                        let valor = new Array();
                        let ids = new Array();
                        for (let i=0;i<parametros.length;i++) {
                            valor.push(parametros[i].inicial);
                            ids.push(parametros[i].parametroRegraId);
                        }
                        posicao = 0;
                        trataItem(valor,parametros,ids, idExperimento, 0, experimento.regraSimulacaoId);
                        let sqlQuantidade = "update ExperimentoSimulacao set quantidadeCombinacao = " + listaComb.length + 
                                " where id = " + idExperimento;
                        ds.connector.query(sqlQuantidade, (err,result) => {
    
                        })
                        //salvaCombinacao(listaComb, inicioBloco, finalBloco);
                        for (let i=(inicioBloco-1);i<listaComb.length && i<finalBloco;i++) {
                            salvaCombinacaoUnica(listaComb[i]);
                        }
                        var saida = {'quantidade' : listaComb.length};
                        callback(null, saida);
                    })
                } else {
                    let valor = new Array();
                    let ids = new Array();
                    for (let i=0;i<parametros.length;i++) {
                        valor.push(parametros[i].inicial);
                        ids.push(parametros[i].parametroRegraId);
                    }
                    posicao = 0;
                    trataItem(valor,parametros,ids, idExperimento, 0, experimento.regraSimulacaoId);
                    salvaCombinacao(listaComb, inicioBloco, finalBloco);
                    var saida = {'quantidade' : listaComb.length};
                    callback(null, saida);
                }

            })
        })
    };


    /**
    * 
    * @param {number} idExperimento 
    * @param {Function(Error, object)} callback
    */
    Experimentosimulacao.GerarCombinacoes = function(idExperimento, callback) {
        //console.log('Entrou gerar combinacoes');
        posicao = 0;
        listaComb = [];
        let ds = Experimentosimulacao.dataSource;
        let filtro = {
            'where' : { 'experimentoSimulacaoId' : idExperimento }

        }
        Experimentosimulacao.findOne({'where' : {'id' : idExperimento} }, (err,experimento) => {
            app.models.ExperimentoParametro.find(filtro, (err1, parametros) => {
                let sqlLimpeza = "delete from CombinacaoParametro where experimentoSimulacaoId = " + idExperimento;
                ds.connector.query(sqlLimpeza, (err,result) => {
                    let valor = new Array();
                    let ids = new Array();
                    for (let i=0;i<parametros.length;i++) {
                        valor.push(parametros[i].inicial);
                        ids.push(parametros[i].parametroRegraId);
                    }
                    posicao = 0;
                    trataItem(valor,parametros,ids, idExperimento, 0, experimento.regraSimulacaoId);
                    //console.log(JSON.stringify(listaComb));
                    let sqlQuantidade = "update ExperimentoSimulacao set quantidadeCombinacao = " + listaComb.length + 
                            " where id = " + idExperimento;
                    ds.connector.query(sqlQuantidade, (err,result) => {

                    })
                    salvaCombinacao(listaComb,1, listaComb.length);
                    var saida = {'quantidade' : listaComb.length};
                    callback(null, saida);
                })
            })
        })
        
    };



  
    function trataItem(valor,parametros,ids,idExperimento, ind, idRegra) {
        while (valor[ind] <= parametros[ind].final) {
            if ((ind+1)<valor.length) {
                trataItem(valor,parametros,ids, idExperimento, ind + 1, idRegra)
            } else {
                posicao++;
                //console.log(posicao, ' - ' , valor, ' ' , ids);
                //salvaCombinacao(idExperimento, posicao, ids, valor);
                let combinacao = {'posicaoCombinacao' : posicao, 'experimentoSimulacaoId' : idExperimento, 'valorParametros' : [], 'regraSimulacaoId' : idRegra};
                for (let i=0; i<ids.length; i++) {
                    let valorParametro = {'parametroRegraId' : ids[i], 'valorParametro' : valor[i] , 'experimentoSimulacaoId' : idExperimento}
                    combinacao.valorParametros.push(valorParametro);
                }
                listaComb.push(combinacao);
            }
            valor[ind]+= parametros[ind].passo;
            
        }
        valor[ind] = parametros[ind].inicial;
    }

    function salvaCombinacao2(listaComb) {
        listaComb.forEach(combinacao => {
            app.models.CombinacaoParametro.create(combinacao , (err,result) => {
                combinacao.valorParametros.forEach(valor => {
                    valor['combinacaoParametroId'] = result.id;
                    app.models.ValorParametro.create(valor, (err,result) => {

                    })
                })
            })
        })
    }
    function salvaCombinacao(listaComb, inicioBloco, finalBloco) {
        //console.log('Entrou em salva Combinacao');
        let conta = 0;
        for (let i=(inicioBloco-1);i<listaComb.length && i<finalBloco;i++) {
            app.models.CombinacaoParametro.create(listaComb[i] , (err,result) => {
                for (let x=0;x<listaComb[i].valorParametros.length;x++) {
                    setTimeout( function () {
                        let valor = listaComb[i].valorParametros[x];
                        valor['combinacaoParametroId'] = result.id;
                        conta = 0;
                        app.models.ValorParametro.create(valor, (err,result) => {
                            conta++;
                            //console.log(conta);
                    })
                    }, 5000);
                };
            })
        }
    }


    function salvaCombinacaoUnica(combinacao) {
        app.models.CombinacaoParametro.create(combinacao , (err,result) => {
            for (let x=0;x<combinacao.valorParametros.length;x++) {
                let valor = combinacao.valorParametros[x];
                valor['combinacaoParametroId'] = result.id;
                //conta = 0;
                app.models.ValorParametro.create(valor, (err,result) => {
                    //conta++;
                    //if (conta==listaComb[i].valorParametros.length) {
                    //    listaComb[i]=null;
                    //}
                })
            };
        })
    }

        /*
        for (let i=0;i<combinacao.length;i++) {
        app.models.CombinacaoParametro.create(combinacao, (err,result) => {
            if (result.id) {
                for (let i=0; i<ids.length; i++) {
                    app.models.ValorParametro.create(valorParametro, (err,result) => {
                        //console.log('inseriu: ' , result );
                    })
                }
            }
        })
        */
    



    Experimentosimulacao.observe('after save', function updateTimestamp(ctx, next) {

        let ds = Experimentosimulacao.dataSource;
        let sqlCria = '';
        let sqlLimpa = '';
        let sqlConsulta = '';

        if (ctx.instance) {
        //    ctx.instance.dataHora = new Date();
            //console.log('ctx.instance: ' , JSON.stringify(ctx.instance))
            sqlLimpa = " delete from ExperimentoParametro where experimentoSimulacaoId = " + ctx.instance.id
            sqlCria =   "insert into ExperimentoParametro (parametroRegraId, experimentoSimulacaoId) " +
                            "select id, " + ctx.instance.id + " from ParametroRegra where regraSimulacaoId = " + ctx.instance.regraSimulacaoId;
            sqlConsulta = " select * from ExperimentoParametro where experimentoSimulacaoId = " + ctx.instance.id;
            //console.log('instancia');
            
        } else {
        //    ctx.data.dataHora = new Date();
            sqlLimpa = " delete from ExperimentoParametro where experimentoSimulacaoId = " + ctx.data.id
            sqlCria =   "insert into ExperimentoParametro (parametroRegraId, experimentoSimulacaoId) " +
                        "select id, " + ctx.data.id + " from ParametroRegra where regraSimulacaoId = " + ctx.data.regraSimulacaoId;
            sqlConsulta = " select * from ExperimentoParametro where experimentoSimulacaoId = " +  ctx.data.id;
            //console.log('nao instancia');
        }
        //console.log('limpa:' , sqlLimpa);
        //console.log('cria:' , sqlCria);
        ds.connector.query(sqlConsulta, (err,result) => {
            //console.log('sql', sqlConsulta);
            //console.log('result' , result);
            //console.log('tamanho' , result.length);
            if (result.length==0) {
                ds.connector.query(sqlLimpa, (err,result) => {
                    ds.connector.query(sqlCria, (err,result) => {
                        next();
                    })
                });
            } else {
                next();
            }
        })
        
    });




    /**
    * 
    * @param {number} idExperimento 
    * @param {Function(Error, object)} callback
    */

    Experimentosimulacao.CarregaParaSimulacao = function(idExperimento, callback) {
        let filtro = { 
            'where' : {'id' : idExperimento},
            'include' : [
                { 'relation' : 'regraSimulacao' , 'scope' : {'include' : 'parametroRegras'} },
                { 'relation' : 'experimentoSimulacaoPeriodos' , 
                                'scope' : {
                                        'include':'periodoExperimento',
                                        'where' : {'concluido' : 0 }
 
                                }
                }
            ]
            
        }
        Experimentosimulacao.findOne(filtro, callback);
    };

    /**
    * 
    * @param {Function(Error, object)} callback
    */
    Experimentosimulacao.ObtemParaSimulacao = function(callback) {
        let filtro = { 
            'where' : {'emExecucao' : 1},
            'include' : [
                { 'relation' : 'periodoExperimento'},
                { 'relation' : 'regraSimulacao' , 'scope' : {'include' : 'parametroRegras'} },
                { 'relation' : 'experimentoSimulacaoPeriodos' , 
                            'scope' : {
                                    'include':'periodoExperimento',
                                    'where' : {'concluido' : 0 }

                            }
            }
        ]

        }
        Experimentosimulacao.findOne(filtro, callback);
    };

     /**
    * 
    * @param {Function(Error, object)} callback
    */
      Experimentosimulacao.ObtemParaValidacao = function(callback) {
        let filtro = { 
            'where' : {'emValidacao' : 1},
            'include' : [
                { 'relation' : 'periodoExperimento'},
                { 'relation' : 'regraSimulacao' , 'scope' : {'include' : 'parametroRegras'} },
                { 'relation' : 'experimentoSimulacaoPeriodos' , 
                            'scope' : {
                                    'include':'periodoExperimento',
                                    'where' : {'concluido' : 0 }

                            }
            }
        ]

        }
        Experimentosimulacao.findOne(filtro, callback);
    };


    /**
    * 
    * @param {number} id 
    * @param {Function(Error, object, array, number)} callback
    */

    Experimentosimulacao.ObtemExecucao = function (idExperimento, callback) {
        //console.log('idExperimento:' , idExperimento);
        var experimento, melhoresExecucao, combinacaoProcessada, execucaoCriada;
        let filtroExperimento = {
            'where' : {'id' : idExperimento},
            'include' : [ 'grupoAcao' , 'periodoExperimento' ]
        }
        Experimentosimulacao.findOne(filtroExperimento, (err,result) => {
            experimento = result;
            let filtro = {
                'order' : ['resultado desc' , 'ticker asc' , 'primeiraEntrada asc'],
                'limit' : 200,
                'include' : [
                    {'relation' : 'combinacaoParametro' , 'scope' : {'include' : 'regraSimulacao'}},
                    {'relation' : 'trades' }
                ],
                'where' : { 'and' : [{'experimentoSimulacaoId' : idExperimento},{'periodoExperimentoId' : experimento.periodoExperimentoId}] }
            }
            console.log('filtro:' , JSON.stringify(filtro));
            app.models.ExecucaoSimulacao.find(filtro, (err,result) => {
                console.log('tamanho:' , result.length);
                console.log('Erro:' , err);
                melhoresExecucao = result;
                let sql = "select count(distinct combinacaoParametroId) as qtde from ExecucaoSimulacao " +
                    " where experimentoSimulacaoId = " + idExperimento + 
                    " and periodoExperimentoId = " + experimento.periodoExperimentoId;
                let ds = Experimentosimulacao.dataSource;
                ds.connector.query(sql, (err,result) => {
                    combinacaoProcessada = result[0].qtde;
                    let sql2 = "select count(*) as qtdeExec from ExecucaoSimulacao " +
                    " inner join CombinacaoParametro on CombinacaoParametro.id = ExecucaoSimulacao.combinacaoParametroId " +
                    " where ExecucaoSimulacao.experimentoSimulacaoId = " + idExperimento + 
                    " and ExecucaoSimulacao.periodoExperimentoId = " + experimento.periodoExperimentoId +
                    " and descricao is not null ";
                    ds.connector.query(sql2, (err,result2) => {
                        execucaoCriada = result2[0].qtdeExec;
                        callback(null, experimento, melhoresExecucao, combinacaoProcessada, execucaoCriada);
                    })
                })
            })

        })
    };
  
    /**
    * 
    * @param {Function(Error)} callback
    */
    Experimentosimulacao.ProcessaPermiteEdicaoExperimento = function(callback) {
        let sql1 = "update ExperimentoSimulacao " +
                " set permiteEdicao = " +
                " (select count(*) from ExecucaoSimulacao where experimentoSimulacaoId = ExperimentoSimulacao.id)";
        let sql2 = "update ExperimentoSimulacao " +
                " set permiteEdicao = 1 " +
                " where permiteEdicao = 0";
        let sql3 = "update ExperimentoSimulacao " +
                " set permiteEdicao = 0 " +
                " where permiteEdicao > 1";
        let ds = Experimentosimulacao.dataSource;
        ds.connector.query(sql1, (err,result) => {
            ds.connector.query(sql2, (err,result) => {
                ds.connector.query(sql3, callback);
            });
        })
    };



    /**
    * 
    * @param {number} idExperimento 
    * @param {Function(Error, object)} callback
    */
    Experimentosimulacao.ValidarFechar = function(idExperimento, callback) {
        console.log('idExperimento', idExperimento);
        let experimento;
        let ds = Experimentosimulacao.dataSource;
        Experimentosimulacao.findById(idExperimento, (err,result) => {
            experimento = result;
            let sqlCombinacao = "select count(1) as qtde from CombinacaoParametro where experimentoSimulacaoId = " + idExperimento;
            
            ds.connector.query(sqlCombinacao, (err,result2) => {
                console.log('experimento.quantidadeCombinacao:' , experimento.quantidadeCombinacao);
                console.log('result2.qtde:' , result2[0].qtde);
                if (experimento.quantidadeCombinacao==result2[0].qtde) {
                    let sqlParametro = "select count(1) as qtdeParam from ValorParametro where experimentoSimulacaoId = " + idExperimento;
                    ds.connector.query(sqlParametro, (err,result3) => {
                        console.log('result3.qtdeParam' , result3[0].qtdeParam);
                        let sqlParamSimples = " select count(1) as qtdeParamSimples from ParametroRegra " +
                                " inner join RegraSimulacao on RegraSimulacao.Id = ParametroRegra.regraSimulacaoId " +
                                " inner join ExperimentoSimulacao on ExperimentoSimulacao.regraSimulacaoId = RegraSimulacao.id " +
                                " where ExperimentoSimulacao.id = " + idExperimento;
                        ds.connector.query(sqlParamSimples, (err,result4) => {
                            let totalEsperado = result2[0].qtde * result4[0].qtdeParamSimples;
                            console.log('totalEsperado:' , totalEsperado);
                            if (totalEsperado==result3[0].qtdeParam) {
                                console.log('iguais2')
                                let sqlEdicao = "update ExperimentoSimulacao set permiteEdicao = 0 where id = " + idExperimento;
                                console.log('sqlEdicao', sqlEdicao);
                                ds.connector.query(sqlEdicao,callback);
                            } else {
                                callback({'mensagem' : 'Parametros insuficientes'},null);
                            }
                        })
                    })

                }
            })
        })
    };



   
  
   
  
};
