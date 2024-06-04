#include<bits/stdc++.h>
using namespace std;
#define INT long long int

vector<INT>gprime(INT n){
	vector<INT>re;
	re.reserve(n/10);
	vector<INT>a(n+1,0);
	for(INT i=2;i<=n;i++){
		if(a[i]){
		}else{
			re.push_back(i);
			a[i]=i;
		}
		for(INT j:re){
			if(i*j>n)continue;
			a[i*j]=j;
			if(j>=a[i])break;
		}
		if(!(i%1000))
		cerr<<"i:"<<i<<endl;
	}
	return re;
}

int main(){
	vector<INT>prime=gprime(100000);
	cout<<"[";
	for(INT i=0;i<prime.size();i++){
		cout<<prime[i];
		if(i!=prime.size()-1)cout<<",";
	}
	cout<<"]"<<endl;
}