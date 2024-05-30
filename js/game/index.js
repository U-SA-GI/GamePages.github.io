
var SCREEN_WIDTH = 800;
var SCREEN_HEIGHT = 480;

var button_width = 200;
var button_height = 50;
var button_posX = 120;
var button_posY = 20;

var BUTTON_COLOR = "#777777";
var game_page_arr = [["POKER","poker.html"],["TEST","poker.html"]];

var background;
var game_button = [];
var game_button_txt = [];

function createUI(){
    
    /*背景エリア*/
    background = new createjs.Shape();
    background.graphics.beginFill("#222222");
    background.graphics.drawRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    background.alpha = 1;
    container.addChild(background);

    for(var i = 0;i < game_page_arr.length;i++){
        createGameButton(game_page_arr[i][0], game_page_arr[i][1], button_posX, button_posY + (i*70));
    }
}

function createGameButton(game_title, page_name, button_posX, button_posY){
    var button = new createjs.Shape();
    button.graphics.beginFill(BUTTON_COLOR);
    button.graphics.drawRoundRect(button_posX - button_width/2, button_posY, button_width, button_height, 5, 5);
    container.addChild(button);
    button.addEventListener("click", function(){
        button.alpha = 1;
        document.location.assign(page_name);
    });
    button.addEventListener("mousedown", function(){
        button.alpha = 0.5;
    });
    button.addEventListener("mouseout", function(){
        button.alpha = 1;
    });

    button_txt = new createjs.Text(game_title, "32px sans-serif", "white");
    button_txt.x = button_posX;
    button_txt.y = button_posY + 10;
    button_txt.textAlign = "center";
    container.addChild(button_txt);

    game_button.push = button;
    game_button_txt.push = button_txt;
}

createUI();
