const fs = require('fs');

module.exports = {
    category: category,
    item: item,
    raw: raw,
    html: html,
    template: template,
    data: data
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
        addCategory: function (category) {
            cat.categories.push(category);
        },
        addItem: function (item) {
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
        return fs.readFileSync(file).toString();
    };
}

/*function md(file) {
    return function () { return ""; }
}*/

/*function xml(file, template, data) {
    return function () { return ""; }
}*/

function template(begin, content, end, separator, data) {
    return function () {//begin is optional
        if (typeof begin === 'undefined') {
            begin = '';
        }
        else if (typeof begin === 'function') {
            begin = begin();
        }

        //content can be loaded lazily
        if (typeof content === 'function') {
            content = content();
        }

        //end is optional
        if (typeof end === 'undefined') {
            end = '';
        }
        else if (typeof end === 'function') {
            end = end();
        }

        //Separator is optional
        if (typeof separator === 'undefined') {
            separator = '';
        }
        else if (typeof separator === 'function') {
            separator = separator();
        }
        //Data an be loaded lazily
        if (typeof data === 'function') {
            data = data();
        }

        var result = begin;
        var tmp = '';
        for (var i = 0; i < data.length - 1; i++) {
            tmp = content;
            data[i].forEach(function (replacement) {
                tmp = tmp.replace(replacement.key, replacement.value);
            })
            result += tmp;
            result += separator;
        }
        tmp = content;
        data[data.length - 1].forEach(function (replacement) {
            tmp = tmp.replace(replacement.key, replacement.value);
        })
        result += tmp;
        result += end;
        return result;
    }
}

function data(data) {
    var results = [];
    data.forEach(function (item) {
        var current = [];
        item.forEach(function (currentItem) {
            current.push({ key: new RegExp('\\$\\(' + currentItem[0] + '\\)', 'g'), value: currentItem[1] });
        });
        results.push(current);
    });
    return results;
}

function raw(raw) {
    return function () { return raw; }
}