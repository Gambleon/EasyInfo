function getElementById(id) {
    return document.getElementById(id);
}

function createElement(type, id, classes) {
    var element = document.createElement(type);
    element.id = id;
    classes.forEach(function (cls) {
        element.classList.add(cls);
    });
    return element;
}

function createDiv(id, classes) {
    return createElement('div', id, classes);
}

function createContainer(id, indent) {
    var container = createDiv(id + '-container', ['container']);
    container.style.marginLeft = ((indent - 1) * 20) + 'px';
    return container;
}

function createCategory(id, content) {
    var category = createDiv(id, ['list-item']);
    category.innerHTML = content;
    return category;
}

function createToggle(id) {
    var toggle = createDiv(id + '-toggle', ['toggle']);
    //toggle.style.display = 'none';
    return toggle;
}

function createItem(id, content) {
    var item = createDiv(id, ['item', 'list-item']);
    item.innerHTML = content;
    return item;
}