class caesar{
	encrypt(){
		let docs=document.querySelector("#caesar #encrypt");
		let orig=docs.querySelector("#orig").value;
		let shift=document.querySelector("#caesar #key").value;
		shift=eval(shift);
		let orig_list=[];
		for(let i of orig){
			orig_list.push(i);
		}
		let utf8=[];
		for(let i of orig_list){
			utf8.push(i.charCodeAt(0));
		}
		console.log(utf8);
		let encrypted=[];
		for(let i of utf8){
			encrypted.push(i+shift);
		}
		console.log(encrypted);
		docs.querySelector("#res").innerHTML="["+String(encrypted)+"]";
	}
	decrypt(){
		let docs=document.querySelector("#caesar #decrypt");
		let orig=docs.querySelector("#orig").value;
		let shift=document.querySelector("#caesar #key").value;
		shift=eval(shift);
		let orig_list=eval(orig);
		let decrypted="";
		for(let i of orig_list){
			decrypted+=(String.fromCharCode(i-shift));
		}
		docs.querySelector("#res").innerHTML=decrypted;
	}
}