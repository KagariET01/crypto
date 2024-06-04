
function hide(a){
	let cl=document.querySelector(a).classList;
	if(cl.contains("hide")){
		cl.remove("hide");
	}else{
		cl.add("hide");
	}
}





