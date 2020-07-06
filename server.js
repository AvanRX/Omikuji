const express=require("express");
const app=express();
const port=3000;
const fort=["大吉","中吉","小吉","吉","末吉","凶","大凶"];

app.get("/:form",(req,res)=>{
    
    const fs=require("fs");
    var q=req.query.form;
    var data;//出力用データ
    var rand=Math.floor(Math.random()*Math.floor(fort.length+1))

    if(q=="omikuji"){
    
        var logs="null";
        var logJson;
        try{
            var fd=fs.readFileSync("public/histry.txt");
            logJson=JSON.stringify(fd.toString());
        }
        catch(e){
            console.log(e.message);
        }
        
        //過去履歴がなかった場合新規に作る
        if(logs=="null"){
            var str;
            str+="{";
            for(let i=0;i<fort.length;i++){
                str+="\""+fort[i]+"\""+": 0";//ヒストリjsonの初期化
            }
            str+="}";
            logs=str;
            logJson=JSON.stringify(str);
        }

        logJson=JSON.parse(logs);
        
       // console.log(logs);
        logJson.fortune+=1;
        
        fs.writeFile("public/histry.txt",toString(logs),(err)=>{
            if(err){
                console.log(`error${err}`);
            }
        });

        data={
            fortune: fort[rand]
        }
        //console.log(data.fortune);
    }
    if(q=="analytics"){
        var logs=null;
        try{
            logs=fs.readFile("public/histry.txt");
            logs=JSON.stringify(logs.toString());
        }
        catch(e){ 
            //過去履歴がなかった場合新規に作る
            if(logs==null){
                var str;
                str+="{";
                for(let i=0;i<fort.length;i++){
                    str+="\""+fort[i]+"\""+": 0";//ヒストリjsonの初期化
                }
                str+="}";
                logs=JSON.stringify(str);
            }
            //console.log(e.message);
        }
    }

    console.log(data);
    res.json(data);
});

app.listen(port,()=>{
    console.log(`listening at http://localhost:${port}`);
});
