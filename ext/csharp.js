module.exports = {
    getExtensions: function (pages, paths) {
        var csharp = pages.category('csharp', 'C#');
        csharp.item('about', 'About C#', pages.html(paths.path.join(__dirname, 'csharp/about.html')))
        var errors = csharp.category('error', 'Errors');
        errors.item('cs0535', 'CS 0535', pages.raw('\'class\' does not implement \'interface\''));
        var types = csharp.category('types', 'Types');
        /*var namespaceSystem = types.category('system', 'System');
        namespaceSystem.item('exception', 'Exception', pages.template('', '<h1>$(Namespace).$(Exception)</h1>$(Description)', '', '', transform_exception_data([exception_data.find(function (exception) {
            return exception.namespace === 'System' && exception.exception === 'Exception';
        })])));

        var namespaceSystemIO = types.category('system.io', 'System.IO');
        namespaceSystemIO.item('filenotfoundexception', 'FileNotFoundException', pages.template('', '<h1>$(Namespace).$(Exception)</h1>$(Description)', '', '', transform_exception_data([exception_data.find(function (exception) {
            return exception.namespace === 'System.IO' && exception.exception === 'FileNotFoundException';
        })])));*/

        exception_data.forEach(function (exception) {
            var ns = types.categories.find(function (category) {
                return category.categoryName === exception.namespace;
            })
            if (typeof ns === 'undefined') {
                ns = types.category(exception.namespace.toLowerCase(), exception.namespace);
            }
            var tp = ns.items.find(function (item) {
                return item.itemName === exception.exception;
            });
            if (typeof tp === 'undefined') {
                tp = ns.item(exception.exception.toLowerCase(), exception.exception, pages.template('', '<h1>$(Namespace).$(Exception)</h1>$(Description)', '', '', transform_exception_data([exception_data.find(function (current) {
                    return current.namespace === exception.namespace && current.exception === exception.exception;
                })])));
            }
        });

        var exceptions = csharp.category('exceptions', 'Exceptions');
        exceptions.item('list', 'List of Exceptions', pages.template('<h1>List of exceptions</h1>', '<a href=\'javascript:getContent(["csharp","types","$(NamespaceId)","$(ExceptionId)"]);\'>$(Namespace).$(Exception)</a>', '', pages.raw('<br />'), transform_exception_data(exception_data)));

        return [
            csharp
        ];
    }
}

const transformer = require('../lib/transformer.js');
const join = require('path').join;

var exception_data = [
    { exception: 'Exception', namespace: 'System', description: 'The exception that is thrown when an general error occurs.' },
    { exception: 'FileNotFoundException', namespace: 'System.IO', description: 'The exception that is thrown when an attempt to access a file that does not exist on disk fails.' },
    { exception: 'SqlException', namespace: 'System.Data.SqlClient', description: 'The exception that is thrown when SQL Server returns a warning or error.' }
];

function transform_exception_data(array) {
    return transformer.transform(array, function (item) {
        return [
            ['Exception', item.exception],
            ['ExceptionId', item.exception.toLowerCase()],
            ['Namespace', item.namespace],
            ['NamespaceId', item.namespace.toLowerCase()],
            ['Description', item.description]
        ];
    });
}