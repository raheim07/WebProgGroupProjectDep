var PlayerRegistrationData = [];
var showPercentageElement = document.getElementById('showpercentage');
var num1, num2, totalQuestions=0;
var correct, wrong, playerIndex=0, totalPlayers=0;
let percentage = 0.0;

//Function to hide the landing page - Raheim Hoilett
function hideHome(){
    document.getElementById('homeContainer').style.display='none';  //Hide homepage
    document.getElementById('loader-container').style.display='flex'; //Display loader(Extras)
    //Set a timeout befroe the registration form comes up
    setTimeout(function(){
        document.getElementById('registration_form').style.display='flex';
        document.getElementById('loader-container').style.display='none';
        document.getElementById('showcharts').style.display='flex';
          //Hide homepage
    }, 4000);
}


// Function to Register player (Task 2) - Ranita Wilson
function Register(){
    
    //Reset statistics for each player that registers
    totalQuestions=0;
    correct=0;
    wrong=0;
    
    //Remove the player statistics display area
    document.getElementById('showpercentage').style.display = "none";
    // Get the values from input fields
    correct=0;
    wrong=0;
    let fName = document.getElementById("firstName").value;
    let lName = document.getElementById("lastName").value;
    let email = document.getElementById("email").value;
    let dob = new Date(document.getElementById("dob").value);
    let gender;

    //Calculate age using getFullYear()
    var age = 2023 - dob.getFullYear();
    document.getElementById('age').value = age;

    try {
        gender = document.querySelector('input[name="gender"]:checked').value;
    } catch (error) {
        alert("Please select a value for gender");
        return false;
    }
    
    // Check if any of the required fields are empty
    if (!fName || !lName || !email || isNaN(dob.getTime()) || !document.querySelector('input[name="gender"]:checked')) {
        alert("Please fill in all required fields and select a value for gender");
        return false;
    }
    //Validate age
    if (age < 8 || age >12) {
        alert("Player must be between 8 and 12 years.");
        return false;
    }
    //Validate Name
    if (firstName.length < 3 || lastName.length < 3) {
        alert("First name and last name must be at least 3 characters long.");
        return false;
    }

    //Updating array with data from the form
    PlayerRegistrationData.push({
        firstName: fName,
        lastName: lName,
        email: email,
        dob: dob.toDateString(),
        age: age,
        gender: gender,
        CorrectAnswers: 0,
        WrongAnswers : 0,
        TotalQuestions: 0,
        PercentageScore: 0,
        question_status: ""

    });
    console.table(PlayerRegistrationData);

    var inputs = document.querySelectorAll('input');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].disabled = true;
    }
    //Disable registration area
    //Task 3 instructions
    document.getElementById('Register_Btn').disabled = true;
    document.getElementById('Start_Btn').disabled = false;
    document.getElementById('End_Btn').disabled = false;
    //Increment total players
    totalPlayers++;
}
// END registration function




//Function to play game(Task 4) - Waydia McLeod
function PlayGame() {
    document.getElementById('equation').style.display = "block";
    document.getElementById('Start_Btn').disabled = true;
    //Enable play area
    let playArea = document.getElementById("play_area");
    playArea.style.display = "flex";

    //These lines of code reset the play area
    document.getElementById('PlayerAnswer').disabled = false;
    document.getElementById('Check_Btn').disabled = false;
    document.getElementById('Next_Btn').disabled = true;
    document.getElementById('PlayerAnswer').value = "";
    // Generate two random numbers
    num1 = Math.floor(Math.random() * 9) + 1;
    document.getElementById('factor1').value = num1;
    num2 = Math.floor(Math.random() * 5) + 1;
    document.getElementById('factor2').value = num2;


}
// End play game function


