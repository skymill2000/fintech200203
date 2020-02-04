var cars = [];
var car01 = {
	name : "sonata",
    ph : "500ph",
    year : "2019",
	start : function () {
		console.log("engine is starting");
	},
	stop : function () {
		console.log("engine is stoped");
	}
}
var car02 = {
	name : "BMW",
    ph : "500ph",
    year : "2019",
	start : function () {
		console.log("engine is starting");
	},
	stop : function () {
		console.log("engine is stoped");
	}
}
var car03 = {
	name : "Ford",
    ph : "500ph",
    year : "2019",
	start : function () {
		console.log("engine is starting");
	},
	stop : function () {
		console.log("engine is stoped");
	}
}

cars[0] = car01
cars[1] = car02
cars[2] = car03

for(var i = 0; i < cars.length; i++){
    var element = cars[i];
    //Todo BMW라는 차가 있을때 ! 출력
    console.log(element.name);
    if(element.name == "BMW"){
        console.log("!");
    }
}