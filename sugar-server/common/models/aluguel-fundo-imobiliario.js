'use strict';

module.exports = function (Aluguelfundoimobiliario) {



    /**
    * 
    * @param {array} listaItem 
    * @param {Function(Error, object)} callback
    */
     Aluguelfundoimobiliario.InsereSeNaoExisteAluguelFundo = function (listaItem, callback) {
        var saida = {};
        console.log('entrou na funcao')
        console.log(listaItem)
        for (itemLista of listaItem) {
            console.log(itemLista)
        }
        callback(null, saida);
    };

    /**
     * 
    * @param {object} itemAluguel 
    * @param {Function(Error, object)} callback
    */
     Aluguelfundoimobiliario.InsereSeNaoExisteItemAluguel = function(itemAluguel, callback) {
        itemAluguel.dataPagamento = converteData(itemAluguel.dataPagamento);
        itemAluguel.dataCom = converteData(itemAluguel.dataCom);
        //console.log('*** itemAluguel:' , itemAluguel);
       
        let filtro = {"where" : {"and" : [
            {"ticker" : itemAluguel.ticker}, 
            {"dataPagamento" : itemAluguel.dataPagamento},
            {"dataCom" : itemAluguel.dataCom},
            {"valor" : itemAluguel.valor}
            ]}};
        Aluguelfundoimobiliario.find(filtro, (err,result) => {
            if (result.length==0) {
                Aluguelfundoimobiliario.create(itemAluguel,callback);
            } else {
                callback(null,{})
            }
        })
    
    };
  

    function converteData(data){
          // dd/mm/aaaa
         // 0123456789
         let diaData = data.substring(0,2);
         let mesData = data.substring(3,5);
         let anoData = data.substring(6);
         let databd = anoData + "-" + mesData + "-"  + diaData;
         return databd;
    }

};
