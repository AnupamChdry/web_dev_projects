const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB",{useNewUrlParser: true});

const fruitSchema = mongoose.Schema({
  name: String,
  rating: {
    type: Number,
    min:1,
    max:10
  },
  review: String
});

const Fruit = mongoose.model('Fruit',fruitSchema);

const fruit = new Fruit({
  name:'Apple',
  rating:7,
  review:'sweet'
});

const kiwi = new Fruit({
  name:'Kiwi',
  rating:5,
  review:'sour'
});

const pineapple = new Fruit({
  name:'Pineapple',
  rating:10,
  review:'Great Fruit'
});

// pineapple.save();
// const mango = new Fruit({
//   name:'Mango',
//   rating:10,
//   review:'Best Fruit!'
// });
// const peach = new Fruit({
//   rating:7,
//   review:'Good'
// });
const banana = new Fruit({
  rating:7,
  review:'Good'
});

const orange = new Fruit({
  name:'Orange',
  rating:7,
  review:"sour"
})
// orange.save();

// banana.save();
// peach.save();
// Fruit.insertMany([kiwi,mango]); 

const peopleSchema = mongoose.Schema({
  name: String,
  age: Number,
  favouritefruite:fruitSchema
});

const Person = mongoose.model('Person',peopleSchema);

const person = new Person({
  name:'John',
  age:20
});

const jack = new Person({
  name:'Jack',
  age:25,
  favouritefruite:kiwi
})

const oggy = new Person({
  name:'Oggy',
  age:22,
  favouritefruite:pineapple
})
// oggy.save();
// jack.save();
// person.save();
// fruit.save();
// Fruit.updateOne({_id:'66525ef11d7532c1829e8c9b'},{name:"peach"});

async function updatefruit(){
  const fruits = await Fruit.updateOne({_id:'665262402818b2e7e91412e2'},{name:"banana"});
  }
updatefruit();

async function updateperson(){
  const person = await Person.updateOne({name:'John'},{favouritefruite:orange});
  }
updateperson();

async function deletefruit(){
  const fruits = await Fruit.deleteOne({_id:"6652625f00fa35d0a58cfb34"});
  }
deletefruit();

// async function deletepeople(){
//   const person = await Person.deleteMany({name:'John'});
//   }
// deletepeople();

async function myfruits(){
  const fruits = await Fruit.find({});
// mongoose.connection.close();

  fruits.forEach(function(fruit){
    console.log(fruit.name);
  })
}
myfruits();




