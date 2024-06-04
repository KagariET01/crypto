class sha256_enc{
	app_name="sha256";
	
	encrypt(){
		let docs=document.querySelector(`#${this.app_name} #encrypt`);
		let orig=docs.querySelector("#orig").value;
		let re=myhash(orig);
		docs.querySelector("#res").innerHTML=re;
	}
}