// Function to check answer (Task 6) - Rajay Trowers
function CheckAnswer(){
    let playerAnswer = document.getElementById('PlayerAnswer').value;
    // Validate if it is an integer
    if (Number.isInteger(Number(playerAnswer))) {
        // It's an integer
        console.log('Valid integer input: ' + playerAnswer);
    } else {
        // It's not an integer
        console.log('Invalid input. Please enter an integer.');
    }
    //Check if player has entered an answer
    if(playerAnswer==""){
        alert("Please fill in your answer!");
        return;
    }
    //Adding the question to player index
    PlayerRegistrationData[playerIndex].question_status += num1.toString() +" x "+ num2.toString();

    totalQuestions+=1;
    let correctAnswer = num1 * num2;

    //Show that the answer is correct
    let multiplicationHeader = document.getElementById('multiplicationHeader');
    let PlayerAnswer = document.getElementById('PlayerAnswer');
    if(playerAnswer==correctAnswer){
        correct+=1;
        document.getElementById('Check_Btn').disabled = true;
        document.getElementById('Next_Btn').disabled = false;
        document.getElementById('PlayerAnswer').disabled = true;
        multiplicationHeader.innerHTML = 'Correct! Great Job!';
        PlayerAnswer.style.borderColor = "#8ac926";
        multiplicationHeader.style.color = "#8ac926";
        multiplicationHeader.classList.remove('shake');
        multiplicationHeader.classList.add('grow');
        setTimeout(() => {
            multiplicationHeader.classList.remove('grow');
        }, 500);
        //Update player correct answers total
        PlayerRegistrationData[PlayerRegistrationData.length-1].CorrectAnswers = correct; 
        //Update questions and answer, status
        PlayerRegistrationData[playerIndex].question_status += "= " + playerAnswer.toString() + " ✅Correct" + "<br>";
    }else{
        wrong+=1;
        document.getElementById('Check_Btn').disabled = true;
        document.getElementById('Next_Btn').disabled = false;
        document.getElementById('PlayerAnswer').disabled = true;
        multiplicationHeader.innerHTML = 'Incorrect Answer!';
        PlayerAnswer.style.borderColor = "red";
        multiplicationHeader.style.color = "red";
        multiplicationHeader.style.fontSize = "25px";
        multiplicationHeader.classList.remove('grow');
        multiplicationHeader.classList.add('shake');
        setTimeout(() => {
            multiplicationHeader.classList.remove('shake');
        }, 500);
        //Update player correct answers total
        PlayerRegistrationData[playerIndex].WrongAnswers = wrong;
        //Update questions and answer, status
        PlayerRegistrationData[playerIndex].question_status += "=" + playerAnswer.toString() + " ❌Incorrect" + "<br>"
    }
    PlayerRegistrationData[playerIndex].TotalQuestions = totalQuestions;
    console.table(PlayerRegistrationData);
    // Calling the showALLStats Funciton
    ShowAllStats();
    document.getElementById('findPercentage_Btn').disabled = false;
}
// END of check answer function

//Function to reset the play area when the next button is clicked
function resetPlayArea(){
    PlayerAnswer.style.borderColor = "#bb3e03";
    multiplicationHeader.innerHTML = 'Let\'s learn multiplication!';
    multiplicationHeader.style.color = "#DAD7CD";
    document.getElementById('showpercentage').style.display = "none";
}

// Function to show player statistics (Task 10) - Raheim Hoilett
function findPercentageScore(){
    document.getElementById('showpercentage').style.display = "block";
    document.getElementById('equation').style.display = "none";
    //Check if player answered anything and update percentage score respectively
    if(correct==0 && wrong==0){
        percentage = 0;
    }else{
        percentage = (correct/totalQuestions)*100;
    }
    
    PlayerRegistrationData[playerIndex].PercentageScore = parseFloat(percentage.toFixed(2));

    // Update the content of the showpercentage element
    showPercentageElement.innerHTML =  `
        <center><h1>Player Statistics</h1></center>
        <table border="1">
            <tr>   
                <th>Player's Name</th>
                <th>Total Questions</th>
                <th>Correct Answers</th>
                <th>Percentage Score</th>
                <th>Current Date</th>
            </tr>
            <tr>
                <td>${PlayerRegistrationData[playerIndex].firstName} ${PlayerRegistrationData[playerIndex].lastName}</td>
                <td>${totalQuestions}</td>
                <td>${correct}</td>
                <td>${PlayerRegistrationData[playerIndex].PercentageScore}%</td>
                <td>${new Date().toLocaleDateString()}</td>
            </tr>
        </table>
    `;
    ShowAllStats();//Update the percentage on showALL chart
    document.getElementById('findPercentage_Btn').disabled = true;
}

