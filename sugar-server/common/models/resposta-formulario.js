'use strict';

var app = require('../../server/server');

module.exports = function(Respostaformulario) {


    Respostaformulario.RecebeResposta = function(listaResposta,callback) {
        console.log('Recebe resposta');
        for (let i=0; i<listaResposta.length;i++) {
            let respostaBaby = listaResposta[i];
            console.log('email:' , respostaBaby.email);
            let filtroBaby = {'where' : {'email' : respostaBaby.email}}
            app.models.Baby.find(filtroBaby, (err,result) => {
                if (result.length==0) {
                    let baby = {'email' : respostaBaby.email};
                    app.models.Baby.create(baby,(err,result) => {
                        console.log('result baby' , result);
                        for (let j=0; j<respostaBaby.respostas.length;j++) {
                            let detalheResposta = respostaBaby.respostas[j];
                            detalheResposta.emailBaby = respostaBaby.email;
                            console.log(detalheResposta);
                            console.log();
                            Respostaformulario.create(detalheResposta, (err,result) => {

                            })
                        }
                    })
                    
                }
            })
            //console.log('respostaBaby:' , respostaBaby);
           
        }
        callback(null,{'resposta' : 'ok'})
    }
};
