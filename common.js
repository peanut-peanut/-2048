function getPosTop(i,j){
    return 20+120*i;
}

function getPosLeft(i,j){
    return 20+120*j;
}

function getNumberBackgroundColor(num){
    switch (num){
        case 2:return "#BBFFBB"; break;
        case 4:return "#A6FFA6"; break;
        case 8:return "#93FF93"; break;
        case 16:return "#79FF79"; break;
        case 32:return "#53FF53"; break;
        case 64:return "#28FF28"; break;
        case 128:return "#00EC00"; break;
        case 256:return "#00DB00"; break;
        case 512:return "#00BB00"; break;
        case 1024:return "#00A600"; break;
        case 2048:return "#009100"; break;
        case 4096:return "#007500"; break;
        case 8192:return "#006000"; break;
    }
}
function getNumberColor(num){
    if(num<=4){
        return "#77ee65";
    }
    else{
        return "#fff";
    }
}

function space(nums){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(nums[i][j]==0){
                return true;
            }
        }
    }
    return false;

}
//判断水平方向上有没有障碍物
function noBlockHorizontal(row,col1,col2,nums){
    for(var i=col1;i<col2;i++){
        if(nums[row][i]!=0){
            return false;
        }
    }
    return true;
}

function noBlockVertical(col,row1,row2,nums){
    for(var i=row1;i<row2;i++){
        if(nums[i][col]!=0){
            return false;
        }
    }
    return true;
}

function canMoveLeft(nums){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(nums[i][j]!=0){
                if(nums[i][j-1]==0||nums[i][j-1]==nums[i][j]){
                    return true;
                }

            }
        }
    }
    return false;
}

function canMoveRight(nums){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(nums[i][j]!=0){
                if(nums[i][j+1]==0||nums[i][j+1]==nums[i][j]){
                    return true;
                }

            }
        }
    }
    return false;
}

function canMoveUp(nums){
    for(var i=1;i<4;i++){
        for(var j=0;j<4;j++){
            if(nums[i][j]!=0){
                if(nums[i-1][j]==0||nums[i-1][j]==nums[i][j]){
                    return true;
                }

            }
        }
    }
    return false;
}


function canMoveDown(nums){
    for(var i=0;i<3;i++){
        for(var j=0;j<4;j++){
            if(nums[i][j]!=0){
                if(nums[i+1][j]==0||nums[i+1][j]==nums[i][j]){
                    return true;
                }

            }
        }
    }
    return false;
}

function updateScore(score){
    $('#score').text(score);
}

function noMove(nums){
    if(canMoveDown(nums)||canMoveLeft(nums)||canMoveRight(nums)||canMoveUp(nums)){
        return false;
    }
    return true;
}

function isGameOver(){
    if(!space(nums)&&noMove(nums)){
        alert('game over');
    }
}
