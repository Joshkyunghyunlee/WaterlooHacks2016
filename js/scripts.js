$(function () {
    $('.list-inline.checked-list-box .list-group-item').each(function () {

        // Settings
        var $widget = $(this),
            $checkbox = $('<input type="checkbox" class="hidden" />'),
            color = ($widget.data('color') ? $widget.data('color') : "primary"),
            style = ($widget.data('style') == "button" ? "btn-" : "list-group-item-"),
            settings = {
                on: {
                    icon: 'glyphicon glyphicon-check'
                },
                off: {
                    icon: 'glyphicon glyphicon-unchecked'
                }
            };

        $widget.css('cursor', 'pointer')
        $widget.append($checkbox);

        // Event Handlers
        $widget.on('click', function () {
            $checkbox.prop('checked', !$checkbox.is(':checked'));
            $checkbox.triggerHandler('change');
            updateDisplay();
        });
        $checkbox.on('change', function () {
            updateDisplay();
        });


        // Actions
        function updateDisplay() {
            var isChecked = $checkbox.is(':checked');

            // Set the button's state
            $widget.data('state', (isChecked) ? "on" : "off");

            // Set the button's icon
            $widget.find('.state-icon')
                .removeClass()
                .addClass('state-icon ' + settings[$widget.data('state')].icon);

            // Update the button's color
            if (isChecked) {
                $widget.addClass(style + color + ' active');
            } else {
                $widget.removeClass(style + color + ' active');
            }
        }

        // Initialization
        function init() {

            if ($widget.data('checked') == true) {
                $checkbox.prop('checked', !$checkbox.is(':checked'));
            }

            updateDisplay();

            // Inject the icon if applicable
            if ($widget.find('.state-icon').length == 0) {
                $widget.prepend('<span class="state-icon ' + settings[$widget.data('state')].icon + '"></span>');
            }
        }
        init();
    });
});
// parse JSON data from URI
// var github_link = "https://api.github.com/users/ckyue";
//
// $.getJSON(github_link, function (json) {
// 	var login = json.login;
// 	alert(login);
// });

//scap url
// $(document).ready(function() {
//   $.get( "https://www.linkedin.com/in/ckyue", function( data ) {
//   //$( ".endorse-item-name-text" ).html(data );
//   alert( "Load was performed." );
// });
// });


$( "#search" ).bind( "click", function() {  // #search is the button
  $( ".github" ).empty();
  $('.active').each(function (idx, li) {
        var checkedItems = {}, counter = 0;
        //checkedItems now has the strings of each option the user has checked
            checkedItems[counter] = $(li).text();
            if(checkedItems[counter] = "Github") {
  // console.log( "User clicked on 'search.'" );
  var userInput = $("#usr").val();  // #usr is the input field
  userInput = userInput.replace(/\s+/g,"+");  // \s space, g global, + maybe repeated more than once
  // console.log(userInput);
  var userLocation_selected = document.getElementById("location");
  var userLocation = userLocation_selected.options[userLocation_selected.selectedIndex].value;
  // console.log(userLocation);
  switch(userLocation) {
    case "AB":
        var github_link = "https://api.github.com/search/users?q=" + userInput + "+location:" + userLocation +"+location:Alberta";
        break;
    case "BC":
        var github_link = "https://api.github.com/search/users?q=" + userInput + "+location:" + userLocation +"+location:British+Columbia";
        break;
    case "ON":
        var github_link = "https://api.github.com/search/users?q=" + userInput + "+location:" + userLocation +"+location:Ontario" + userLocation +"+location:Waterloo" + userLocation +"+location:Kitchener" + userLocation +"+location:Toronto";
        break;
    case "MB":
        var github_link = "https://api.github.com/search/users?q=" + userInput + "+location:" + userLocation +"+location:Manitoba";
        break;
    case "NB":
        var github_link = "https://api.github.com/search/users?q=" + userInput + "+location:" + userLocation +"+location:New+Brunswick";
        break;
    case "QC":
        var github_link = "https://api.github.com/search/users?q=" + userInput + "+location:" + userLocation +"+location:Quebec";
        break;
    case "SK":
        var github_link = "https://api.github.com/search/users?q=" + userInput + "+location:" + userLocation +"+location:Saskatchewan";
        break;
    default:
        var github_link = "https://api.github.com/search/users?q=" + userInput;
      }
  //pass github link we got based from user input
  console.log(github_link);
  $.getJSON(github_link, function (json) {
    //If our user search has no matches, append an error message to the user
    if (json.items[0] == null) {
        $(".github").append("<h3>No Github user matched specified inputs</h3>");
    }
    
    var userRepo = json.items[0].repos_url + "?access_token=83701724955f812815dfb18948932621900cd00b";
    var githubUser = json.items[0].login;
    var githubLink = "https://github.com/" + githubUser;
    var repoLink = githubLink + "?tab=repositories";
    var userPic = json.items[0].avatar_url;
    $(".github").append("<h2><i></i> Github Profile</h2>");
    $("i").addClass("fa fa-github fa-1x");
    $(".github").append("<h5>" + "Github username: " + githubUser + "</h5>");
    $(".github").append("<a>User's profile URL</a>");
    $("a").attr("href", githubLink); 
    $("a").attr("target", "_blank");  //opens new tab
    $(".github").append("<br />");
    $(".github").append("<br />");
    $(".github").append("<img></img");
    $("img").addClass("userPic");
    $("img").attr("src", userPic);
    $(".github").append("<br />");
    console.log(userRepo);
    console.log(githubLink);
      
    $.getJSON(userRepo, function(json){
      var userRepoName = new Array;
      var userRepoDescription = new Array;
      for(var n = 0; n < json.length; n++){  //repo name
        userRepoName[n] = json[n].name;
        userRepoDescription[n] = json[n].description;
      }
      console.log(userRepoName);
      $(".github").append("<br />");
      $(".github").append("<h3>Repositories</h3><p>(listed in chronological order)</p>");
      $("h3").addClass("section-header-small");
      $(".github").append("<ul>");
      $("ul").addClass("list-group");
      for(var n = 0; n < userRepoName.length; n++){
        var number = n + 1;
        $(".github").append("<li>" + number + '. ' + userRepoName[n] + '<br /><br />' + 'Description: ' + userRepoDescription[n] + "</li>");
        $("li").addClass("list-group-item");
      }
      $(".github").append("</ul>");
    });
  });
            }
            counter++;
        });
});
