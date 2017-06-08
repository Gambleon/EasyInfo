module.exports = {
    hasProperty: hasProperty,
    getValue: getValue,
    tryGetValue: tryGetValue
}

/**
 * Returns whether the propertyObj.obj has the property specified in propertyObj.property
 * @param {*} propertyObj The object which holds information about the value
 * @returns whether propertyObj.obj has the property propertyObj.property or false in case of missing information
 */
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

/**
 * Returns the value of the specified property and evaluates a function if required
 * @param {*} propertyObj The object which holds information about the value
 * @returns the value of the specified property and evaluates a function if required or undefined in case of missing information
 */
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

/**
 * Returns the value of the specified property or the fallback value if specified
 * @param {*} propertyObj The object which holds information about the value
 * @returns the value of the specified property or the fallback value or undefined in case of missing information
 */
function tryGetValue(propertyObj) {
    // {obj: any, property: string, value: any, fallback?: any}
    if (typeof propertyObj === 'undefined' || propertyObj === null || typeof propertyObj.obj === 'undefined' || propertyObj.obj === null || typeof propertyObj.property === 'undefined' || propertyObj.property === null || propertyObj.property
        === '' || typeof propertyObj.value === 'undefined' || propertyObj.value === null) {
        return undefined;
    }

    return hasProperty(propertyObj) ? getValue(propertyObj) : propertyObj.fallback;
}