$(function () {
    $('.list-group.checked-list-box .list-group-item').each(function () {

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

    $('#get-checked-data').on('click', function(event) {
        event.preventDefault();
        var checkedItems = {}, counter = 0;
        $("#check-list-box li.active").each(function(idx, li) {
            checkedItems[counter] = $(li).text();
            counter++;
        });
        $('#display-json').html(JSON.stringify(checkedItems, null, '\t'));
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
  // console.log( "User clicked on 'search.'" );
  var userInput = $("#usr").val();  // #usr is the input field
  userInput = userInput.replace(/\s+/g,"+");  // \s space, g global, + maybe repeated more than once
  // console.log(userInput);
  var userLocation_selected = document.getElementById("location");
  var userLocation = userLocation_selected.options[userLocation_selected.selectedIndex].value;
  console.log(userLocation);
  switch(userLocation) {
    case "AB":
        var github_link = "https://api.github.com/search/users?q=" + userInput + "+location:" + userLocation +"+location:Alberta";
        break;
    case "BC":
        var github_link = "https://api.github.com/search/users?q=" + userInput + "+location:" + userLocation +"+location:British+Columbia";
        break;
    case "ON":
        var github_link = "https://api.github.com/search/users?q=" + userInput + "+location:" + userLocation +"+location:Ontario";
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
    var userRepo = json.items[0].repos_url;
    console.log(userRepo);
    $.getJSON(userRepo, function(json){
      var userRepoName = new Array;
      for(var n = 0; n < json.length; n++){  //repo name
        userRepoName[n] = json[n].name;
      }
      // console.log(userRepoName);
      $(".github").append("<h2 class="github-header">GitHub</h2>");
      $(".github").append("<h2 class="github-header-small">Repository</h2>");
      $(".github").append("<ul class="github-repo">");
      for(var n = 0; n < userRepoName.length; n++){
        $(".github").append("<li>" + userRepoName[n] + "</li>");
      }
      $(".github").append("</ul>");
      // $.each(json, function(){
      //   var userRepoName = this.name;
      //   console.log(this.name);
      // });
    });
  });
});
