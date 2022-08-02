'use strict';

module.exports = function (Fundoimobiliario) {






    /**
    * 
    * @param {Function(Error, object)} callback
    */
    Fundoimobiliario.AtualizaDiarioFII = function(callback) {
        let sqlMaximo1 = " update FundoImobiliario " +
                    " set maximo1 = ( " +
                    " select max(maximo) from CotacaoDiarioAcao " +
                    " where ticker = FundoImobiliario.ticker " +
                    " and data >= (select DATE_SUB(now(), INTERVAL 1 month)) " +
                    ") ";   
        let sqlMinimo1 = " update FundoImobiliario " +
                    " set minimo1 = ( " +
                    " select min(minimo) from CotacaoDiarioAcao " +
                    " where ticker = FundoImobiliario.ticker " +
                    " and data >= (select DATE_SUB(now(), INTERVAL 1 month)) " +
                    ") "; 
        let sqlMaximo3 = " update FundoImobiliario " +
                    " set maximo3 = ( " +
                    " select max(maximo) from CotacaoDiarioAcao " +
                    " where ticker = FundoImobiliario.ticker " +
                    " and data >= (select DATE_SUB(now(), INTERVAL 3 month)) " +
                    ") ";   
        let sqlMinimo3 = " update FundoImobiliario " +
                    " set minimo3 = ( " +
                    " select min(minimo) from CotacaoDiarioAcao " +
                    " where ticker = FundoImobiliario.ticker " +
                    " and data >= (select DATE_SUB(now(), INTERVAL 3 month)) " +
                    ") "; 
        let sqlAluguel3 = " update FundoImobiliario " +
                    " set totalAluguel3 = ( " +
                    " select sum(valor) from AluguelFundoImobiliario " +
                    " where ticker = FundoImobiliario.ticker " +
                    " and dataPagamento >= (select DATE_SUB(now(), INTERVAL 3 month)) " +
                    ") "; 
        let sqlAluguel6 = " update FundoImobiliario " +
                    " set totalAluguel6 = ( " +
                    " select sum(valor) from AluguelFundoImobiliario " +
                    " where ticker = FundoImobiliario.ticker " +
                    " and dataPagamento >= (select DATE_SUB(now(), INTERVAL 6 month)) " +
                    ") "; 
        let sqlPercMedia3 = " update FundoImobiliario " +
                    " set mediaPercentualAluguel3 = ( " +
                    " select avg(percentual) from AluguelFundoImobiliario " +
                    " where ticker = FundoImobiliario.ticker " +
                    " and dataPagamento >= (select DATE_SUB(now(), INTERVAL 3 month)) " +
                    ") "; 
        let sqlPercMedia6 = " update FundoImobiliario " +
                    " set mediaPercentualAluguel6 = ( " +
                    " select avg(percentual) from AluguelFundoImobiliario " +
                    " where ticker = FundoImobiliario.ticker " +
                    " and dataPagamento >= (select DATE_SUB(now(), INTERVAL 6 month)) " +
                    ") "; 
        var ds = Fundoimobiliario.dataSource;
        ds.connector.query(sqlMaximo1, (err,result) => {
           ds.connector.query(sqlMinimo1, (err,result) => {
               ds.connector.query(sqlMaximo3, (err,reult) => {
                   ds.connector.query(sqlMinimo3,(err,reult) => {
                        ds.connector.query(sqlAluguel3,(err,result) => {
                            ds.connector.query(sqlAluguel6, (err,result) => {
                                ds.connector.query(sqlPercMedia3, (err,result) => {
                                    ds.connector.query(sqlPercMedia6,callback)
                                })
                            })
                        })
                   })
               })
           })
        })
        
    };
  


    /**
    * 
    * @param {Function(Error, array)} callback
    */
    Fundoimobiliario.ListaAluguel = function(callback) {
        Fundoimobiliario.find(callback);
    };
  


    /**
    * 
    * @param {Function(Error, array)} callback
    */
    Fundoimobiliario.Melhores6M = function(quantidade, callback) {
        let sql = " SELECT * FROM FundoImobiliario " +
                " where mediaNegocio1 >= 250 " +
                //" and percentual12 > 0 " +
                " order by percentual6 desc " +
                " limit " + quantidade;
                var ds = Fundoimobiliario.dataSource;
        ds.connector.query(sql, callback)
    };


    /**
    * 
    * @param {number} quantidade 
    * @param {Function(Error, array)} callback
    */
    Fundoimobiliario.MelhoresAluguel = function(quantidade, callback) {
        let sql = " SELECT * FROM FundoImobiliario " +
        " order by mediaPercentualAluguel6 desc " +
        " limit " + quantidade;
        var ds = Fundoimobiliario.dataSource;
        ds.connector.query(sql, callback)
    };
  

    /**
     * 
     * @param {object} fundo 
     * @param {Function(Error, object)} callback
     */

    Fundoimobiliario.InsereSeNaoExiste = function (fundo, callback) {
        fundo.dataInsercao = new Date();
        Fundoimobiliario.upsert(fundo, (err,result) => {
            callback(err,result);
        })
    };

    /**
    * 
    * @param {Function(Error, object)} callback
    */
     Fundoimobiliario.AtualizaMetricaFundoImobiliario = function(callback) {
        let sqlMediaNegocio1 = " update FundoImobiliario " +
            " set mediaNegocio1 = ( " +
            " select avg(negocios) from CotacaoDiarioAcao " +
            " where ticker = FundoImobiliario.ticker " +
            " and data >= (select DATE_SUB(now(), INTERVAL 1 month)) " +
            ") ";
        let sqlMediaNegocio3 = " update FundoImobiliario " +
            " set mediaNegocio3 = ( " +
            " select avg(negocios) from CotacaoDiarioAcao " +
            " where ticker = FundoImobiliario.ticker " +
            " and data >= (select DATE_SUB(now(), INTERVAL 3 month)) " +
            ") ";
        let sqlMediaNegocio4 = " update FundoImobiliario " +
            " set mediaNegocio4 = ( " +
            " select avg(negocios) from CotacaoDiarioAcao " +
            " where ticker = FundoImobiliario.ticker " +
            " and data >= (select DATE_SUB(now(), INTERVAL 4 month)) " +
            ") ";
        let sqlPrecoAtual = "update FundoImobiliario " +
            " set precoAtual = ( " +
            " select fechamento from CotacaoDiarioAcao " +
            " where CotacaoDiarioAcao.ticker = FundoImobiliario.ticker " + 
            " order by data desc " +
            " limit 1)";
        let sqlPreco6 = "update FundoImobiliario " +
            " set preco6 = ( " +
            " select fechamento from CotacaoDiarioAcao " + 
            " where CotacaoDiarioAcao.ticker = FundoImobiliario.ticker " + 
            " and data <= (select DATE_SUB(now(), INTERVAL 6 month)) " +
            " order by data desc " +
            " limit 1)";
        let sqlPreco12 = "update FundoImobiliario " +
            " set preco12 = ( " +
            " select fechamento from CotacaoDiarioAcao " + 
            " where CotacaoDiarioAcao.ticker = FundoImobiliario.ticker " + 
            " and data <= (select DATE_SUB(now(), INTERVAL 12 month)) " +
            " order by data desc " +
            " limit 1)";
        let sqlPercentual = "update FundoImobiliario " +
            " set percentual6 = ((precoAtual - preco6) / preco6) * 100, " +
            " percentual12 = ((precoAtual - preco12) / preco12) * 100"
        
        var ds = Fundoimobiliario.dataSource;
        ds.connector.query(sqlMediaNegocio1, (err1, result1) => {
        })
        ds.connector.query(sqlMediaNegocio3, (err1, result1) => {
        })
        ds.connector.query(sqlMediaNegocio4, (err1, result1) => {
        })
        ds.connector.query(sqlPrecoAtual, (err,result) => {
            ds.connector.query(sqlPreco6, (err,result) => {
                ds.connector.query(sqlPreco12, (err,result) => {
                    ds.connector.query(sqlPercentual, callback)
                })
            })
        })
        
    };
  


};
