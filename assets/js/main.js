//show subjects in console (just a test)
// console.log(subjects);
// console.log(parties);

//Get pages (requires to have "display:none;" as default)
const introElem = document.getElementById('intro');
const questionElem = document.getElementById('question');
const resultElem = document.getElementById('result');
const partijenElem = document.getElementById('partijen');
const priority = document.getElementById('priority');
const myProgress = document.getElementById('myProgress');
const partiesElem = document.getElementById('parties');

//party rows in dropdown
const eensRow = document.getElementById('eensRow');
const noneRow = document.getElementById('noneRow');
const oneensRow = document.getElementById('oneensRow');

//question parts
var questionTitle = document.getElementById('questionTitle');
var questionInfo = document.getElementById('questionInfo');

//option elements
var priorityList = document.getElementById('priority-container');
var partiesContainerList = document.getElementById('parties-container');

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
    progressBar.style.width = (100 / (subjects.length + 3) * 1) + "%";
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

    document.getElementById('Eens').classList.remove("active");
    document.getElementById('Geen van beide').classList.remove("active");
    document.getElementById('Oneens').classList.remove("active");

    if(answers.length >= index && answers[index] != undefined && answers[index].answer != ''){
        var button = document.getElementById(answers[index].answer);
        button.classList.add("active");
    }

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
        'priority': 0,
        'parties': GetPartiesWithSameAnswer(value)
    };
    answers[index] = row;

    progressBar.style.width = (100 / (subjects.length + 3) * (index + 2)) + "%";

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

    progressBar.style.width = (100 / (subjects.length + 3) * (index + 1)) + "%";
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
    progressBar.style.width = (100 / (subjects.length + 3) * (index + 1)) + "%";
    HidePages();
    priority.style.display = 'block';
    myProgress.style.display = 'block';

    priorityList.innerHTML = '';
    for(var i = 0; i < subjects.length; i++){
        var html = "<label class='checkbox-container'>" + subjects[i].title + "<input type='checkbox' value='" + i + "'><span class='checkmark'></span></label>";
        priorityList.innerHTML += html;
    }
}

function SetPriority(){
    progressBar.style.width = (100 / (subjects.length + 3) * (index + 2)) + "%";
    var childs = priorityList.getElementsByTagName('input');
    for(var i = 0; i < childs.length; i++){
        if(childs[i].checked){
            answers[i].priority = 1;
        }
    }
    HidePages();
    partiesElem.style.display = 'block';
    myProgress.style.display = 'block';

    parties.sort(function(a, b) {
        return b.size - a.size;
    });

    partiesContainerList.innerHTML = '';
    for(var i = 0; i < parties.length; i++){
        if(parties[i].size > 0){
            var html = "<label class='checkbox-container'>" + parties[i].name + " (" + parties[i].size + ")<input type='checkbox' value='" + i + "'><span class='checkmark'></span></label>";
            partiesContainerList.innerHTML += html;
        }
    }
}

function SetPartiesList(){
    var childs = partiesContainerList.getElementsByTagName('input');
    var results = [];
    for(var i = childs.length - 1; i >= 0; i--){
        if(childs[i].checked){
            results.push(parties[i]);
            results[results.length - 1].score = 0;
        }
    }
    CalculateResults(results);
}

function CalculateResults(list){
    for(var q = 0; q < list.length; q++){
        for(var i = 0; i < answers.length; i++){
            var answer = answers[i];
            for(var r = 0; r < answer.parties.length; r++){
                var partie = answer.parties[r];
                if(partie == list[q].name){
                    if(answer.priority == 1){
                        list[q].score += 2;
                    }else{
                        list[q].score += 1;
                    }
                }
            }
        }
    }

    list.sort(function(a, b) {
        return b.score - a.score;
    });
    console.log(list);
    //calculate scores (if same answer per question = +1 and if that question had priority do +1 extra)
    //show list based on score (highest to lowest)
    HidePages();
    result.style.display = 'block';
}

function GetPartiesWithSameAnswer(value){
    var arr = [];
    var answer = value == 'Eens' ? 'pro' : value == 'Oneens' ? 'contra' : value == 'Geen van beide' ? 'ambivalent' : "";
    for(var i = 0; i < subjects[index].parties.length; i++){
        var party = subjects[index].parties[i];
        if(party.position == answer){
            arr.push(party.name);
        }
    }
    return arr;
}

function HidePages(){
    introElem.style.display = 'none';
    questionElem.style.display = 'none';
    resultElem.style.display = 'none';
    priority.style.display = 'none';
    myProgress.style.display = 'none';
    partiesElem.style.display = 'none';
}
