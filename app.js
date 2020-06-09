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
        type: document.querySelector(DOMstrings.inputType).value, // type n exp or inc gesen yum butsaana
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
  // privet function
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  // privet function
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  // privet data
  var data = {
    items: {
      inc: [],
      exp: [],
    },

    totals: {
      inc: 0,
      exp: 0,
    },
  };
  //  dotoroo closure tai  public servece nemj ugch bj gadnaas handah bolomjtoi bolno
  return {
    addItem: function (type, desc, val) {
      var item, id;

      // id=identification - todorhoildog hucin zuil davhardaj bolohgui
      if (data.items[type].length === 0) id = 1;
      else {
        id = data.items[type][data.items[type].length - 1].id + 1;
      }

      if (type === "inc") {
        item = new Income(id, desc, val);
      } else {
        // type === exp
        item = new Expense(id, desc, val);
      }
      data.items[type].push(item);
    },
    seedata: function () {
      return data;
    },
  };
})();

// программын холбогч контроллер
var appController = (function (uiController, financeController) {
  // privet function
  var ctrlAddItem = function () {
    // 1. оруулах өгөгдлийг дэлгэцээс олж авна.

    var input = uiController.getInput();

    // 2. олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгална.
    financeController.addItem(input.type, input.description, input.value);

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
