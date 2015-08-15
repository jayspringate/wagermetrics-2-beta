function teamAssign() {
	for(i=0; i < 619; i++) {
		gameData[i].team = gameData[i].teams[0];
	}	
};

function teamAssign2 () {	
	for(i=619; i < 1238; i++) {
	gameData[i].team = gameData[i].teams[1];
	}	
};

teamAssign();
teamAssign2();

function opponentAssign() {
	for(i=0; i < 619; i++) {
		gameData[i].opponent = gameData[i].teams[1];
	}	
};

function opponentAssign2 () {	
	for(i=619; i < 1238; i++) {
	gameData[i].opponent = gameData[i].teams[0];
	}	
};

opponentAssign();
opponentAssign2();

function oddsAdjust() {
	for (i=0; i < gameData.length; i++) {
		if (gameData[i].odds[0] < 100) {
			gameData[i].odds.splice(1,0,-(gameData[i].odds[0]));
		} else {
			var temp;
			temp = gameData[i].odds[0];
			gameData[i].odds[0] = gameData[i].odds[1];
			gameData[i].odds[1] = temp;
			gameData[i].odds.splice(0,0,-(gameData[i].odds[0]));
		}
}
}

oddsAdjust();

function spreadAssign() {
	for(i=0; i < 619; i++) {
		gameData[i].spread = gameData[i].odds[0];
	}	
};

function spreadAssign2() {	
	for(i=619; i < 1238; i++) {
	gameData[i].spread = gameData[i].odds[1];
	}	
};

spreadAssign();
spreadAssign2();

function favoriteAssign () {
	for (i=0; i < gameData.length; i++) {
		if (gameData[i].spread < 0) {
			gameData[i].favorite = ["favorite"];
		} else {
			gameData[i].favorite = ["underdog"];
		}
		}
}

favoriteAssign();

function courtAssign() {
	for(i=0; i < 619; i++) {
		gameData[i].court = "road";
	}	
};

function courtAssign2() {	
	for(i=619; i < 1238; i++) {
		gameData[i].court = "home";
	}	
};

courtAssign();
courtAssign2();

function gradeAssign() {
	for(i=0; i < 619; i++) {
		if ((gameData[i].score[0] + gameData[i].spread) < gameData[i].score[1]) {
			gameData[i].grade = "loss";
		} else if ((gameData[i].score[0] + gameData[i].spread) > gameData[i].score[1]) {
			gameData[i].grade = "win";
		} else {
			gameData[i].grade = "push";
		}
	}	
};

function gradeAssign2() {
	for(i=619; i < 1238; i++) {
		if ((gameData[i].score[1] + gameData[i].spread) < gameData[i].score[0]) {
			gameData[i].grade = "loss";
		} else if ((gameData[i].score[1] + gameData[i].spread) > gameData[i].score[0]) {
			gameData[i].grade = "win";
		} else {
			gameData[i].grade = "push";
		}
	}	
};

gradeAssign();
gradeAssign2();

function totalGradeAssign() {
	for(i=0; i < gameData.length; i++) {
		if ((gameData[i].score[0] + gameData[i].score[1]) < gameData[i].odds[2]) {
			gameData[i].totalGrade = "under";
		} else if ((gameData[i].score[0] + gameData[i].score[1]) > gameData[i].odds[2]) {
			gameData[i].totalGrade = "over";
		} else {
			gameData[i].totalGrade = "push";
		}
	}
};

totalGradeAssign();