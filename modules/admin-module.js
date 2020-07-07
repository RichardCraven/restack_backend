const db = require("../data/dbConfig.js");
const Kennels = require('./kennels-module');
const Dogs = require('./dogs-module');

module.exports = {
 findById, remove, findBy, updateKennel, updateDog, assignBreed, addBreed, removeBreed, getNotifications
}
async function findById(filter) {
  const id = Number(filter)
  const [admin] = await db("admins").where({id})
  const [kennel] = await db("kennels").where({"id": admin.kennel_id})
  const dogs = await Dogs.findByKennel(kennel.id)
  return {...admin,...kennel, dogs}
}

async function remove(id){
    const admin = await findBy({id})
    await Kennels.remove(admin.kennel_id)
    const dogs = await Dogs.findByKennel(admin.kennel_id)
    
    dogs.forEach(dog =>{
       removeDog(dog.id)
    })
    return await db("admins").where({id}).del()
}
async function removeDog(id){
    return db("dogs").where({id}).del();
}

async function findBy(filter){
    return await db("admins").where(filter).first()
}

async function updateKennel(id, changes){
    return await db('kennels').where({id}).update(changes)
    .then(count => (count > 0 ? Kennels.findById(id): null))
}
async function updateDog(id, changes){
    return await db('dogs').where({id}).update(changes)
    .then(count => (count > 0 ? Dogs.findById(id): null))
}

async function assignBreed(dogID, breedID){
    const response = await db("dog_breeds").insert({"dog_id": dogID, "breed_id": breedID})
    if(response > 0){
      return await Dogs.findById(dogID)
    }
    else{
     throw new Error('Breed or Dog does not exist')
    }
}

async function addBreed(breed, dog_ID){
    const [id] = await db("breeds").insert(breed)
    await db("dog_breeds").insert({"dog_id": dog_ID, "breed_id": id})
    return await Dogs.findById(dog_ID)
}

async function removeBreed(dog_id, breed_id){
    const response = await db("dog_breeds").where({'dog_id': dog_id, 'breed_id':breed_id}).first().del();
    if(response > 0){
      return await Dogs.findById(dog_id)
    }
    else{
     throw new Error('Breed or Dog does not exist')
    }
}

function getNotifications(id){
    return db('notifications').where({"admin_id":id})
}