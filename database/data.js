const LoremIpsum = require("lorem-ipsum").LoremIpsum;

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

//FUNCTIONS
//need function to create a sentence for the name of item + color at end
var createItemName = () => {
  var itemName = null;
  //an item name should contain between 5 - 10 words + a color
  //randomize a number between 5 - 10 words
  var numberOfWords = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
  //need to call lorem.generateSentences(1) + color
  // itemName = lorem.generateWords(numberOfWords) + `, ${color}`;
  itemName = lorem.generateWords(numberOfWords);
  //return item Name
  return itemName;
};

//need function to use lorem ipsum to generate 5-7 paragraphs for description
var createItemDescription = () => {
  //create an array
  var itemDescription = [];
  //create random number between 4-7
  var max = Math.floor(Math.random() * (7 - 4 + 1)) + 4;
  //set max number = to random number above
  //loop from 0 to max number
  for (var i = 0; i <= max; i++) {
    //for each loop call lorem ipsum to create one paragraph
    var paragraph = lorem.generateParagraphs(1);
    //push paragraph into array
    itemDescription.push(paragraph);
  }
  //return array
  return itemDescription;
};

//need function to select random brand from a list of speakers
var getBrand = (num) => {
  //input: a number between 1000- 1100
  //output: a string
  //brands "Nile", "Mississippi", "Thames", "Ganges", "Danube", "Yangtze"
  if (num < 1015) {
    return 'Yangtze';
  }
  if (num < 1030) {
    return 'Mississippi';
  }
  if (num < 1045) {
    return 'Thames';
  }
  if (num < 1060) {
    return 'Ganges';
  }
  if (num < 1075) {
    return 'Danube';
  }
  return 'Nile';
};

//need function to select either true or false randomly
var generateBooleanValue = () => {
  var num = Math.round(Math.random());
  if (num === 0) {
    return false;
  } else {
    return true;
  }
};

//Create Configuration data
var createConfiguration = () => {
  //return an array of 4 values
  var configArray = [];
  //each value can be a few words to no words
  //randomize numbers between 1- 5 to get a number of configurations for the item
  var numOfConfigs = Math.floor(Math.random() * (5 - 1 + 1)) + 1;

  //loop from 0 - numOfConfigs
  for (var i = 0; i < numOfConfigs; i++) {
    //randomize a number between 1-4  to get a number of words for each config
    var numOfWords = Math.floor(Math.random() * (4 - 1)) + 1;
    //call generateWords with random number above
    var config = lorem.generateWords(numOfWords);
    //push generated words into array
    configArray.push(config);
  }
  //return array
  return configArray;
};

//need function to keep track of similar items based on color
var getAvailableColors = (id, color) => {
  //input is a color and id
  var arrayOfProductIds = [];
  var idOne = null;
  var idTwo = null;
  //if color is black then add 1 and add 2 to id and pass into array
  if (color === 'black') {
    idOne = id + 1;
    idTwo = id + 2;
    arrayOfProductIds.push(idOne, idTwo);
  }
  //if color is white then add 1 and subtract 1 from id
  if (color === 'white') {
    idOne = id - 1;
    idTwo = id + 1;
    arrayOfProductIds.push(idOne, idTwo);
  }
  //if color is gray than subract 1 and 2 to id and pass into array
  if (color === 'gray') {
    idOne = id - 2;
    idTwo = id - 1;
    arrayOfProductIds.push(idOne, idTwo);
  }
  //output is an array of the product Ids for the products with a similar name but different id
  //return array of productIds
  return arrayOfProductIds;
};



var data = [];
//product Ids from 1000-1100

//Generate data function
var generateData = () => {
  //returns an array of 100 different items of data


  //creat an array of three colors
  var colorOptions = ['black', 'white', 'gray'];
  var colorIndex = 0;

  //need some items to have the same name and only have a different color in the name
  var name = null;
  var nameCount = 0;
  //need the similar items except for different colors to have the same description
  var description = null;
  var configuration = null;
  //loop through numbers starting at 1000 to 1100
  for (var i = 1000; i < 1100; i++) {
    //create a new item object
    var newItemObject = {};
    //set property of product id of object equal to i
    newItemObject.productId = i;
    //set property "color" of either black, white, gray in that order
    newItemObject.color = colorOptions[colorIndex];

    newItemObject.configuration = createConfiguration();
    //everyItem with same name but different color needs the description to be the same
    //everyItem with the same name but different color also needs the same configuration options
    if (nameCount === 1) {
      newItemObject.itemName = name + `, ${colorOptions[colorIndex]}`;
      newItemObject.itemDescription = description;
      newItemObject.configuration = configuration;
    }
    if (nameCount === 0) {
      //set property name, call createItemName
      name = createItemName();
      newItemObject.itemName = name + `, ${colorOptions[colorIndex]}`;
      description = createItemDescription();
      //set property description
      newItemObject.itemDescription = description;

      configuration = createConfiguration();
      //set property configuartion
      newItemObject.configuration = configuration;
    }
    if (nameCount === 2) {
      newItemObject.itemName = name + `, ${colorOptions[colorIndex]}`;
      newItemObject.itemDescription = description;
      newItemObject.configuration = configuration;
      nameCount = 0;
    } else {
      nameCount++;
    }
    //set property similar items but different colors => should equal array of other two colors productIds
    //[1001, 1002]
    //[1000, 1002]
    //[1000, 1001]
    newItemObject.similarItems = getAvailableColors(i, colorOptions[colorIndex]);

    //if colorIndex = 2 then reset to 0
    //if last item was black then next item is white and if white then gray and if gray then black
    if (colorIndex === 2) {
      colorIndex = 0;
    } else {
      colorIndex++;
    }
    //set property Brand
    newItemObject.brand = getBrand(i);
    //set property isPrimeFreeOneDay to either true or false
    newItemObject.isPrimeFreeOneDay = generateBooleanValue();
    //set property isFreeDelivery to either true or false
    newItemObject.isFreeDelivery = generateBooleanValue();
    //push new item object into exampleData
    data.push(newItemObject);
  }
};

//create 100 items
generateData();


// data = JSON.stringify(data);

// script to seed data
const mongoose = require('mongoose');
const Description = require('./database.js');
const db = require('./database.js');

// var seedData = db.Description.insertMany(data)
//   .then(function() {
//     console.log('DATA SUCCESSFULLY INSERTED');
//   }).catch(function(error) {
//     console.log('ERROR INSERTING DATA');
//   });
// // seedData();

module.exports.data = data;
// module.exports.seedData = seedData;

