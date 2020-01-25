// 支撑逻辑JS

//获取小方格距离TOP距离
function grid_top(i, j){
    return cellSpace+i*(littleGird+cellSpace);
}

//获取小方格距离left距离
function grid_left(i, j){
    return cellSpace+j*(littleGird+cellSpace);;
}

function showNumberCellBgc(num){
    switch( num ){
        case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
        case 4096:return "#a6c";break;
        case 8192:return "#93c";break;
    }

    return "num";

}


function showLevelName(num){
    switch( num ){
        case 2:return "初入鸡金";break;
        case 4:return "盲人摸鸡";break;
        case 8:return "头顶绿鸡";break;
        case 16:return "杀错好鸡";break;
        case 32:return "不留烂鸡";break;
        case 64:return "下车烂鸡";break;
        case 128:return "上车好鸡";break;
        case 256:return "好鸡必买";break;
        case 512:return "从没烂鸡";break;
        case 1024:return "追跌杀高";break;
        case 2048:return "鸡道升天";break;
        case 4096:return "银河之鸡";break;
        case 8192:return "宇宙苍穹";break;
    }

    return "num";

}

function showNumberColor(num){
    if( num <= 4 )
         return "#776e65";

    return "white";
}

//随机生成一个数字
function generateOneNumber(board){
    //判断棋盘是否有空间
    if(spanceNode(board)){
        //没空间了
        return false;
    }

    //到这一步还有空间 继续执行
    // 随机位置
    var referenceX = parseInt(Math.floor(Math.random()*4)); 
    var referenceY = parseInt(Math.floor(Math.random()*4));
     //分配随机数2或者4
    var num = Math.random() < 0.5 ? 2 : 4;
  
    while(true){
        if(board[referenceX][referenceY] == 0){
            board[referenceX][referenceY] = num;
            break;
        }
        referenceX = Math.floor(Math.random()*4);
        referenceY = Math.floor(Math.random()*4);
    }

    showNumberWithAnimation(referenceX,referenceY,num);
}

function spanceNode(board){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(board[i][j] == 0){
                return false;
            }
        }
    }
    return true;
}

function canMoveLeft(board){
    //进行移动，判断落脚点
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if(board[i][j]!=0){
                if(board[i][j-1] == 0||board[i][j-1] == board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveRight(board){
    for(var i = 0;i < 4;i++){
        for(var j = 3;j>=0;j--){
            if(board[i][j]!=0){
                if(board[i][j+1] == 0||board[i][j+1] == board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveUp(board){
    for(var i =0;i<4;i++){
        for(var j = 1;j<4;j++){
            if(board[j][i]!=0){
                //还要判断当前上移的数的前一个位置等于0或者与他相等
                if(board[j-1][i] == 0||board[j][i] == board[j-1][i]){         
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveDown(board){
    for(var i=0;i<4;i++){
        for(var j = 2 ; j >=0;j--){
            if(board[j][i]!=0){
                if(board[j+1][i] == 0||board[j][i] == board[j+1][i]){
                 return true;
                }
            }
        }
    }
    return false;
}

function noBlockNumber(row , col1 , col2 , board){
    for(var i = row;i<=row ;i++){
        for(var j = col1+1 ;j<col2 ; j++){
            if(board[i][j]!=0){
                return false;
            }
        }
    }

    return true;
}
                               
// function noBlockNumber(row , col1 , col2 , board){
//     for(var i = row;i<=row ;i++){
//         for(var j = col1+1 ;j<col2 ; j++){
//             if(board[i][j]!=0){
//                 return false;
//             }
//         }
//     }

//     return true;
// }

function noBlockVertical(col , row1 , row2 , board){
    for(var i = col ;i<=col;i++){
        for(var j =row1+1;j<row2;j++){
            if(board[j][col]!=0){
                return false;
            }
        }
    }
    return true;
}



function isGameover(){
    
}

function NumbersNotEqual(board){
    if(canMoveDown(board)||canMoveUp(board)||canMoveLeft(board)||canMoveRight(board)){
        return false;
    }

    return true;
}