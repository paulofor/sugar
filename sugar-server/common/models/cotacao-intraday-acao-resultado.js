'use strict';

var app = require('../../server/server');

module.exports = function(Cotacaointradayacaoresultado) {



    /**
    * 
    * @param {string} ticker 
    * @param {number} idRegraProjecao 
    * @param {Function(Error, array)} callback
    */
    Cotacaointradayacaoresultado.ObtemListaComValor = function(ticker, idRegraProjecao, callback) {
        let filtro = { 
                    'where' : {'ticker' : ticker },
                    'order' : 'dataHora' ,
                    'include' : {'relation' : 'cotacaoIntradayAcaoResultadoValors'}
                    };
        Cotacaointradayacaoresultado.find(filtro,callback);
    };


    /**
    * 
    * @param {array} listaCotacao 
    * @param {Function(Error, object)} callback
    */
     Cotacaointradayacaoresultado.AtualizaTargetStopDia = function(listaCotacao, callback) {
        var ds = Cotacaointradayacaoresultado.dataSource;
        let cont = 0;
        for (let i=0;i<listaCotacao.length;i++) {
            let item = listaCotacao[i];
            console.log('item:' , item);
            let sql = '';
            if (item.tg15St15) {
                console.log('tem 15-15');
                sql = "update CotacaoIntradayAcaoResultado set tg15St15 = " + item.tg15St15 + " , " +
                    " diasTg15St15 = " + item.diasTg15St15 + 
                    " where ticker='" + item.ticker + "' and diaNum=" + item.diaNum + " and hora = '" + item.hora + "' ";
            };
            ds.connector.query(sql, (err,result) => {
                cont++;
                if (cont==listaCotacao.length) {
                    callback(null, cont);
                }
                
            }); 
        }
    };

    /**
    * 
    * @param {string} ticker 
    * @param {Function(Error, object)} callback
    */
     Cotacaointradayacaoresultado.GravaVaziaComAnterior = function(ticker, callback) {
        Cotacaointradayacaoresultado.ObtemProximoHorarioVazio(ticker, (err, cotacao) => {
            //console.log('cotacao: ' , cotacao);
            if(cotacao) {
                let sql = " update CotacaoIntradayAcaoResultado " +
                    " set valor = " + 
                    " ( " +
                    " select valor from CotacaoIntradayAcao " +
                    " where CotacaoIntradayAcao.ticker = CotacaoIntradayAcaoResultado.ticker " +
                    " and CotacaoIntradayAcao.dataHora <= CotacaoIntradayAcaoResultado.dataHora " +
                    " order by CotacaoIntradayAcao.dataHora desc " +
                    " limit 1 " +
                    " ) " +
                    " where ticker = '" + ticker + "' and diaNum = " + cotacao.diaNum + " and hora = '" + cotacao.hora + "' ";
                console.log('sql:' , sql);
                var ds = Cotacaointradayacaoresultado.dataSource;
                ds.connector.query(sql, (err,result) => {
                    callback(err,cotacao)
                });    
            } else {
                console.log('nao tem');
                callback(null,null);
            }
           
        })

    };
  


    /**
    * 
    * @param {string} ticker 
    * @param {Function(Error, object)} callback
    */
     Cotacaointradayacaoresultado.ObtemProximoHorarioVazio = function(ticker, callback) {
         // proximo horario vazio menor que o maior intraday.
        let sql = "SELECT *  " +
                " FROM CotacaoIntradayAcaoResultado " +
                " where dataHora < (select dataHora from CotacaoIntradayAcao where ticker = '" + ticker + "' order by dataHora desc limit 1) " +
                " and ticker = '" + ticker + "' " +
                " and valor is null " +
                " limit 1"
        
        var ds = Cotacaointradayacaoresultado.dataSource;
        ds.connector.query(sql, (err,result) => {
            if (result.length==1) {
                callback(err,result[0])
            } else {
                callback(err,null);
            }
        }); 
    };

/**
 * 
 * @param {string} ticker 
 * @param {number} ano 
 * @param {Function(Error, object)} callback
 */

 Cotacaointradayacaoresultado.CriaTickerAno = function(ticker, ano, callback) {
    console.log('entrou aqui' + ano);
    let filtroAno = { 'where' : {'ano' : ano}}
    let horarios = ['10:40:00' , '11:00:00' , '11:30:00' , '12:00:00' , '12:30:00' , '13:00:00' , '13:30:00' , '14:00:00' , '14:30:00' ,
                    '15:00:00' , '15:30:00' , '16:00:00' , '16:30:00' , '17:30:00' , '18:00:00'];
    app.models.DiaPregao.find(filtroAno, (err,result) => {
        for (var i=0 ; i<result.length; i++) {
            let dia = result[i];
            for (var x=0; x<horarios.length; x++) {
               let hora = horarios[x];
               let dataHora = new Date(dia.data);
               let horaDate = horarios[x].substring(0,2);
               let minutoDate = horarios[x].substring(3,5);
               dataHora.setUTCHours(horaDate);
               dataHora.setUTCMinutes(minutoDate);
               let diaHoraNumTicker = dia.diaNum + hora + ticker;
               let item = {'ticker' : ticker , 'diaNum' : dia.diaNum , 'hora' : hora, 'dataHora' : dataHora, 'dia' : dia.data , 
                        'diaHoraNumTicker' : diaHoraNumTicker};
               //console.log('item' , item);
               Cotacaointradayacaoresultado.create(item, (err,result) => {
                   if (err) return
               })
            }
        }
        //let sql = " update CotacaoIntradayAcaoResultado "  +
        //    " set diaHoraNumTicker = concat(diaNum,hora,ticker) where ticker = '" + ticker + "'";
        //let ds = Cotacaointradayacaoresultado.dataSource;
        //ds.connector.query(sql, callback);
        callback(null,{'concluido' : ticker});
    })
 };
 

};
