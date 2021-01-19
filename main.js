var nums=new Array();
var score=0;
var hasconflicted=new Array();

$(document).ready(function (){
    newgame();

});

/*开始新游戏*/
function newgame(){
    init();
    generateOneNumber();
    generateOneNumber();
}
//界面初始化
function init(){
    //下层单元格位置初始化
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            var GridCell=$('#grid-cell-'+i+'-'+j);
            GridCell.css('top',getPosTop(i,j));
            GridCell.css('left',getPosLeft(i,j));
        }
    }

    //初始化数组
    for(var i=0;i<4;i++){
        nums[i]=new Array();
        hasconflicted[i]=new Array();
        for(var j=0;j<4;j++){
            nums[i][j]=0;
            hasconflicted[i][j]=false;
        }
    }
    //更新上层单元格视图
    updateView();
    score=0;
    updateScore(score);

}

function updateView(){
    //先移除上层的单元格
    $('.number-cell').remove();
    //初始化上层单元格
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            $('#grid-container').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            var NumberCell=$('#number-cell-'+i+'-'+j);

            if(nums[i][j]==0){
                NumberCell.css('width','0px');
                NumberCell.css('height','0px');
                NumberCell.css('top',getPosTop(i,j)+50);
                NumberCell.css('left',getPosLeft(i,j)+50);
            }
            else{
                NumberCell.css('width','100px');
                NumberCell.css('height','100px');
                NumberCell.css('top',getPosTop(i,j));
                NumberCell.css('left',getPosLeft(i,j));
                NumberCell.css('background-color',getNumberBackgroundColor(nums[i][j]));
                NumberCell.css('color',getNumberColor(nums[i][j]));
                NumberCell.text(nums[i][j]);
            }
            hasconflicted[i][j]=false;


        }

    }
}

function generateOneNumber(){
    if(space(nums)){
        var count=0;
        var temp=new Array();
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                if(nums[i][j]==0) {
                    temp[count] = i * 4 + j;
                    count++;
                }
            }
        }
    var rand=Math.floor(Math.random()*count);
    var randx=Math.floor(temp[rand]/4);
    var randy=Math.floor(temp[rand]%4);

    var randnum=Math.random()<0.5?2:4;
    nums[randx][randy]=randnum;

    showNumberWithAnimation(randx,randy,randnum);

    }
    else{
        return;
    }


}


//实现键盘响应
$(document).keydown(function(event){
event.preventDefault(); //阻止事件的默认动作
    switch (event.keyCode){
        case 37:
            if(canMoveLeft(nums)){
                moveLeft();
                setTimeout(generateOneNumber,200);
                setTimeout(isGameOver,600);
            }
            break;
        case 38:
            if(canMoveUp(nums)){
                moveUp();
                setTimeout(generateOneNumber,200);
                setTimeout(isGameOver,600);
            }
            break;

        case 39:
            if(canMoveRight(nums)){
                moveRight();
                setTimeout(generateOneNumber,200);
                setTimeout(isGameOver,600);
            }
            break;


        case 40:
            if(canMoveDown(nums)){
                moveDown();
                setTimeout(generateOneNumber,200);
                setTimeout(isGameOver,600);
            }
            break;
    }
})

function moveLeft(){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(nums[i][j]!=0){
                for(var k=0;k<j;k++){
                    if(nums[i][k]==0&&noBlockHorizontal(i,k,j,nums)){
                        showMoveAnimation(i,j,i,k);
                        nums[i][k]=nums[i][j];
                        nums[i][j]=0;
                        break;
                    }
                    else if(nums[i][k]==nums[i][j] && noBlockHorizontal(i,j,k,nums) && !hasconflicted[i][k]){
                        showMoveAnimation(i,j,i,k);
                        nums[i][k]+=nums[i][j];
                        nums[i][j]=0;
                        score+=nums[i][k];
                        updateScore(score);
                        hasconflicted[i][k]=true;
                        break;
                    }
                }

            }
        }
    }
    setTimeout(updateView,500);
}


function moveRight(){
    for(var i=0;i<4;i++){
        for(var j=2;j>=0;j--){
            if(nums[i][j]!=0){
                for(var k=3;k>j;k--){
                    if(nums[i][k]==0 && noBlockHorizontal(i,j+1,k,nums)){
                        showMoveAnimation(i,j,i,k);
                        nums[i][k]=nums[i][j];
                        nums[i][j]=0;
                        break;
                    }

                    else if(nums[i][k]==nums[i][j] && noBlockHorizontal(i,j+1,k,nums) && !hasconflicted[i][k]){
                        showMoveAnimation(i,j,i,k);
                        nums[i][k]+=nums[i][j];
                        nums[i][j]=0;
                        score+=nums[i][k];
                        updateScore(score);
                        hasconflicted[i][k]=true;
                        break;
                    }

                }

            }
        }
    }
    setTimeout(updateView,500);
}


function moveUp(){
    for(var i=1;i<4;i++){
        for(var j=0;j<4;j++){
            if(nums[i][j]!=0){
                for(var k=0;k<i;k++){
                    if(nums[k][j]==0 && noBlockVertical(j,k+1,i,nums)){
                        showMoveAnimation(i,j,k,j);
                        nums[k][j]=nums[i][j];
                        nums[i][j]=0;
                        break;
                    }
                    else if(nums[k][j]==nums[i][j] && noBlockVertical(j,k+1,i,nums) && !hasconflicted[k][j]){
                        showMoveAnimation(i,j,k,j);
                        nums[k][j]+=nums[i][j];
                        nums[i][j]=0;
                        score+=nums[k][j];
                        updateScore(score);
                        hasconflicted[k][j]=true;
                        break;
                    }
                }

            }
        }
    }
    setTimeout(updateView,500);
}


function moveDown(){
    for(var i=2;i>=0;i--){
        for(var j=0;j<4;j++){
            if(nums[i][j]!=0){
                for(var k=3;k>i;k--){
                    if(nums[k][j]==0 && noBlockVertical(j,i+1,k,nums)){
                        showMoveAnimation(i,j,k,j);
                        nums[k][j]=nums[i][j];
                        nums[i][j]=0;
                        break;
                    }
                    else if(nums[k][j]==nums[i][j] && noBlockVertical(j,i+1,k,nums)&& !hasconflicted[k][j]){
                        showMoveAnimation(i,j,k,j);
                        nums[k][j]+=nums[i][j];
                        nums[i][j]=0;
                        score+=nums[k][j];
                        updateScore(score);
                        hasconflicted[k][j]=true;
                        break;
                    }
                }

            }
        }
    }
    setTimeout(updateView,500);
}
