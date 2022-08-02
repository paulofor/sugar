'use strict';

module.exports = function(Cotacaointradaymercadobitcoin) {



    /**
    * 
    * @param {object} item 
    * @param {Function(Error, object)} callback
    */
    Cotacaointradaymercadobitcoin.InsereItem = function(item, callback) {
        //console.log('mb:', item);
        Cotacaointradaymercadobitcoin.create(item,callback);
    };

    Cotacaointradaymercadobitcoin.FechamentosPorDiaNum = function(diaNum, callback) {
        let sql = "select ticker, valor, dataHora " +
                " from CotacaoIntradayMercadoBitcoin C1 " +
                " where diaNum = "  + diaNum + 
                " and dataHora = ( " +
                " select max(dataHora) from CotacaoIntradayMercadoBitcoin as C2 " +
                " where C2.ticker = C1.ticker " +
                " and diaNum = " + diaNum +
                " )";
        let ds = Cotacaointradaymercadobitcoin.dataSource;
        ds.connector.query(sql,callback);
    }
  
};
