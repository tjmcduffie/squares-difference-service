/* jshint browser:true */
/**
 * SDS Namespace
 * @type {Object}
 */
var SDS = {};

SDS.init = function() {
  var article = new SDS.MainArticleView().render();

  var main = document.querySelector('main');
  if (main) {
    main.appendChild(article.el);
  }
};