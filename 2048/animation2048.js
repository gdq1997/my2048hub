// 动画效果逻辑页面
function showNumberWithAnimation(i,j,randNumber){
    var number_cell = document.getElementById('number-cell-'+i+'-'+j);
    //显示背景样式
    number_cell.style.backgroundColor = showNumberCellBgc(board[i][j]);
    //显示数字的颜色
    number_cell.style.color = showNumberColor(board[i][j]);
    //显示数字
    number_cell.innerHTML = showLevelName(board[i][j]);
    

    //显示动画效果
   $('#number-cell-' + i + "-" + j ).animate({
        width:littleGird,
        height:littleGird,
        top:grid_top(i, j),
        left:grid_left(i, j)
    },50);
    // //显示大小
    // number_cell.style.width = '100px'
    // number_cell.style.height = '100px'
    // //显示位置
    // number_cell.style.top = grid_top(i, j)+'px';
    // number_cell.style.left = grid_left(i, j)+'px';
}


function showMoveAnimation(fromx,fromy,tox,toy){
    var numberCell = $('#number-cell-' + fromx + '-' + fromy );
    numberCell.animate({
        top:grid_top( tox , toy ),
        left:grid_left( tox , toy )
    },200);
}

function alertGameOver(){
    alert('游戏结束');
}

function updateScoreView(score){
    document.getElementById('score').innerHTML = score;
}