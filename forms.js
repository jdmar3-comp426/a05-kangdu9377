window.addEventListener("load", function () {
    //  Global User Vars
    var thisUser = null;
    var loggedIn;





    // create a score profile after each time  ******not working
    function saveScore( form, score ) {
        const sendRequest = new XMLHttpRequest();
        var updateInfo = new URLSearchParams(new FormData( form ));
        updateInfo.append('user', thisUser.user);
        updateInfo.append('name', thisUser.name);
        updateInfo.append('score', score);
        sendRequest.addEventListener("error", function(event){
            alert('Changes were unsuccessful! Please try again.');
        });
        sendRequest.addEventListener("load", function(event){
            // alert('Your score was added!');
        });
        sendRequest.open("POST", "http://localhost:5000/app/new/score");
        sendRequest.send( updateInfo );
    }

    // when click "save your score" button, do saveScore()
    const score_val = document.getElementById("score");
    const score_button = document.getElementById("saveScore");
    score_button.addEventListener("click", function(event){
        event.preventDefault();
        if (loggedIn){
            saveScore(this, score_val.innerHTML); 
        } else {
            alert('Log in to save score!');
        }
    });


    // retrieve the highest score from database
    function getHighest( form ) {
        const sendRequest = new XMLHttpRequest();
        sendRequest.addEventListener("error", function(event){
            alert('retrieving score unsuccessful! Please try again.');
        });

        sendRequest.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                // alert(sendRequest.responseText);
                document.getElementById("showScore").innerHTML = sendRequest.responseText;
            }
        }
        sendRequest.open("GET", "http://localhost:5000/app/user/highest");
        sendRequest.send(); 
    }
// when click "show highest score" button, do getHighest()
    const getScore = document.getElementById("highestScore");
    getScore.addEventListener("click", function(event){
        event.preventDefault();
        getHighest(this)        
    });

});    
