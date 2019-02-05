//Get elements (requires to have "display:none;" as default)
const introElem = document.getElementById('intro');
const questionElem = document.getElementById('question');
// const resultElem = document.getElementById('result');

//question parts
const questionTitle = document.getElementById('questionTitle');
const questionInfo = document.getElementById('questionInfo');

//show subjects in console (just a test)
console.log(subjects);

//index keep track of subject index (starts at 0)
var index = 0;

//show intro will show the info page with the start button
ShowIntro();
function ShowIntro(){
    //hide questions page and show intro page
    introElem.style.display = 'block';
    questionElem.style.display = 'none';
    // resultElem.style.display = 'none';
}

//shows question based on index (also hides other pages)
function ShowQuestion(){
    introElem.style.display = 'none';
    questionElem.style.display = 'block';
    // resultElem.style.display = 'none';

    console.log(subjects[index].title);
    //show question data on the page
    questionTitle.innerHTML = (index + 1) + ". " + subjects[index].title;
    questionInfo.innerHTML = subjects[index].statement;
}

//shows end page with the result
function ShowEnd(){
    //hide questions page and show intro page
    introElem.style.display = 'none';
    questionElem.style.display = 'none';
    // resultElem.style.display = 'block';
}

//public function for the button
function NextQuestion(){
    //increase index
    index++;

    //if index is larger then subjects length. then show the result page. else show the next question
    if(index > subjects.length){
        ShowEnd();
    }else{
        ShowQuestion();
    }
}

function PrevQuestion(){
    //decrease index
    index--;

    //if index is smaller then 0. then show the start page. else show the previous question
    if(index < 0){
        ShowIntro();
    }else{
        ShowQuestion();
    }
}
