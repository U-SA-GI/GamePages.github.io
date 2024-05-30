
var FPS = 100; //秒間フレーム数
var SCREEN_WIDTH = 800;
var SCREEN_HEIGHT = 480;

var BUTTON_COLOR = "#777777";


var deck = [];
var hand = [];
var scores = {//rateはincずつ、costは1.5倍ずつ上がっていく。
    "ロイヤルストレートフラッシュ":{rate:100, inc:10, cost:10},
    "ストレートフラッシュ":{rate:50, inc:5, cost:10},
    "フォーカード":{rate:20, inc:2, cost:10},
    "フルハウス":{rate:7, inc:0.7, cost:10},
    "フラッシュ":{rate:5, inc:0.5, cost:10},
    "ストレート":{rate:4, inc:0.4, cost:10},
    "スリーカード":{rate:3, inc:0.3, cost:10},
    "ツーペア":{rate:2, inc:0.2, cost:10},
    "ワンペア":{rate:1, inc:0.1, cost:10},
    "ノーペア":{rate:0, inc:0.01, cost:10}
};

var card_array = [];

var coin = 100;
var bet = 1;

var background;
var change_button;
var chn_button_txt;
var continue_button;
var cnt_button_txt;
var bet_up_button;
var bet_up_button_txt;
var bet_up_flag = true;
var bet_down_button;
var bet_down_button_txt;
var bet_down_flag = false;
var change_flag = 0;
var match_flag = false;
var scaleX = 1;
var move_count = 0;
var speed = 10;
var spd = speed;
var sc = 0.1;
var s_posY;

var card_bg;
var num_txt;
var suit_txt;
var card_backside_bg;
var can_select_flag = false;//交換ボタンを押してから、コンティニュー後カードを配り終わるまで、false

var score_txt;
var score_flag = 0;
var cnt_count = 0;
var deal_flag = 0;
var d_posY;

var coin_txt;

var help_button;
var help_button_txt;
var upgrade_panel;
var ugp_close_button;
var ugp_close_button_txt;
var upgrade_items = {};//役の種類、倍率、強化ボタン、強化ボタンテキスト、強化コストテキストの配列を入れる。

var mousedown_flag = false;

