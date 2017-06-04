module.exports = {
    transform: function(array, transformer){
        //input: [ <user_data> ]
        //output: [ [ {key, value} ] ]
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