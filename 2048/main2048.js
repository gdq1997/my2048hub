// 游戏主逻辑
//获取设备屏幕大小
var documentWidth = window.screen.availWidth;
//大格子大小
var bigGirdWidth = documentWidth*0.92;
//小格子间距
var cellSpace = documentWidth*0.04;
//小格子大小
var littleGird = documentWidth * 0.18;

var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;

//二维数组，存放棋盘位置和数值
var board = new Array();
//当前位置进行合并后不能再次合并
var noBoard = new Array();
//分数
var score = 0;
//启动游戏
//window.onload事件是指文档结构包括js加载完毕,才会触发执行函数方法
window.onload=function(){   
    //对主体元素进行初始化大小
    initElementSize();

    newGame();
}
function newGame(){
    //初始化棋盘
    init();
    //随机分配数字 2或者4
    generateOneNumber(board);
    generateOneNumber(board);
}


//初始换元素大小
function initElementSize(){
    if(documentWidth>500){
        bigGirdWidth = 500;
        cellSpace =20;
        littleGird = 100;
    }
    $('#grid').css('width',bigGirdWidth-cellSpace*2);
    $('#grid').css('height',bigGirdWidth-cellSpace*2);
    $('#grid').css('padding',cellSpace);
    $('#grid').css('borderRadius',cellSpace*0.6);

    $('.grid-cell').css('width',littleGird);
    $('.grid-cell').css('height',littleGird);
    $('.grid-cell').css('border-radius',cellSpace*0.6);
}

//初始化棋盘
function init(){

    //循环给grid-cell列表格分配位置
    for(var i = 0; i<4; i++){
        for(var j = 0; j<4; j++){
            //传i j进去返回top值设置给grid-cell-x-x
            document.getElementById('grid-cell-'+i+'-'+j).style.top = grid_top(i, j)+'px';
            //传i j进去返回left值设置给grid-cell-x-x
            document.getElementById('grid-cell-'+i+'-'+j).style.left = grid_left(i, j)+'px';
        }
    }

    //循环给board复制
    for(var i = 0;i < 4; i++){
        board[i] = new Array();
        noBoard[i] = new Array();
        for(var j = 0;j < 4; j++){
            board[i][j] = 0;
            noBoard[i][j] = false;
        }
    }

    //分数赋值为0
    score = 0;
    updateScoreView(score);
    updateBordView();
}

//通过二维数组给前端生成number-cell
function updateBordView(){
    //首先要删除number-cell元素
   var number = document.getElementsByClassName('number-cell');
   for(i=number.length-1;i>=0;i--){
        number[i].parentNode.removeChild(number[i]);
   }
   //循环board创建元素
   for(var i = 0;i < 4; i++){
        for(var j = 0;j < 4; j++){
            //创建number-cell
            var number_cell = document.createElement('div');
            number_cell.setAttribute('class','number-cell');
            number_cell.setAttribute('id','number-cell-'+i+'-'+j);
            document.getElementById('grid').appendChild(number_cell);
            //判断方格上的数字是否为0而定表现形式
            if(board[i][j] == 0){
                number_cell.style.width = '0px'
                number_cell.style.height = '0px'
                number_cell.style.top = grid_top(i, j)+littleGird/2+'px';
                number_cell.style.left = grid_left(i, j)+littleGird/2+'px';
            }else {
                number_cell.style.width = littleGird+'px';
                number_cell.style.height = littleGird+'px';
                number_cell.style.top = grid_top(i, j)+'px';
                number_cell.style.left = grid_left(i, j)+'px';
                ;
                //显示背景样式
                number_cell.style.backgroundColor = showNumberCellBgc(board[i][j]);
                //显示数字的颜色
                number_cell.style.color = showNumberColor(board[i][j]);
                //显示数字
                // number_cell.innerHTML = board[i][j];
                number_cell.innerHTML = showLevelName(board[i][j]);
                
            }
            noBoard[i][j] = false;
        }
   }
    
    $('.number-cell' ).css('line-height',littleGird+'px');
    $('.number-cell').css('font-size',littleGird*0.2+'px');
}

$(document).keydown(function(even){
    switch (even.keyCode) {
        //left
        case 37:
            even.preventDefault();
            //判断移动
            if(moveLeft()){
                setTimeout(generateOneNumber(board), 200);
                setTimeout(isGameover,310);
            }
            
            break;

         //up   
        case 38:
            even.preventDefault();
            //判断移动
            if(moveUp()){
                setTimeout(generateOneNumber(board), 200);
                setTimeout(isGameover,310);
            }
            break;

        //right
        case 39:
            even.preventDefault();
            //判断移动
            if(moveRight()){
                setTimeout(generateOneNumber(board), 200);
                setTimeout(isGameover,310);
            }
            break;
        
        //down
        case 40:
            even.preventDefault();
             //判断移动
             if(moveDown()){
                setTimeout(generateOneNumber(board), 200);
                setTimeout(isGameover,310);
            }
            break;

        default:
            break;
    }
});

//触控事件之用户点击事件手指触碰
document.addEventListener('touchstart',function(even){
    startx = even.touches[0].pageX;
    starty = even.touches[0].pageY;
});

document.addEventListener('touchmove',function(even){
    even.preventDefault();
});

