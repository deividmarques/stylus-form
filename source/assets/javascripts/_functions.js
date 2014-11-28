var doc = doc || {};

var doc = (function() {
  'use strict';

  function init() {
    menuToggle();
    formSearch();
  }

  function menuToggle() {
    $('.doc-menu-btn').on('click',function(){
      $('html').toggleClass('doc-menu-hide');
    });
  }

  function formSearch() {
    $('.doc-search-input').keyup(function(){
      var value = $(this).val();
      var searchField = $('.doc-search-input').val();
      var myExp = new RegExp(searchField, "i");
      var output = '<ul class="doc-search-list">';
          output += '<li><h2 class="doc-search-title">Resultado da busca</h2></li>';
      if(value === ""){
        $('.doc-search-results').html("");
      }
      else{
        $.getJSON('/assets/javascripts/search.json', function(data) {
          $.each(data, function(key, val){
            if ((val.title.search(myExp) != -1) || (val.path.search(myExp) != -1)) {
              output += '<li><a href="/'+ val.path +'">' + val.title;
              output += '<p>' + val.description + '</p></a></li>';
            }
          });
          $('.doc-search-results').html(output);
        });
      }
    });
  }

  return {
    init: init
  };

}());

$(window).load(function() {
  doc.init();
});
