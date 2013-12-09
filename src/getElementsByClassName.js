// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But in stead we're going to implement it from scratch:
var getElementsByClassName = function (className) {
	var ans = [];
	var body = document.body;
	var recurElement = function(obj){
		
		for (var i = 0; i < obj.children.length; i++){
			if (obj.children[i].classList.contains(className)){
				ans.push(obj.children[i]);
			} 
			if (obj.children[i].hasChildNodes) {
				recurElement(obj.children[i]);
			}
		}
	}
	recurElement(document);
	return ans;
  // your code here
};



