// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:

var parseJSON = function (json) {

	//convert the json object into an array, using comma as seperator
	var seg = json.split(",")
	var ans;

	//helper function to parse the array
	var parsing =  function (seg){
		var l2;
		for (var i in seg){
			if ((seg[i][0]) === ' '){
				seg[i][0] = seg[i][0].slice(1, seg.length);
		} 

			if ((seg[i][0]) === '['){
				// put all the segs in the array into a variable, pass this variable into parsing (need to delete the '[' & ']'?)
				var segArr = [];
				var n = 0;
				var bracket = 0;
				var inArr = true;
				while (inArr) {
					if ((seg[i][0]) === '[' && bracket ==0) {
						seg[i][0] = seg[i][0].slice(1);
						bracket++;
					} else if ((seg[i][0]) === '['){
						bracket++;
					}

					if (seg[i+n][seg[i+n].length - 1] == ']' && bracket == 1) {

						seg[i+n][seg[i+n]] = seg[i+n][seg[i+n]].slice(0, seg[i+n][seg[i+n].length - 1].length - 1); 
						inArr = false;
					} else if (seg[i+n][seg[i+n].length - 1] == ']'){
						bracket--;
					}
					segArr.push(seg[i+n]);

					n++;
					
				}
				l2 = parsing(segArr);
				i = i + n - 1; //to adjust the index to prevent the seg being parsed again
			}	

		else if ((seg[i][0]) === '{'){
			l2 = {};
			var segArr = [];
			var n = 0;
			var bracket = 0;
			var inArr = true;
			while (inArr) {
				if ((seg[i][0]) === '{' && bracket ==0) {
					seg[i][0] = seg[i][0].slice(1);
					bracket++;
				} else if ((seg[i][0]) === '{'){
					bracket++;
				}

				if (seg[i+n][seg[i+n].length - 1] == '}' && bracket == 1) {
					seg[i+n][seg[i+n]] = seg[i+n][seg[i+n]].slice(0, seg[i+n][seg[i+n].length - 1].length - 1); 
					inArr = false;
				} else if (seg[i+n][seg[i+n].length - 1] == '}'){
					bracket--;
				}
				segArr.push(seg[i+n]);

				n++;
					
			}
			_.each(segArr, function(value){
				var ind = value.indexOf(':');
				var firstH = value.slice(0, ind);
				var secondH = value.slice(ind+1, value.length);
				l2[firstH] = parsing(secondH);
			})

		} 

		else if (/\d/.test(seg[i][0])){
			l2 = +seg[i][0];
		}

		else if ((seg[0]) === '"'){
			l2 = seg.slice(1, seg.length - 1);
		}

		else if ((seg[i][0]) === 't'){ l2 = true;}
		else if ((seg[i][0]) === 'f'){ l2 = false;}
		else if ((seg[i][0]) === 'n'){ l2 = null;}
		else if ((seg[i][0]) === 'u'){ l2 = undefined;}

		return l2;
	}}

parsing(seg);
return ans;

};



	// passing the array into the parsing func;
	/*if (tempL.length > 1){
		if ((tempL[0][0]) === '['){
			ans = [];
		} else if ((tempL[0][0]) === '{'){
			ans = {};
		}
		
		tempL[0]= tempL[0].slice(1);
		tempL[tempL.length - 1] = tempL[tempL.length - 1].slice(0, tempL[tempL.length - 1].length - 1);  //trim out the ']'/'}' for the last element 
		_.each(tempL, function(value){
			var ele = parsing(value);
			ans.push(ele);
		})

	} else {
	return l2};*/
