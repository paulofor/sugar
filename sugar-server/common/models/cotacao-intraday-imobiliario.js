'use strict';

module.exports = function (Cotacaointradayimobiliario) {


   /**
   * 
   * @param {number} valor 
   * @param {string} horario 
   * @param {Function(Error, object)} callback
   */

    Cotacaointradayimobiliario.InsereValorHorarioImobiliario = function (ticker, valor, horario, callback) {
        let sql = "insert into CotacaoIntradayImobiliario (ticker,dataHora,valor,dataHoraNegStr, dia, posicaoDia, intervalo) " +
            "values ('" + ticker + "' , now(), " + valor + ", '" + horario + "' , now(), 0, 0 )"
        let ds = Cotacaointradayimobiliario.dataSource;
        ds.connector.query(sql, callback);
    };
};
