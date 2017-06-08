const reflection = require('./reflection.js');
const validation = require('./validation.js');

module.exports = {
    transform: function (transformObj) {
        //input: {array: [ <user_data> ], transformer: function }
        //output: [ [ {key, value} ] ]

        if (!validation.hasActualValue(transformObj)) {
            throw new Error('transformerObj must have a value');
        }

        var array = validation.requireHasActualValue({ obj: transformObj, property: 'array', value: transformObjö.array });
        if(!reflection.hasProperty({ obj: transformerObj, property: 'transformer'} || typeof transformObj.transformer !== 'function')){
            throw new Error('transformerObj.transformer must be a function');
        }
        var transformer = transformObj.transformer;

        var results = [];
        array.forEach(function (item) {
            var current = [];
            transformer(item).forEach(function (currentItem) {
                current.push({ key: new RegExp('\\$\\(' + currentItem[0] + '\\)', 'g'), value: currentItem[1] });
            });
            results.push(current);
        });
        return results;
    }
}