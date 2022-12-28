'use strict';

module.exports = function(Respostaformulario) {


    Respostaformulario.RecebeResposta = function(listaResposta,callback) {
        for (let i=0; i<listaResposta.length;i++) {
            let respostaBaby = listaResposta[i];
            //console.log('respostaBaby:' , respostaBaby);
            for (let j=0; j<respostaBaby.length;j++) {
                let detalheResposta = respostaBaby[j]
                console.log(detalheResposta);
                console.log();
            }
        }
        callback(null,{'resposta' : 'ok'})
    }
};
