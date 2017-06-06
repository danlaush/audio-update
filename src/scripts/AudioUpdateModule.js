var utils = require('./lib/utils');
var moment = require('moment');

const SELECTORS = {
    moduleClass: 'module',
    modulesContainer: 'modules'
}

class AudioUpdateModule {

    constructor(props) {
        if(typeof props === 'undefined') props = {};

        if(typeof props.id === 'undefined') {
            return new Error("props.id not defined");
        }
        this.id = props.id;
        this.type = (typeof props.type !== 'undefined') ? props.type : 'text';
        this.text = (typeof props.text !== 'undefined') ? props.text : 'Good morning';

        this.modulesContainer = document.getElementById(SELECTORS.modulesContainer);    
    }

    getData() {
        console.log('AudioUpdateModule.getData()');
        return {
            id: this.id,
            type: this.type,
            text: this.text
        }
    }

    render() {
        var self = this;
        console.log('AudioUpdateModule.render()');
        var container = document.createElement('div');
        container.className = 'module';
        container.dataset.moduleType = self.type;
        container.id = 'module' + self.id;
        var label = document.createElement('label');
        var labelText = document.createTextNode(utils.strUcFirst(self.type));
        // label.htmlFor = key;
        label.appendChild(labelText);
        var el = document.createElement('textarea');
        // el.id = key;
        el.value = self.text;
        label.appendChild(el);
        container.appendChild(label);
        var deleteButton = document.createElement('button');
        deleteButton.innerHTML = "Delete";
        deleteButton.addEventListener('click', self.deleteSelf.bind(this));
        container.appendChild(deleteButton);

        self.domElement = container;
        return container;
    }

    renderText() {
        console.log('AudioUpdateModule.renderText()');
        switch(this.type) {
            case 'date':
                return this.renderDate(this.text);

            default: // case 'text'
                return this.text;
        }
        return this.text;
    }

    renderDate(text) {
        console.log('AudioUpdateModule.renderDate()');
        // scan text word by word, find {%d} {%MM} etc
        // replace {} variables with data

        // split string
        var textArray = text.split(' ');
        // map to word replacement with date if in {}
        var updatedTextArray = textArray.map(function(text) {
            // if word bookended by {}
            // TODO: ignore punctuation
            if(text.charAt(0) === '{' && text.charAt(text.length-1) === '}') {
                // replace contents with moment format
                var dateFormat = utils.strStripEnds(text);
                return moment().format(dateFormat);
            } else {
                return text;
            }
        });
        var updatedText = updatedTextArray.join(' ');
        return updatedText;
    }

    deleteSelf() {
        console.log('AudioUpdateModule.deleteSelf()');
        this.modulesContainer.removeChild(this.domElement);
    }
}

module.exports = AudioUpdateModule;