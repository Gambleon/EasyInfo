const fs = require('fs');

module.exports = {
    category: category,
    item: item,
    raw: raw,
    html: html
}

function category(id, name) {
    var cat = {
        categoryId: id, categoryName: name, categories: [], items: [], 
        category: function (id, name) {
            var tmp = category(id, name);
            cat.categories.push(tmp);
            return tmp;
        }, item: function (id, name, contentCallback) {
            cat.items.push(item(id, name, contentCallback));
        },
        addCategory: function(category)
        {
            cat.categories.push(category);
        },
        addItem: function(item)
        {
            cat.items.push(item);
        }
    }
    return cat;
}

function item(id, name, contentCallback) {
    var itm = {
        itemId: id, itemName: name, content: contentCallback
    }
    return itm;
}

function html(file) {
    return function () {
        return fs.readFileSync(file);
    };
}

/*function md(file) {
    return function () { return ""; }
}*/

/*function xml(file, template, data) {
    return function () { return ""; }
}*/

function raw(raw) {
    return function () { return raw; }
}