function createUI(){

    var button_width = 200;
    var button_posX = 400 - button_width/2;
    var button_posY = 370;
    
    /*背景エリア*/
    background = new createjs.Shape();
    background.graphics.beginFill("#882222");
    background.graphics.drawRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    background.alpha = 1;
    container.addChild(background);

    change_button = new createjs.Shape();
    change_button.graphics.beginFill(BUTTON_COLOR);
    change_button.graphics.drawRoundRect(button_posX, button_posY, button_width, 50, 5, 5);
    change_button.visible = false;
    container.addChild(change_button);
    change_button.addEventListener("click", function(){
        change_button.alpha = 1;
        if(change_button.visible){
            changeButtonOnClick();
            chnBtnVisible(false);
        }
    });
    change_button.addEventListener("mousedown", function(){
        change_button.alpha = 0.5;
    });
    change_button.addEventListener("mouseout", function(){
        change_button.alpha = 1;
    });

    chn_button_txt = new createjs.Text("CHANGE", "32px sans-serif", "white");
    chn_button_txt.x = 400;
    chn_button_txt.y = button_posY+10;
    chn_button_txt.textAlign = "center";
    chn_button_txt.visible = false;
    container.addChild(chn_button_txt);
    
    continue_button = new createjs.Shape();
    continue_button.graphics.beginFill(BUTTON_COLOR);
    continue_button.graphics.drawRoundRect(button_posX, button_posY, button_width, 50, 5, 5);
    continue_button.visible = true;
    container.addChild(continue_button);
    continue_button.addEventListener("click", function(){
        continue_button.alpha = 1;
        if(continue_button.visible){
            continueButtonOnClick();
            cntBtnVisible(false);
        }
    });
    continue_button.addEventListener("mousedown", function(){
        continue_button.alpha = 0.5;
    });
    continue_button.addEventListener("mouseout", function(){
        continue_button.alpha = 1;
    });

    cnt_button_txt = new createjs.Text("PLAY GAME", "32px sans-serif", "white");
    cnt_button_txt.x = 400;
    cnt_button_txt.y = button_posY+10;
    cnt_button_txt.textAlign = "center";
    cnt_button_txt.visible = true;
    container.addChild(cnt_button_txt);

    bet_up_button = new createjs.Shape();
    bet_up_button.graphics.beginFill(BUTTON_COLOR);
    bet_up_button.graphics.drawRoundRect(button_posX+250, button_posY, button_width, 50, 5, 5);
    bet_up_button.visible = true;
    container.addChild(bet_up_button);
    bet_up_button.addEventListener("click", function(){
        bet_up_button.alpha = 1;
        if(bet_up_button.visible){
            betUpButtonOnClick();
        }
    });
    bet_up_button.addEventListener("mousedown", function(){
        bet_up_button.alpha = 0.5;
    });
    bet_up_button.addEventListener("mouseout", function(){
        bet_up_button.alpha = 1;
    });

    bet_up_button_txt = new createjs.Text("×10 BET", "32px sans-serif", "white");
    bet_up_button_txt.x = 400+250;
    bet_up_button_txt.y = button_posY+10;
    bet_up_button_txt.textAlign = "center";
    bet_up_button_txt.visible = true;
    container.addChild(bet_up_button_txt);
    
    bet_down_button = new createjs.Shape();
    bet_down_button.graphics.beginFill(BUTTON_COLOR);
    bet_down_button.graphics.drawRoundRect(button_posX-250, button_posY, button_width, 50, 5, 5);
    bet_down_button.visible = true;
    container.addChild(bet_down_button);
    bet_down_button.addEventListener("click", function(){
        bet_down_button.alpha = 1;
        if(bet_down_button.visible){
            betDownButtonOnClick();
        }
    });
    bet_down_button.addEventListener("mousedown", function(){
        bet_down_button.alpha = 0.5;
    });
    bet_down_button.addEventListener("mouseout", function(){
        bet_down_button.alpha = 1;
    });

    bet_down_button_txt = new createjs.Text("÷10 BET", "32px sans-serif", "red");
    bet_down_button_txt.x = 400-250;
    bet_down_button_txt.y = button_posY+10;
    bet_down_button_txt.textAlign = "center";
    bet_down_button_txt.visible = true;
    container.addChild(bet_down_button_txt);
    
    bet_txt = new createjs.Text("", "24px sans-serif", "white");
    bet_txt.x = SCREEN_WIDTH/2;
    bet_txt.y = button_posY+60;
    bet_txt.text = "-"+bet+" コイン";
    bet_txt.textAlign = "center";
    bet_txt.visible = true;
    container.addChild(bet_txt);
    
    score_txt = new createjs.Text("ポーカー", "50px sans-serif", "white");
    score_txt.x = SCREEN_WIDTH/2;
    score_txt.y = 50;
    score_txt.textAlign = "center";
    score_txt.visible = true;
    container.addChild(score_txt);

    coin_txt = new createjs.Text("", "24px sans-serif", "white");
    coin_txt.x = SCREEN_WIDTH-20;
    coin_txt.y = 10;
    coin_txt.text = coin+" コイン";
    coin_txt.textAlign = "right";
    container.addChild(coin_txt);
    
    help_button = new createjs.Shape();
    help_button.graphics.beginFill(BUTTON_COLOR);
    help_button.graphics.drawRoundRect(10, 10, 40, 40, 5, 5);
    help_button.visible = true;
    container.addChild(help_button);
    help_button.addEventListener("click", function(){
        help_button.alpha = 1;
        if(help_button.visible){
            upgradePanelVisible(true);
            checkUpgradeCost();
        }
    });
    help_button.addEventListener("mousedown", function(){
        help_button.alpha = 0.5;
    });
    help_button.addEventListener("mouseout", function(){
        help_button.alpha = 1;
    });
    
    help_button_txt = new createjs.Text("！", "32px sans-serif", "white");
    help_button_txt.x = 10+20;
    help_button_txt.y = 10+5;
    help_button_txt.textAlign = "center";
    help_button_txt.visible = true;
    container.addChild(help_button_txt);
}

function chnBtnVisible(b){

    change_button.visible = b;
    chn_button_txt.visible = b;
}

