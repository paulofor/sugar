'use strict';

module.exports = function(Tradereal) {


    let CUSTO_OPERACAO = 11;



    /**
    * 
    * @param {Function(Error, object)} callback
    */
    Tradereal.AtualizaDiaAberto = function(callback) {
        let sql = " update TradeReal " +
            " set  dataNumEntrada = concat(substring(dataEntrada,1,4),substring(dataEntrada,6,2),substring(dataEntrada,9,2)) " +
            " where posicaoAtual = 1";
        let sql2 = " update TradeReal " +
                " set dias = (select count(*) from DiaPregao where diaNum > TradeReal.dataNumEntrada and data <= now() ) " +
                " where posicaoAtual = 1"
        let ds = Tradereal.dataSource;
        ds.connector.query(sql, (err,result) => {
            ds.connector.query(sql2, callback);
        })
    };
  


    /**
    * 
    * @param {number} idTrade 
    * @param {Function(Error, object)} callback
    */
    Tradereal.CalculaSaida = function(idTrade, callback) {
        let sqlCompra = "update TradeReal " +
            " set lucroPrejuizo = custoSaida - custoEntrada , " +
            " percentual = ((precoSaida - precoEntrada) / precoEntrada) * 100, " +
            " custoTotal = (valorSaida - valorEntrada) - (custoSaida - custoEntrada), " +
            " dataNumEntrada = concat(substring(dataEntrada,1,4),substring(dataEntrada,6,2),substring(dataEntrada,9,2)), " +
            " dataNumSaida = concat(substring(dataSaida,1,4),substring(dataSaida,6,2),substring(dataSaida,9,2)) " +
            " where id = " + idTrade + " and tipo='C' ";
        let sqlVenda = "update TradeReal " +
            " set lucroPrejuizo = custoEntrada - custoSaida , " +
            " percentual = ((precoEntrada - precoSaida) / precoEntrada) * 100, " +
            " custoTotal = (valorEntrada - valorSaida) - (custoEntrada - custoSaida), " +
            " dataNumEntrada = concat(substring(dataEntrada,1,4),substring(dataEntrada,6,2),substring(dataEntrada,9,2)), " +
            " dataNumSaida = concat(substring(dataSaida,1,4),substring(dataSaida,6,2),substring(dataSaida,9,2)) " +
            " where id = " + idTrade + " and tipo='V' ";
        let sql2 = " select count(*) as dias from DiaPregao " +
                   " where diaNum > (select dataNumEntrada from TradeReal where id = " + idTrade + ") " +
                   " and diaNum <= (select dataNumSaida from TradeReal where id = " + idTrade + ")";
        let ds = Tradereal.dataSource;
        ds.connector.query(sqlCompra,(err,result) => {
            ds.connector.query(sqlVenda,(err,result) => {
                ds.connector.query(sql2, (err,result2) => {
                    let sql3 = "update TradeReal set dias = " + result2[0].dias +
                        " where id = " + idTrade;
                    ds.connector.query(sql3, callback); 
                })
            });

        })
        
    };
  

    /**
    * 
    * @param {number} idTrade 
    * @param {Function(Error, object)} callback
    */
    Tradereal.CalculaEstimativa = function(idTrade, callback) {
        //console.log('CalculaEstimativa');
        let sql1Compra = "update TradeReal " +
            " set valorTarget = precoTarget * quantidade, " +
            " valorStop = precoStop * quantidade, " +
            " valorEntrada = precoEntrada * quantidade, " +
            " dataNumEntrada = concat(substring(dataEntrada,1,4),substring(dataEntrada,6,2),substring(dataEntrada,9,2)) " +
            " where id = " + idTrade + " and tipo='C' ";
        let sql2Compra = "update TradeReal " +
            " set valorExposicao = (valorEntrada - valorStop + " + CUSTO_OPERACAO + ") , " +
            " lucroAlvo = (valorTarget - valorEntrada) -  " + CUSTO_OPERACAO +
            " where id = " + idTrade + " and tipo='C' ";
        let ds = Tradereal.dataSource;
        ds.connector.query(sql1Compra,(err,result) => {
            ds.connector.query(sql2Compra,callback);
        });

        let sql1Venda = "update TradeReal " +
            " set valorTarget = precoTarget * quantidade, " +
            " valorStop = precoStop * quantidade, " +
            " valorEntrada = precoEntrada * quantidade, " +
            " dataNumEntrada = concat(substring(dataEntrada,1,4),substring(dataEntrada,6,2),substring(dataEntrada,9,2)) " +
            " where id = " + idTrade + " and tipo='V' ";
        let sql2Venda = "update TradeReal " +
            " set valorExposicao = (valorStop - valorEntrada + " + CUSTO_OPERACAO + ") , " +
            " lucroAlvo = (valorEntrada - valorTarget) -  " + CUSTO_OPERACAO +
            " where id = " + idTrade + " and tipo='V' ";
        ds.connector.query(sql1Venda,(err,result) => {
            ds.connector.query(sql2Venda,callback);
        });
    };


    /**
    * 
    * @param {Function(Error, number)} callback
    */
    Tradereal.TotalExposicao = function(callback) {
        let sql = " select sum(valorExposicao) as valor from TradeReal " +
                " where posicaoAtual = 1 ";
        let ds = Tradereal.dataSource;
        ds.connector.query(sql,(err,result) => {
            callback(err,result[0]);
        });
    };


    Tradereal.SituacaoAtual = function(callback) {
        let sql = "select sum(lucro) as valor " +
            " from " +
            " ( " +
            " select valorEntrada, valorSaida, posicao, ((valorSaida - valorEntrada) * posicao) as lucro " +
            " from  " +
            " ( " +
            " select (precoEntrada * quantidade) valorEntrada,  " +
            " (precoAtual * quantidade) valorSaida ,  " +
            " case " +
            " when tipo='C' then 1  " +
            " else -1  " +
            " end as posicao " +
            " from " +
            " ( " +
            " select ticker, precoEntrada, quantidade, tipo,  " +
            " (select valor from CotacaoIntradayAcao " +
            " where CotacaoIntradayAcao.ticker = TradeReal.ticker  " +
            " order by dataHora desc " +
            " limit 1 " +
            " ) precoAtual " +
            " from TradeReal where  " +
            " posicaoAtual <> 0 " +
            " ) as tab  " +
            " ) as tab2 " +
            " ) as tab3";
        let ds = Tradereal.dataSource;
        ds.connector.query(sql, (err,result) => {
            callback(err, result[0]);
        })
    }

    Tradereal.RiscoAtual = function(callback) {
        let sql = "select sum(lucro) as valor " +
            " from " +
            " ( " +
            " select ticker, ((precoStop - precoEntrada) * quantidade) * posicao as lucro " +
            " from " +
            " ( " +
            " select ticker, precoEntrada, quantidade, tipo, precotarget, precoStop, " +
            " case " +
            " when tipo='C' then 1 " + 
            " else -1 " +
            " end as posicao " +
            " from TradeReal " +
            " where posicaoAtual <> 0 " +
            " ) as tab1 " +
            " ) as tab2";

        let ds = Tradereal.dataSource;
        ds.connector.query(sql, (err,result) => {
            callback(err, result[0]);
        }) 
    }
};
