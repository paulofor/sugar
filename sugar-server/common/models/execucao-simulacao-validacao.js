'use strict';


var app = require('../../server/server');

module.exports = function(Execucaosimulacaovalidacao) {
/**
* 
* @param {object} execucao 
* @param {Function(Error, object)} callback
*/
Execucaosimulacaovalidacao.InsereExecucaoSimulacaoValidacao = function(execucao, callback) {
    console.log('Execucao:' , execucao);
    Execucaosimulacaovalidacao.create(execucao, (err,result) => {
        console.log('err:' , err);
        console.log('result:' , result);
        for (let i=0;i<execucao.trades.length;i++) {
            execucao.trades[i]['execucaoSimulacaoValidacaoId'] = result.id;
            app.models.Trade.create(execucao.trades[i]);
        };
        callback(err,{'trades' : execucao.trades.length});
    })
};
};
