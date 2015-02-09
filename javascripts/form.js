var getPoint = function()
{
   var p = {};
   p.name = document.pForm.elements["nameP"].value;
   p.data = document.pForm.elements["calendar"].value;
   p.time = document.pForm.elements["clock"].value;
   alert("Get Point!");
   pushMoment(p);
}

var pushMoment = function(p)
{
  Moments.push(p);
  console.log("New moment in Array!");
  Moments.forEach(function(moment, i)
  {
    console.log("moment #"+ i + " name: " + moment.name);
    console.log("moment #"+ i + " data: " + moment.data);
    console.log("moment #"+ i + " time: " + moment.time);
  });
  addList();
}

var addList = function()
{
  $(".listP option").remove();
  Moments.forEach(function(moment)
  {
   $(".listP").append("<option>" + moment.name + "</option>");
  });
}

var savePoint = function() 
{
  alert("Save Point!");
}