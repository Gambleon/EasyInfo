const reflection = module.require('./reflection.js');

module.exports = {
    isDefined: isDefined,
    hasValue: hasValue,
    hasActualValue: hasActualValue,
    requireIsDefined: requireIsDefined,
    requireHasValue: requireHasValue,
    requireHasActualValue: requireHasActualValue
}

function isDefined(obj) {
    return typeof obj !== 'undefined';
}

function hasValue(obj) {
    return obj !== null;
}

function hasActualValue(obj) {
    isDefined(obj) && hasValue(obj);
}

function requireIsDefined(propertyObj) {
    // {obj: any, property: string, value: any, fallback?: any}
    return require({ propertyObj: propertyObj, requireFunc: isDefined, illegalType: 'undefined' });
}

function requireHasValue(propertyObj) {
    // {obj: any, property: string, value: any, fallback?: any}
    return require({ propertyObj: propertyObj, requireFunc: hasValue, illegalType: 'null' });
}

function requireHasActualValue(propertyObj) {
    // {obj: any, property: string, value: any, fallback?: any}
    return require({ propertyObj: propertyObj, requireFunc: hasActualValue, illegalType: 'undefined\' or \'null' });
}

function require(requireObj) {
    // {propertyObj: object, requireFunc: function, illegalType: string}
    var propertyObj = requireObj.propertyObj;
    var requireFunc = requireObj.requireFunc;
    var illegalType = requireObj.illegalType;
    var result = reflection.tryGetValue(propertyObj);
    if (!requireFunc(result)) {
        throw new Error('A value was required for property \'' + propertyObj.property + '\' but is was \'' + illegalType + '\' instead');
    }
    return result;
}