var gameSize
var totalSub
var subTypePosition=new Array()
var subTypeNum=new Array()
var TdClick
var audioHit=document.querySelector(`#audio-hit`)
var audioSunk=document.querySelector(`#audio-sunk`)
document.querySelector(`button`).addEventListener(`click`,NewGameSetup)
document.querySelector(`#newgame`).addEventListener(`click`,NewGameReload)
document.querySelector(`#index`).addEventListener(`click`,GoToHomePage)