module.exports = {
    transform: function (array, transformer) {
        var results = [];
        array.forEach(function (item) {
            results.push(transformer(item));
        });
        return results;
    }
}