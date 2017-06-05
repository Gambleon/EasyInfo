const fs = require('fs');
const reflection = require('./reflection.js');
const validation = require('./validation.js');

module.exports = {
    category: category,
    item: item,
    raw: raw,
    html: html,
    template: template
}

function category(categoryObj) {
    // {id: string, name: string, content: function}
    if (!validation.hasActualValue(templateObj)) {
        throw new Error('templateObj must have a value');
    }

    var id = validation.requireHasActualValue({ propertyObj: categoryObj, property: 'id', value: property.id });
    var name = validation.requireHasActualValue({ propertyObj: categoryObj, property: 'name', value: property.name });
    var cat = {
        categoryId: id, categoryName: name, categories: [], items: [],
        category: function (categoryObj) {
            var tmp = category(categoryObj);
            cat.categories.push(tmp);
            return tmp;
        }, item: function (itemObj) {
            cat.items.push(item(itemObj));
        }
    }
    return cat;
}

function item(itemObj) {
    // {id: string, name: string, content: function}
    if (!validation.hasActualValue(templateObj)) {
        throw new Error('templateObj must have a value');
    }

    var id = validation.requireHasActualValue({ propertyObj: itemObj, property: 'id', value: property.id });
    var name = validation.requireHasActualValue({ propertyObj: itemObj, property: 'name', value: property.name });
    var content = validation.requireHasActualValue({ propertyObj: itemObj, property: 'content', value: property.content });
    return { itemId: id, itemName: name, content: content };
}

function html(file) {
    return function () {
        return fs.readFileSync(file).toString();
    };
}

/*function md(file) {
    return function () { return ""; }
}*/

function template(templateObj) {
    // {before: string, content: string, after: string, separator: string, data: [[{key: RegExp, value: String}]]}
    return function () {
        if (!validation.hasActualValue(templateObj)) {
            throw new Error('templateObj must have a value');
        }

        var before = reflection.tryGetValue({ obj: templateObj, property: 'before', value: templateObj.before, fallback: '' });
        var content = validation.requireHasActualValue({ obj: templateObj, property: 'content', value: templateObj.content });
        var after = reflection.tryGetValue({ obj: templateObj, property: 'after', value: templateObj.after, fallback: '' });
        var separator = reflection.tryGetValue({ obj: templateObj, property: 'separator', value: templateObj.separator, fallback: '' });
        var data = validation.requireHasActualValue({ obj: templateObj, property: 'data', value: templateObj.data });

        var result = before;
        for (var i = 0; i < data.length; i++) {
            var newContent = content;
            data[i].forEach(function (replacement) {
                var key = validation.requireHasActualValue({ obj: replacement, property: 'key', value: replacement.key });
                var value = validation.requireHasActualValue({ obj: replacement, property: 'value', value: replacement.value });

                newContent = newContent.replace(key, value);
            })
            result += newContent;
            if (i < data.length - 1) {
                result += separator;
            }
        }
        result += end;
        return result;
    }
}

function raw(raw) {
    return function () { return raw; }
}