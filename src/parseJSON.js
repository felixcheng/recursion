// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:

var parseJSON = function(json) {
	var seg = json.split("");
	var ans; 

	//helper function to parse the array
	var parsing = function(seg){

		var parsingString = function(seg){
			seg = seg.slice(1, seg.length -1);
			return (seg+"");
		}

		var parsingNum = function(seg){
			if(seg.length > 1) {
				seg = seg.join("");
			}
			seg = +seg;
			return seg;
		}

		var parsingSpecial = function(seg){
			switch(seg[0]){
				case "t":
					return true;
				case "f":
					return false;
				case "u":
					return undefined;
				case "n":
					return null;
			}
		}


		var parsingArr = function(seg){
			var arr = [];
			seg = seg.slice(1, seg.length -1);
			var brack = 0;
			var curly = 0;
			var inner = [];
			var innerO = "";
			var ele = "";

			_.each(seg, function(value, id){
				if (value === '[' && curly === 0){
					if (brack ===0){
						inner = [];
					}
					brack++;
				}

				if (value === '{' && brack === 0){
					if (curly ===0){
						innerO = "";
					}
					brack++;
				}



				
				if (brack > 0){
					inner.push(value);
				} else {
					if(value != ','){
						ele = ele + value;
            if (id == seg.length-1){
              arr.push(ele);
						  ele = "";
          }}	else {
						arr.push(ele);
						ele = "";
					}
				}

				if (value === ']'){
						brack--;
					if (brack === 0){
						arr.push(inner.join(""));
					}
				}
			})

    	for (var i = 0 ; i <arr.length; i++){
    		arr[i] = parseJSON(arr[i]);
      }
			
			return arr;
		}


		var parsingObj = function(seg){
			return 'hi'; 
		}
		
			if (seg[0] === '['){
			return parsingArr(seg);
		} else 	 if (seg[0] === '{'){
			return parsingObj(seg);
		} else if (/\d/.test(seg[0])) {
			return parsingNum(seg);
		} else if (seg[0] === '"'){
			return parsingString(seg);
		} else {
			return parsingSpecial(seg);
		}

 
	}

	
	return parsing(seg);

}
	

	