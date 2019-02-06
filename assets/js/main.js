//show subjects in console (just a test)
console.log(subjects);

//Get pages (requires to have "display:none;" as default)
const introElem = document.getElementById('intro');
const questionElem = document.getElementById('question');
const resultElem = document.getElementById('result');
const partijenElem = document.getElementById('partijen');
const priority = document.getElementById('priority');
const myProgress = document.getElementById('myProgress');

//party rows in dropdown
const eensRow = document.getElementById('eensRow');
const noneRow = document.getElementById('noneRow');
const oneensRow = document.getElementById('oneensRow');

//question parts
var questionTitle = document.getElementById('questionTitle');
var questionInfo = document.getElementById('questionInfo');

//priority elements
var priorityList = document.getElementById('priority-container');

//progress bar
var progressBar = document.getElementById('myBar');
progressBar.style.width = (100 / (subjects.length + 2) * 1) + "%";

//index keep track of subjects index (starts at 0)
var index = 0;
var isOpen = false;
var answers = [];

//show intro will show the info page with the start button
ShowIntro();
function ShowIntro(){
    //hide questions page and show intro page
    HidePages();
    introElem.style.display = 'block';
}

//start questions
function StartQuiz(){
    progressBar.style.width = (100 / (subjects.length + 2) * 1) + "%";
    index = 0;
    ShowQuestion();
}

//shows question based on index (also hides other pages)
function ShowQuestion(){
    //fix displays and heights
    partijenElem.style.height = "0px";
    HidePages();
    questionElem.style.display = 'block';
    myProgress.style.display = 'block';

    //show question data on the page
    questionTitle.innerHTML = (index + 1) + ". " + subjects[index].title;
    questionInfo.innerHTML = subjects[index].statement;

    GeneratePartyVotes();
}

//shows end page with the result
function ShowEnd(){
    //hide questions page and show intro page
    HidePages();
    resultElem.style.display = 'block';
    myProgress.style.display = 'block';
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

    progressBar.style.width = (100 / (subjects.length + 2) * (index + 2)) + "%";

    //increase index
    index++;

    //if index is larger then subjects length. then show the result page. else show the next question
    if(index >= subjects.length){
        GeneratePriorityList();
    }else{
        ShowQuestion();
    }
}

//public function for the prev button
function PrevQuestion(){
    //decrease index
    index--;

    progressBar.style.width = (100 / (subjects.length + 2) * (index + 1)) + "%";
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
        var htmlLeft = "<li class='party-opinion'>" + party.name + "<span class='tooltiptext tooltiptext-left'>" + party.explanation + "</span</li>";
        var htmlRight = "<li class='party-opinion'>" + party.name + "<span class='tooltiptext tooltiptext-right'>" + party.explanation + "</span</li>";

        if(party.position == 'pro'){
            eensRow.innerHTML += htmlRight;
        } else if(party.position == 'ambivalent'){
            noneRow.innerHTML += htmlRight;
        } else if(party.position == 'contra'){
            oneensRow.innerHTML += htmlLeft;
        }
    }
}

function GeneratePriorityList(){
    HidePages();
    priority.style.display = 'block';
    myProgress.style.display = 'block';

    priorityList.innerHTML = '';
    for(var i = 0; i < subjects.length; i++){
        var html = "<label class='checkbox-container'>" + subjects[i].title + "<input type='checkbox' value='" + i + "'><span class='checkmark'></span></label>";
        priorityList.innerHTML += html;
    }
}

function HidePages(){
    introElem.style.display = 'none';
    questionElem.style.display = 'none';
    resultElem.style.display = 'none';
    priority.style.display = 'none';
    myProgress.style.display = 'none';
}
