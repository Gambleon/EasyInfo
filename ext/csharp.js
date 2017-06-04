module.exports = {
    getExtensions: function (pages, paths)
    {
        var csharp = pages.category('csharp', 'C#');
        csharp.item('about', 'About C#', pages.html(paths.path.join(__dirname, 'csharp/about.html')))
        var errors = csharp.category('error', 'Errors');
        errors.item('cs0535', 'CS 0535', pages.raw('\'class\' does not implement \'interface\''));
        var types = csharp.category('types', 'Types');
        var systemTypes = types.category('system', 'System');
        systemTypes.item('exception', 'Exception', pages.raw('Represents errors that occur during application execution.'));
        //var createItem = pages.item('create', 'Create your own extension', pages.raw('Create a file in the <code>extension</code> folder named <code>UNIQUE_EXTENSION_NAME_HERE.js</code><br /><br /><a href=\'javascript:getContent(\'ext\",\'add\')\'>Next page</a>'))

        //extensibilityCatgory.addItem(createItem);

        //extensibilityCatgory.item('add', 'Add pages to your extension', pages.raw('Paste the following code in it: <br /><br /><code>module.exports = {<br />&nbsp;&nbsp;&nbsp;&nbsp;getPages: function getPages(pages, paths)<br />&nbsp;&nbsp;&nbsp;&nbsp;{<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return [<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pages.page(\'category-id-here\', \'CATEGORY_HERE\', \'item-id-here\', \'ITEM_HERE\' pages.raw(\'RAW_HTML_HERE\'))<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;];<br />&nbsp;&nbsp;&nbsp;&nbsp;}<br />}</code>'))
        return [ 
            csharp
            //pages.page("ext", "Extensibility", "create", "Create your own extension", pages.raw("Create a file in the <code>extension</code> folder named <code>UNIQUE_EXTENSION_NAME_HERE.js</code><br /><br /><a href='javascript:getContent(\"ext\",\"add\")'>Next page</a>")),
			//pages.page("ext", "Extensibility", "add", "Add pages to your extension", pages.raw("Paste the following code in it: <br /><br /><code>module.exports = {<br />&nbsp;&nbsp;&nbsp;&nbsp;getPages: function getPages(pages, paths)<br />&nbsp;&nbsp;&nbsp;&nbsp;{<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return [<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pages.page('category-id-here', 'CATEGORY_HERE', 'item-id-here', 'ITEM_HERE' pages.raw('RAW_HTML_HERE'))<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;];<br />&nbsp;&nbsp;&nbsp;&nbsp;}<br />}</code>"))
        ];
    }
}