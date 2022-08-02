'use strict';

var app = require('../../server/server');

module.exports = function(Valormonitoria) {



    /**
    * 
    * @param {number} idExecucao 
    * @param {Function(Error, object)} callback
    */
    Valormonitoria.TrataSituacao = function(idExecucao, callback) {
        var resultado;
        app.models.ExecucaoSimulacao.findById(idExecucao, (err,execucao) => {
            Valormonitoria.ObtemComCotacao(idExecucao, (err,result) => {
                //console.log('Erro1:' + err);
                //console.log('result1:' , result[0].id);
                //console.log('result2:' , JSON.stringify(result[0]));
                let lista = result;
                let comprado = 0;
                let vendido = 0;
                let target = 0;
                let stop = 0;
                let valorEntrada = 0;
                let contaDia = 0;
                let contaTrade = 0;
                let contaTradeLucro = 0;
                let contaTradePrejuizo = 0;
                if (execucao.tipo=='C') {
                    //  ** Compra ** 
                    for (let i=0;i<lista.length;i++) {
                        lista[i].situacao = 'fora';
                        if (comprado==0) {
                            contaDia = 0;
                            if (lista[i].valorEntrada >= lista[i].minimo && lista[i].valorEntrada <= lista[i].maximo) {
                                lista[i].situacao = 'entrada em ' + lista[i].valorEntrada;
                                comprado = 1;
                                contaTrade++;
                                target = lista[i].valorEntrada * (1+execucao.target);
                                stop = lista[i].valorEntrada * (1-execucao.stop);
                                valorEntrada = lista[i].valorEntrada;
                                
                            }
                            if (lista[i].valorEntrada >= lista[i].minimo && lista[i].valorEntrada >= lista[i].maximo) {
                                lista[i].situacao = 'entrada em ' + lista[i].abertura;
                                comprado = 1;
                                contaTrade++;
                                target = lista[i].abertura * (1+execucao.target);
                                stop = lista[i].abertura * (1-execucao.stop);
                                valorEntrada = lista[i].abertura;
                                
                            }
                            
                        } else {
                            contaDia++;
                            lista[i].situacao = lista[i-1].situacao;
                            if (target <= lista[i].maximo ) {
                                lista[i].situacao = 'saída target';
                                comprado = 0;
                                target = 0;
                                stop = 0;
                                contaTradeLucro++;
                            }
                            if (stop >= lista[i].minimo) {
                                lista[i].situacao = 'saida stop';
                                comprado = 0;
                                target = 0;
                                stop = 0;
                                contaTradePrejuizo++;
                            }
                        }
                        lista[i].posicao = comprado;
                        lista[i].valorTarget = target;
                        lista[i].valorStop = stop;
                        lista[i].pontoEntrada = valorEntrada;
                        lista[i].quantidadeDiaTrade = contaDia;
                        lista[i].contaTrade = contaTrade;
                        lista[i].contaTradeLucro = contaTradeLucro;
                        lista[i].contaTradePrejuizo = contaTradePrejuizo;
                        atualizaValorMonitoria(lista[i]);
                    };
                }
                if (execucao.tipo=='V') {
                    /** VENDA  */
                    for (let i=0;i<lista.length;i++) {
                        lista[i].situacao = 'fora';
                        if (vendido==0) {
                            contaDia = 0;
                            if (lista[i].valorEntrada >= lista[i].minimo && lista[i].valorEntrada <= lista[i].maximo) {
                                lista[i].situacao = 'entrada em ' + lista[i].valorEntrada;
                                vendido = -1;
                                contaTrade++;
                                target = lista[i].valorEntrada * (1-execucao.target);
                                stop = lista[i].valorEntrada * (1+execucao.stop);
                                valorEntrada = lista[i].valorEntrada;
                                
                            }
                            if (lista[i].valorEntrada <= lista[i].minimo && lista[i].valorEntrada <= lista[i].maximo) {
                                lista[i].situacao = 'entrada em ' + lista[i].abertura;
                                vendido = -1;
                                contaTrade++;
                                target = lista[i].abertura * (1-execucao.target);
                                stop = lista[i].abertura * (1+execucao.stop);
                                valorEntrada = lista[i].abertura;
                                
                            }
                            
                        } else {
                            contaDia++;
                            lista[i].situacao = lista[i-1].situacao;
                            if (target >= lista[i].minimo ) {
                                lista[i].situacao = 'saída target';
                                vendido = 0;
                                target = 0;
                                stop = 0;
                                contaTradeLucro++;
                            }
                            if (stop <= lista[i].maximo) {
                                lista[i].situacao = 'saida stop';
                                vendido = 0;
                                target = 0;
                                stop = 0;
                                contaTradePrejuizo++;
                            }
                        }
                        lista[i].posicao = vendido;
                        lista[i].valorTarget = target;
                        lista[i].valorStop = stop;
                        lista[i].pontoEntrada = valorEntrada;
                        lista[i].quantidadeDiaTrade = contaDia;
                        lista[i].contaTrade = contaTrade;
                        lista[i].contaTradeLucro = contaTradeLucro;
                        lista[i].contaTradePrejuizo = contaTradePrejuizo;
                        atualizaValorMonitoria(lista[i]);
                    };
                }
                callback(null, lista);
            })
        })
    };

  

    function atualizaValorMonitoria(valorMonitoria) {
        let sql = " update ValorMonitoria set situacao = '" + valorMonitoria.situacao + "', " +
            " valorTarget = " + valorMonitoria.valorTarget + " , " +
            " valorStop = " + valorMonitoria.valorStop + ", " +
            " posicao = " + valorMonitoria.posicao + ", " +
            " pontoEntrada = " + valorMonitoria.pontoEntrada + ", " +
            " quantidadeDiaTrade = " + valorMonitoria.quantidadeDiaTrade + ", " +
            " contaTrade = " + valorMonitoria.contaTrade + ", " +
            " contaTradeLucro = " + valorMonitoria.contaTradeLucro + ", " +
            " contaTradePrejuizo = " + valorMonitoria.contaTradePrejuizo + " " +
            " where id = " + valorMonitoria.id;
        let ds = Valormonitoria.dataSource;
        ds.connector.query(sql, (err, resultado) => {
            //console.log('sql:' , sql);
            //console.log('Erro: ' , err);
        })
    }
  



    /**
    * 
    * @param {number} idExecucao 
    * @param {Function(Error, array)} callback
    */
    Valormonitoria.ObtemComCotacao = function(idExecucao, callback) {
       let ds = Valormonitoria.dataSource;
       let sql = "select ValorMonitoria.* , CotacaoDiarioAcao.abertura, CotacaoDiarioAcao.maximo " +
            " , CotacaoDiarioAcao.minimo, CotacaoDiarioAcao.fechamento " +
            " from ValorMonitoria " +
            " inner join CotacaoDiarioAcao on CotacaoDiarioAcao.ticker = ValorMonitoria.ticker and " +
            " CotacaoDiarioAcao.diaNum = ValorMonitoria.diaNumEntrada " +
            " where execucaoSimulacaoId = " + idExecucao +
            " order by diaNumEntrada asc";
        ds.connector.query(sql, callback);
    };
  

    /**
     * 
     * @param {object} execucao 
     * @param {number} diaNum 
     * @param {number} preco 
     * @param {Function(Error, object)} callback
     */

    Valormonitoria.InsereMonitoria = function(execucao, diaNum, preco, callback) {
        //console.log(" ****** ");
        let sql = "update ExecucaoSimulacao set precoEntrada = " + preco +
            ", dataNumEntrada = " + diaNum + " where id = " + execucao.id;
        //console.log(sql);
        //console.log(execucao);
        let ds = Valormonitoria.dataSource;
        ds.connector.query(sql, (err, result) => {
            //console.log('Err: ' , err);
            //console.log('Result: ' , result);
            let novo = {
                'ticker' : execucao.ticker, 
                'valorEntrada' : preco,
                'execucaoSimulacaoId' : execucao.id,
                'diaNumEntrada' : diaNum,
                'situacao' : '' 
             }
             Valormonitoria.create(novo, (err,result) => {
                Valormonitoria.TrataSituacao(execucao.id, (err,result) => {

                });
                callback(err,result);
             });
        })
        
    };

};
