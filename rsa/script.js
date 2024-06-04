
const prime=[1009,1013,1019,1021,1031,1033,1039,1049,1051,1061,1063,1069,1087,1091,1093,1097,1103,1109,1117,1123,1129,1151,1153,1163,1171,1181,1187,1193,1201,1213,1217,1223,1229,1231,1237,1249,1259,1277,1279,1283,1289,1291,1297,1301,1303,1307,1319,1321,1327,1361,1367,1373,1381,1399,1409,1423,1427,1429,1433,1439,1447,1451,1453,1459,1471,1481,1483,1487,1489,1493,1499];
// const prime=[23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97];
class rsa{
	app_name="rsa";
	exgcd(a,b){//return [gcd(a,b),x,y] where ax+by=gcd(a,b)
		let lst=[
			[a,1,0],
			[b,0,1]
		];
		while(1){
			if(lst[1][0]==0){
				return lst[0];
			}else{
				let q=Math.floor(lst[0][0]/lst[1][0]);
				let tmp=lst[0];
				for(let i=0;i<3;i++){
					tmp[i]-=q*lst[1][i];
				}
				lst[0]=lst[1];
				lst[1]=tmp;
			}
		}
	}
	fastpow(a,n,mod){
		if(n==0)return 1;
		a%=mod
		let re=a;
		let x=a;
		n--;
		while(n){
			if(n&1){
				re*=x;
				re%=mod;
			}
			x*=x;
			x%=mod;
			n>>=1;
		}
		return re;
	}

	keygen(){
		let p=prime[Math.floor(Math.random()*prime.length)];
		let q=p;
		while(q==p){
			q=prime[Math.floor(Math.random()*prime.length)];
		}
		// let p=23;
		// let q=29;
		let n=p*q;
		let r=(p-1)*(q-1);
		let e=prime[Math.floor(Math.random()*prime.length)];
		while(e>=r && r%e==0){
			e=prime[Math.floor(Math.random()*prime.length)];
		}

		let d=this.exgcd(e,r)[1];
		if(d<0){
			d+=r;
		}
		document.querySelector(`#${this.app_name} #pub_key`).value=`[${n},${e}]`;
		document.querySelector(`#${this.app_name} #pri_key`).value=`[${n},${d}]`;
	}

	utf8tolst(str){
		let re=[];
		for(let i of str){
			re.push(Math.trunc(i.charCodeAt(0)/256));
			re.push(Math.trunc(i.charCodeAt(0)%256));
		}
		return re;
	}
	lsttoutf8(lst){
		let re="";
		for(let i=0;i<lst.length;i+=2){
			re+=String.fromCharCode(lst[i]*256+lst[i+1]);
		}
		return re;
	}
	myhash(str){
		let orig_lst=this.utf8tolst(str);
		return sha256(orig_lst);
	}

	encrypt(){
		let docs=document.querySelector(`#${this.app_name} #encrypt`);
		let orig=docs.querySelector("#orig").value;
		let pub_key=document.querySelector(`#${this.app_name} #key_pub`).value;
		pub_key=eval(pub_key);
		orig=this.utf8tolst(orig);
		let re=[];
		for(let i of orig){
			re.push(this.fastpow(i,pub_key[1],pub_key[0]));
		}
		
		docs.querySelector("#res_encrypt").innerHTML=`[${String(re)}]`;
	}
	sign(){
		let docs=document.querySelector(`#${this.app_name} #encrypt`);
		let orig=docs.querySelector("#orig").value;
		let pri_key=document.querySelector(`#${this.app_name} #key_pri`).value;
		pri_key=eval(pri_key);
		let hash_res=this.myhash(orig);
		let re=[];
		for(let i of hash_res){
			let utf8=i.charCodeAt(0);
			re.push(this.fastpow(utf8,pri_key[1],pri_key[0]));
		}
		docs.querySelector("#res_sign").innerHTML=`[${String(re)}]`;
	
	}
	decrypt(){
		let docs=document.querySelector(`#${this.app_name} #decrypt`);
		let orig=docs.querySelector("#orig").value;
		let pri_key=document.querySelector(`#${this.app_name} #key_pri`).value;
		orig=eval(orig);
		pri_key=eval(pri_key);
		let re=[];
		for(let i of orig){
			re.push(this.fastpow(i,pri_key[1],pri_key[0]));
		}
		re=this.lsttoutf8(re);
		docs.querySelector("#res_txt").innerHTML=re;
	}

