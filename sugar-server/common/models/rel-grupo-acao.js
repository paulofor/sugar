'use strict';

module.exports = function(Relgrupoacao) {



    /**
     * 
     * @param {number} idGrupo 
     * @param {array} listaAtivo  Na verdade é lista dee relacionamento
     * @param {Function(Error, object)} callback
     */

    Relgrupoacao.AtualizaPorGrupoAcao = function (idGrupo, listaAtivo, callback) {
        var sqlQuantidade = "update GrupoAcao " +
                        " set quantidade = (select count(*) from RelGrupoAcao where GrupoAcao.id = RelGrupoAcao.grupoAcaoId) ";
        var sqlDelete = "delete from RelGrupoAcao where grupoAcaoId = " + idGrupo;
        var ds = Relgrupoacao.dataSource;
        ds.connector.query(sqlDelete, (err1, result1) => {
            //console.log('Retorno 1: ', result1, " - Erro: ",)
            if (err1) {
                callback(err1, null);
                return;
            }
            let conta = 0;
            listaAtivo.forEach((rel) => {
                //delete etapa.processoNegocioEtapaProjetos.id;
                //console.log('create: ', ativo.relGrupoAcaos[0]);
                Relgrupoacao.create(rel);
                conta++;
                //console.log('Conta:' , conta , ' - Tamanho:' , listaAtivo.length);
                if (conta==listaAtivo.length) {
                    ds.connector.query(sqlQuantidade, (err2,result2) => {
                        callback(null, { 'result': 'ok' });
                    })
                }
            });
        });
    };


};
