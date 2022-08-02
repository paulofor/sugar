'use strict';

var app = require('../../server/server');

module.exports = function(Cotacaointradayacaoresultadovalor) {



    /**
    * 
    * @param {number} idRegra 
    * @param {number} diaNum 
    * @param {Function(Error, array)} callback
    */
     Cotacaointradayacaoresultadovalor.ObtemPorRegraData = function(idRegra, diaNum, callback) {
        let sql = "select ticker, resultado, count(*) as qtde " +
                " from CotacaoIntradayAcaoResultadoValor " +
                " where regraProjecaoId = "  + idRegra + " and " +
                " diaNum >= " + diaNum + 
                " group by ticker, resultado " +
                " order by ticker, resultado";
        let ds = Cotacaointradayacaoresultadovalor.dataSource;
        ds.connector.query(sql, callback);
    };


    /**
    *  @param {array} lista 
    * @param {Function(Error, object)} callback
    */
    Cotacaointradayacaoresultadovalor.InsereLista = function(lista, callback) {
        let conta = 0;
        lista.forEach((item) => {
            item.dataHoraInsercao = new Date();
            Cotacaointradayacaoresultadovalor.create(item, (err,result) => {
                //console.log('Err:' , err);
                conta++;
                if (conta==lista.length) {
                    callback(null, { 'result': 'ok' });
                }
            });
           
        });
    };


    /**
 * 
 * @param {string} ticker 
 * @param {number} idRegra 
 * @param {Function(Error, array)} callback
 */

  Cotacaointradayacaoresultadovalor.ObtemListaTickerRegra = function(ticker, idRegra, callback) {
    let filtro = {
        'fields' : { 
            'ticker' : true, 
            'diaNum' : true,
            'hora' : true,
            'resultado' : true,
            'dias' : true,
            'valorSaida' : true,
            'valorEntrada' : true,
            'diaNumSaida' : true,
            'dataHora' : true,
            'valorSuperior' : true,
            'valorInferior' : true
        },
        'where' : { 'and' : [{'ticker' : ticker}, {'regraProjecaoId' : idRegra}]},
        'order' : ['diaNum' , 'hora']
    };
    Cotacaointradayacaoresultadovalor.find(filtro,callback);
  };
  

  Cotacaointradayacaoresultadovalor.ObtemDatasPorGrupo = function(codigoGrupo, callback) {
      let sql = " select ticker, RegraProjecao.codigoRegraProjecao, ultimo from " +
            " (select CotacaoIntradayAcaoResultadoValor.ticker, regraProjecaoId, max(dataHora) as ultimo " +
            " from CotacaoIntradayAcaoResultadoValor " +
            " inner join RelGrupoAcao on RelGrupoAcao.ticker = CotacaoIntradayAcaoResultadoValor.ticker " +
            " inner join GrupoAcao on GrupoAcao.id = RelGrupoAcao.grupoAcaoId " +
            " where GrupoAcao.nome = '" + codigoGrupo + "' " +
            " group by ticker, regraProjecaoId " +
            " order by regraProjecaoId, ticker) as tab " +
            " inner join RegraProjecao on RegraProjecao.id = tab.regraProjecaoId " +
            " order by codigoRegraProjecao, ultimo desc ";
        let ds = Cotacaointradayacaoresultadovalor.dataSource;
        ds.connector.query(sql, callback);
    
  }


    Cotacaointradayacaoresultadovalor.ObtemDatasPorGrupoComAtraso = function (codigoGrupo, callback) {
        let sql = "  ";
        let ds = Cotacaointradayacaoresultadovalor.dataSource;
        ds.connector.query(sql, callback);

    }


    Cotacaointradayacaoresultadovalor.ObtemResultadoRegraData = function (codigoRegra, diaNumInicial, diaNumFinal, callback) {
        let filtro = {'where' : {'codigoRegraProjecao' : codigoRegra}}
        //console.log('codigoRegra:' , codigoRegra);
        app.models.RegraProjecao.findOne(filtro,(err,result) => {
            //console.log('regra:',result);
            let sql = "select year(dataHora) as ano, month(dataHora) as mes,ticker, count(*) as total, " +
                " ( " +
                " select count(*)   " +
                " from CotacaoIntradayAcaoResultadoValor C2 " +
                " where regraProjecaoId = " + result.id +
                " and year(C2.dataHora) = year(C1.dataHora) " + 
                " and month(C2.dataHora) = month(C1.dataHora) " +
                " and C2.ticker = C1.ticker " +
                " and resultado = 1 " +
                " and diaNum >= " + diaNumInicial + " and diaNum <= " + diaNumFinal +
                " ) as lucro, " +
                " ( " +
                " select count(*) " +  
                " from CotacaoIntradayAcaoResultadoValor C2 " +
                " where regraProjecaoId = " + result.id +
                " and year(C2.dataHora) = year(C1.dataHora) " + 
                " and month(C2.dataHora) = month(C1.dataHora) " +
                " and C2.ticker = C1.ticker " +
                " and resultado = 0 " +
                " and diaNum >= " + diaNumInicial + " and diaNum <= " + diaNumFinal +
                " ) as nulo, " +
                " ( " +
                " select count(*) " +  
                " from CotacaoIntradayAcaoResultadoValor C2 " +
                " where regraProjecaoId = " + result.id + 
                " and year(C2.dataHora) = year(C1.dataHora) " + 
                " and month(C2.dataHora) = month(C1.dataHora) " +
                " and C2.ticker = C1.ticker " +
                " and resultado = -1 " +
                " and diaNum >= " + diaNumInicial + " and diaNum <= " + diaNumFinal +
                " ) as prejuizo, " +
                " ( " +
                " select max(valorEntrada) " +  
                " from CotacaoIntradayAcaoResultadoValor C2 " +
                " where regraProjecaoId = " + result.id + 
                " and year(C2.dataHora) = year(C1.dataHora) " + 
                " and month(C2.dataHora) = month(C1.dataHora) " +
                " and C2.ticker = C1.ticker " +
                " and diaNum >= " + diaNumInicial + " and diaNum <= " + diaNumFinal +
                " ) as maximo, " +
                " ( " +
                " select min(valorEntrada) " +  
                " from CotacaoIntradayAcaoResultadoValor C2 " +
                " where regraProjecaoId = " + result.id + 
                " and year(C2.dataHora) = year(C1.dataHora) " + 
                " and month(C2.dataHora) = month(C1.dataHora) " +
                " and C2.ticker = C1.ticker " +
                " and diaNum >= " + diaNumInicial + " and diaNum <= " + diaNumFinal +
                " ) as minimo, " +
                " ( " +
                " select avg(valorEntrada) " +  
                " from CotacaoIntradayAcaoResultadoValor C2 " +
                " where regraProjecaoId = " + result.id + 
                " and year(C2.dataHora) = year(C1.dataHora) " + 
                " and month(C2.dataHora) = month(C1.dataHora) " +
                " and C2.ticker = C1.ticker " +
                " and diaNum >= " + diaNumInicial + " and diaNum <= " + diaNumFinal +
                " ) as medio, " +
                " ( " +
                " select max(valorEntrada) " +  
                " from CotacaoIntradayAcaoResultadoValor C2 " +
                " where regraProjecaoId = " + result.id + 
                " and year(C2.dataHora) = year(C1.dataHora) " + 
                " and month(C2.dataHora) = month(C1.dataHora) " +
                " and C2.ticker = C1.ticker " +
                " and diaNum >= " + diaNumInicial + " and diaNum <= " + diaNumFinal +
                " and resultado = 1 " +
                " ) as maximo_lucro, " +
                " ( " +
                " select min(valorEntrada) " +  
                " from CotacaoIntradayAcaoResultadoValor C2 " +
                " where regraProjecaoId = " + result.id + 
                " and year(C2.dataHora) = year(C1.dataHora) " + 
                " and month(C2.dataHora) = month(C1.dataHora) " +
                " and C2.ticker = C1.ticker " +
                " and diaNum >= " + diaNumInicial + " and diaNum <= " + diaNumFinal +
                " and resultado = 1 " +
                " ) as minimo_lucro, " +
                " ( " +
                " select max(valorEntrada) " +  
                " from CotacaoIntradayAcaoResultadoValor C2 " +
                " where regraProjecaoId = " + result.id + 
                " and year(C2.dataHora) = year(C1.dataHora) " + 
                " and month(C2.dataHora) = month(C1.dataHora) " +
                " and C2.ticker = C1.ticker " +
                " and diaNum >= " + diaNumInicial + " and diaNum <= " + diaNumFinal +
                " and resultado = -1 " +
                " ) as maximo_prejuizo, " +
                " ( " +
                " select min(valorEntrada) " +  
                " from CotacaoIntradayAcaoResultadoValor C2 " +
                " where regraProjecaoId = " + result.id + 
                " and year(C2.dataHora) = year(C1.dataHora) " + 
                " and month(C2.dataHora) = month(C1.dataHora) " +
                " and C2.ticker = C1.ticker " +
                " and diaNum >= " + diaNumInicial + " and diaNum <= " + diaNumFinal +
                " and resultado = -1 " +
                " ) as minimo_prejuizo " +
                " from CotacaoIntradayAcaoResultadoValor C1 " +
                " where regraProjecaoId = " + result.id + 
                " and diaNum >= " + diaNumInicial + " and diaNum <= " + diaNumFinal +
                " group by year(dataHora), month(dataHora),ticker " +
                " order by year(dataHora), month(dataHora),ticker ";
            //console.log(sql);
            let ds = Cotacaointradayacaoresultadovalor.dataSource;
            ds.connector.query(sql,callback);
        })
    }

};
