//show subjects in console (just a test)
console.log(subjects);
console.log(parties);

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

//result view
var firstResult = document.getElementById('firstResult');
var resultsContainer = document.getElementById('results-container');

//index keep track of subjects index (starts at 0)
var index = 0;
//toggle variables
var isOpen = false;
var showBigParties = false;
var showSecularParties = false;
//store needed data in arrays
var answers = [];
var results = [];

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


//change page to show parties page
function ShowPriority(){
    HidePages();
    priority.style.display = 'block';
    myProgress.style.display = 'block';
    progressBar.style.width = (100 / (subjects.length + 4) * (index + 2)) + "%";
}

//change page to show parties page
function ShowParties(){
    HidePages();
    partiesElem.style.display = 'block';
    myProgress.style.display = 'block';
    progressBar.style.width = (100 / (subjects.length + 3) * (index + 2)) + "%";
}

//hide all pages (so i dont need to copy this code over and over again)
function HidePages(){
    introElem.style.display = 'none';
    questionElem.style.display = 'none';
    priority.style.display = 'none';
    myProgress.style.display = 'none';
    partiesElem.style.display = 'none';
    resultElem.style.display = 'none';
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

//generate priority options list
function GeneratePriorityList(){
    //update progress bar
    progressBar.style.width = (100 / (subjects.length + 3) * (index + 1)) + "%";
    //show correct page
    HidePages();
    priority.style.display = 'block';
    myProgress.style.display = 'block';

    //fill the priority list with checkboxes
    priorityList.innerHTML = '';
    for(var i = 0; i < subjects.length; i++){
        //check if already has been selected. if so then show as checked
        if(answers[i].priority == 1){
            var html = "<label class='checkbox-container'>" + subjects[i].title + "<input type='checkbox' checked value='" + i + "'><span class='checkmark'></span></label>";
            priorityList.innerHTML += html;
        }else{
            var html = "<label class='checkbox-container'>" + subjects[i].title + "<input type='checkbox' value='" + i + "'><span class='checkmark'></span></label>";
            priorityList.innerHTML += html;
        }
    }
}

function SetPriority(){
    //update progress bar
    progressBar.style.width = (100 / (subjects.length + 3) * (index + 2)) + "%";
    //get child objects and loop through them. of checked then update priority value
    var childs = priorityList.getElementsByTagName('input');
    for(var i = 0; i < childs.length; i++){
        if(childs[i].checked){
            answers[i].priority = 1;
        }else{
            answer[i].priority = 0;
        }
    }

    //show correct page
    HidePages();
    partiesElem.style.display = 'block';
    myProgress.style.display = 'block';

    //sort parties list by "size" value (hight to low)
    parties.sort(function(a, b) {
        return b.size - a.size;
    });

    //generate parties option list
    partiesContainerList.innerHTML = '';
    for(var i = 0; i < parties.length; i++){
        if(parties[i].size > 0){
            //if already checked before then show as checked again
            if(results[i] != undefined){
                var html = "<label class='checkbox-container'>" + parties[i].name + " (" + parties[i].size + ")<input type='checkbox' checked value='" + i + "'><span class='checkmark'></span></label>";
                partiesContainerList.innerHTML += html;
            }else{
                var html = "<label class='checkbox-container'>" + parties[i].name + " (" + parties[i].size + ")<input type='checkbox' value='" + i + "'><span class='checkmark'></span></label>";
                partiesContainerList.innerHTML += html;
            }
        }
    }
}

//store selected parties
function SetPartiesList(){
    //get parent container
    var childs = partiesContainerList.getElementsByTagName('input');
    //loop through child objects
    for(var i = childs.length - 1; i >= 0; i--){
        if(childs[i].checked){
            //add to results list and preset score value
            if(results[i] == undefined){
                results.push(parties[i]);
                results[results.length - 1].score = 0;
            }else{
                results[i] = parties[i];
                results[i].score = 0;
            }
        }
    }
    CalculateResults();
}

function CalculateResults(){
    //calculate scores (if same answer per question = +1 and if that question had priority do +1 extra)
    for(var q = 0; q < results.length; q++){
        for(var i = 0; i < answers.length; i++){
            var answer = answers[i];
            for(var r = 0; r < answer.parties.length; r++){
                var partie = answer.parties[r];
                if(partie == results[q].name){
                    if(answer.priority == 1){
                        results[q].score += 2;
                    }else{
                        results[q].score += 1;
                    }
                }
            }
        }
    }

    //show list based on score (highest to lowest)
    results.sort(function(a, b) {
        return b.score - a.score;
    });
    HidePages();
    result.style.display = 'block';
    progressBar.style.display = 'block';
    progressBar.style.width = (100 / (subjects.length + 2) * (index + 2)) + "%";

    firstResult.innerHTML = results[0].name + " (" + results[0].score + " punten)";
    resultsContainer.innerHTML = "";
    for(var i = 0; i < results.length; i++){
        if(results[i].score > 0 && i != 0){
            var html = "<p>" + results[i].name + " (" + results[i].score + " punten)</p>";
            resultsContainer.innerHTML += html;
        }
    }
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

//select either all big parties or small parties
function SelectBigParties(){
    //toggle boolean
    showBigParties = !showBigParties;
    //get parent container of all party checkboxes
    var childs = partiesContainerList.getElementsByTagName('input');
    //loop through all child objects
    for(var i = childs.length - 1; i >= 0; i--){
        //check toggle value
        if(showBigParties){
            //check all except when size is smaller or equal then 14 (small party)
            if(parties[i] != undefined && parties[i].size > 14){
                childs[i].checked = true;
            }else{
                childs[i].checked = false;
            }
        }else{
            //check all except when size is larger then 14 (big party)
            if(parties[i] != undefined && parties[i].size <= 14){
                childs[i].checked = true;
            }else{
                childs[i].checked = false;
            }
        }
    }
}

//select either all secular parties or non secular parties
function SelectSecularParties(){
    //toggle boolean
    showSecularParties = !showSecularParties;
    //get parent container of all party checkboxes
    var childs = partiesContainerList.getElementsByTagName('input');
    //loop through all child objects
    for(var i = childs.length - 1; i >= 0; i--){
        //check toggle value
        if(showSecularParties){
            //check all except if they are non secular
            if(parties[i] != undefined && parties[i].secular){
                childs[i].checked = true;
            }else{
                childs[i].checked = false;
            }
        }else{
            //check all except if they are secular
            if(parties[i] != undefined && !parties[i].secular){
                childs[i].checked = true;
            }else{
                childs[i].checked = false;
            }
        }
    }
}
