'use strict';

module.exports = function (Cotacaointradayindice) {

    /**
  * 
  * @param {number} valor 
  * @param {string} horario 
  * @param {Function(Error, object)} callback
  */

  Cotacaointradayindice.InsereValorHorarioIndice = function (ticker, valor, horario, callback) {
        let sql = "insert into CotacaoIntradayIndice (ticker,dataHora,valor,dataHoraNegStr, dia) " +
            "values ('" + ticker + "' , now(), " + valor + ", '" + horario + "' , now())"
        let ds = Cotacaointradayindice.dataSource;
        ds.connector.query(sql, callback);
  };


  Cotacaointradayindice.AtualIndicePorTicker = function(ticker, quantidade, callback) {
    let ds = Cotacaointradayindice.dataSource;
    let sql = "select CotacaoIntradayIndice.* from CotacaoIntradayIndice "  +
            " where ticker = '" + ticker + "' " +
            " order by dataHora desc " +
            " limit " + quantidade;
    ds.connector.query(sql,callback);
};
};
