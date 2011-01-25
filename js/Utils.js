var Utils = {
	validateValue: function(value)
	{
		if (typeof value  == "undefined") 
			return "";
		else
			return value;
	},
	stopEventPropagationToBrowser: function(event)
	{
		if(event.stopPropagation)
			event.stopPropagation();
		else
			event.cancelBubble = true;
		
		if(event.preventDefault)
			event.preventDefault();
		else	
			event.returnValue = false;
		
		event.keyCode = 0;
		
		if(window.event)
			window.event.keyCode = 0;
	}
}

var keyCodes = {"F1":112, "F5": 113};