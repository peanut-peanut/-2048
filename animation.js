function showNumberWithAnimation(i,j,randnum){

    var NumberCell=$('#number-cell-'+i+'-'+j);

    NumberCell.css('background-color',getNumberBackgroundColor(randnum));
    NumberCell.css('color',getNumberColor(randnum));
    NumberCell.text(randnum);

    NumberCell.animate({
        width:"100px",
        height:"100px",
        top: getPosTop(i,j),
        left: getPosLeft(i,j)
    },500);
}

function showMoveAnimation(fromx,fromy,tox,toy){
    var NumberCell=$('#number-cell-'+fromx+'-'+fromy);
    NumberCell.animate({
        top:getPosTop(tox,toy),
        left:getPosLeft(tox,toy)

    },500)

}