var obvodZeme = 40075;
var celkemUrazeno = 0;
var celkemNaplanovano = 0;


// window.addEventListener('resize', function () { 
//     "use strict";
//     window.location.reload(); 
// });
var infoOn = false;
window.addEventListener('click', function(e){   
  if (document.getElementById('infoDiv').contains(e.target)||document.getElementById('showinfo').contains(e.target)){
    // Clicked in box
  } else{
    if (infoOn) {
        infoDiv.style.opacity = "0";
        setTimeout(function() {infoDiv.style.display = "none";}, 500);
        infoOn = false;
    };
  }
});
function showInfo() {
    if (!infoOn) {
        infoDiv.style.display = "block";
        setTimeout(function() {infoDiv.style.opacity = "1";}, 10);
        infoOn = true;
    } else {
        infoDiv.style.opacity = "0";
        setTimeout(function() {infoDiv.style.display = "none";}, 500);
        infoOn = false;
    };
}
document.addEventListener("DOMContentLoaded", function(){
    console.log("LOADED!")
    var tridyWrapper = document.getElementById("wrapper")
    tridy.forEach(trida => {
        celkemUrazeno+=trida.walked;
        tridyWrapper.innerHTML += `<div class="trida-main" id="${trida.divName}">`
        var mainDiv = document.getElementById(trida.divName);
        mainDiv.innerHTML = `<h2>${trida.name}</h2>`;
        document.getElementById("prehledtrid").innerHTML += `<a href="#${trida.divName}">${trida.name}</a>`;


        //Nový graf
        var odsazeni = Math.ceil((trida.walked/trida.allWay)*100);

        var newGraf = document.createElement("DIV")
        newGraf.classList.add("progress")
        mainDiv.appendChild(newGraf)
        var newGrafContainer = document.createElement("DIV")
        newGrafContainer.classList.add("progress__container")
        newGraf.appendChild(newGrafContainer)
        var newGrafBar = document.createElement("DIV")
        newGrafBar.classList.add("progress__bar")
        newGrafContainer.appendChild(newGrafBar)
        newGrafBar.style.cssText = `width: ${odsazeni}%`
        var step = document.createElement("DIV")
        step.classList.add("step", "step--first")
        var stepContent = document.createElement("DIV")
        stepContent.classList.add("step__content")
        stepTitle = document.createElement("DIV")
        stepTitle.classList.add("step__title")
        stepTitle.innerHTML = "Gymso";
        var stepIcon = document.createElement("span")
        stepIcon.classList.add("step__title--status-icon", "step__title--status-icon-completed", "step__title--status-icon--first")
        stepTitle.appendChild(stepIcon)
        stepContent.appendChild(stepTitle)
        step.appendChild(stepContent)
        newGrafBar.appendChild(step)

        let cilu = trida.targets.length;
        // console.log(trida.targets[cilu-1])

        for (cilIndex in trida.targets) {
            if (cilIndex == cilu-1){
                continue
            }
            cil = trida.targets[cilIndex]
            var jmeno = cil[0];
            var vzdalenost = cil[1];
            var step = document.createElement("DIV")
            step.classList.add("step")
            var stepContent = document.createElement("DIV")
            stepContent.classList.add("step__content")
            stepTitle = document.createElement("DIV")
            stepTitle.classList.add("step__title")
            
            var stepIcon = document.createElement("span")
            stepIcon.classList.add("step__title--status-icon")
            if (trida.walked >= vzdalenost) {
                stepIcon.classList.add("step__title--status-icon-completed")
            }

            var stepText = document.createElement("span")
            stepText.classList.add("step-text")
            stepText.textContent = jmeno;

            stepTitle.appendChild(stepIcon)
            stepTitle.appendChild(stepText)
            stepContent.appendChild(stepTitle)
            step.appendChild(stepContent)
            newGrafBar.appendChild(step)
    
            var odsazeni = Math.ceil((vzdalenost/trida.allWay)*100);
            step.style.cssText =  `left:${odsazeni}%`;
            // stepTitle.innerHTML = jmeno;
        };

        var step = document.createElement("DIV")
        step.classList.add("step", "step--last")
        var stepContent = document.createElement("DIV")
        stepContent.classList.add("step__content")
        stepTitle = document.createElement("DIV")
        stepTitle.classList.add("step__title")
        stepTitle.innerHTML = trida.targets[cilu-1][0];
        var stepIcon = document.createElement("span")
        stepIcon.classList.add("step__title--status-icon", "step__title--status-icon--last")
        if (trida.walked >= trida.targets[cilu-1][1]){
            stepIcon.classList.add("step__title--status-icon-completed")
        }
        stepTitle.appendChild(stepIcon)
        stepContent.appendChild(stepTitle)
        step.appendChild(stepContent)
        newGrafBar.appendChild(step)

        celkemNaplanovano += trida.targets[cilu-1][1]
        
        // var graf = document.createElement("DIV");
        // graf.classList.add("graf");
        // mainDiv.appendChild(graf); 
        // var done = document.createElement("DIV");
        // done.classList.add("walked");
        // done.innerHTML += "<img src='bezec.png'>";
        // graf.appendChild(done);
        var sumary = document.createElement("DIV");
        sumary.classList.add("sumary");
        mainDiv.appendChild(sumary);

        // var odsazeni = Math.ceil((trida.walked/trida.allWay)*100);
        // done.style.cssText =  `width:${odsazeni}%`;
        
        sumary.innerHTML = `Skupina "${trida.name}" urazila <b>${trida.walked} km </b> z plánovaných <b> ${trida.planned} km</b>.`;
        sumary.innerHTML += "<br>Přehled plánovaných cílů:";
        var seznam = document.createElement("ul");
        
        sumary.appendChild(seznam);
        trida.targets.forEach(cil => {
            var jmeno = cil[0];
            var vzdalenost = cil[1];
            var novyCil = document.createElement("DIV");
            novyCil.classList.add("cil");
    
            // var odsazeni = Math.ceil((vzdalenost/trida.allWay)*100);
            // novyCil.style.cssText =  `left:${odsazeni}%`;
            // novyCil.innerHTML = jmeno;
            // graf.appendChild(novyCil);
            polozka = document.createElement("li");
            polozka.innerHTML = jmeno + "(" + vzdalenost + " km)";
            if (vzdalenost<=trida.walked) {
                polozka.classList.add("hotovo");
            } else {
                polozka.classList.add("nehotovo");
            }
            sumary.appendChild(polozka);
        });
    });

    //Kruh školy
    document.getElementById("zprava").innerHTML = `Obvod země je ${obvodZeme} km. Naplánovali jsme si celkem ${celkemNaplanovano} km, z toho jsme zatím urazili ${celkemUrazeno} km.`;
    var el = document.getElementById('graph'); 

    var options = {
        percent:  Math.floor(celkemUrazeno/celkemNaplanovano*100),
        size: el.getAttribute('data-size') || 320,
        lineWidth: el.getAttribute('data-line') || 15,
        rotate: el.getAttribute('data-rotate') || 0
    }

    var canvas = document.createElement('canvas');
    var span = document.createElement('span');
    span.classList.add("procenta")
    span.textContent = options.percent + ' %';
        
    if (typeof(G_vmlCanvasManager) !== 'undefined') {
        G_vmlCanvasManager.initElement(canvas);
    }

    var ctx = canvas.getContext('2d');
    canvas.width = canvas.height = options.size;

    el.appendChild(span);
    el.appendChild(canvas);

    ctx.translate(options.size / 2, options.size / 2); 
    ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); 

    //imd = ctx.getImageData(0, 0, 240, 240);
    var radius = (options.size - options.lineWidth) / 2 + 1;

    var drawCircle = function(color, lineWidth, percent) {
            percent = Math.min(Math.max(0, percent || 1), 1);
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
            ctx.strokeStyle = color;
            ctx.lineCap = 'round'; // butt, round or square
            ctx.lineWidth = lineWidth
            ctx.stroke();
    };
    console.log(window.matchMedia("(prefers-color-scheme: dark)").matches)
    if (window.matchMedia("(prefers-color-scheme: light)").matches){
        drawCircle('#ccc', options.lineWidth, 100 / 100);
    } else {
        drawCircle('#323232', options.lineWidth, 100 / 100);
    }
    drawCircle('#4CAF50', options.lineWidth, options.percent / 100);
    
    // Výpočet dne
    var tit = document.getElementById("maintitle");
    var start = new Date(2021, 02, 23);
    var ted = new Date;
    var dnu = Math.floor((ted - start) / (1000 * 60 * 60 * 24));
    console.log(dnu, ted, start)
    if (dnu<0) {
        dnu = 0;
    }
    tit.innerHTML += dnu + ".";
});