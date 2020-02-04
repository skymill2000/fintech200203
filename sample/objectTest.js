var car = {
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

console.log(car.name);
console.log(car.ph);
car.start()