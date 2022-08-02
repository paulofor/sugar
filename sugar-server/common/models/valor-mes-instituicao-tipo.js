'use strict';

module.exports = function(Valormesinstituicaotipo) {

/*
    select TipoAplicacao.nome, valorTotal, percentualTotal
    from
    (select tipoAplicacaoId, sum(valor) valorTotal, sum(valorPercentual) percentualTotal
    from ValorMesInstituicaoTipo
    where dataReferenciaNum = 202112
    group by tipoAplicacaoId
    order by valorTotal desc) as tab
    inner join TipoAplicacao on TipoAplicacao.id = tipoAplicacaoId
*/

    Valormesinstituicaotipo.TotaisMesCorrente = function(callback) {
        let sql =   " select TipoAplicacao.nome, valorTotal, percentualTotal " +
                    " from " +
                    " (select tipoAplicacaoId, sum(valor) valorTotal, sum(valorPercentual) percentualTotal " +
                    " from ValorMesInstituicaoTipo " +
                    " where dataReferenciaNum =  DATE_FORMAT(DATE_SUB(now(),interval 1 month),'%Y%m')  " +
                    " group by tipoAplicacaoId " +
                    " order by valorTotal desc) as tab " +
                    " inner join TipoAplicacao on TipoAplicacao.id = tipoAplicacaoId ";
        let ds = Valormesinstituicaotipo.dataSource;
        ds.connector.query(sql,callback);
    }

};
