// дэлгэцтэй ажиллах контроллер
var uiController = (function () {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
  };

  return {
    // public servece
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value,
      };
    },
    getDOMstrings: function () {
      return DOMstrings;
    },
  };
})();

// санхүүтэй ажиллах контроллер
var financeController = (function () {
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      inc: [],
      exp: [],
    },

    totals: {
      inc: 0,
      exp: 0,
    },
  };
})();

// программын холбогч контроллер
var appController = (function (uiController, financeController) {
  // privet function
  var ctrlAddItem = function () {
    // 1. оруулах өгөгдлийг дэлгэцээс олж авна.

    console.log(uiController.getInput());
    // 2. олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгална.
    // 3. олж авсан өгөгдлүүдээ вэб дээрээ  тохирох хэсэгт нь гаргана.
    // 4. Төсвийг тооцоолно
    // 5. Эцсийн үлдэгдэл, тооцоог дэлэгцэнд гаргана.
  };

  // privet function - гаднаас нь хандаж чадахгүй гэсэн үг хэрвээ дууддаг болгоё гэвэл public servece хийж өгнө түүнийг return ээр хийдэг
  var setupEventlisteners = function () {
    var DOM = uiController.getDOMstrings();

    document.querySelector(DOM.addBtn).addEventListener("click", function () {
      ctrlAddItem();
    });
    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  // public servece
  return {
    init: function () {
      console.log(" Application started ... ");
      setupEventlisteners();
    },
  };
})(uiController, financeController);

appController.init();
