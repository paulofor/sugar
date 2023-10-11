'use strict';

module.exports = function(Itemcusto) {
    Itemcusto.observe('after save', function updateTimestamp(ctx, next) {

        let ds = Itemcusto.dataSource;

        let sqlAtualiza = '';

        if (ctx.instance) {
            sqlAtualiza = " update Experiencia set valor = (select sum(valor) from ItemCusto where experienciaId = " + ctx.instance.experienciaId 
            + ") where Experiencia.id = " + ctx.instance.experienciaId;
        } else {
            sqlAtualiza = " update Experiencia set valor = (select sum(valor) from ItemCusto where experienciaId = " + ctx.data.experienciaId + 
            ") where Experiencia.id = " + ctx.data.experienciaId;
        }
        ds.connector.query(sqlAtualiza, (err,result) => {
            next();
        })
        
    });
};
