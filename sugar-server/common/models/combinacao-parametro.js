'use strict';

module.exports = function (Combinacaoparametro) {



  /**
  * 
  * @param {number} id 
  * @param {string} descricao 
  * @param {Function(Error, object)} callback
  */
  Combinacaoparametro.AlteraDescricao = function(id, descricao, callback) {
    let sql = "update CombinacaoParametro set descricao = '" + descricao + "' " +
            " where id = " + id;
    let ds = Combinacaoparametro.dataSource;
    ds.connector.query(sql, callback);
  };


  /**
   * 
   * @param {number} idExperimento 
   * @param {Function(Error, object)} callback
   */

  Combinacaoparametro.GetProximoExecucao = function (idExperimento, callback) {
    let filtro = {
      'order': 'posicaoCombinacao',
      'where': { 'and': [{ 'experimentoSimulacaoId': idExperimento }, { 'dataExecucao': null }] },
      'limit': '1',
      'include': { 'relation': 'valorParametros', 'scope': { 'include': 'parametroRegra' } }
    }
    Combinacaoparametro.findOne(filtro, callback);
  };

  /**
   * 
   * @param {number} idExperimento 
   * @param {Function(Error, array)} callback
   */

  Combinacaoparametro.GetListaExecucao = function (idExperimento, callback) {
    //console.log('id' , idExperimento);
    let filtro = {
      'where': { 'and': [{ 'experimentoSimulacaoId': idExperimento }, { 'descricao': null }] },
      //'include': { 'relation': 'valorParametros', 'scope': { 'include': 'parametroRegra' } }
      'include' : 'valorParametros',
      'limit' : 15000
    }
    //console.log('entrou no find');
    Combinacaoparametro.find(filtro, (err,result) => {
      //console.log('pegou result');
      callback(err,result);
    });
  };

  /**
  * 
  * @param {number} idExperimento 
  * @param {Function(Error, object)} callback
  */
  Combinacaoparametro.LimpaDescricao = function(idExperimento, callback) {
    let sql = "update CombinacaoParametro set descricao = null where experimentoSimulacaoId = " + idExperimento;
    let ds = Combinacaoparametro.dataSource;
    ds.connector.query(sql, callback);
  };

};
