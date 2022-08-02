'use strict';

module.exports = function (Ordemcompra) {


    /**
    * Limpa todas a ordens do dia.
    * @param {Function(Error, object)} callback
    */
    Ordemcompra.LimpaGeral = function (callback) {
        let sql = "delete from OrdemCompra";
        let ds = Ordemcompra.dataSource;
        ds.connector.query(sql,callback);
    };
    /**
    * 
    * @param {Function(Error, number)} callback
    */
    Ordemcompra.TotalExposicaoGeral = function (callback) {
        let sql = "select (valor1+valor2) as valor from " +
                " ( " +
                " select ifnull(sum(valorExposicao),0) as valor1 from OrdemCompra " +
                " where aberta = 1 " +
                " ) as tab1 , " +
                " ( " +
                " select ifnull(sum(valorExposicao),0) as valor2 from TradeReal " +
                " where posicaoAtual = 1 " +
                " ) as tab2";
        let ds = Ordemcompra.dataSource;
        ds.connector.query(sql,(err,result) => {
            callback(err,result[0]);
        });
    };

    /**
    * 
    * @param {Function(Error, number)} callback
    */
    Ordemcompra.TotalLucroAlvoGeral = function (callback) {
        let sql = "select (valor1+valor2) as valor from " +
                " ( " +
                " select ifnull(sum(lucroAlvo),0) as valor1 from OrdemCompra " +
                " where aberta = 1 " +
                " ) as tab1 , " +
                " ( " +
                " select ifnull(sum(lucroAlvo),0) as valor2 from TradeReal " +
                " where posicaoAtual = 1 " +
                " ) as tab2";
        let ds = Ordemcompra.dataSource;
        ds.connector.query(sql,(err,result) => {
            callback(err,result[0]);
        });
    };


   /**
   * 
   * @param {Function(Error, number, number)} callback
   */
    Ordemcompra.TotalExposicaoLucroGeral = function (callback) {
        var valorExposicao, valorLucro;
        Ordemcompra.TotalLucroAlvoGeral((err,result) => {
            valorLucro = result.valor;
            Ordemcompra.TotalExposicaoGeral((err,result2) => {
                valorExposicao = result2.valor;
                callback(null, valorExposicao, valorLucro);
            })
        })
    };

};
