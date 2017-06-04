module.exports = {
    getExtensions: function (pages, paths)
    {
        var extensibilityCatgory = pages.category('ext', 'Extensibility');
        var createItem = pages.item('create', 'Create your own extension', pages.raw('Create a file in the <code>extension</code> folder named <code>UNIQUE_EXTENSION_NAME_HERE.js</code><br /><br /><a href=\'javascript:getContent(\'ext\",\'add\')\'>Next page</a>'))

        extensibilityCatgory.addItem(createItem);

        extensibilityCatgory.item('add', 'Add pages to your extension', pages.raw('Paste the following code in it: <br /><br /><code>module.exports = {<br />&nbsp;&nbsp;&nbsp;&nbsp;getPages: function getPages(pages, paths)<br />&nbsp;&nbsp;&nbsp;&nbsp;{<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return [<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pages.page(\'category-id-here\', \'CATEGORY_HERE\', \'item-id-here\', \'ITEM_HERE\' pages.raw(\'RAW_HTML_HERE\'))<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;];<br />&nbsp;&nbsp;&nbsp;&nbsp;}<br />}</code>'))
        return [ 
            extensibilityCatgory
            //pages.page("ext", "Extensibility", "create", "Create your own extension", pages.raw("Create a file in the <code>extension</code> folder named <code>UNIQUE_EXTENSION_NAME_HERE.js</code><br /><br /><a href='javascript:getContent(\"ext\",\"add\")'>Next page</a>")),
			//pages.page("ext", "Extensibility", "add", "Add pages to your extension", pages.raw("Paste the following code in it: <br /><br /><code>module.exports = {<br />&nbsp;&nbsp;&nbsp;&nbsp;getPages: function getPages(pages, paths)<br />&nbsp;&nbsp;&nbsp;&nbsp;{<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return [<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pages.page('category-id-here', 'CATEGORY_HERE', 'item-id-here', 'ITEM_HERE' pages.raw('RAW_HTML_HERE'))<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;];<br />&nbsp;&nbsp;&nbsp;&nbsp;}<br />}</code>"))
        ];
    }
}