'use strict';

module.exports = function (Cotacaointradayacao) {


    /**
    * 
    * @param {string} ticker 
    * @param {number} diaNum 
    * @param {string} hora 
    * @param {Function(Error, object)} callback
    */
     Cotacaointradayacao.ObtemCotacaoAnterior = function(ticker, diaNum, dataHora, callback) {
         let filtro = {
             'limit' : 2,
             'order' : ['diaNum desc' ,'dataHora desc'],
             'where' : {
                 'and' : [
                    {'ticker' : ticker},
                    {'diaNum' : diaNum },
                    {'hora' : dataHora }
                 ]
                 
             }
        }
        Cotacaointradayacao.find(filtro, (err,result) => {
            callback(err,result[1])
        })
    };
  


    /**
    * 
    * @param {string} ticker 
    * @param {number} quantidade 
    * @param {Function(Error, array)} callback
    */
    Cotacaointradayacao.AtualPorTicker = function(ticker, quantidade, callback) {
        let ds = Cotacaointradayacao.dataSource;
        let sql = "select CotacaoIntradayAcao.* from CotacaoIntradayAcao "  +
                " where ticker = '" + ticker + "' " +
                " order by dataHora desc " +
                " limit " + quantidade;
        ds.connector.query(sql,callback);
    };


    /**
    * 
    * @param {Function(Error, array)} callback
    */

    Cotacaointradayacao.ListaMaisRecente = function(callback) {
        let ds = Cotacaointradayacao.dataSource;
        let sql = "select CotacaoIntradayAcao.* from CotacaoIntradayAcao "  +
                " order by dataHora desc " +
                " limit 10";
        ds.connector.query(sql,callback);
    };
  

    /**
    * 
    * @param {number} valor 
    * @param {string} horario 
    * @param {Function(Error, object)} callback
    */

    Cotacaointradayacao.InsereValorHorarioAcao = function (ticker, valor, horario, callback) {
        let sql = "insert into CotacaoIntradayAcao (ticker,dataHora,valor,dataHoraNegStr, dia, posicaoDia, intervalo, diaNum) " +
        "values ('" + ticker + "' , now(), " + valor + ", '" + horario + "' , now(), 0, 0 , date_format(now(),'%Y%m%d'))"
        let ds = Cotacaointradayacao.dataSource;
        ds.connector.query(sql, callback);
    };


    /**
    * 
    * @param {string} dia 
    * @param {string} ticker 
    * @param {Function(Error, array)} callback
    */
    Cotacaointradayacao.ObtemPorDiaTicker = function(dia, ticker, callback) {
        var cotacao;

        let ds = Cotacaointradayacao.dataSource;

        var sql1 = " select date(dia) as data from CotacaoIntradayAcao " +
            " where ticker = '" + ticker + "' " +
            " group by dia " +
            " order by dia desc " +
            " limit " + dia;

        ds.connector.query(sql1, (err,result) => {
            let x = 0;
            cotacao = result;
            for (let i=0; i < result.length; i++) {
                //console.log('linha:' , JSON.stringify(result[i]));
                var sql2 = " select valor, dataHora, dataHoraNegStr from CotacaoIntradayAcao where ticker = '" + ticker + "' and " +
                    " dia = '" + formatDate(result[i].data) + "' ";
                //console.log('sql2: ', sql2);
                ds.connector.query(sql2, (err, result2) => {
                    cotacao[i]['cotacao'] = result2;
                    //console.log('cotacao' , JSON.stringify(cotacao));
                    x++;
                    if (x==result.length) {
                        callback(null,cotacao);
                    }
                })
            }
        })
        
    };

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }


    Cotacaointradayacao.CotacaoMaisRecente = function(callback) {
        let ds = Cotacaointradayacao.dataSource;
        let sql = " (select dataHora, 'Acao' as ativo ,  TIMESTAMPDIFF(MINUTE, dataHora, now()) as tempo from CotacaoIntradayAcao " +
                " where dataHora = (select max(dataHora) from CotacaoIntradayAcao) " +
                " limit 1) " +
                " union all " +
                " (select dataHora, 'Foxbit' as ativo  , TIMESTAMPDIFF(MINUTE, dataHora, now()) as tempo from CotacaoIntradayFoxbit " +
                " where dataHora = (select max(dataHora) from CotacaoIntradayFoxbit) " +
                " limit 1) " +
                " union all " +
                " (select dataHora, 'MercadoBitcoin' as ativo ,  TIMESTAMPDIFF(MINUTE, dataHora, now()) as tempo from CotacaoIntradayMercadoBitcoin  " +
                " where dataHora = (select max(dataHora) from CotacaoIntradayMercadoBitcoin) " +
                " limit 1) " +
                " union all " +
                " (select dataHora, 'Indice' as ativo  ,  TIMESTAMPDIFF(MINUTE, dataHora, now()) as tempo from CotacaoIntradayIndice " +
                " where dataHora = (select max(dataHora) from CotacaoIntradayIndice) " +
                " limit 1) " +
                " union all " +
                " (select dataHora, 'Imobiliario' as ativo  ,  TIMESTAMPDIFF(MINUTE, dataHora, now()) as tempo from CotacaoIntradayImobiliario " +
                " where dataHora = (select max(dataHora) from CotacaoIntradayImobiliario) " +
                " limit 1) " +
                " union all " +
                " (select dataHora, 'Mercadoria' as ativo  ,  TIMESTAMPDIFF(MINUTE, dataHora, now()) as tempo from CotacaoIntradayMercadoria " +
                " where dataHora = (select max(dataHora) from CotacaoIntradayMercadoria) " +
                " limit 1)";
        ds.connector.query(sql,callback);
    }

};
