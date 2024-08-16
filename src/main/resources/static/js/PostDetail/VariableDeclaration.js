var publicScope = 'fa-solid fa-earth-americas divScopePostChild';
var onlyScope = 'fa-solid fa-lock divScopePostChild';
var friendScope = 'fa-solid fa-user-group divScopePostChild';
var objectPostInfo;
const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
const videoExtensions = ['mp4', 'avi', 'mkv', 'mov'];
var postIds;
var arrayDivLike;
var currentPostId;

// display img and video
var iLeftToRight = document.querySelector("#iLeftToRight");
var iRightToLeft = document.querySelector("#iRightToLeft");
var iCloseDisplayImg = document.querySelector("#iCloseDisplayImg");
var divDisplayImgAndVideo = document.querySelector("#divDisplayImg");
var listLinkImgOrVideo = [];
var listTypeOfFile = [];
var count = 0;
var imgDisplay = document.querySelector("#divDisplayImg img");
var videoDisplay = document.querySelector("#divDisplayImg video")

//
var arrayListLikedPost;

// comment
var divBlurBox = document.querySelector("#divBlurBox");
var flagDisplayComment = 0;
var divContentComment = document.querySelector("#divContentComment");
var pHeaderComment = document.querySelector("#divComment > div.divHeaderComment > p");
var setTagedId = new Set();
var currentDivImgOrVideo;
var currentFile;
var iUploadCommentLevel1 = document.querySelector(".uploadCommentLevel1");
var textareaLevel1 = document.querySelector("#textareaLevel1");
var currentPostIdComment;
var currentObjectCommentParent;
var currentObjectCommentChild;
var flagUploadCommentChild = 0;
var currentParentCommentId;
var currentIndexOfCommentParent;
var currentIndexOfPost;

// edit comment
var divEditComment = document.querySelector("#divEditComment");
var textareaEditComment = document.querySelector("#divEditComment > div.divContent.divEditCommentChild > textarea");
var divTagedFriendEditComment = document.querySelector("#divEditComment > div.divContent.divEditCommentChild > div.divTagedFriend");
var divImgOrVideoEditComment = document.querySelector("#divEditComment > div.divContent.divEditCommentChild > div.divImgOrVideo");
var iCloseEditComment = document.querySelector("#iCloseEditComment");
var iCloseEditComment1 = document.querySelector("#iCloseEditComment1");
var iCloseEditComment2 = document.querySelector("#iCloseEditComment2");
var iIconEditComment = document.querySelector("#divEditComment > div.divContent.divEditCommentChild > div.divIcon > i.bi.bi-emoji-wink");
var iIconUploadEditComment = document.querySelector("#divEditComment > div.divContent.divEditCommentChild > div.divIcon > i.bi.bi-camera");
var iIconTagedFriendEditComment = document.querySelector("#divEditComment > div.divContent.divEditCommentChild > div.divIcon > i.bi.bi-tags");
var pHeaderEditComment = document.querySelector("#divEditComment > div.divHeader.divEditCommentChild > p");
var iUploadFileInEditComment = document.querySelector("#divEditComment > div.divContent.divEditCommentChild > div.divIcon > i.bi.bi-camera");
var inputUploadInEditComment = document.querySelector("#inputUploadInEditComment");
var currentFileInEditComment;
var flagEditComment = 0;
var setTagedFriendInEditComment = new Set();
var currentCommentIdInEditComment;
var pConfirmEditComment = document.querySelector("#divEditComment > div.divButton.divEditCommentChild > p.pConfirm.divButtonChild");
var flagClickingRemoveFileInEditComment = 0;
var flagClickingRemoveTagedFriendInEditComment = 0;
var pDeleteCommentInEditComment = document.querySelector("#divEditComment > div.divButton.divEditCommentChild > p.pDelete.divButtonChild");


// user Id
var userId = document.querySelector("#imgUser").src;
userId = userId.replace("http://localhost:8080/FileUser/Image/", "").replace("/avatar.jpg", "");

// tag Friend
var divResultSearchTagFriend = document.querySelector("#divResultSearchTagFriend");
var listFlagTagedFriend = [];
var mapIndexTagFriend = new Map();
var listIndex = [];
var imgTagFriends = document.querySelector("#imgTagFriends")

// Friend Area
var divFriendChild = document.querySelector("body > div.divMain > div.divMain1 > div.divLeft1.divMain1Child > div.divFriend.divMain1Child > div.divFriendChild");
let listFriendId;
let listFriendName;
let listAllFriendId;
let listAllFriendName;

// display icon
var iDisplayIcon = document.querySelector("#divComment > div.divCommentComment > div > div > div.divIcon > i.bi.bi-emoji-wink");
var divDisplayIcon = document.querySelector("#divIcon");

// icon
var divIcon = document.querySelector("#divIcon");
var divContentIcon = document.querySelector("#divContentIcon");
var divContentIconFace = document.querySelector("#divContentIcon .divIconFace");
var divContentIconHand = document.querySelector("#divContentIcon .divIconHand");
var divContentIconLove = document.querySelector("#divContentIcon .divIconLove");
var divContentIconFlower = document.querySelector("#divContentIcon .divIconFlower");
var divContentIconAnimal = document.querySelector("#divContentIcon .divIconAnimal");
var divContentIconChild = document.querySelectorAll("#divContentIcon .divContentIconChild");
var divFilterIconChild = document.querySelectorAll("#divFilterIcon div");
var iCloseIcon = document.querySelector("#iCloseIcon");

// flag to access comment from url
var flagAccessToComment = 0;
