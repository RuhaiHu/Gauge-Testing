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

class ProgressCircle extends HTMLElement {
    constructor(){
        super();

        // get config from attributes 
        const stroke = this.getAttribute('stroke');
        const radius = this.getAttribute('radius');
        // So if the input is 1 its a whole circle, 2 is half circle, 4 is quarter
        const circleType = this.getAttribute('circleType');
        // if TL top left , TR top  right , BL bottom right, BR bottom right
        const circleStart = this.getAttribute('circleStart');
        const normalizedRadius = radius - stroke * 2;
        const circumference = Math.round(normalizedRadius * 2 * Math.PI);
        const circumferenceHalf = Math.round((normalizedRadius * 2 * Math.PI)/2);
        const circumferenceQuarter = Math.round((normalizedRadius * 2 * Math.PI)/4);
        // this._circumference = normalizedRadius * 2 * Math.PI;
        this.setAttribute('style', 'transform-origin: center;');
        var circumferenceMain, circumferenceSecond, circumferenceOffset;
        var percent = this.getAttribute('progress');

        switch (circleType) {
            case 1:
                circumferenceMain = circumference;
                circumferenceSecond = circumference;
                circumferenceOffset = circumference - (percent / 100 * circumference);
                break;

            case 2:
                circumferenceMain = circumference;
                circumferenceSecond = circumferenceHalf;
                circumferenceOffset = circumferenceHalf - (((percent / 100)/2) * circumference);
                break;
            
            case 4:
                circumferenceMain = circumference;
                circumferenceSecond = circumferenceQuarter;
                circumferenceOffset = circumferenceQuarter - (((percent / 100)/4) * circumference);
                break;
        
            default:
                console.log("Invalid or no circleType given! Using full circle.")
                circumferenceMain = circumference;
                circumferenceSecond = circumference;
                circumferenceOffset = circumference - (percent / 100 * circumference);
                break;
        }
        
        switch (circleStart) {
            case 'TL':
                this.setAttribute('style', 'transform: rotateX(180deg) rotateY(180deg);');
                break;

            case 'TR':
                this.setAttribute('style', 'transform: rotateX(360deg) rotateY(360deg);');
                break;

            case 'BL':
                this.setAttribute('style', 'transform: rotateX(90deg) rotateY(90deg);');
                break;
                    
            case 'BR':
                this.setAttribute('style', 'transform: rotateX(0deg) rotateY(0deg);');
                break;

            default:
                console.log("No circleStart given! Using default!");
                this.setAttribute('style', 'transform: rotateX(180deg) rotateY(180deg);');
                break;
        }
        

        // create shadow dom root
        this._root = this.attachShadow({mode: 'open'});
        this._root.innerHTML = `
            <svg
            height="${radius * 2}"
            width="${radius * 2}"
            >
            <circle
                stroke="black"
                stroke-dasharray="${circumferenceSecond} ${circumferenceMain}"
                stroke-dashoffset="${circumferenceOffset}"
                stroke-width="${stroke}"
                fill="transparent"
                r="${normalizedRadius}"
                cx="${radius}"
                cy="${radius}"
            />
            </svg>
        `;
        // <style>
        //     circle {
        //         transition: stroke-dashoffset 0.35s;
        //         transform: rotate(-90deg);
        //         transform-origin: 50% 50%;
        //     }
        //     </style>
    }

    // this is causing me issues
    setProgress(percent) {
        //const offset = this._circumference - (percent / 100 * this._circumference);
        const circle = this._root.querySelector('circle');
        const offset = this._root.querySelector('circumferenceOffset');
        // var offset = circle.getAttribute('circumferenceOffset');
        
        circle.style.strokeDashoffset = offset; 
        // console.log("Circle stroke-dasharray: " + this._root.querySelector);
        console.log("Circle stroke-dashoffset: " + offset);
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

window.customElements.define('progresscircle-01', ProgressCircle);

// emulate progress attribute change
let progress = 0;
const el = document.querySelector('progresscircle-01');

// const interval = setInterval(() => {
//   progress += 10;
//   el.setAttribute('progress', progress);
//   if (progress === 100)
//     clearInterval(interval);
// }, 1000);