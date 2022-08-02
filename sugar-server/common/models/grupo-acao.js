'use strict';

var app = require('../../server/server');

module.exports = function(Grupoacao) {


  

    /**
    * 
    * @param {number} idGrupo 
    * @param {Function(Error, object)} callback
    */
    Grupoacao.CriaCotacaoResultado = function(idGrupo, callback) {
        /*
        let ticker = 'AZUL4';
        for (let i=0;i<100;i++) {
            setTimeout( function () {
                app.models.CotacaoIntradayAcaoResultado.GravaVaziaComAnterior(ticker, (err,result) => {
                    console.log('erro:' , err);
                    console.log('gravou item', result);
                })
            }, 2000);
        }
        */
       
        var saida;
        callback(null, saida);
    };
  

};
