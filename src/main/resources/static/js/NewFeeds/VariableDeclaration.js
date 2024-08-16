// user Id
var userId = document.querySelector("#imgUser").src;
userId = userId.replace("http://localhost:8080/FileUser/Image/", "").replace("/avatar.jpg", "");

// post
var divCenter = document.querySelector("body > div.divMain > div.divCenter.divMainChild1");
var objectPostInfo;
var divButtonPost = document.querySelector("#divCreatePostBox > div.divButtonPost");
var scopePost = 1;
var selectorScopePost = document.querySelector("#selectScope");
var arrayDivBlurImgOrVideo;
var objectPostInfo;
const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
const videoExtensions = ['mp4', 'avi', 'mkv', 'mov'];
var publicScope = 'fa-solid fa-earth-americas divScopePostChild';
var onlyScope = 'fa-solid fa-lock divScopePostChild';
var friendScope = 'fa-solid fa-user-group divScopePostChild';
var arrayListLikedPost;
var mapFileInPost = new Map();
var listFileInPost = [];
var divResultSearchTagFriend = document.querySelector("#divResultSearchTagFriend");
var listFlagTagedFriend = [];
var mapIndexTagFriend = new Map();
var listIndex = [];
var inputUploadFileInPost = document.querySelector("#inputUploadFileInPost");

// like post
var arrayDivLike;

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

// comment
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
var iCloseCommmentBox = document.querySelector("#iCloseComment");

// create post post
var iconImgCreatePost = document.querySelector("#divCreatePostBox > div.divAddToYourPost > div > img:nth-child(3)");
var divCreatePostBox = document.querySelector("#divCreatePostBox");
var iCloseCreatePostBox = document.querySelector("#iClose");
var textareaCreatePost = document.querySelector("#divCreatePostBox > div.divInput > textarea");
var iIconScope = document.querySelector("#divCreatePostBox > div.divName > div > div > i");
var comboboxScope = document.querySelector("#selectScope");
var imgAddFileToPost = document.querySelector("#imgAddFileToPost");
var divContainImgVideo = document.querySelector("#divCreatePostBox > div.divContainImgVideo");
var imgTagFriends = document.querySelector("#imgTagFriends");
var divContainTagedFriend = document.querySelector("#divContainTagedFriend");
var divCreatePostClass = document.querySelector("body > div.divMain > div.divMain1 > div.divRight1 > div.divCreatePost");
var divClickDisplayCreatePost = document.querySelector("body > div.divMain > div.divCenter.divMainChild1 > div.divCreatePost");

// friend
let listAllFriendId;
let listAllFriendName;

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

// event for something
var imgUser = document.querySelector("#imgUser");
var divImgAndNameInLeftSide = document.querySelector("body > div.divMain > div.divLeft.divMainChild1.divMainChild1_1 > div.divImgAndName.divMainChild2");

// notifications
var iBell = document.querySelector("#iBell");
var flagTurnOnTurnOfNotifications = 0;
var divNotifications = document.querySelector("#divNotifications");
var divNotificationWithScroll = document.querySelector(".divNotificationsWithScroll");
let numberOfNotifications = 0;
let listNofitications;

// search friend
var inputSearchUser = document.querySelector("body > div.header > div.left > div > input[type=text]");
var imgLogo = document.querySelector("#imgLogo");
var divResultOfSearchingUser = document.querySelector(".divResultOfSearchingUser");
var divSeeAllResult = document.querySelector(".divSeeAllResult");
var searchedListFriendName = [];
var searchedListFriendId = [];
var searchedListGroupId = [];
var searchedListGroupName = [];

// FriendArea on the right side
var divFriendAreaOnTheRightSide = document.querySelector("body > div.divMain > div.divRight.divMainChild1.divMainChild1_1 > div > div.divFriends");

// display create group and page
var iCreateGroupAndPage = document.querySelector("body > div.header > div.right > i.fa-solid.fa-plus");
var divCreateGroupAndPage = document.querySelector("body > div.header > div.right > div");
var flagDisplayDivCreateGroupAndPage = 0;

// create frontend 
var divDisplaySomeGroup = document.querySelector("body > div.divMain > div.divLeft.divMainChild1.divMainChild1_1 > div.divDisplaySomeOfGroupAndPage");
var divGroupOnRight = document.querySelector("body > div.divMain > div.divRight.divMainChild1.divMainChild1_1 > div > div.divPage");