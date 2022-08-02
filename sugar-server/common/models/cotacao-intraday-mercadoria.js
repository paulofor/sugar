'use strict';

module.exports = function (Cotacaointradaymercadoria) {

    /**
   * 
   * @param {number} valor 
   * @param {string} horario 
   * @param {Function(Error, object)} callback
   */

    Cotacaointradaymercadoria.InsereValorHorarioMercadoria = function (ticker, valor, horario, callback) {
        let sql = "insert into CotacaoIntradayMercadoria (ticker,dataHora,valor,dataHoraNegStr, dia, posicaoDia, intervalo) " +
            "values ('" + ticker + "' , now(), " + valor + ", '" + horario + "' , now(), 0, 0 )"
        let ds = Cotacaointradaymercadoria.dataSource;
        ds.connector.query(sql, callback);
    };
};
