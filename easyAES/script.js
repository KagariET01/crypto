class easyAES{
	app_name="easyAES";
	keygen(){
		let re=[];
		for(let i=0;i<16;i++){
			re.push(Math.floor(Math.random()*256));
		}
		document.querySelector(`#${this.app_name} #keygen #res`).value=`[${String(re)}]`;
	}
	encrypt(){
		let docs=document.querySelector(`#${this.app_name} #encrypt`);
		let orig=docs.querySelector("#orig").value;
		let key=document.querySelector(`#${this.app_name} #key`).value;
		key=eval(key);
		let re=[];
		for(let i of orig){
			let utf8=i.charCodeAt(0);
			re.push(Math.trunc(utf8/256));
			re.push(utf8%256);
		}
		while(re.length%16!=0){
			re.push(0);
		}
		let encrypted=[];
		for(let i=0;i<re.length;i+=16){
			let block=re.slice(i,i+16);
			for(let j=0;j<16;j++){
				block[j]^=key[j];
			}
			encrypted.push(block);
		}
		docs.querySelector("#res").innerHTML=`[${String(encrypted)}]`;
	}
	decrypt(){
		let docs=document.querySelector(`#${this.app_name} #decrypt`);
		let orig=docs.querySelector("#orig").value;
		let key=document.querySelector(`#${this.app_name} #key`).value;
		key=eval(key);
		orig=eval(orig);
		let decrypted="";
		for(let i=0;i<orig.length;i+=16){
			for(let j=0;j<16;j++){
				orig[i+j]^=key[j];
			}
			for(let j=0;j<16;j+=2){
				decrypted+=String.fromCharCode(orig[i+j]*256+orig[i+j+1]);
			}
		}
		docs.querySelector("#res").innerHTML=decrypted;
	}
}