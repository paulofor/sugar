'use strict';

module.exports = function(Cotacaointradayfoxbit) {




  /**
  * 
  * @param {string} ticker 
  * @param {Function(Error, array)} callback
  */
  Cotacaointradayfoxbit.ObtemListaFoxbit = function(ticker, callback) {
    let filtro = { 
              'where' : {'and' : [ {'ticker' : ticker} , {'cambio': 'Foxbit'} ] },
              'order' : 'dataHora asc',
              'limit' : 2000
            }
      Cotacaointradayfoxbit.find(filtro,callback);
  };



/**
 * 
 * @param {array} listaCotacao 
 * @param {Function(Error, object)} callback
 */
 Cotacaointradayfoxbit.InsereListaFonteFoxbit = function(listaCotacao, callback) {
   console.log('lista ' , listaCotacao)
    for (let ind=0;ind<listaCotacao.length;ind++) {
        let item = listaCotacao[ind];
        console.log('item' , item)
        Cotacaointradayfoxbit.create(item, (err,result) => {
          console.log('err:' , err);
        });
    }
    var resultado = {'saida' : 'ok'}
    callback(null, resultado);
  };
  

};
