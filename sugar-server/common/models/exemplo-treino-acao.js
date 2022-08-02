'use strict';

module.exports = function(Exemplotreinoacao) {

    Exemplotreinoacao.InsereExemplo = function(exemplo,callback)  {
        console.log('exemplo: ' , exemplo);
        Exemplotreinoacao.create(exemplo, (err,result) => {
            callback(null,exemplo);
        });
    }
};
