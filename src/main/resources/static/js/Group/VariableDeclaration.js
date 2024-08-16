// list ten members area
var divImgGroupMembers = document.querySelector("body > div.divMain > div > div.divNameMembers > div.divImg");
var iSeeAll = document.querySelector("body > div.divMain > div > div.divNameMembers > div.divImg > i");

// hide element
var divEditImage = document.querySelector("body > div.divMain > div.divTitle > div.divNameMembers > div.divEditImg");
var pConfirm = document.querySelector("body > div.divMain > div.divTitle > div.divFilter > div.divLeft > p:nth-child(5)");
var divDelete = document.querySelector("body > div.divMain > div.divTitle > div.divFilter > div.divRight > div.divDelete.div2");

// create post
var divInputCreatePost = document.querySelector("body > div.divMain > div.divContent > div.divCreatePost > div");
var divCreatePostBox = document.querySelector("#divCreatePostBox");
var divBlur = document.querySelector("#divBlurBox");
var iTurnOffCreatePostBox = document.querySelector('#iClose');
var imgUploadFileInPost = document.querySelector("#imgAddFileToPost");
var inputUploadFileInPost = document.querySelector("#inputUploadFileInPost");
var divContainImgVideo = document.querySelector("#divCreatePostBox > div.divContainImgVideo");
var mapFileUploadInPost = new Map();
var divContainTagedFriend = document.querySelector("#divContainTagedFriend");
var imgDisplayTagFriend = document.querySelector("#imgTagFriends");
var textAreaInCreatePost = document.querySelector("#divCreatePostBox > div.divInput > textarea");
var inputAnonymous = document.querySelector('#flexSwitchCheckDefault');
var flagInputAnonymous = 0;
var imgUserInCreatePost = document.querySelector("#divCreatePostBox > div.divName > img");
var buttonCreatePost = document.querySelector("#divCreatePostBox > div.divButtonPost");
var pName = document.querySelector("#divCreatePostBox > div.divName > div > p");

// upload background image
var inputUploadImageBackground = document.querySelector("#inputUploadImageBackground");
var backgroundImageFile;
var imgBackgroundGroup = document.querySelector("body > div.divMain > div.divTitle > img");


// spinner
var spinner = document.querySelector(".divContainSpinner");

// div tag friend in post
var divContainFriendInTagFriendBox = document.querySelector("#divResultSearchTagFriend");
var listFriendName;
var listFriendId;
var divTagFriend = document.querySelector("#divTagFriend");
var iCloseTagFriend = document.querySelector("#iCloseTagFriend");
var mapTagFriendInPost1 = new Map(); // (iDelete, userId);
var mapTagFriendInPost2 = new Map();// (userId, 1);

// divIconBox
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
var currentInputOrTextArea;
var imgDisplayIconBoxInCreatePostBox = document.querySelector("#imgGetIcon");

// userId
var idOfUserRequest = document.querySelector("#imgUser").src;
idOfUserRequest = idOfUserRequest.replace("http://localhost:8080/FileUser/Image/", "").replace("/avatar.jpg", "");

// all post in group
var divContent = document.querySelector("body > div.divMain > div.divContent");
var allPostInGroup;
const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
const videoExtensions = ['mp4', 'avi', 'mkv', 'mov'];
var divToast = document.querySelector("#toast");

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

//edit post 
var flagEditPost = 0;
var divEditPost = document.querySelector("#divCreatePostBox.divEditPost")
var divDeleteTagedFriend = document.querySelector("#divDeleteTagedFriend")
var divDeleteAttachedFile = document.querySelector("#divDeleteAttachedFile")
var inputRadio1 = document.querySelector("#inputRaido1");
var inputRadio2 = document.querySelector("#inputRaido2");
var flagDeleteOldTagedFriend = 0;
var flagDeleteOldAttachedFile = 0;
var mapPostIdIndex = new Map();
var iCloseEditPost = divEditPost.querySelector("#iClose");
var divContentImgVideoInEditPost = divEditPost.querySelector(".divContainImgVideo");
var mapFileUploadInEditPost = new Map();
var mapTagFriendInEditPost1 = new Map();
var mapTagFriendInEditPost2 = new Map();
var divContainTagedFriendInEditPost = divEditPost.querySelector("#divContainTagedFriend");
var imgUploadFileInEditPost = divEditPost.querySelector("#imgAddFileToPost");
var imgDisplayTagFriendInEdtiPost = divEditPost.querySelector("#imgTagFriends");
var imgDisplayDivIconInEditPost = divEditPost.querySelector("#imgGetIcon");
var textAreaInEditPost = divEditPost.querySelector("textarea");
var inputUploadFileInEdtiPost = document.querySelector("#inputUploadFileInEditPost");
var flagAnonymousInEditPost = 0;
var imgUserInEditPost = divEditPost.querySelector("img");
var switchInEditPost = divEditPost.querySelector(".form-check-input");
var buttonUpdatePost = divEditPost.querySelector(".divButtonPost");
var currentPostIdInEditPost;

