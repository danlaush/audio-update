var utils = require('./lib/utils');
var moment = require('moment');

const SELECTORS = {
    moduleClass: 'module'
}

class AudioUpdateModule {

    constructor(props) {
        if(typeof props === 'undefined') props = {};

        this.type = (typeof props.type !== 'undefined') ? props.type : 'text';
        this.text = (typeof props.text !== 'undefined') ? props.text : 'Good morning';


        // this.init();
    }

    init() {
        console.log('AudioUpdateModule.init()');

    }

    render() {
        console.log('AudioUpdateModule.render()');
        var container = document.createElement('div');
        container.className = 'module';
        container.dataset.moduleType = this.type;
        var label = document.createElement('label');
        var labelText = document.createTextNode(utils.strUcFirst(this.type));
        // label.htmlFor = key;
        label.appendChild(labelText);
        var el = document.createElement('textarea');
        // el.id = key;
        el.value = this.text;
        label.appendChild(el);
        container.appendChild(label);
        
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
        // scan text as nodes, find {%d} {%MM} etc
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
        // crunch array back together with spaces
        // var current = moment().format('dddd, MMMM Do');
        // text += ' ' + current;
        return updatedText;
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