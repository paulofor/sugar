'use strict';

var app = require('../../server/server');

module.exports = function(Movimentacaovaloraplicado) {


    /**
    * 
    * @param {Function(Error, object)} callback
    */
    Movimentacaovaloraplicado.RecalcularSaldos = function(callback) {
        let sql1 = "update AplicacaoInstituicao " +
                " set saldoAtual = " +
                " (select coalesce(sum(valor),0) from MovimentacaoValorAplicado " + 
                " where MovimentacaoValorAplicado.instituicaoFinanceiraId = AplicacaoInstituicao.instituicaoFinanceiraId " + 
                " and MovimentacaoValorAplicado.tipoAplicacaoId = AplicacaoInstituicao.tipoAplicacaoId)";
        let sql2 = "update TipoAplicacao " +
                " set saldoAtual = " +
                " (select coalesce(sum(valor),0) from MovimentacaoValorAplicado " + 
                " where TipoAplicacao.id = MovimentacaoValorAplicado.tipoAplicacaoId)";
        let ds = Movimentacaovaloraplicado.dataSource;
        ds.connector.query(sql1, (err,result) => {
            ds.connector.query(sql2, callback)
        })
    };

    Movimentacaovaloraplicado.InsereMovimentacao = function(valorAplicado, callback) {
        //console.log('valorAplicado' , valorAplicado);
        let filtro =    {
                            'where' : {
                                'and' : [
                                            {'instituicaoFinanceiraId':valorAplicado.instituicaoFinanceiraId},
                                            {'tipoAplicacaoId' : valorAplicado.tipoAplicacaoId}
                                        ]
                            } 
                        }
        app.models.AplicacaoInstituicao.findOne(filtro, (err,aplicacaoInstituicao) => {
            //console.log('aplicacaoInstituicao' , aplicacaoInstituicao);
            valorAplicado.saldoAnterior = aplicacaoInstituicao.saldoAtual;
            aplicacaoInstituicao.saldoAtual = parseFloat(aplicacaoInstituicao.saldoAtual) + parseFloat(valorAplicado.valor);
            valorAplicado.saldoAtual = aplicacaoInstituicao.saldoAtual;
            app.models.AplicacaoInstituicao.upsert(aplicacaoInstituicao, (err,result) => {
                let sql = " Update TipoAplicacao set saldoAtual =  " +
                          " (select sum(saldoAtual) from AplicacaoInstituicao where tipoAplicacaoId = TipoAplicacao.id) " +
                          " where id = " + valorAplicado.tipoAplicacaoId;
                let ds = Movimentacaovaloraplicado.dataSource;
                ds.connector.query(sql,(err,result) => {
                    Movimentacaovaloraplicado.create(valorAplicado,callback);
                })
            })
        })
    }


    /**
    * 
    * @param {object} valorAplicado 
    * @param {Function(Error, object)} callback
    */
     Movimentacaovaloraplicado.InsereMovimentacao2 = function(valorAplicado, callback) {
        console.log('valorAplicado1' , valorAplicado);
        delete valorAplicado['id'];
        delete valorAplicado['aplicacaoInstituicaos'];
        Valoraplicado.create(valorAplicado, (err,result) => {
            if (err) {
                callback(err,null);
                return;
            }
            console.log('err' , err);
            console.log('result', result);
            console.log(valorAplicado['tipoAplicacaoId'])
            let sqlAplicacaoInstituicao = "update AplicacaoInstituicao set saldoAtual = saldoAtual + " + valorAplicado.valor + 
                    " where instituicaoFinanceiraId = " + valorAplicado.instituicaoFinanceiraId + 
                    " and tipoAplicacaoId = " + valorAplicado.tipoAplicacaoId;
            let sqlTipoAplicacao = "update TipoAplicacao set saldoAtual = saldoAtual + " + valorAplicado.valor + 
                    " where id = " + valorAplicado.tipoAplicacaoId;
            console.log(sqlAplicacaoInstituicao);
            console.log(sqlTipoAplicacao);
            let ds = Movimentacaovaloraplicado.dataSource;
            let filtro = {'where' : {'and' : [
                            {'instituicaoFinanceiraId' : valorAplicado.instituicaoFinanceiraId} , 
                            {'tipoAplicaoId' : valorAplicado.tipoAplicacaoId }] 
                        }}
            app.models.AplicacaoInstituicao.find(filtro, (err,result) => {
                console.log('result.legnth:' , result.length)
                if (result.length==0) {
                    let novo = {
                        'instituicaoFinanceiraId' : valorAplicado.instituicaoFinanceiraId,
                        'tipoAplicaoId' : valorAplicado.tipoAplicacaoId,
                        'saldoAtual' : valorAplicado.valor 
                    }
                    console.log('novo' , novo);
                    app.models.AplicacaoInstituicao.create(novo, (err,result) => {
                        console.log('erro-create:' , err);
                        console.log('result-create:' , result);
                    })
                } else {
                    ds.connector.query(sqlAplicacaoInstituicao, (err,result1) => {
                    })
                }
            })
            ds.connector.query(sqlTipoAplicacao, (err,result2) => {
                    callback(err,result2)
            })
        })
    };
  
    
};
