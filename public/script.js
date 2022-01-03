function mostrar(id) {
  if (id == "sin_filtro") {
    $("#prod_nombre").hide();
    $("#prod_id").hide();
    $("#prod_codigo").hide();
    $("#prod_precio").hide();
    $("#prod_stock").hide();
  }
  if (id == "prod_nombre") {
    $("#prod_nombre").show();
    $("#prod_id").hide();
    $("#prod_codigo").hide();
    $("#prod_precio").hide();
    $("#prod_stock").hide();
  }
  if (id == "prod_id") {
    $("#prod_nombre").hide();
    $("#prod_id").show();
    $("#prod_codigo").hide();
    $("#prod_precio").hide();
    $("#prod_stock").hide();
  }
  if (id == "prod_codigo") {
    $("#prod_nombre").hide();
    $("#prod_id").hide();
    $("#prod_codigo").show();
    $("#prod_precio").hide();
    $("#prod_stock").hide();
  }
  if (id == "prod_precio") {
    $("#prod_nombre").hide();
    $("#prod_id").hide();
    $("#prod_codigo").hide();
    $("#prod_precio").show();
    $("#prod_stock").hide();
  }
  if (id == "prod_stock") {
    $("#prod_nombre").hide();
    $("#prod_id").hide();
    $("#prod_codigo").hide();
    $("#prod_precio").hide();
    $("#prod_stock").show();
  }
}


var sumar = document.getElementById("mas");
var restar = document.getElementById("menos");
var contador = document.getElementById("contador");
var prevValue;
function calcular() {
  var value = contador.value;
  var isValid = /^[1-9][0-9]*$/.test(value);

  if (!isValid) {
    contador.value = prevValue;
  } else {
    prevValue = value;
  }
}
sumar.onclick = function () {
  contador.value = Number(contador.value) + 1;
  calcular();
};
restar.onclick = function () {
  contador.value = Number(contador.value) - 1;
  calcular();
};
contador.onkeyup = function () {
  if (contador.value === "") {
    return;
  }
  calcular();
};
calcular();
