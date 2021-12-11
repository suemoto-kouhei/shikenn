//パラメータ取得
const getParam = ((name, url) => {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
});

let checks = [];
if( localStorage.getItem('check')){
	checks = localStorage.getItem('check').split(',').map((elem) => {
		return Number(elem);
	})
}
let question_answers = [];
if( localStorage.getItem('question_answer')){
	question_answers = localStorage.getItem('question_answer').split(',').map((elem) => {
		return Number(elem);
	});
};

let questions_list = [];
if( localStorage.getItem('questions_listItem')){
	questions_list = localStorage.getItem('questions_listItem').split(',').map((elem) => {
		return Number(elem);
	})
};

let total = [];
if( localStorage.getItem('score-total')){
	total = localStorage.getItem('score-total').split(',').map((elem) => {
		return Number(elem);
	})
};



