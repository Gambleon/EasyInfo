var path = require('path');

//global.__basedir = path.join(__dirname, '../');
//global.__paths = path.join(__basedir, 'lib/paths.js');
//const paths = require(__paths);
const ipc = require(path.join(__dirname, '../lib/ipc.js')).client;

function toggle(element) {
    if (element.style.display === 'none') {
        element.style.display = 'block';
    } else {
        element.style.display = 'none';
    }
}

function getContent(contentId) {
    ipc.send('get-content', contentId);
}

ipc.receive('set-content', function (parameter) {
    document.getElementById('content').innerHTML = parameter;
});

ipc.receive('set-list', function (parameter) {
    populate(getElementById('list'), parameter);
});

function setToggle(element, id) {
    setClick(element, function () {
        toggle(getElementById(id + "-toggle"));
    });
}

function setClick(element, func) {
    element.addEventListener('click', func);
}

function populate(destinationDiv, sourceCategoriesArray, id) {
    sourceCategoriesArray.forEach(function (sourceCategory) {
        var currentId = null;
        if (typeof id === 'undefined' || id === null) {
            currentId = [];
        }
        else {
            currentId = id.slice();
        }
        var categoryId = sourceCategory.categoryId;
        currentId.push(categoryId);
        var container = createContainer(categoryId, currentId.lenght);
        var category = createCategory(categoryId, sourceCategory.categoryName);
        var toggle = createToggle(categoryId);
        setToggle(category, categoryId);

        populate(toggle, sourceCategory.categories, currentId);

        sourceCategory.items.forEach(function (subItem) {
            var item = createItem(subItem.itemId, subItem.itemName);
            setClick(item, function () {
                var contentId = currentId.slice();
                contentId.push(subItem.itemId);
                getContent(contentId);
            });
            toggle.appendChild(item);
        });

        container.appendChild(category);
        container.appendChild(toggle);
        destinationDiv.appendChild(container);
    });
}