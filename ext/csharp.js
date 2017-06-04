module.exports = {
    getExtensions: function (pages, paths) {
        var csharp = pages.category('csharp', 'C#');
        csharp.item('about', 'About C#', pages.html(paths.path.join(__dirname, 'csharp/about.html')))
        var errors = csharp.category('error', 'Errors');
        errors.item('cs0535', 'CS 0535', pages.raw('\'class\' does not implement \'interface\''));
        var types = csharp.category('types', 'Types');
        var systemTypes = types.category('system', 'System');
        systemTypes.item('exception', 'Exception', pages.raw('Represents errors that occur during application execution.'));

        var exceptions = csharp.category('exceptions', 'Exceptions');
        exceptions.item('list', 'List of Exceptions', pages.template('<h1>List of exceptions</h1>', '$(Namespace).$(Exception)', '', pages.raw('<br />'), exceptionData([
            {exception: 'Exception', namespace: 'System'},
            {exception: 'FileNotFoundException', namespace: 'System.IO'}
        ], pages)));
        
        return [
            csharp
        ];
    }
}

const transformer = require('../lib/transformer.js');
const join = require('path').join;

function exceptionData(array, pages)
{
    if(typeof transformer === 'undefined')
    {
        transformer = require('../lib/transformer.js');
    }
    return pages.data(transformer.transform(array, function(item){
        return [['Exception', item.exception], ['Namespace', item.namespace]];
    }));
}