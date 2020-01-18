var myObj={name:"John",age=24,city:"Trivandrum"};
var myJson=JSON.stringify(myObj);
window.location=""+myJson;

var myJson='{name:"Denlis",age:23,city:Kottayam};'
var myObj=JSON.parse[myJson];
document.getElementById("name").innerHTML = myObj.age;