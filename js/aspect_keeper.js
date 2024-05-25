//ゲーム画面のサイズを指定
var W = 800
var H = 480

var div = document.getElementById("wrapper");//div要素を取得
var canvas = document.getElementById("GameScreen");//canvas要素を取得
var stage = new createjs.Stage("GameScreen");//idが"GameScreen"のcanvas上にステージを作成する
stage.enableMouseOver();// マウスオーバーを有効にする

var container = new createjs.Container();//コンテナを作成する
stage.addChild(container);//ステージにコンテナを追加する

//リサイズ処理を行う関数
function update(){
    //ブラウザの幅(screenWidth)と高さ(screenHeight)をJavaScriptの機能を使って取得する
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;
    //画面がW:Hよりも縦長だった場合、横幅のサイズを基準に倍率を決める
    if(screenHeight/screenWidth > H/W){
        var scale = screenWidth / W;
        div.style.marginTop = (screenHeight - H*scale)/2 + "px" ;
        div.style.marginBottom = (screenHeight - H*scale)/2 + "px" ;
        div.style.marginLeft = 0;
        div.style.marginRight =0;
    //画面がW:Hよりも横長だった場合、縦幅のサイズを基準に倍率を決める
    }else{
        var scale = screenHeight / H;
        div.style.marginLeft = (screenWidth - W*scale)/2 + "px";
        div.style.marginRight = (screenWidth - W*scale)/2 + "px";
        div.style.marginTop = 0;
        div.style.marginBottom = 0;
    }

    canvas.width = W * scale;// キャンバスの描画領域の横幅をW*scaleに変更する
    canvas.height = H * scale;// キャンバスの描画領域の縦幅をH*scaleに変更する
    
    container.scaleX = scale;//コンテナを横にscale倍にする
    container.scaleY = scale;//コンテナを縦にscale倍にする
    stage.update();

}

//1秒間に24回の頻度で指定した関数を実行するCreateJSの機能。
//JavaScriptのsetIntervalとほぼ同じ機能。
//createjs.Ticker.addEventListener("tick", update);

setInterval(update, 20);