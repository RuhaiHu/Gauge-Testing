const circle = document.querySelector('#low');
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

function setProgress(percent) {
    // const offset = circumference - percent / 100 * circumference;
    const offset = circumference - ((percent / 100)/4) * circumference;
    circle.style.strokeDashoffset = offset;
}

setProgress(45);
// // read a file to get the information to set percentage