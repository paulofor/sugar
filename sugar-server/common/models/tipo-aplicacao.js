'use strict';

module.exports = function(Tipoaplicacao) {





    /**
     * 
     * @param {number} dataRefNum 
     * @param {Function(Error, array)} callback
     */
    Tipoaplicacao.ObtemComSaldoPorPeriodo = function(dataRefNum, callback) {

        let sql = " select tipoAplicacaoId, TipoAplicacao.nome, sum(valor) as total, sum(valorPercentual) as percentualTotal " +
                " from ValorMesInstituicaoTipo " +
                " inner join TipoAplicacao on TipoAplicacao.id = ValorMesInstituicaoTipo.tipoAplicacaoId " +
                " where dataReferenciaNum = " + dataRefNum +
                " group by tipoAplicacaoId " +
                " order by total desc";
        let ds = Tipoaplicacao.dataSource;
        ds.connector.query(sql,callback);
    };
  
    Tipoaplicacao.TotaisCorrenteComAporte = function(callback) {
        let sql =   " select TipoAplicacao.*, valorTotal " +
        " from " +
        " (select tipoAplicacaoId, sum(valor) valorTotal, sum(valorPercentual) percentualTotal " +
        " from ValorMesInstituicaoTipo " +
        " where dataReferenciaNum =  DATE_FORMAT(DATE_SUB(now(),interval 1 month),'%Y%m')  " +
        " group by tipoAplicacaoId " +
        " order by valorTotal desc) as tab " +
        " inner join TipoAplicacao on TipoAplicacao.id = tipoAplicacaoId ";
        let ds = Tipoaplicacao.dataSource;
        ds.connector.query(sql,callback);
    }


    Tipoaplicacao.observe('after save', function updateInicioColeta(ctx, next) {
        let sql = "insert into AplicacaoInstituicao (instituicaoFinanceiraId, tipoAplicacaoId, saldoAtual)  " +
                " select tab.instituicaoFinanceiraId, tab.tipoAplicacaoId, 0 as saldoAtual from " +
                " ( " +
                " select InstituicaoFinanceira.id as instituicaoFinanceiraId, " +
                " TipoAplicacao.id as tipoAplicacaoId " +
                " from InstituicaoFinanceira, TipoAplicacao) tab " +
                " left join AplicacaoInstituicao on tab.instituicaoFinanceiraId = AplicacaoInstituicao.instituicaoFinanceiraId " +
                " and tab.tipoAplicacaoId = AplicacaoInstituicao.tipoAplicacaoId " +
                " where id is null ";
        let ds = Tipoaplicacao.dataSource;
        ds.connector.query(sql,(err,result) => {
            next();
        })
      })


    Tipoaplicacao.TotaisPorMes = function(callback) {
        let ds = Tipoaplicacao.dataSource;
        let sql = "select nome, valorAtual, valorMesAnterior, ((valorAtual- aporte- valorMesAnterior) / valorMesAnterior * 100) as percentual, " +
            " (valorAtual - valorMesAnterior - aporte) as diferenca, aporte " +
            " from  " +
            " ( " +
            " select ta.nome, " +
            " (select sum(valor) from ValorMesInstituicaoTipo valor " +
            " where valor.tipoAplicacaoId = ta.id " +
            " and valor.dataReferenciaNum = date_format(date_sub(now(),interval 1 month), '%Y%m') " +
            " ) valorAtual, " +
            " (select sum(valor) from ValorMesInstituicaoTipo valor " +
            " where valor.tipoAplicacaoId = ta.id " +
            " and valor.dataReferenciaNum = date_format(date_sub(now(),interval 2 month), '%Y%m') " +
            " ) valorMesAnterior, " +
            " (select coalesce(sum(valor),0) from MovimentacaoValorAplicado mov " +
            " where mov.tipoAplicacaoId = ta.id " +
            " and month(mov.data) = month(date_sub(now(),interval 1 month)) " +
            " and year(mov.data) = year(date_sub(now(),interval 1 month)) " +
            " ) aporte " +
            " from TipoAplicacao as ta " +
            " ) as tab" + 
            " order by valorAtual desc ";
        ds.connector.query(sql,callback);
    } 
};
