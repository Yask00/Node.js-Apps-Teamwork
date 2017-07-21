db.getCollection('hotels').update({ "_id" : ObjectId("596639edf2d0160a4889c707"), },
{ 
    $push: 
       { 
        rooms : { "_id" : ObjectId("596639edf2d0160a4889c707") }
       } 
})