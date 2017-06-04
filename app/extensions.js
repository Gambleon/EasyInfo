const fs = require('fs');
const paths = require(__paths);
const pages = paths.lib('pages');

module.exports = {
	getExtensions: getExtensions,
	extensions: extensions
}

function extensions(callback) {
	var dir = paths.extDir();
	fs.readdir(dir, function (err, files) {
		var categories = [];
		files.forEach(function (file) {
			var joinedPath = paths.path.join(dir, file);
			fs.lstat(joinedPath, function (err, stat) {
				if (!stat.isDirectory()) {
					var data = require(joinedPath).getExtensions(pages, paths);
					fillData(categories, data);
				}
			}); //fs.lstat
		}); //files.forEach
		callback(categories);
	}); //fs.readdir
}

function fillData(destinationCategoryArray, sourceCategoryArray) {
	sourceCategoryArray.forEach(function (sourceCategory) {
		tryAddCategory(destinationCategoryArray, sourceCategory);
	})
}

function tryAddCategory(destinationCategoryArray, sourceCategory) {
	var foundCategory = destinationCategoryArray.find(function (destinationCategoryToFind) {
		return destinationCategoryToFind.categoryId === sourceCategory.categoryId;
	});
	if (typeof foundCategory === 'undefined') {
		destinationCategoryArray.push(sourceCategory);
		foundCategory = sourceCategory;
	}
	else {
		sourceCategory.categories.forEach(function (subCategoryToAdd) {
			tryAddCategory(foundCategory.categories, subCategoryToAdd);
		});
	}
	sourceCategory.items.forEach(function (itemToAdd) {
		var foundItem = foundCategory.items.find(function (itemToFind) {	
			return itemToFind.itemId === itemToAdd.itemId;
		});
		if (typeof foundItem === 'undefined') {
			foundCategory.items.push(itemToAdd);
		}
	});
}

function getExtensions(extensionCallback) {
	//Blank data
	var extensionData = { categories: [] };
	//Get the directory
	var dir = paths.extDir();
	//Get directory contents
	fs.readdir(dir, function (err, files) {
		files.forEach(function (file) {
			//Calculate full path
			var joined = paths.path.join(dir, file);
			//Get item properties
			fs.lstat(joined, function (err, stat) {
				//If we're looking at a file
				if (!stat.isDirectory()) {
					//Get the extensions page-data
					var items = require(joined).getPages(pages);

					//For every page
					items.forEach(function (item) {
						//if the category is already present
						var catFound = false;
						//for every category
						extensionData.categories.forEach(function (cat) {
							//if the category is the one we want
							if (cat.categoryId === item.categoryId) {
								//the category is present
								catFound = true;
								//if the item is already present
								var itFound = false;

								//for every item
								cat.items.forEach(function (it) {
									//if the item if the one we want
									if (it.itemId === item.itemId) {
										//the item is present
										itFound = true;
										//update contents
										it.content = item.content;
									}
								});
								//If the item was not found, we need to add it
								if (!itFound) {
									//add the item to the specified category
									cat.item(item.itemId, item.item, item.content);
								}
							}
						});
						//If the category was not found, we need to add it
						if (!catFound) {
							//add the category to the data structure
							var _cat = pages.category(item.categoryId, item.category);
							var _itm = pages.item(item.itemId, item.item, item.getContent);
							_cat.addItem(_itm);
							extensionData.categories.push(_cat);
						}
					});
				}
			});
			//For every item
		});
		extensionCallback(extensionData);
	});
}