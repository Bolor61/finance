// дэлгэцтэй ажиллах контроллер
var uiController = (function () {})();

// санхүүтэй ажиллах контроллер
var financeController = (function () {})();

// программын холбогч контроллер
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    console.log("clicked ....");
    // 1. оруулах өгөгдлийг дэлгэцээс олж авна.
    console.log("дэлгэцээс өгөгдлөө авах хэсэг");
    // 2. олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгална.
    // 3. олж авсан өгөгдлүүдээ вэб дээрээ  тохирох хэсэгт нь гаргана.
    // 4. Төсвийг тооцоолно
    // 5. Эцсийн үлдэгдэл, тооцоог дэлэгцэнд гаргана.
  };

  document.querySelector(".add__btn").addEventListener("click", function () {
    ctrlAddItem();
  });
  document.addEventListener("keypress", function (event) {
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });
})(uiController, financeController);