// comment
var divComment = document.querySelector("#divComment");
var divContentComment = document.querySelector('#divContentComment');
var iCloseDivComment = document.querySelector("#iCloseComment");
var inputUploadInComment = document.querySelector("#inputUploadInComment");
var iconInComment = document.querySelector("#divComment > div.divCommentComment > div > div > div.divIcon > i.bi.bi-emoji-wink");
var imgUploadFileInComment = document.querySelector("#divComment > div.divCommentComment > div > div > div.divIcon > i.bi.bi-camera");
var imgTagFriendInComment = document.querySelector("#divComment > div.divCommentComment > div > div > div.divIcon > i.bi.bi-tags");
var textareaInComment = document.querySelector("#textareaLevel1");
var divTagedFriendInComment = document.querySelector("#divComment > div.divCommentComment > div > div > div.divImgOrVideo > div");
var mapTagFriendInComment = new Map();
var flagComment = 0;
var iCloseTagFriendInComment = document.querySelector("#iCloseComment2");
var iCloseImgOrVideoInComment = document.querySelector("#iCloseComment1");
var divImgOrVideoInComment = document.querySelector("#divComment > div.divCommentComment > div > div > div.divImgOrVideo");
var fileUploadInComment;
var flagLevel = 1;
var currentParentCommentId = '';
var iSendComment = document.querySelector("#iSendComment");
var currentPostIdInComment;
var allCommentInPost;
var iBack = document.querySelector("#divComment > div.divHeaderComment > i.fa-solid.fa-arrow-left");
var pHeaderInComment = document.querySelector("#divComment > div.divHeaderComment > p");
var currentAllCommentChild;
var mapComment = new Map(); // commentId, index
var currentUserName;

// edit comment
var pHeaderEditComment = document.querySelector("#divEditComment > div.divHeader.divEditCommentChild > p");
var textAreaEditComment = document.querySelector("#divEditComment > div.divContent.divEditCommentChild > textarea");
var imgDisplayIconEditComment = document.querySelector("#divEditComment > div.divContent.divEditCommentChild > div.divIcon > i.bi.bi-emoji-wink");
var imgUploadFileEditComment = document.querySelector("#divEditComment > div.divContent.divEditCommentChild > div.divIcon > i.bi.bi-camera");
var imgTagFriendEditComment = document.querySelector("#divEditComment > div.divContent.divEditCommentChild > div.divIcon > i.bi.bi-tags");
var buttonConfirmEditComment = document.querySelector("#divEditComment > div.divButton.divEditCommentChild > p.pConfirm.divButtonChild");
var buttonDeleteComment = document.querySelector("#divEditComment > div.divButton.divEditCommentChild > p.pDelete.divButtonChild");
var flagEditComment = 0;
var iCloseEditComment = document.querySelector("#iCloseEditComment");
var iCloseTagFriendEditComment = document.querySelector("#iCloseEditComment1");
var iCloseImgOrVideoEditComment = document.querySelector("#iCloseEditComment2");
var divContainImgVideoEditComment = document.querySelector("#divEditComment > div.divContent.divEditCommentChild > div.divImgOrVideo");
var divContainTagFriendEditComment = document.querySelector("#divEditComment > div.divContent.divEditCommentChild > div.divTagedFriend");
var listTagFriendInEditComment = [];
var divEditComment = document.querySelector("#divEditComment");
var currentCommentEditComment = [];
var inputUploadInEditComment = document.querySelector("#inputUploadInEditComment");
var flagDeleteFriendEditComment = 0;
var flagDeleteImgOrVideoEditComment = 0;
var currentFileEditComment = null;

// change tab
var tabMember = document.querySelector("body > div.divMain > div.divTitle > div.divFilter > div.divLeft > p.pMembers");
var tabMedia = document.querySelector("body > div.divMain > div.divTitle > div.divFilter > div.divLeft > p.pMedia");
var tabFiles = document.querySelector("body > div.divMain > div.divTitle > div.divFilter > div.divLeft > p.pFiles");
var tabConfirm = document.querySelector("body > div.divMain > div.divTitle > div.divFilter > div.divLeft > p:nth-child(5)");
