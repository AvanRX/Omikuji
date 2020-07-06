const express=require("express");
const app=express();
const port=3000;
const fortune=["大吉","中吉","小吉","吉","末吉","凶","大凶"];

app.get("/",(req,res)=>{
    
    const fs=require("fs");

    var query=req.query;
    var data={};//出力用データ
    var rand=Math.floor(Math.random()*Math.floor(fortune.length+1))
    if(query=="omikuji"){
        data={
            "fortune":fortune[rand]
        }

        var logs=null;
        try{
            logs=fs.readFile("public/histry.txt");
            logs=logs.json();
        }
        catch(e){
            console.log(e.message);
        }

        //過去履歴がなかった場合新規に作る
        if(logs==null){
            for(let i=0;i<fortune.length;i++){
                logs+="\""+fortune[i]+"\""+":"+"0";//ヒストリjsonの初期化
            }
            logs=logs.json();
        }
        console.log(logs.json());

        logs[fortune[rand]]+=1;

        fs.writeFile("public/histry.txt",logs);

        data={
            "fortune":fortune[rand]
        }
    }
    if(query=="analytics"){
        var logs=null;
        try{
            logs=fs.readFile("public/histry.txt");
            logs=logs.json();
        }
        catch(e){
            console.log(e.message);
        }

        data.jso(logs);
    }

    res.json(data);
});

app.listen(port,()=>{
    console.log(`listening at http://localhost:${port}`);
});
