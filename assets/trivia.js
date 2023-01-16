
var gameQuestions = $('.qtns');
var answer = $('.answer')    
var i = 0
var progressBar = $('<progress>', {
    class: "progress is-danger",
    value: i,
    max: "3",
})
var progress = $('.progressBar');
progress.append(progressBar)
var barProgress = document.querySelector('progress');
var buttonPlayer1 = $('.buttonPlayer1')
var buttonPlayer2 = $('.buttonPlayer2')
var nextQuestion = $('.nextQuestion')
var player1 = 0
var player2 = 0
var score = $('.score')
var player1ScoreBoard = $('.player1')
var player2ScoreBoard = $('.player2')
var tieScoreBoard = $('.tie')
var endgame = 0
var player1Score = localStorage.getItem('player1')
var player2Score = localStorage.getItem('player2')
var tieScore = localStorage.getItem('tie')


function getTriviaApi() {    
    var game = $('.game');
    var board = $('.scoreBoard');    
    var seconds = 4
    const triviaApi = 'fGnBcoftMFEO2Pl6TyhSpQ==0X42NWP7AgaIvW3U'


    var category = 'entertainment';
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/trivia?category=' + category,
        headers: { 'X-Api-Key': triviaApi },
        contentType: 'application/json',
        success: function (result) {            
            var questionValue = result[0].question;
            var answerValue = result[0].answer;

            gameQuestions.text(questionValue);

            var timerInterval = setInterval(function () {
                barProgress.setAttribute('value', i++)
                seconds--;
                if (seconds === 0) {
                    // Stops execution of action at set interval
                    clearInterval(timerInterval);
                    answer.text(answerValue);
                    
                }
            }, 1000);
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });
}
    
buttonPlayer1.on('click', function () {  
    player1++      
    i = 0        
    barProgress.setAttribute('value', 0)  
    answer.text("")
        
    if (endgame === 10){
        answer.text("")
        barProgress.setAttribute('class','clearBar')
        gameQuestions.text("")
        buttonPlayer1.attr('class','clearBar')
        buttonPlayer2.attr('class','clearBar')
        nextQuestion.attr('class', 'clearBar')

        if(player1 > player2){
            score.text('Player 1 Wins '+ player1 + ' to ' + player2);
            player1Score++
            localStorage.setItem('player1',player1Score)
            scoreBoard()

        }else if(player1 < player2){
            score.text('Player 2 Wins '+ player2 + ' to '+ player1);
            player2Score++
            localStorage.setItem('player2',player2Score)
            scoreBoard()

        }else{
            score.text('Is a Tie!!! '+ player1 + ' to '+ player2)
            tieScore++
            localStorage.setItem('tie',tieScore)
            scoreBoard()

        }
                
    }else{
        endgame++  
        console.log(endgame)    
        getTriviaApi()    
        
    }
    
})

buttonPlayer2.on('click', function () {
    player2++    
    i = 0        
    barProgress.setAttribute('value', 0)  
    answer.text("")
    
    if (endgame === 10){
        answer.text("")
        barProgress.setAttribute('class','clearBar')
        gameQuestions.text("")
        buttonPlayer1.attr('class','clearBar')
        buttonPlayer2.attr('class','clearBar')
        nextQuestion.attr('class', 'clearBar')

        if(player1 > player2){
            score.text('Player 1 Wins '+ player1 + ' to ' + player2);
            player1Score++
            localStorage.setItem('player1',player1Score)
            scoreBoard()
            
        }else if(player1 < player2){
            score.text('Player 2 Wins '+ player2 + ' to '+ player1);
            player2Score++
            localStorage.setItem('player2',player2Score)
            scoreBoard()

        }else{
            score.text('Is a Tie!!! '+ player1 + ' to '+ player2)
            tieScore++
            localStorage.setItem('tie',tieScore)
            scoreBoard()

        }        
    
    }else{
        endgame++   
        console.log(endgame)     
        getTriviaApi()    
        
    }
    
})
    
nextQuestion.on('click',function(){
    i = 0
    barProgress.setAttribute('value', i)  
    answer.text("")
    
    if (endgame === 10){
        answer.text("")
        barProgress.setAttribute('class','clearBar')
        gameQuestions.text("")
        buttonPlayer1.attr('class','clearBar')
        buttonPlayer2.attr('class','clearBar')
        nextQuestion.attr('class', 'clearBar')

        if(player1 > player2){
            score.text('Player 1 Wins '+ player1 + ' to ' + player2);
            player1Score++
            localStorage.setItem('player1',player1Score)
            scoreBoard()
            
        }else if(player1 < player2){
            score.text('Player 2 Wins '+ player2 + ' to '+ player1);
            player2Score++
            localStorage.setItem('player2',player2Score)
            scoreBoard()

        }else{
            score.text('Is a Tie!!! '+ player1 + ' to '+ player2)
            tieScore++
            localStorage.setItem('tie',tieScore)
            scoreBoard()

        } 
           

    }else{
        endgame++
        console.log(endgame)
        getTriviaApi()
        
    }

    
})   

function scoreBoard(){
 
    player1ScoreBoard.text('Player 1: ' + player1Score)
    player2ScoreBoard.text('Player 2: ' + player2Score)
    tieScoreBoard.text('Tie: ' + tieScore)
}

getTriviaApi()