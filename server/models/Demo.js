var mongoose=require("mongoose");

var demoSchema=mongoose.Schema({
   title:{type:String},
   description:{type:String}
});


mongoose.model('Demo', demoSchema);