function cntBtnVisible(b){

    continue_button.visible = b;
    cnt_button_txt.visible = b;
    bet_up_button.visible = b;
    bet_up_button_txt.visible = b;
    bet_down_button.visible = b;
    bet_down_button_txt.visible = b;
    bet_txt.visible = b;
    help_button.visible = b;
    help_button_txt.visible = b;
}

function hankaku2Zenkaku(str) {
    return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
}

/*minからmaxまでのランダムな整数を返す*/
function getRandomInt(min, max) {

    max ++;
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

/*valueの小数第n位より下を切り捨てる*/
function roundDecimal(value, n) {
    return Math.round(value * Math.pow(10, n) ) / Math.pow(10, n);
  }

function createDeck(){
    deck = [];
    for(s = 1; s <= 4; s++){
        for(n = 1; n <= 13; n++){
            deck.push({'suit':s, 'num':n});//各スート、各数字のカード追加
        }
    }
}

function drawCard(arr){

    var index = getRandomInt(0, arr.length-1);
    var card = arr.splice(index, 1);//cardにはobjectではなく、length=1の配列が入っている(arr.spliceの戻り値が配列であるため)
    return card[0];//card[0]にオブジェクトが入っている
}

function createCardUI(){

    var width = 120;
    var height = 200;

    for(let i = 0; i < 5; i++){//letをvarにすると、shiftCardPosition(i)でエラー
        var x = 400+150*(i-2);
        var y = 240;
        var posX = x - (width/2);
        /*
        var posY = y - (height/2);
        var suit_posX = posX + 30;
        var suit_posY = posY + 55;
        var num_posX = posX + 30;
        var num_posY = posY + 10;
        */
        var scl = 1;

        card_bg = new createjs.Shape();
        card_bg.graphics.beginFill("#EEEEEE");
        card_bg.graphics.drawRoundRect(0, 0, width, height, 5, 5);
        card_bg.regX = width/2;
        card_bg.regY = height/2;
        card_bg.x = x;
        card_bg.y = y;
        card_bg.scaleX = scl;
        container.addChild(card_bg);
        card_bg.addEventListener("mousedown", function(){
            shiftCardPosition(i);
        });
        card_bg.addEventListener("mouseover", function(){
            if(mousedown_flag){
                shiftCardPosition(i);
            }
        });
        
        suit_txt = new createjs.Text("", "40px sans-serif", "black");
        suit_txt.regX = width/2;
        suit_txt.regY = height/2;
        suit_txt.scaleX = scl;
        suit_txt.x = posX + 30*scl+width/2;
        suit_txt.y = y+55;
        suit_txt.textAlign = "center";
        container.addChild(suit_txt);
        
        num_txt = new createjs.Text("", "40px sans-serif", "black");
        num_txt.regX = width/2;
        num_txt.regY = height/2;
        num_txt.scaleX = scl;
        num_txt.x = posX + 30*scl+width/2;
        num_txt.y = y+10;
        num_txt.textAlign = "center";
        container.addChild(num_txt);
        
        card_backside_bg = new createjs.Shape();
        card_backside_bg.graphics.beginFill("#222288");
        card_backside_bg.graphics.drawRoundRect(0, 0, width, height, 5, 5);
        card_backside_bg.regX = width/2;
        card_backside_bg.regY = height/2;
        card_backside_bg.x = x;
        card_backside_bg.y = y;
        card_backside_bg.scaleX = scl;
        card_backside_bg.visible = false;
        container.addChild(card_backside_bg);
        
        card_array[i] = {
            'bg':card_bg, 'suit':suit_txt, 'num':num_txt,
            'bs':card_backside_bg, 'upflag':false, 'turnflag':false
        };
    }
    s_posY = {
        'bg':y-50, 'suit':y+55-50, 'num':y+10-50
    };
    d_posY = {
        'bg':y, 'suit':y+55, 'num':y+10
    };
}

/*カードの裏表めくりアニメーション*/
function turnOverCard(bool){

    var end_flag = false;
    
    if(scaleX <= 0){
        sc = -0.1;
    }
    scaleX -= sc;
    
    //suit_txt.scaleX = scl;
    //suit_txt.x = posX + 30*scl+width/2;

    for(let i = 0; i < 5; i++){
        if(card_array[i]['upflag']){
            card_array[i]['bg'].scaleX = scaleX;
            card_array[i]['suit'].scaleX = scaleX;
            card_array[i]['suit'].x = 400+150*(i-2) - (120/2) + 30*scaleX+120/2;
            card_array[i]['num'].scaleX = scaleX;
            card_array[i]['num'].x = 400+150*(i-2) - (120/2) + 30*scaleX+120/2;
            card_array[i]['bs'].scaleX = scaleX;
        }
        if(card_array[i]['upflag'] && scaleX <= 0){
            card_array[i]['bg'].visible = bool;
            card_array[i]['suit'].visible = bool;
            card_array[i]['num'].visible = bool;
            card_array[i]['bs'].visible = !bool;
        }
    }

    if(scaleX >= 1){
        sc = 0.1;
        end_flag = true;
    }
    return end_flag;
}

/*配られるカードのUI描画*/
function setCardUIInfo(index, suit, num){

    var color;

    switch(suit){
        case 1:
            suit = '♠';//スペード
            color = 'black';
            break;
        case 2:
            suit = '♥';//ハート
            color = 'red';
            break;
        case 3:
            suit = '♦';//ダイヤ
            color = 'red';
            break;
        case 4:
            suit = '♣';//クラブ
            color = 'black';
            break;
    }
    switch(num){
        case 1:
            num = 'A';
            break;
        case 11:
            num = 'J';
            break;
        case 12:
            num = 'Q';
            break;
        case 13:
            num = 'K';
            break;
        default:
            num = String(num);
    }
    
    card_array[index]['suit'].text = suit;
    card_array[index]['suit'].color = color;
    
    card_array[index]['num'].text = num;
    card_array[index]['num'].color = color;
}

/*カード選択状態の切り替え*/
function shiftCardPosition(index){
    if(can_select_flag){
        if(card_array[index]['upflag']){
            card_array[index]['bg'].y += 50;
            card_array[index]['suit'].y += 50;
            card_array[index]['num'].y += 50;
            card_array[index]['bs'].y += 50;
            card_array[index]['upflag'] = false;
        }else{
            card_array[index]['bg'].y -= 50;
            card_array[index]['suit'].y -= 50;
            card_array[index]['num'].y -= 50;
            card_array[index]['bs'].y -= 50;
            card_array[index]['upflag'] = true;
        }
    }
}

function changeButtonOnClick(){

    var no_change_flag = true;
    can_select_flag = false;
    for(var i = 0; i < 5; i++){
        if(card_array[i]['upflag']){
            change_flag = 1;
            move_count = 50;
            spd = speed;
            sc = 0.1;
            no_change_flag = false;
        }
    }
    if(no_change_flag){
        matchHand();
    }
}

/*カード交換時の縦移動アニメーション*/
function moveChangeCard(){
    
    var end_flag = false;
    s_posY['bg'] -= spd;
    s_posY['suit'] -= spd;
    s_posY['num'] -= spd;
    move_count += spd;
    if(s_posY['bg'] <= -500){
        spd = -speed;
    }

    for(var i = 0; i < 5; i++){
        if(card_array[i]['upflag']){
            card_array[i]['bg'].y = s_posY['bg'];
            card_array[i]['suit'].y = s_posY['suit'];
            card_array[i]['num'].y = s_posY['num'];
            card_array[i]['bs'].y = s_posY['bg'];
        }
        if(card_array[i]['upflag'] && s_posY['bg'] <= -500){
            hand[i] = drawCard(deck);
            setCardUIInfo(i, hand[i]['suit'], hand[i]['num']);
        }
    }

    if(move_count <= 0){
        spd = speed;
        s_posY['bg'] -= 50;
        s_posY['suit'] -= 50;
        s_posY['num'] -= 50;
        end_flag = true;
    }
    return end_flag;
}

function matchHand(){
    var flash = false;
    var straight = false;
    var loyal = false;
    var four_card = false;
    var three_card = false;
    var two_pair = false;
    var one_pair = false;
    var arr = [];
    for(let i = 0; i < 5; i++){
        arr[i] = hand[i]['num'];
    }
    arr.sort(function(first, second){
        if (first > second){
            return 1;
        }else if (first < second){
            return -1;
        }else{
            return 0;
        }
    });
    if(hand[0]['suit'] == hand[1]['suit'] && hand[0]['suit'] == hand[2]['suit'] &&
    hand[0]['suit'] == hand[3]['suit'] && hand[0]['suit'] == hand[4]['suit']){
        flash = true;
    }
    if(arr[1]-arr[0]==1 && arr[2]-arr[1]==1 &&
    arr[3]-arr[2]==1 && arr[4]-arr[3]==1){
        straight = true;
    }
    if(arr[0]==1 && arr[1]==10 &&
    arr[2]==11 && arr[3]==12 && arr[4]==13){
        straight = true;
        loyal = true;
    }
    var pair_arr = [];
    for(let i = 0; i < 4; i++){
        var pair_count = 1;
        for(let j = i + 1; j < 5; j++){
            if(arr[i]==arr[j]){
                pair_count++;
            }
        }
        if(pair_count>=2){
            pair_arr.push(pair_count);
            i += pair_count-1;//ペアが確定したカードは探索しない
        }
    }
    for(let i = 0; i < pair_arr.length; i++){
        if(pair_arr[i]==4){
            four_card = true;
        }
        if(pair_arr[i]==3){
            three_card = true;
        }
        if(pair_arr[i]==2 && one_pair){
            two_pair = true;
        }else if(pair_arr[i]==2){
            one_pair = true;
        }
    }
    var key;
    if(loyal && straight && flash){
        key = "ロイヤルストレートフラッシュ";
    }else if(straight && flash){
        key = "ストレートフラッシュ";
    }else if(four_card){
        key = "フォーカード";
    }else if(three_card && one_pair){
        key = "フルハウス";
    }else if(flash){
        key = "フラッシュ";
    }else if(straight){
        key = "ストレート";
    }else if(three_card){
        key = "スリーカード";
    }else if(two_pair){
        key = "ツーペア";
    }else if(one_pair){
        key = "ワンペア";
    }else{
        key = "ノーペア";
    }
    var s = scores[key].rate;
    
    coin += Math.floor(bet*s);
    coin_txt.text = coin+" コイン";
    checkBetLimit();

    showScore(key);
}

function showScore(t){

    score_txt.text = t;
    score_txt.visible = true;
    score_flag = 1;
}

function animationChangeCard(){

    if(change_flag == 1){
        if(turnOverCard(false)){
            change_flag = 2;
        }
    }else if(change_flag == 2){
        if(moveChangeCard()){
            change_flag = 3;
        }
    }else if(change_flag == 3){
        if(turnOverCard(true)){
            matchHand();
            change_flag = 0;
            for(var i = 0; i < 5; i++){
                card_array[i]['upflag'] = false;
            }
        }
    }
}

function continueButtonOnClick(){

    score_txt.visible = false;
    createDeck();
    for(var i = 0; i < 5; i++){
        card_array[i]['upflag'] = true;
    }
    deal_flag = 1;
    move_count = 50;
    spd = speed;
    sc = 0.1;

    coin -= bet;
    coin_txt.text = coin+" コイン";
}

function animationDealCard(){

    if(deal_flag == 1){
        if(turnOverCard(false)){
            deal_flag = 2;
        }
    }else if(deal_flag == 2){
        if(moveChangeCard()){
            deal_flag = 3;
        }
    }else if(deal_flag == 3){
        if(turnOverCard(true)){
            chnBtnVisible(true);
            deal_flag = 0;
            can_select_flag = true;
            for(var i = 0; i < 5; i++){
                card_array[i]['upflag'] = false;
            }
        }
    }
}

function animationScoreText(){

    if(score_flag == 1){
        score_txt.scale = 0.2;
        score_flag = 2;
    }else if(score_flag == 2){
        score_txt.scale += 0.1;
        if(score_txt.scale >= 1){
            score_txt.scale = 1;
            score_flag = 3;
        }
    }else if(score_flag == 3){
        cnt_count++;
        if(cnt_count >= 80){
            cntBtnVisible(true);
            cnt_count = 0;
            score_flag = 0;
        }
    }
}

function betUpButtonOnClick(){

    if(bet_up_flag){
        bet *= 10;
        bet_txt.text = "-"+bet+" コイン";
        checkBetLimit();
    }
}

function betDownButtonOnClick(){

    if(bet_down_flag){
        bet /= 10;
        bet_txt.text = "-"+bet+" コイン";
        checkBetLimit();
    }
}

function checkBetLimit(){
    
    while(coin < bet && bet/10 >= 1){
        bet /= 10;
    }
    bet_txt.text = "-"+bet+" コイン";
    if(bet*10 > coin){
        bet_up_button_txt.color = "red";
        bet_up_flag = false;
    }else{
        bet_up_button_txt.color = "white";
        bet_up_flag = true;
    }
    if(bet <= 1){
        bet_down_button_txt.color = "red";
        bet_down_flag = false;
    }else{
        bet_down_button_txt.color = "white";
        bet_down_flag = true;
    }
}

function createUpgradePanel(){
    
    upgrade_panel = new createjs.Shape();
    upgrade_panel.graphics.beginFill("#222288");
    upgrade_panel.graphics.drawRoundRect(10, 40, 780, 430, 10, 10);
    upgrade_panel.visible = false;
    container.addChild(upgrade_panel);
    upgrade_panel.addEventListener("click", function(){//パネル裏のクリックを無効にするための空のボタン
    });
    
    ugp_close_button = new createjs.Shape();
    ugp_close_button.graphics.beginFill(BUTTON_COLOR);
    ugp_close_button.graphics.drawRoundRect(680, 60, 100, 35, 5, 5);
    ugp_close_button.visible = false;
    container.addChild(ugp_close_button);
    ugp_close_button.addEventListener("click", function(){
        ugp_close_button.alpha = 1;
        if(ugp_close_button.visible){
            upgradePanelVisible(false);
        }
    });
    ugp_close_button.addEventListener("mousedown", function(){
        ugp_close_button.alpha = 0.5;
    });
    ugp_close_button.addEventListener("mouseout", function(){
        ugp_close_button.alpha = 1;
    });
    
    ugp_close_button_txt = new createjs.Text("CLOSE", "24px sans-serif", "white");
    ugp_close_button_txt.x = 680+50;
    ugp_close_button_txt.y = 65;
    ugp_close_button_txt.textAlign = "center";
    ugp_close_button_txt.visible = false;
    container.addChild(ugp_close_button_txt);

    var keys = Object.keys(scores);
    for(let i = 0; i < keys.length; i++){
        createUpgradeItem(keys[i]);
    }
}

function createUpgradeItem(key){

    var ugikeys = Object.keys(upgrade_items);
    var item = {};//ある役keyについての強化項目オブジェクト
    /*項目要素の位置変数の初期設定*/
    var posX = 30;
    var marginY = 60;
    var posY = 100 + marginY * ugikeys.length;
    if(ugikeys.length >= 6){//7項目目以降を折り返す
        posX += 380
        posY -= marginY*4;
    }

    /*役の種類text*/
    var score = new createjs.Text("", "24px sans-serif", "white");
    score.text = key;
    score.x = posX;
    score.y = posY;
    score.textAlign = "left";
    score.visible = false;
    container.addChild(score);
    item.score = score;
    
    /*項目要素の位置調整*/
    if(key == "ロイヤルストレートフラッシュ"||key == "ストレートフラッシュ"){
        posX += 190
    }
    posX += 145;

    /*区切りtext*/
    var div = new createjs.Text("", "24px sans-serif", "white");
    div.text ="：";
    div.x = posX;
    div.y = posY;
    div.textAlign = "left";
    div.visible = false;
    container.addChild(div);
    item.div = div;
    
    /*項目要素の位置調整*/
    posX += 25;
    
    /*倍率text*/
    var rate = new createjs.Text("", "24px sans-serif", "white");
    rate.text ="×" + scores[key]["rate"];
    rate.x = posX;
    rate.y = posY;
    rate.textAlign = "left";
    rate.visible = false;
    container.addChild(rate);
    item.rate = rate;
    
    /*項目要素の位置調整*/
    if(key == "ロイヤルストレートフラッシュ"||key == "ストレートフラッシュ"){
        posX += 20
    }
    posX += 80;

    /*強化ボタンshape*/
    var btn_width = 110;
    var btn = new createjs.Shape();
    btn.graphics.beginFill(BUTTON_COLOR);
    btn.graphics.drawRoundRect(posX, posY, btn_width, 30, 5, 5);
    btn.visible = false;
    container.addChild(btn);
    btn.addEventListener("click", function(){
        btn.alpha = 1;
        if(coin >= scores[key]["cost"]){
            coin -= scores[key]["cost"];
            coin_txt.text = coin+" コイン";
            scores[key]["rate"] = roundDecimal(scores[key]["rate"] + scores[key]["inc"], 2);
            console.log(scores[key]["inc"]);
            rate.text ="×" + scores[key]["rate"];
            rate.color ="white";
            scores[key]["cost"] = Math.floor(scores[key]["cost"]*1.5);
            costtxt.text ="-" + scores[key]["cost"] + "コイン";
        }
        checkBetLimit();
        checkUpgradeCost();
    });
    btn.addEventListener("mousedown", function(){
        btn.alpha = 0.5;
    });
    btn.addEventListener("mouseover", function(){
        btntxt.visible = false;
        costtxt.visible = true;
        if(coin < scores[key]["cost"]){
            rate.color = "red";
        }else{
            rate.color = "lime";
        }
        var nextrate = roundDecimal(scores[key]["rate"] + scores[key]["inc"], 2);
        rate.text = "×" + nextrate;
    });
    btn.addEventListener("mouseout", function(){
        btn.alpha = 1;
        btntxt.visible = true;
        costtxt.visible = false;
        rate.color = "white";
        rate.text ="×" + scores[key]["rate"];
    });
    item.btn = btn;

    /*項目要素の位置調整*/
    posX += btn_width/2;

    /*強化ボタンテキストtext*/
    var btntxt = new createjs.Text("", "16px sans-serif", "black");
    btntxt.text ="強化";
    btntxt.x = posX;
    btntxt.y = posY + 8;
    btntxt.textAlign = "center";
    btntxt.visible = false;
    container.addChild(btntxt);
    item.btntxt = btntxt;

    /*強化コストテキストtext*/
    var costtxt = new createjs.Text("", "16px sans-serif", "black");
    costtxt.text ="-" + scores[key]["cost"] + "コイン";
    costtxt.x = posX;
    costtxt.y = posY + 8;
    costtxt.textAlign = "center";
    costtxt.visible = false;
    container.addChild(costtxt);
    item.costtxt = costtxt;

    /*強化項目オブジェクトを配列に格納*/
    upgrade_items[key] = item;
}

function checkUpgradeCost(){

    var ugikeys = Object.keys(upgrade_items);
    for(let i = 0; i < ugikeys.length; i++){
        var key = ugikeys[i];
        var c;
        if(coin < scores[key]["cost"]){
            c = "red";
        }else{
            c = "lime";
        }
        upgrade_items[key]["btntxt"].color = c;
        upgrade_items[key]["costtxt"].color = c;
    }
}

function upgradePanelVisible(b){

    help_button.visible = !b;
    help_button_txt.visible = !b;

    upgrade_panel.visible = b;
    ugp_close_button.visible = b;
    ugp_close_button_txt.visible = b;

    var keys = Object.keys(scores);//強化項目(役)の配列
    for(let i = 0; i < keys.length; i++){
        var prps = Object.keys(upgrade_items[keys[i]]);//ある強化項目(役)の表示パーツ配列
        for(let j = 0; j < prps.length; j++){
            upgrade_items[keys[i]][prps[j]].visible = b;
        }
        upgrade_items[keys[i]]["costtxt"].visible = false;
    }
}

document.addEventListener("mousedown", function(){
    mousedown_flag = true;
});
document.addEventListener("mouseup", function(){
    mousedown_flag = false;
});

createUI();
createCardUI();
createUpgradePanel();
for(var i = 0; i < 5; i++){
    hand = [
        {'suit':1, 'num':1},
        {'suit':1, 'num':13},
        {'suit':1, 'num':12},
        {'suit':1, 'num':11},
        {'suit':1, 'num':10}
    ];
    setCardUIInfo(i, hand[i]['suit'], hand[i]['num']);
}

function update(){
    if(change_flag != 0){
        animationChangeCard();
    }
    if(score_flag != 0){
        animationScoreText();
    }
    if(deal_flag != 0){
        animationDealCard();
    }
}

setInterval(update, 1000/FPS);
