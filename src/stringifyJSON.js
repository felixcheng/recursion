// this is what you would do if you liked things to be easy:
//var stringifyJSON = function(obj) {return JSON.stringify(obj)};


// but you don't so you're going to have to write it from scratch:


var stringifyJSON = function (obj) {
    if (typeof(obj) === 'boolean' || typeof(obj) === 'number'||obj === null) {
		return "" + obj + "";//.toString();
	} else if (obj === null) {
		return null;
	} else if (typeof(obj) === 'string'){
		return '\"'+obj+'\"';
	} else if (obj == 'undefined'){
        return ;
    } else if(Array.isArray(obj)) {
		if (obj.length === 0) {
			return '[]';            
		} 
  
        else {
			var ans='';
    	    _.each(obj, function(value, index){
                if (index == obj.length-1){                    
                    var sub = stringifyJSON(value);
                } else {
                    var sub = stringifyJSON(value);
                    sub = sub + ",";
                }
                ans=ans + sub ;
		})
        return ("[" + ans+ "]");
		}
		
	} else if(typeof(obj) === 'object'){
		if (Object.keys(obj).length === 0) {
			return '{}';            
		} 
        var ans='';
        var counter =1;
		_.each(obj, function(value, index){
			
            var sub = stringifyJSON(value);
            if (counter === Object.keys(obj).length){
                sub = sub;
            } else {
                sub = sub +",";
            }
            if (stringifyJSON(value)!== undefined){
                index = '"' + index + '":';
    	       ans= ans + index + sub;
    	    
                counter++;}
		})
        
        return ("{" + ans + "}");
	} else {
		return ;
	}
};


  // your code goes here
