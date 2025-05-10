let isworking =true;
let cycle = 0;
let interval;

function getTimeinseconds(){
    const focus = parseInt(document.getElementById("inputFocus").value) || ;
    const shortBreak = parseInt(document.getElementById("inputshortbreak").value) || ;
    const longBreak = parseInt(document.getElementById("inputlongbreak").value) || ;

    return{
        focus: focus*60,
        shortBreak: shortBreak *60,
        longBreak: longBreak*60
    };
}