//Clears form whenever the user clicks the End Game button
function clearForm(){
    //increments player index
    playerIndex+=1;
    //Enable registration area
    document.getElementById('Register_Btn').disabled = false;
    document.getElementById('Start_Btn').disabled = true;
    document.getElementById('End_Btn').disabled = true;

    var inputs = document.querySelectorAll('input');
    for(var i=0; i<inputs.length; i++){
        if(inputs[i].type=='radio'){
            //reset radio button
            inputs[i].checked = false;
            inputs[i].disabled = false;
        }else{
            inputs[i].value = "";
            inputs[i].disabled = false;
        }
    }
    //Set the age input back to disabled
    document.getElementById('age').disabled = true;
}


//ShowAllStats Function (Task 13)
function ShowAllStats(){
    let showallplayersElement = document.getElementById('showallplayers');
    //Clearing data in the element
    showallplayersElement.innerHTML = "";
    document.getElementById('showallplayers').style.display = "block";

    //Gabrielle
    let tableHTML = `
        <center><h1>Player Board</h1></center>
        <table border="1">
            <tr>   
                <th>Player's Name</th>
                <th>Age</th>
                <th>Total Questions</th>
                <th>Correct Answers</th>
                <th>Percentage Score</th>
                <th>Questions and Status</th>
                <th>Current Date</th>
            </tr>`;

    PlayerRegistrationData.forEach((player, playerIndex) => {
        tableHTML += `
            <tr>
                <td>${PlayerRegistrationData[playerIndex].firstName} ${PlayerRegistrationData[playerIndex].lastName}</td>
                <td>${PlayerRegistrationData[playerIndex].age}</td>
                <td>${PlayerRegistrationData[playerIndex].TotalQuestions}</td>
                <td>${PlayerRegistrationData[playerIndex].CorrectAnswers}</td>
                <td>${PlayerRegistrationData[playerIndex].PercentageScore}%</td>
                <td>${PlayerRegistrationData[playerIndex].question_status}</td>
                <td>${new Date().toLocaleDateString()}</td>
            </tr>`;
    });

    tableHTML += `</table>`;
    showallplayersElement.innerHTML = tableHTML;

}

