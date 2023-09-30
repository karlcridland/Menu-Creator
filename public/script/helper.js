class Helper {

    constructor() {
        this.display = document.getElementById('helper');
        this.shouldFollow = false;

        window.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;
            this.display.style.transform = `translate(calc(${x}px - 50%), calc(${y - 10}px - 100%))`;
        })
    }

    setText(text) {
        this.display.textContent = text;
    }

}

const helper = new Helper();

HTMLElement.prototype.help = function (text) {
    const self = this;
    helper.setText(text);
    self.addEventListener('mouseover', () => {
        helper.setText(text);
    });
    self.addEventListener('mouseenter', () => {
        helper.display.style.display = 'block';
    });
    self.addEventListener('mouseleave', () => {
        helper.display.style.display = 'none';
    })
}

export function removeHelper(){
    helper.display.style.display = 'none';
}