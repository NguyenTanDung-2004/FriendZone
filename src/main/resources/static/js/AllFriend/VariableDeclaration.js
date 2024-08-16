var arrayDivUnfriend = document.querySelectorAll("body > div > div.divMain > div.divAllFriend > div > div > div.divButtonUnFriend");
var arrayImg = document.querySelectorAll("body > div > div.divMain > div.divAllFriend > div > img")
var arrayDivBottom = document.querySelectorAll("body > div > div.divMain > div.divAllFriend > div > div");
var arrayDiv1Friend = document.querySelectorAll("body > div > div.divMain > div.divAllFriend > div")
var divAllFriends = document.querySelector("body > div > div.divMain > div.divAllFriend");
var currentUserId;
var divFilter = document.querySelector("body > div.divFilter");
var arrayDivUnfriend1 = document.querySelectorAll("body > div > div.divMain > div.divAllFriend > div > div > div.divButtonUnFriend1");


var pLeft = document.querySelector("body > div.divFilter > p.pLeft");
var pRight = document.querySelector("body > div.divFilter > p.pRight");
var divYourChoice = document.querySelector("body > div.divFilter > div");

var listAllFriend;

var listAllMutualFriend = [];
var listAllUnknowFriend = [];
var listStatusOfUnknown;
var pUserName = document.querySelector("body > div.divPost > div.divMain > div.divNameOfUser > p.pUserName");