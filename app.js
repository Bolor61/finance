// дэлгэцтэй ажиллах контроллер
var uiController = (function () {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
    incomeList: ".income__list",
    expenseList: ".expenses__list",
  };

  return {
    // public servece
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // type n exp or inc gesen yum butsaana
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseInt(document.querySelector(DOMstrings.inputValue).value),
      };
    },
    getDOMstrings: function () {
      return DOMstrings;
    },
    // delegtsen deerh medeelliig oruulsanii daraa tseverleh function
    clearFields: function () {
      var fields = document.querySelectorAll(
        DOMstrings.inputDescription + "," + DOMstrings.inputValue
      );
      //  convert list to Array slice iig ashiglaj list iig array ruu hurvuuleh fields n list yum

      var fieldsArr = Array.prototype.slice.call(fields);
      // forEach function ene n for davtaltiig mash haylbar bolgoj bga
      // forEach dotoroo annanymos function hiigeed terendee 3 ugugdul ugnu element, index , butsaagaad tuhain array ig hiigeed ugnu
      fieldsArr.forEach(function (el, index, array) {
        el.value = ""; // element iinhee value g n hooson oor zaagaad uguhuur shuud tseverleed ugnu
      });

      // masssiviinhaa ali element dr cusor oo abaachih gej bgaagaa focus gj zaaj ugnu

      fieldsArr[0].focus();

      // for (var i = 0; i < fieldsArr.length; i++) {
      //   fieldsArr[i].value = "";
      // }
    },

    addListItem: function (item, type) {
      // орлого зарлагын элементийг агуулсан html бэлтгэнэ.
      var html, list;
      if (type === "inc") {
        list = DOMstrings.incomeList;
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else {
        list = DOMstrings.expenseList;
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      // тэр HTMLдотороо орлого зарлагын утгуудыг REPLACE ашиглаж өөрчилж өгнө.
      html = html.replace("%id%", item.id);
      html = html.replace("$$DESCRIPTION$$", item.description);
      html = html.replace("$$VALUE$$", item.value);

      // Бэлтгэсэн  HTML ээ DOM руу хийж өгнө
      document.querySelector(list).insertAdjacentHTML("beforeend", html);
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

  var calculateTotal = function (type) {
    var sum = 0;
    data.items[type].forEach(function (el) {
      sum = sum + el.value;
    });

    data.totals[type] = sum;
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
    tusuv: 0,

    huvi: 0,
  };
  //  dotoroo closure tai  public servece nemj ugch bj gadnaas handah bolomjtoi bolno
  return {
    tusuvTootsooloh: function () {
      //  niit orlogiin niilberiig tootsoolno
      calculateTotal("inc");

      //  niit zarlagiin niilberiig tootsoolno
      calculateTotal("exp");

      // tusuviig shineer tootsoolno
      data.tusuv = data.totals.inc - data.totals.exp;

      // orlogo zarlagiin huviig tootsono
      data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
    },
    tusviigAvan: function () {
      // olon utga butsaaj bga bolhoor object oor butsaana
      return {
        tusuv: data.tusuv,
        huvi: data.huvi,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
      };
    },

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

      return item;
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

    // console.log(input.description === "");   description and value  utga n hoosoon bol true gej uzii gevel doorh if tei adil bolno
    // console.log(input.value === "");

    if (input.description !== "" && input.value !== "") {
      // 2. олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгална.
      var item = financeController.addItem(
        input.type,
        input.description,
        input.value
      );

      // 3. олж авсан өгөгдлүүдээ вэб дээрээ  тохирох хэсэгт нь гаргана.
      uiController.addListItem(item, input.type);
      uiController.clearFields();

      // 4. Төсвийг тооцоолно---юу тооцоолох бэ гэвэл санхүүгийн модуль тооцоно тэгвэл хойноос нь бичиж үз
      financeController.tusuvTootsooloh();

      // 5. Эцсийн үлдэгдэл,
      var tusuv = financeController.tusviigAvan();

      //Төсвийн тооцоог дэлэгцэнд гаргана.
      console.log(tusuv);
    }
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
