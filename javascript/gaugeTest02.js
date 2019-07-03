const circle = document.getElementById('low');
const radius = circle.r.baseVal.value;
const circumference = Math.round(radius * 2 * Math.PI);
const circumferenceHalf = Math.round((radius * 2 * Math.PI)/2);
const circumferenceQuarter = Math.round((radius * 2 * Math.PI)/4);
const progressText = document.getElementById('word');

console.log("Circumference: " + circumference);
console.log("Circumference Half: " + circumferenceHalf);
console.log("Circumference Quarter: " + circumferenceQuarter);

circle.style.strokeDasharray = `${circumferenceQuarter} ${circumference}`;
// circle.style.strokeDashoffset = circumference;



function setProgress(percent) {
    // const offset = circumference - percent / 100 * circumference;
    const offset = circumferenceQuarter - ((percent / 100)/4) * circumference;
    circle.style.strokeDashoffset = offset;
    progressText.innerHTML = percent;
    console.log("Circle stroke-dasharray: " + circle.style.strokeDasharray);
    console.log("Circle stroke-dashoffset: " + circle.style.strokeDashoffset);
}

setProgress(50);
// // read a file to get the information to set percentage