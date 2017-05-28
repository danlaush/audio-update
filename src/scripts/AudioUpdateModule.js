
class AudioUpdateModule {
    constructor(props) {
        if(typeof props === 'undefined') props = {};

        this.type = (typeof props.type !== 'undefined') ? props.type : 'text';
        this.text = (typeof props.text !== 'undefined') ? props.text : 'Good morning';

        this.init();
    }

    init() {
        console.log('AudioUpdateModule.init()');

    }

    render() {
        console.log('AudioUpdateModule.render()');
        var container = document.createElement('div');
        container.className = 'module';
        var label = document.createElement('label');
        var labelText = document.createTextNode('Text');
        // label.htmlFor = key;
        label.appendChild(labelText);
        var el = document.createElement('input');
        // el.id = key;
        el.value = this.text;
        label.appendChild(el);
        container.appendChild(label);
        
        return container;
    }

    renderText() {
        console.log('AudioUpdateModule.renderText()');
        var container = document.createElement('div');
        return container;
    }

    renderDate() {
        console.log('AudioUpdateModule.renderDate()');
        var container = document.createElement('div');
        return container
    }

    getData() {
        return {
            type: this.type,
            text: this.text
        }
    }

    myPrint() {
        console.log('AudioUpdateModule.myPrint()');
        return this.text;
    }
}

module.exports = AudioUpdateModule;