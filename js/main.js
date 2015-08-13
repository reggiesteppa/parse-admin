//parse initialize needed to access Parse
Parse.initialize("APPKEY FROM PARSE", "ANOTHER APP KEY FROM PARSE");


//cancel function displays starting menu
var cancel = function() {
    $( ".content" ).empty();
    var menu = '<div class ="add">ADD ARTICLE</DIV>'; 
    menu += '<div class ="list">LIST ARTICLES</DIV>';
    $( ".content" ).append(menu);
    $("div").addClass("myButton");
    $( ".add" ).click(function() {
        addArticle();
    });
    $( ".list" ).click(function() {
        listAll();
    });
};


//displays an individual article
var displayArt = function (tmpID) {
    $( ".content" ).empty();
    var artPage = "";
    var art = Parse.Object.extend("article");
    var single = new Parse.Query(art);
    single.get(tmpID, {
        success: function(myArticle) {
            var name = myArticle.get("Title");
            var image = myArticle.get("pic");
            var tease = myArticle.get("Teaser");
            var fullText = myArticle.get("Article");
            artPage += '<img class="artImg">';
            artPage += '<h1>' + name + '</h1>';
            artPage += '<p>' + tease + '</p>';
            artPage += '<p>' + fullText + '</p>';
            artPage += '<div class ="delete">DELETE ARTICLE</DIV>';
            artPage += '<div class ="back">GO BACK</DIV>';
            $( ".content" ).append(artPage);
            $(".artImg")[0].src = image.url();
            $("div").addClass("myButton");
            $( ".delete" ).click(function() {
                
                myArticle.destroy({
                success: function(myObject) {
                alert('Article deleted');
                cancel();
                },
                error: function(myObject, error) {
                
                    
                }
            });
            
                
            });
            $( ".back" ).click(function() {
                listAll();
            });
            
        },
        error: function(object, error) {
            
            alert ("didnt get article");
            
        } 
    });
    
};


//displays all articles in a list 
var listAll = function () {
    $( ".content" ).empty();
    var listing = "";
    var allArticles = Parse.Object.extend("article");
    var artList = new Parse.Query(allArticles);
    artList.find({
        success: function(results) {
        for (var i = 0; i < results.length; i++) {
            var tmpObject = results[i];
            listing += '<div class = "myButton" onclick="displayArt(\'' + tmpObject.id  + '\');">' + tmpObject.get("Title")  + '</div><br>';
        }
            listing += '<div class ="back">GO BACK</DIV>';
            $( ".content" ).append(listing);
            $( ".back" ).click(function() {
                cancel();
    });
        },
        error: function(error) {
            alert ("didnt get objects");
            
        }
    });
    
};


//function to add an article and display starting menu
var saveArticle = function () {
    var parseImg;
    var artPic = $("#articlePic")[0];
    var artTitle = $("#articleTitle").val();
    var artTeaser = $("#articleTeaser").val();
    var artText = $("#articleText").val();
    var NewArticle = Parse.Object.extend("article");
    var newArticle = new NewArticle();

     if (artPic.files.length > 0) {
        var pic = artPic.files[0];
        var fName = "pic.jpg";
        parseImg = new Parse.File(fName, pic)
        parseImg.save();
     }
     newArticle.set("pic", parseImg);
     newArticle.set("Title", artTitle);
     newArticle.set("Teaser", artTeaser);
     newArticle.set("Article", artText);
     newArticle.save();
     
     var newMenu = '<div class ="add">ADD ARTICLE</DIV>';
     newMenu += '<div class ="list">LIST ARTICLES</DIV>';
     $( ".content" ).empty();
     $( ".content" ).append(newMenu);
     $("div").addClass("myButton");
     $( ".add" ).click(function() {
        addArticle();
         
     });
     $( ".list" ).click(function() {
        listAll();
    });

};


//displays menu to add an article
var addArticle = function () {
    var addPage = '<h1>Choose image for article</h1>';
    addPage += '<input type="file" id="articlePic">';
    addPage += '<h1>Article Title</h1>';
    addPage += '<input type="text" id="articleTitle" size="60">';
    addPage += '<h1>Article Teaser</h1>';
    addPage += '<textarea id="articleTeaser" rows="5" cols="70"></textarea>';
    addPage += '<h1>Article</h1>';
    addPage += '<textarea id="articleText" rows="15" cols="70"></textarea>';
    addPage += '<div id ="saveButton">SAVE ARTICLE</DIV>';
    addPage += '<div id ="cancelButton">CANCEL SAVE</DIV>';
    $( ".content" ).empty();
    $( ".content" ).append(addPage);
    $("div").addClass("myButton");
    $( "#saveButton" ).click(function() {
        saveArticle();
    });
    $( "#cancelButton" ).click(function() {
        cancel();
    });
    
};


//initial function that runs and displays starting menu
$( document ).ready(function() {
    var menu = '<div class ="add">ADD ARTICLE</DIV>';
    menu += '<div class ="list">LIST ARTICLES</DIV>';
    $( ".content" ).append(menu);
    $("div").addClass("myButton");
    
    $( ".add" ).click(function() {
        addArticle();
    });
    $( ".list" ).click(function() {
        listAll();
    });
    
});