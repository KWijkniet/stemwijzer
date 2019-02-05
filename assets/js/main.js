//Get elements (requires to have "display:none;" as default)
const introElem = document.getElementById('intro');
const questionElem = document.getElementById('question');
const resultElem = document.getElementById('result');
const partijenElem = document.getElementById('partijen');

//question parts
const questionTitle = document.getElementById('questionTitle');
const questionInfo = document.getElementById('questionInfo');

const eensRow = document.getElementById('eensRow');
const noneRow = document.getElementById('noneRow');
const oneensRow = document.getElementById('oneensRow');

//show subjects in console (just a test)
console.log(subjects);

//index keep track of subject index (starts at 0)
var index = 0;
var isOpen = false;
var answers = [];

//show intro will show the info page with the start button
ShowIntro();
function ShowIntro(){
    //hide questions page and show intro page
    introElem.style.display = 'block';
    questionElem.style.display = 'none';
    resultElem.style.display = 'none';
}

//start questions
function StartQuiz(){
    index = 0;
    ShowQuestion();
}

//shows question based on index (also hides other pages)
function ShowQuestion(){
    //fix displays and heights
    partijenElem.style.height = "0px";
    introElem.style.display = 'none';
    questionElem.style.display = 'block';
    resultElem.style.display = 'none';

    //show question data on the page
    questionTitle.innerHTML = (index + 1) + ". " + subjects[index].title;
    questionInfo.innerHTML = subjects[index].statement;

    GeneratePartyVotes();
}

//shows end page with the result
function ShowEnd(){
    //hide questions page and show intro page
    introElem.style.display = 'none';
    questionElem.style.display = 'none';
    resultElem.style.display = 'block';
}

//public function for the next button
function NextQuestion(value){
    var row = {
        'title': subjects[index].title,
        'statement': subjects[index].statement,
        'answer': value,
        'priority': 0
    };
    answers[index] = row;


    //increase index
    index++;

    //if index is larger then subjects length. then show the result page. else show the next question
    if(index >= subjects.length){
        ShowEnd();
        console.log(answers);
    }else{
        ShowQuestion();
    }
}

//public function for the prev button
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

//toggle party votes dropdown
function ToggleDropdown(){
    isOpen = !isOpen;

    //change height based on toggle
    if(isOpen){
        partijenElem.style.height = "500px";
    }else{
        partijenElem.style.height = "0px";
    }
}

//Generate party votes per subject
function GeneratePartyVotes(){
    eensRow.innerHTML = "";
    noneRow.innerHTML = "";
    oneensRow.innerHTML = "";

    //loop through all parties
    for(var i = 0; i < subjects[index].parties.length; i++){
        var party = subjects[index].parties[i];
        //place party in correct place (eens, geen van beide, oneens);
        if(party.position == 'pro'){
            eensRow.innerHTML += "<li>" + party.name + "</li>";
        } else if(party.position == 'ambivalent'){
            noneRow.innerHTML += "<li>" + party.name + "</li>";
        } else if(party.position == 'contra'){
            oneensRow.innerHTML += "<li>" + party.name + "</li>";
        }
    }
}
