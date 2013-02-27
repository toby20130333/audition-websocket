var mongoose = require( 'mongoose' );
mongoose.connect( 'mongodb://localhost/examination' );
var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var Paper = new Schema({
	name : String,
	type : String  ,
	question_num : Number ,
	limit_time : String,
	description : String
});
var Qusetion = new Schema({
	paper_id : String  ,
	type : Number ,
	content : String 
});
var Answer = new Schema({
	paper_id : String  ,
	question_id : String  ,
	content : String 
});

var Papers = mongoose.model( 'Papers', Paper );
var Questions = mongoose.model( 'Qusetions', Qusetion );
var Answers = mongoose.model( 'Answers', Answer );

/*get*/
exports.getPaper = function(){
	return Papers;
}
exports.getQuestion = function(){
	return Questions;
}
exports.getAnswer = function(){
	return Answers;
}


/*save*/ 
exports.savePaper = function(req,res){
	var paper = new Papers();
	paper.name = req.body.name;
	paper.type = req.body.type;
	paper.question_num = 0;
	paper.limit_time = req.body.limit_time;
	paper.description = req.body.description;
	paper.save();
	Papers.remove({},function(err){});
	Questions.remove({},function(err){});
	Answers.remove({},function(err){});
	res.redirect("/modify_paper/"+paper._id)
}

exports.saveQuestion = function(req,res){
	var question = new Questions();
	question.paper_id = req.params.paper_id;
	question.type = req.body.type;
	question.content = req.body.content;
	question.save();
	var answers = req.body.answers;
	for(var i=0;i<answers.length;i++){
		var answer = new Answers();
		answer.paper_id = req.params.paper_id;
		answer.question_id = question._id;
		answer.content = answers[i];
		answer.save();
		/*console.log(answer);*/
	}
}