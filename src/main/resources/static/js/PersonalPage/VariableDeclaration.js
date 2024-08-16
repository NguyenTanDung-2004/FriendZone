var divClickDisplayCreatePost = document.querySelector("body > div.divMain > div.divMain1 > div.divRight1 > div > div");
var divBlurBox = document.querySelector("#divBlurBox");
var iCloseCommmentBox = document.querySelector("#iCloseComment");
var divComment = document.querySelector("#divComment");
var arrayIconDisplayComment = document.querySelectorAll("body > div.divMain > div.divMain1 > div.divRight1 > div.divPost > div.divLikeCommentShare > div.divComment.divLikeCommentShareChild");
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

// create Post
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

// icon scope create Post.
var publicScope = 'fa-solid fa-earth-americas divScopePostChild';
var onlyScope = 'fa-solid fa-lock divScopePostChild';
var friendScope = 'fa-solid fa-user-group divScopePostChild';

// changed data.
var currentInputServedForChooseIcon;
var arrayCurrentTagedFriendName = [];

// form display none 
var formUploadFilePost = document.querySelector("#formUploadFilePost");
var inputUploadFileInPost = document.querySelector("#inputUploadFileInPost");

// tag friend
var iCloseTagFriend = document.querySelector("#iCloseTagFriend");
var divTagFriend = document.querySelector("#divTagFriend");
var divResultSearchTagFriend = document.querySelector("#divResultSearchTagFriend");

// edit detail
var pEditDetail = document.querySelector("body > div.divMain > div.divMain1 > div.divLeft1.divMain1Child > div.divIntro.divMain1Child > p.pEditButton");
var divEditDetail = document.querySelector("#divEditDetail");
var iCloseEditDetail = document.querySelector("#iCloseEditDetail");
var inputFirstName = document.querySelector("#inputFirstName");
var inputLastName = document.querySelector("#inputLastName");
var selectGender = document.querySelector("#selectGender");
var inputDateOfBirth = document.querySelector("#inputDateOfBirth");
var inputLive = document.querySelector("#inputLive");
var inputFrom = document.querySelector("#inputFrom");
var inputStudy = document.querySelector("#inputStudy");
var inputWork = document.querySelector("#inputWork");
var divConfirm = document.querySelector("#divConfirm");

// photos
var divPhotos = document.querySelector("body > div.divMain > div.divMain1 > div.divLeft1.divMain1Child > div.divPhoto.divMain1Child > div.divImg");

// upload image avt and background
var iUploadAvt = document.querySelector("body > div.divMain > div.divHeader > div.divName > div.divImg > i");
var divUploadCoverPhoto = document.querySelector("body > div.divMain > div.divHeader > div.divBackgroundImage > div");
var formUploadImageAvtAndBackground = document.querySelector("#formUploadImageAvtAndBackground");
var inputUploadImageAvtAndBackground = document.querySelector("#inputUploadImageAvtAndBackground");
var buttonSubmitFormUploadImageAvtAndBackground = document.querySelector("#formUploadImageAvtAndBackground button");
var inputTypeFileFormUploadAvtAndBackground = document.querySelector("#inputTypeFileFormUploadAvtAndBackground");
var imgAvatar = document.querySelector("body > div.divMain > div.divHeader > div.divName > div.divImg > img");
var imgBackground = document.querySelector("#imgBackgroundImage");

// add friend
var divAddFriend = document.querySelector("body > div.divMain > div.divHeader > div.divName > div.divAddFriend");
var pContentAddFriend = document.querySelector("body > div.divMain > div.divHeader > div.divName > div.divAddFriend p");

// notifications
var iBell = document.querySelector("#iBell");
var flagTurnOnTurnOfNotifications = 0;
var divNotifications = document.querySelector("#divNotifications");
var divNotificationWithScroll = document.querySelector(".divNotificationsWithScroll");
let numberOfNotifications = 0;
let listNofitications;

// Friend Area
var divFriendChild = document.querySelector("body > div.divMain > div.divMain1 > div.divLeft1.divMain1Child > div.divFriend.divMain1Child > div.divFriendChild");
let listFriendId;
let listFriendName;
let listAllFriendId;
let listAllFriendName;
    // friend area next to avatar
var divImgFriends = document.querySelector("body > div.divMain > div.divHeader > div.divName > div.divRight > div.divImgFriends");

// tag Friend
var divResultSearchTagFriend = document.querySelector("#divResultSearchTagFriend");
var listFlagTagedFriend = [];
var mapIndexTagFriend = new Map();
var listIndex = [];

// upload files to post
var mapFileInPost = new Map();
var listFileInPost = [];

// post
var divButtonPost = document.querySelector("#divCreatePostBox > div.divButtonPost");
var scopePost = 1;
var selectorScopePost = document.querySelector("#selectScope");
var arrayDivBlurImgOrVideo;
var objectPostInfo;
const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
const videoExtensions = ['mp4', 'avi', 'mkv', 'mov'];

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


// like post 
var arrayDivLike;
var arrayILike;
var arrayPLike;
var currentPostId;
var arrayNumberOfLikes;
var arrayPNumberOfLikes;
var arrayListLikedPost;

// back to personal page
var imgUser = document.querySelector("#imgUser");
imgUser.addEventListener("click", () => 
    {
        window.location = "http://localhost:8080/FriendZone";
    }
)


//update post
var listOldFile;
var listNewFile;
var inputRadioDeleteTaged = document.querySelector("#divDeleteTagedFriend > input[type=radio]");
var inputRadioDeleteAttached = document.querySelector("#divDeleteAttachedFile > input[type=radio]");
var currentPostIdUpdate;

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

var userId = document.querySelector("#imgUser").src;
userId = userId.replace("http://localhost:8080/FileUser/Image/", "").replace("/avatar.jpg", "");

//update post from post detail
var flagUpdatePostFromPostDetail = 0;

//share post
var flagSharePost = 0;
var currentIndexPostInSharedPost;


