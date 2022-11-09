'use strict';

var app = require('../../server/server');

module.exports = function (Container) {

    app.dataSources.storage.connector.getFilename = function (file, req, res) {
        //console.log('req' , req);
        var filename =  req.query.nome + '_' + (new Date()).valueOf().toString() + '.jpg';
        console.log('filename' , filename);
        return filename;
    };

};