//触控事件之用户点击事件手指离开
document.addEventListener('touchend',function(even){
    endx = even.changedTouches[0].pageX;
    endy = even.changedTouches[0].pageY;

    //判断用户滑动距离，滑动距离不够长不进行操作
    if(Math.abs(startx-endx)<0.07*bigGirdWidth && Math.abs(starty-endy)<0.07*bigGirdWidth){
        return false;
    }


    //判断用户是滑动X轴还是Y轴
    if(Math.abs(startx-endx)>Math.abs(starty-endy)){
            //说明用户滑动X轴
            //判断滑动方向
            if(endx-startx>0){
                 // 向右滑
                //判断移动
                if(moveRight()){
                    setTimeout(generateOneNumber(board), 200);
                    setTimeout(isGameover,310);
                }
            }else {
                 // 向左滑
                //判断移动
                if(moveLeft()){
                    setTimeout(generateOneNumber(board), 200);
                    setTimeout(isGameover,310);
                }
            }
            console.log(startx);
            console.log(endx);
    } else {
            //说明用户滑动Y轴
                //判断滑动方向
            if(endy-starty>0){
                // 向下滑
                //判断移动
                if(moveDown()){
                    setTimeout(generateOneNumber(board), 200);
                    setTimeout(isGameover,310);
                }
            }else{
                //向上滑
                //判断移动
                if(moveUp()){
                    setTimeout(generateOneNumber(board), 200);
                    setTimeout(isGameover,310);
                }
            }
            console.log(starty);
            console.log(endy);
    }
    
});






//进行移动
function moveLeft(){
    //判断是否能移动
   if(!canMoveLeft(board)){
       return false;
   }

   //进行移动，判断落脚点
   for(var i = 0;i < 4 ;i++){
       for (var j = 1; j < 4; j++) {
           if(board[i][j] != 0){
               for(var k=0;k<j;k++){
                   if(board[i][k] == 0 && noBlockNumber(i , k , j , board)){
                        showMoveAnimation( i , j , i , k );
                        //move
                        board[i][k] = board[i][j];
                        board[i][j] =0;
                        continue;
                        
                   }else if(board[i][k] == board[i][j] && noBlockNumber(i , k , j , board) && !noBoard[i][k]){
                         showMoveAnimation( i , j , i , k );
                        //move
                        //add
                        board[i][k] += board[i][j]
                        board[i][j] =0;
                        noBoard[i][k] = true;
                        score+=board[i][k];
                        continue;
                   }
               }
           }
       }
   }
   updateScoreView(score);
    setTimeout(updateBordView,200);
   return true;
}


//进行移动
function moveRight(){
    //判断是否能移动
   if(!canMoveRight(board)){
       return false;
   }

   //进行移动，判断落脚点
   for(var i = 0;i < 4 ;i++){
       for (var j = 2; j >= 0; j--) {
           if(board[i][j] != 0){
               for(var k=3;k > j;k--){
                   if(board[i][k] == 0 && noBlockNumber(i , j,  k , board)){
                        showMoveAnimation( i , j , i , k );
                        //move
                        board[i][k] = board[i][j];
                        board[i][j] =0;
                        continue;
                        
                   }else if(board[i][k] == board[i][j] && noBlockNumber(i , j , k , board)&&!noBoard[i][k]){
                         showMoveAnimation( i , j , i , k );
                        //move
                        //add
                        board[i][k] += board[i][j]
                        board[i][j] =0;
                        noBoard[i][k] = true;
                        score+=board[i][k];
                        continue;
                   }
               }
           }
       }
   }
   updateScoreView(score);
   setTimeout(updateBordView,200);
   return true;
}

//进行向上Up
function moveUp(){
    //不用判断第一行
        //判断是否能移动
   if(!canMoveUp(board)){
         return false;
    }
     //进行移动，判断落脚点
    //  外层循环列，内层循环行
     for(var i = 0 ;i<4 ; i++){
        for(var j =1 ; j<4 ; j++){
            if(board[j][i]!=0){
                //分析他上面的列项中是否为0或者和他相等的数并且之前没有障碍物
                for(k = 0;k<j;k++){
                    if(board[k][i] == 0 && noBlockVertical(i,k,j,board)){
                        //进行移动动画
                        showMoveAnimation( j , i , k , i );
                        //进行复制
                        board[k][i] = board[j][i];
                        board[j][i] = 0;
                        continue;
                    }else if(board[k][i] == board[j][i] && noBlockVertical(i,k,j,board)&& !noBoard[i][k]){
                        //进行移动动画
                        showMoveAnimation( j , i , k , i );
                        board[k][i] += board[j][i];
                        board[j][i] = 0;
                        noBoard[i][k] = true;
                        score+=board[i][k];
                        continue;
                    }
                }
            }
        }
     }
   updateScoreView(score);
   setTimeout(updateBordView,200);
   return true;

}

function moveDown(){
    //判断是否能进行移动
    if(!canMoveDown(board)){
        return false;
    }

    //进行落脚点判断
    for(var i = 0;i<4;i++){
        for(var j = 2;j>=0;j--){
            if(board[j][i]!=0){
                for(var k = 3; k>j;k--){
                    if(board[k][i]==0 && noBlockVertical(i,j,k,board)){
                        //进行移动动画
                        showMoveAnimation( j , i , k , i );
                        //进行复制
                        board[k][i] = board[j][i];
                        board[j][i] = 0;
                        continue;
                    }else if(board[k][i]== board[j][i] && noBlockVertical(i,j,k,board)&& !noBoard[i][k]){
                        //进行移动动画
                        showMoveAnimation( j , i , k , i );
                        board[k][i] += board[j][i];
                        board[j][i] = 0;
                        noBoard[i][k] = true;
                        score+=board[i][k];
                        continue;
                    }
                }
            }
        }
    }
    updateScoreView(score);
    setTimeout(updateBordView,200);
    return true;
}

function isGameover(){
    if(spanceNode(board)&& NumbersNotEqual(board)){
        //调用游戏结束函数
        alertGameOver();
        return true
    }
    return false;
}