module.exports = {
    hasProperty: hasProperty,
    getValue: getValue,
    tryGetValue: tryGetValue
}

function hasProperty(propertyObj) {
    // {obj: any, property: string}
    if (typeof propertyObj === 'undefined' || propertyObj === null || typeof propertyObj.obj === 'undefined' || propertyObj.obj === null || typeof propertyObj.property === 'undefined' || propertyObj.property === null || propertyObj.property
        === '') {
        return false;
    }

    var obj = propertyObj.obj;
    var property = propertyObj.property;
    return obj.hasOwnProperty(property);
}
function getValue(propertyObj) {
    // {value: any}
    if (typeof propertyObj === 'undefined' || propertyObj === null || typeof propertyObj.value === 'undefined' || propertyObj.value === null) {
        return undefined;
    }

    var value = propertyObj.value;
    if (typeof value === 'function') {
        return value();
    }
    return value;
}
function tryGetValue(propertyObj) {
    // {obj: any, property: string, value: any, fallback?: any}
    if (typeof propertyObj === 'undefined' || propertyObj === null || typeof propertyObj.obj === 'undefined' || propertyObj.obj === null || typeof propertyObj.property === 'undefined' || propertyObj.property === null || propertyObj.property
        === '' || typeof propertyObj.value === 'undefined' || propertyObj.value === null) {
        return undefined;
    }

    return hasProperty(propertyObj) ? getValue(propertyObj) : propertyObj.fallback;
}