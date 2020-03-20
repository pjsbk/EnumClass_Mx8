import { Component, createElement, createRef } from "react";
import { hot } from "react-hot-loader/root";

import { BadgeSample } from "./components/BadgeSample";
import "./ui/EnumClass.css";

import classNames from "classnames";

class EnumClass extends Component {
    constructor(props) {
        super(props);

        this.elementRef = createRef();

        this.caption = [];
        this.classnames = [];
        this.replacements = [];
        // copy data from object array
        for (var i = 0; i < this.props.enumvalues.length; i++) {
            this.caption.push(this.props.enumvalues[i].captions);
            this.classnames.push(this.props.enumvalues[i].classnames);
            this.replacements.push(this.props.enumvalues[i].replacements);
        }
    }


    componentDidMount(){
        //console.log('element:');
        //console.dir(this.elementRef.current);

        //  // matches polyfill
        //  window.Element && function(ElementPrototype) {
        //     ElementPrototype.matches = ElementPrototype.matches ||
        //     ElementPrototype.matchesSelector ||
        //     ElementPrototype.webkitMatchesSelector ||
        //     ElementPrototype.msMatchesSelector ||
        //     function(selector) {
        //         var node = this, nodes = (node.parentNode || node.document).querySelectorAll(selector), i = -1;
        //         while (nodes[++i] && nodes[i] != node);
        //         return !!nodes[i];
        //     }
        // }(Element.prototype);

        // closest polyfill
        window.Element && function(ElementPrototype) {
            ElementPrototype.closest = ElementPrototype.closest ||
            function(selector) {
                var el = this;
                while (el.matches && !el.matches(selector)) el = el.parentNode;
                return el.matches ? el : null;
            }
        }(Element.prototype);
        //End polyfill

        /*
        // STYLE BY REFERENCE - Depracated in Mx8
        if (this.referenceEntity) {
            this._referenceName = this.referenceEntity.split("/")[0];
        }
        */

        this.element = this.elementRef.current;

        if (!this.props.showWidget) {
            this.element.style.display = 'none';
        }


        switch (this.props.applyToEnum) { //Select the right element to apply the class too
        case "SELF":
            this.elementToApplyTo = this.element;
            break;
        case "ROW":
            this.elementToApplyTo = this.element.closest(".mx-templategrid-row");
            break;
        case "ITEM":
            this.elementToApplyTo = this.element.closest(".mx-listview-item");
            break;
        case "PARENT":
            this.elementToApplyTo = this.element.parentElement;
            break;
        case "SIBLING":
            var sibling = this.element.previousSibling;
             //in Mx8 the previous sibling is always a script or unstable mount point. we want to filter this away.
            while ((sibling != null) && ((sibling.tagName==null)||(/SCRIPT/.test(sibling.tagName)))){
                sibling = sibling.previousSibling;
            }
            this.elementToApplyTo = sibling;
            break;
        default:
            this.elementToApplyTo = this.element;
        }


    }

    render() {
        return (
            <BadgeSample
                className={this.props.class}
                style={this.props.style}
                elementRef={this.elementRef}
            />
        );
    }

    componentDidUpdate(){
        let attributeValue = this.props.name ? this.props.name.value : null;
        if (attributeValue !== null && attributeValue !== ''){
            this._setValueAttr(attributeValue);
        }
        else{
            console.log('attribute not found, not setting class');
        }

    }


    _setValueAttr(value) {
        /*
        if(this.attributeType == "reference") {
			if(value) {
				value = "true";
			} else {
				value = "false";
			}
        }
        */

		if(value === true) {
        	value = "true";
        } else if (value === false) {
        	value = "false";
        }

		var i = this.caption.indexOf(value);
		var classname = "";
        var toDisplay = "";
        
		if ((i >= 0) && (i < this.classnames.length)) {
			classname = this.classnames[i];
		} else {
			classname = "";
        }

		if (this.replacements[i] !== "" && typeof this.replacements[i] !== "undefined") {
			toDisplay = this.replacements[i];
		} else {
			toDisplay = value;
        }
        
		if (this.props.glyphicon !== "" && this.props.glyphicon != null) {
           this._addClass('glyphicon');
           this._addClass('glyphicon-' + this.props.glyphicon)
        }

		for (var i = 0; i < this.classnames.length; i++) {
			if(classname !== this.classnames[i]) {
                    this._removeClass(this.classnames[i]);
			}
        }

        this._addClass(classname);
        
		if (this.props.glyphicon !== "" && this.props.glyphicon != null) {
			this.element.innerHTML = "";
			this.element.title = toDisplay; //Set innerHTML empty and tooltip to caption
		} else {
			this.element.innerHTML = toDisplay; //Set the innerHTML to the value of the attribute
        }
    }

    _addClass(className){
        if (className !== null && className !== ""){
            if (!this.elementToApplyTo.classList.contains(className)){
                //console.trace('EnumClass - adding class: ' + className);
                this.elementToApplyTo.classList.add(className);
            }
        }
        else{
            console.warning("EnumClass: className attribute is empty, not applying class.");
        }
      
    }

    _removeClass(className){
        if (className !== null && className !== ""){
            if (this.elementToApplyTo.classList.contains(className)){
                //console.trace('EnumClass - adding class: ' + className);
                this.elementToApplyTo.classList.remove(className);
            }
        }
        else{
            console.warning("EnumClass: className attribute is empty, not removing class.");
        }
    }

}

export default hot(EnumClass);
