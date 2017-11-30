var ulRegion = document.getElementById('ul-region');
var ulLim = document.getElementById('ul-lim');
var divRegion = document.getElementById('divRegion');
var lima = document.getElementById('lim');
var ulLim = document.getElementById('ul-lim');
var lim172 = document.getElementById('lim172');
var lim171 = document.getElementById('lim171');
var lim162 = document.getElementById('lim162');
var arequipa = document.getElementById('aqp');
var ulAqp = document.getElementById('ul-aqp');
var aqp171 = document.getElementById('aqp171');
var aqp162 = document.getElementById('aqp162');
var chile = document.getElementById('scl');
var ulScl = document.getElementById('ul-scl');
var scl172 = document.getElementById('scl172');
var scl171 = document.getElementById('scl171');
var scl162 = document.getElementById('scl162');
var mexico = document.getElementById('cdmx');
var ulCdmx = document.getElementById('ul-cdmx');
var cdmx172 = document.getElementById('cdmx172');
var cdmx171 = document.getElementById('cdmx171');
var previous = divRegion;
var numberBoxStudents = document.getElementById('number-box-students');
var studentsDropout = document.getElementById('students-dropout');
console.log(data[sede]);


window.addEventListener('load', function() {
  divRegion.addEventListener('click', showAllRegions);
  lima.addEventListener('click', optionsLima);
  lim172.addEventListener('click', optionslim172);
  lim171.addEventListener('click', optionslim171);
  lim162.addEventListener('click', optionslim162);
  arequipa.addEventListener('click', optionsArequipa);
  // aqp171.addEventListener('click', optionsaqp171);
  chile.addEventListener('click', optionsChile);
  mexico.addEventListener('click', optionsMexico);
  var region = lim172.dataset.region;
  var promotion = lim172.dataset.promotion;
  showMain(region, promotion);
});
function showAllRegions() {
  // ulRegion.classList.toggle('hidden');
  ulRegion.classList.toggle('hidden');
  paintOptions(lim172, previous);
  // paintOptions(divRegion, previous);
  ulAqp.classList.toggle('hidden');
  ulScl.classList.toggle('hidden');
  ulCdmx.classList.toggle('hidden');
};
function paintOptions(option, previous) {
  option.classList.add('yellow');
  if (option !== previous)
    previous.classList.remove('yellow');
}
/*
function options(optionRegion, index) {
  // paintOptions(optionRegion, previous);
  previous = optionRegion;
  showRegion();
  ul[index].classList.toggle('hidden');
}
*/
function optionsLima() {
  paintOptions(lima, previous);
  previous = lima;
  ulLim.classList.toggle('hidden');
}
function optionslim172() {
  paintOptions(lim172, previous);
  previous = lim172;
  var region = lim172.dataset.region;
  var promotion = lim172.dataset.promotion;
  showMain(region, promotion);
}
function optionslim171() {
  paintOptions(lim171, previous);
  previous = lim171;
  var region = lim171.dataset.region;
  var promotion = lim171.dataset.promotion;
  showMain(region, promotion);
}
function optionslim162() {
  paintOptions(lim162, previous);
  previous = lim162;
}
function optionsArequipa() {
  paintOptions(arequipa, previous);
  previous = arequipa;
  ulAqp.classList.toggle('hidden');
}
function optionsChile() {
  paintOptions(chile, previous);
  previous = chile;
  ulScl.classList.toggle('hidden');
}
function optionsMexico() {
  paintOptions(mexico, previous);
  previous = mexico;
  ulCdmx.classList.toggle('hidden');
}
function showMain(region, promotion) {
  showTotalStudents(region, promotion);
}
function showTotalStudents(region, promotion) {
  var current = 0;
  var deserted = 0;
  var sedeRegion = region;
  var generation = promotion;
  for (var regionData in data) {
    if (regionData === sedeRegion) {
      for (var promo in data [regionData]) {
        if (promo === generation) {
          for (var students in data [regionData][promo]) {
            if (students === 'students') {
              for (var eachStudent in data [regionData][promo][students]) {
                var active = data[sedeRegion][promo][students][eachStudent]['active'];
                (active) ? current++ : deserted++;
              }
            }
          }
        }
      }
    }
    numberBoxStudents.textContent = current;
    numberBoxStudents.classList.toggle('number-box-int');
    studentsDropout.textContent = parseFloat(deserted/(current + deserted)*100).toFixed(0) + '%';
    drawTotalStudents(current, deserted);
  }
  console.log("current" + current + "deserted" + deserted);
// Obtener a quien elijo
// LIM172 = data.LIM['2017-2'];
// Pasar parametro para obtener ya datos estadisticos*/
}
/*
function sowOverGoal(region, promotion) {
  var meet = 0;
  var falis = 0;
  for (var regionData in data) {
    if (regionData === sedeRegion) {
      for (var promo in data [regionData]) {
        if (promo === generation) {
          for (var students in data [regionData][promo]) {
            if (students === 'students') {
              for (var eachStudent in data [regionData][promo][students]) {
                var active = data[sedeRegion][promo][students][eachStudent]['active'];

                (active) ? current++ : deserted++;
              }
            }
          }
        }
      }
    }
    numberBoxStudents.textContent = current;
    numberBoxStudents.classList.toggle('number-box-int');
    drawTotalStudents(current, deserted);
  }
}
*/

/*************************GRAFICOS************/
function drawTotalStudents(current, deserted) {
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    var dataTest = new google.visualization.DataTable();
    dataTest.addColumn('string', 'Topping');
    dataTest.addColumn('number', 'Slices');
    dataTest.addRows([
      ['Inscritas', current],
      ['Desertaron', deserted],
    ]);
    var options = {
      'colors': ['#109618', '#dc3912'],
      'width': 320,
      'height': 150 };
    var chart = new google.visualization.PieChart(document.getElementById('chart_div_enrollment'));
    chart.draw(dataTest, options);
  }
}