	check_sign(){
		let docs=document.querySelector(`#${this.app_name} #decrypt`);
		let orig=docs.querySelector("#orig").value;
		let pub_key=document.querySelector(`#${this.app_name} #key_pub`).value;
		orig=eval(orig);
		pub_key=eval(pub_key);
		let re=[];
		for(let i of orig){
			re.push(this.fastpow(i,pub_key[1],pub_key[0]));
		}
		re=this.lsttoutf8(re);
		let orig_hash=this.myhash(docs.querySelector("#res_txt").innerHTML);
		if(re==orig_hash){
			docs.querySelector("#res_check").innerHTML="true";
		}else{
			docs.querySelector("#res_check").innerHTML="false";
		}
	}

	add(){
		let name=document.querySelector(`#${this.app_name} #name`).value;
		let pub_key=document.querySelector(`#${this.app_name} #pub_key`).value;
		let pri_key=document.querySelector(`#${this.app_name} #pri_key`).value;
		if(pub_key=="" || pri_key==""){return;}
		rsa_keybank.add("rsa_pub_key",name,eval(pub_key),"RSA公鑰","#rsa #key_pub");
		rsa_keybank.add("rsa_pri_key",name,eval(pri_key),"RSA私鑰","#rsa #key_pri");
	}
}

class rsa_keymanager{
	data={};
	app_name="rsa_keylist";
	export(){
		if(this.data=={}){
			document.querySelector(`#${this.app_name} #output`).value="你的密碼本沒有任何資料";
		}
		document.querySelector(`#${this.app_name} #output`).value=JSON.stringify(this.data);
	}
	import(){
		let new_dta=JSON.parse(document.querySelector(`#${this.app_name} #output`).value);
		for(let i in new_dta){
			for(let j in new_dta[i].data){
				this.add(i,j,new_dta[i].data[j],new_dta[i].display_name,new_dta[i].queryS);
			}
		}
	}
	add(dict,name,value,dict_display_name="",queryS=""){
		if(dict_display_name==""){
			dict_display_name=dict;
		}
		if(typeof(value)==="string"){
			value=eval(value);
		}
		if(this.data[dict]==undefined){
			this.data[dict]={display_name:dict_display_name,queryS:queryS,data:{}};
			document.querySelector(`#${this.app_name} #keylist`).innerHTML+=
			`<button class="h2 head security_key" onclick="hide('#rsa_keylist #${dict}')">${dict_display_name}</button>`;
			document.querySelector(`#${this.app_name} #keylist`).innerHTML+=
			`<div class="content" id="${dict}"></div>`;
		}else{
			queryS=this.data[dict].queryS;
		}
		if(this.data[dict].data[name]==undefined){
			document.querySelector(`#${this.app_name} #keylist #${dict}`).innerHTML+=`
				<div id="${name}" class="mini_btn ">
					<button class="icon_btn keyboard_external_input" onclick="rsa_keybank.show('${dict}','${name}','${queryS}')"></button>
					<button id="${name}" class="icon_btn del" onclick="rsa_keybank.del('${dict}','${name}')"></button>
					${name}
				</div>
			`;
		}
		this.data[dict].data[name]=value;
	}
	del(dict,name){
		delete this.data[dict].data[name];
		document.querySelector(`#${this.app_name} #keylist #${dict} #${name}`).remove();
	}
	show(dict,name,queryS){
		let data=this.data[dict].data[name];
		document.querySelector(queryS).value=JSON.stringify(data);
	}
}

let rsa_keybank=new rsa_keymanager();
