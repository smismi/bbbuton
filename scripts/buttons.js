










//Theme Variables - edit these to match your theme
var a = "";

//Global Variables
var arrayBtn = new Array();
var isIE = false;
var resizeTest = 1;

//Initialization function
function btnInit() {
	try {
		document.execCommand('BackgroundImageCache', false, true);
	} catch(e) {}
	if(!document.getElementById) {return false;}
	alert("click me first");
	doBtn('start');
}

function doBtn(what) {
	var objBnt = document.getElementsByTagName('form');
	var identifier = new RegExp('(^| )'+'btnForm'+'( |$)');
	if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
		var ieversion=new Number(RegExp.$1);
		if(ieversion < 7) {return false;} //exit script if IE6
		isIE = true;
	}
	for(var q = 0; q < objBnt.length; q++) {if(identifier.test(objBnt[q].className)) {
		if(what == "start") { //Load objBnt
			arrayBtn[q] = new btnForm(objBnt[q]);
			objBnt[q].start();
		}
		else { //Unload objBnt
			objBnt[q].unload();
			arrayBtn[q] = "";
		}
	}}
}

function btnForm(src) {

    src._inputSubmit = new Array();
    src.add_inputSubmit = function(obj) {this._inputSubmit[this._inputSubmit.length] = obj; inputSubmit(obj);}
    //Start

	src.start = function() {
		//Separate and assign elements
		var allInputs = this.getElementsByTagName('input');
		for(var w = 0; w < allInputs.length; w++) {
			switch(allInputs[w].type) {
//				case "text": case "password": {this.add_inputText(allInputs[w]); break;}
//				case "radio": {this.add_inputRadio(allInputs[w]); break;}
//				case "checkbox": {this.add_inputCheck(allInputs[w]); break;}
				case "submit": case "reset": case "button": {this.add_inputSubmit(allInputs[w]); break;}
//				case "file": {this.add_inputFile(allInputs[w]); break;}
			}
		}
		var allButtons = this.getElementsByTagName('button');
		for(var w = 0; w < allButtons.length; w++) {
			this.add_inputSubmit(allButtons[w]);
		} 
		//Start
		for(w = 0; w < this._inputSubmit.length; w++) {this._inputSubmit[w].init();}
	}
	src.unload = function() {

	}
}
function inputSubmit(el) { //extend Buttons
 




	el.oldClassName = el.className;
    console.log(el.className)
//    el.suffix = el.oldClassName ? "_" + el.oldClassName : "";
//    el.dis = el.disabled ? " NFdis" : "";
//	el.left = document.createElement('img');
//	el.left.className = "NFButtonLeft" + el.suffix + el.dis;
//	el.left.src = imagesPath + "0.png";
//	el.right = document.createElement('img');
//	el.right.src = imagesPath + "0.png";
//	el.right.className = "NFButtonRight" + el.suffix  + el.dis;

    el.wraper = document.createElement('div');
    el.wraper.appendChild(document.createTextNode(el.value)); 
    el.wraper.className = "btn " + el.oldClassName;
//
    el.classes = {
        hovered: "btn " + "btn_hoverd " + el.oldClassName,
        def: "btn " + el.oldClassName,
        click: "btn " + "btn_clickd " + el.oldClassName,
        down: "btn "+ "btn_mousedownd " + el.oldClassName,
        focus: "btn "+ "btn_focused " + el.oldClassName
    }


	el.wraper.onmouseover = function() {
        this.className = el.classes.hovered;
//		this.className = "NFButton" + el.suffix + " NFh";
//		this.left.className = "NFButtonLeft" + el.suffix + " NFh";
//		this.right.className = "NFButtonRight" + el.suffix + " NFh";
	}
	el.wraper.onmouseout = function() {
        this.className = el.classes.def;
//		this.className = "NFButton" + el.suffix;
//		this.left.className = "NFButtonLeft" + el.suffix;
//		this.right.className = "NFButtonRight" + el.suffix;
	}
	el.wraper.onmousedown = function() {
        this.className = el.classes.down;
//		this.className = "NFButton" + el.suffix;
//		this.left.className = "NFButtonLeft" + el.suffix;
//		this.right.className = "NFButtonRight" + el.suffix;
	}
	el.wraper.onmouseup = function() {
        this.className = el.classes.click;
//		this.className = "NFButton" + el.suffix;
//		this.left.className = "NFButtonLeft" + el.suffix;
//		this.right.className = "NFButtonRight" + el.suffix;
	}
	el.wraper.onclick = function() {
        this.className = el.classes.hovered;
//		this.className = "NFButton" + el.suffix;
//		this.left.className = "NFButtonLeft" + el.suffix;
//		this.right.className = "NFButtonRight" + el.suffix;
        var ecce = document.getElementById("btn1");
                ecce.click();
	}
    el.onfocus = function() {
        this.wraper.className = el.classes.focus;
	}
    el.onblur = function() {
        this.wraper.className = el.classes.def;
	}

	el.init = function() {

        this.parentNode.insertBefore(this.wraper, this);

        this.wraper.appendChild(el);
//		this.parentNode.insertBefore(this.left, this);
//		this.parentNode.insertBefore(this.right, this.nextSibling);
//		this.className = "NFButton" + el.suffix + el.dis;
	}
	el.unload = function() {
//		this.parentNode.removeChild(this.left);
//		this.parentNode.removeChild(this.right);
//		this.className = this.oldClassName;
	}
}