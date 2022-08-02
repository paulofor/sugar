'use strict';

module.exports = function (Cotacaointradayopcao) {

   /**
   * 
   * @param {number} valor 
   * @param {string} horario 
   * @param {Function(Error, object)} callback
   */

    Cotacaointradayopcao.InsereValorHorarioOpcao = function (ticker, valor, horario, callback) {
        let sql = "insert into CotacaoIntradayOpcao (ticker,dataHora,valor,dataHoraNegStr, dia, posicaoDia, intervalo) " +
        "values ('" + ticker + "' , now(), " + valor + ", '" + horario + "' , now(), 0, 0 )"
        let ds = Cotacaointradayopcao.dataSource;
        ds.connector.query(sql, callback);
    };
};
