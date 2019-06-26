// const circle = document.querySelector('.follow-arch_arch');
// const radius = circle.r.baseVal.value;
// const circumference = radius * 2 * Math.PI;

// circle.style.strokeDasharray = `${circumference} ${circumference}`;
// circle.style.strokeDashoffset = circumference;

// function setProgress(percent) {
//     const offset = circumference - percent / 100 * circumference;
//     circle.style.strokeDashoffset = offset;
// }

// setProgress(75);
// // read a file to get the information to set percentage

class ProgressArch extends HTMLElement {
    constructor(){
        super();

        // get config from attributes 
        const stroke = this.getAttribute('stroke');
        const radius = this.getAttribute('radius');
        const normalizedRadius = radius - stroke * 2;
        this._circumference = normalizedRadius * 2 * Math.PI;

        // create shadow dom root
        this._root = this.attachShadow({mode: 'open'});
        this._root.innerHTML = `
            <svg
            height="${radius * 2}"
            width="${radius * 2}"
            >
            <circle
                stroke="black"
                stroke-dasharray="${this._circumference} ${this._circumference}"
                style="stroke-dashoffset:${this._circumference}"
                stroke-width="${stroke}"
                fill="transparent"
                r="${normalizedRadius}"
                cx="${radius}"
                cy="${radius}"
            />
            </svg>
    
            <style>
            circle {
                transition: stroke-dashoffset 0.35s;
                transform: rotate(-90deg);
                transform-origin: 50% 50%;
            }
            </style>
        `;
    }

    setProgress(percent) {
        const offset = this._circumference - (percent / 100 * this._circumference);
        const circle = this._root.querySelector('circle');
        circle.style.strokeDashoffset = offset; 
    }

    static get observedAttributes() {
        return ['progress'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'progress') {
        this.setProgress(newValue);
        }
    }
}

window.customElements.define('progressarch-arch', ProgressArch);

// emulate progress attribute change
let progress = 0;
const el = document.querySelector('progressarch-arch');

const interval = setInterval(() => {
  progress += 10;
  el.setAttribute('progress', progress);
  if (progress === 100)
    clearInterval(interval);
}, 1000);