//Task 15
function showCharts() {
    //Counting variables initiation
    let maleCount=0;
    let femaleCount=0;
    let lesst_fifty=0, fifty_fnine=0, six_sixnine=0, 
    seven_seventynine=0, eight_eightynine=0, ninety_ninetynine=0, hundred=0, players_count=0;

    PlayerRegistrationData.forEach((player, playerIndex) => {
        if(player.gender.toLowerCase()==='male'){
            maleCount++;
        } else if (player.gender.toLowerCase()==='female'){
            femaleCount++;
        }
    });
    //Check if there are players registered in the game before calculating
    if(totalPlayers>0){
        var female_percentage = parseFloat((femaleCount/totalPlayers) *100).toFixed(2);
        document.getElementById('stat-value-female').innerHTML = "Females: " + female_percentage+"%";
        document.getElementById('fbar-container').style.width = `${female_percentage}%`;

        var male_percentage = parseFloat((maleCount/totalPlayers) *100).toFixed(2);
        document.getElementById('stat-value-male').innerHTML = "Males: " + male_percentage +"%";
        document.getElementById('mbar-container').style.width = `${male_percentage}%`;
    }

    //Prevent calculating with an empty space in percentage bar
    if(!percentage){
        return;
    }

    //Loop through global array and check percentage scores
    PlayerRegistrationData.forEach((player, playerIndex) => {
        if(percentage<50 && percentage>1){
            lesst_fifty++;
        }else if(player.PercentageScore>=50 && player.PercentageScore<60){
            fifty_fnine++;
        }else if(player.PercentageScore>=60 && player.PercentageScore<70){
            six_sixnine++;
        }else if(player.PercentageScore>=70 && player.PercentageScore<80){
            seven_seventynine++;
        }else if(player.PercentageScore>=80 && player.PercentageScore<90){
            eight_eightynine++;
        }else if(player.PercentageScore>=90 && player.PercentageScore<100){
            ninety_ninetynine++;
        }else if(player.PercentageScore==100){
            hundred++;
        }
    });
    if(lesst_fifty>=1 && totalPlayers>=1){
        let lessT50 = document.getElementById('lt50');
        lessT50.style.display = "block";
        var percent_less_than_fifty = parseFloat((lesst_fifty/totalPlayers)*100).toFixed(3);
        lessT50.style.width = `${percent_less_than_fifty}%`;
        lessT50.querySelector('h4').innerHTML = "<50%<br>" + lesst_fifty;
    }
    
    if (fifty_fnine >= 1 && totalPlayers >= 1) {
        let fifToF9 = document.getElementById('fif-f9');
        fifToF9.style.display = "block";
        var between_fifty_to_fiftynine = parseFloat((fifty_fnine / totalPlayers) * 100).toFixed(3);
        fifToF9.style.width = `${between_fifty_to_fiftynine}%`;
        fifToF9.querySelector('h4').innerHTML = ">=50%<br>" + fifty_fnine;
    }
    
    if (six_sixnine >= 1 && totalPlayers >= 1) {
        let sixToS9 = document.getElementById('six-s9');
        sixToS9.style.display = "block";
        var sixty_to_sixtynine = parseFloat((six_sixnine / totalPlayers) * 100).toFixed(3);
        sixToS9.style.width = `${sixty_to_sixtynine}%`;
        sixToS9.querySelector('h4').innerHTML = ">=60%<br>" + six_sixnine;
    }
    
    if (seven_seventynine >= 1 && totalPlayers >= 1) {
        let sevToS9 = document.getElementById('sev-s9');
        sevToS9.style.display = "block";
        var seventy_to_seventynine = parseFloat((seven_seventynine / totalPlayers) * 100).toFixed(3);
        sevToS9.style.width = `${seventy_to_seventynine}%`;
        sevToS9.querySelector('h4').innerHTML = ">=70%<br>" + seven_seventynine;
    }
    
    if (eight_eightynine >= 1 && totalPlayers >= 1) {
        let eigToE9 = document.getElementById('eig-e9');
        eigToE9.style.display = "block";
        var eighty_to_eightynine = parseFloat((eight_eightynine / totalPlayers) * 100).toFixed(3);
        eigToE9.style.width = `${eighty_to_eightynine}%`;
        eigToE9.querySelector('h4').innerHTML = ">=80%<br>" + eight_eightynine;
    }
    
    if (ninety_ninetynine >= 1 && totalPlayers >= 1) {
        let ninToN9 = document.getElementById('nin-n9');
        ninToN9.style.display = "block";
        var ninety_to_ninetynine = parseFloat((ninety_ninetynine / totalPlayers) * 100).toFixed(3);
        ninToN9.style.width = `${ninety_to_ninetynine}%`;
        ninToN9.querySelector('h4').innerHTML = ">=90%<br>" + ninety_ninetynine;
    }
    
    if (hundred >= 1 && totalPlayers >= 1) {
        let hundredDiv = document.getElementById('hundred');
        hundredDiv.style.display = "block";
        var hundred_percent = parseFloat((hundred / totalPlayers) * 100).toFixed(3);
        hundredDiv.style.width = `${hundred_percent}%`;
        hundredDiv.querySelector('h4').innerHTML = "100%<br>" + hundred;
    }
    percentage=0;
    
}

// Call the Showcharts function once when the page loads
window.onload = function() {
    showCharts(); // Call the function initially
    // Set interval to call the function every 5 seconds
    setInterval(showCharts, 5000); // 5000 milliseconds = 5 seconds
};




// ANIMATIONS
// Get the elements you want to animate
const element1 = document.querySelector('.symbol-container');
const element2 = document.querySelector('.symbol-containert');
const element3 = document.querySelector('.symbol-containerth');

// Function to generate a random value between min and max
function getRandomValue(min, max) {
    return Math.random() * (max - min) + min;
}

// Apply random transform values to the elements
function animateElements() {
    animateElement(element1, -10, 10, -10, 10);
    animateElement(element2, -5, 5, -20, 20);
    animateElement(element3, -20, 20, -5, 5);
}

// Function to animate a single element with specific ranges
function animateElement(element, minX, maxX, minY, maxY) {
    element.style.transition = 'transform 5s'; // Smooth transition over 5 seconds
    element.style.transform = `translate(${getRandomValue(minX, maxX)}vw, ${getRandomValue(minY, maxY)}vh)`;
    element.style.position = "relative";
    element.style.zIndex = "-1000";
}
// Run the animation periodically
setInterval(animateElements, 8000); // Change the interval as needed
//END OF ANIMATION

