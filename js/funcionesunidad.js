function validarCampos() {
    var cantidadProducto1 = document.getElementById("cantidadProducto1").value;
    var precioProducto1 = document.getElementById("precioProducto1").value;
    var cantidadProducto2 = document.getElementById("cantidadProducto2").value;
    var precioProducto2 = document.getElementById("precioProducto2").value;

    var mensajeError = "";

    if (!cantidadProducto1) {
        mensajeError += "Falta ingresar la cantidad del Producto 1.\n";
    }

    if (!precioProducto1) {
        mensajeError += "Falta ingresar el precio del Producto 1.\n";
    }

    if (!cantidadProducto2) {
        mensajeError += "Falta ingresar la cantidad del Producto 2.\n";
    }

    if (!precioProducto2) {
        mensajeError += "Falta ingresar el precio del Producto 2.\n";
    }

    if (mensajeError !== "") {
        alert(mensajeError);
        return false; // Retorna falso si falta completar algún campo
    }

    return true; // Retorna verdadero si todos los campos están completos
}


function compararProductos() {
    if (!validarCampos()) {
        return; // Retorna si falta completar algún campo
    }
    var cantidadProducto1 = parseFloat(document.getElementById("cantidadProducto1").value);
    var precioProducto1 = parseFloat(document.getElementById("precioProducto1").value);
    var cantidadProducto2 = parseFloat(document.getElementById("cantidadProducto2").value);
    var precioProducto2 = parseFloat(document.getElementById("precioProducto2").value);

    var precioPorUnidad1 = precioProducto1 / cantidadProducto1;
    var precioPorUnidad2 = precioProducto2 / cantidadProducto2;

    var resultado = document.getElementById("resultado");
    
        if (precioPorUnidad1 < precioPorUnidad2) {
            if (cantidadProducto1 === cantidadProducto2) {
                resultado.innerHTML = "<p>Producto 1 es más barato y te ahorras $" + Math.abs((precioProducto2 - precioProducto1).toFixed(2)) + "</p>";
            } else if (cantidadProducto1 < cantidadProducto2) {
                var cantidadExtra = Math.ceil(cantidadProducto2 / cantidadProducto1);
                var totalGastado = cantidadExtra * precioProducto1;
                resultado.innerHTML = "<p>Producto 1 es más barato. Si quieres comprar la misma cantidad o más que el Producto 2, deberías comprar " + cantidadExtra + " unidades de Producto 1. Terminas gastando $" + totalGastado.toFixed(2) + ", pero al final ahorras $" + (precioProducto2 - totalGastado).toFixed(2) + "</p>";
            } else {
                resultado.innerHTML = "<p>Producto 1 es más barato y te ahorras $" + Math.abs((precioProducto2 - precioProducto1).toFixed(2)) + ".</p>";
            }
        } else if (precioPorUnidad1 > precioPorUnidad2) {
            if (cantidadProducto1 === cantidadProducto2) {
                resultado.innerHTML = "<p>Producto 2 es más barato y te ahorras $" + Math.abs((precioProducto1 - precioProducto2).toFixed(2)) + "</p>";
            } else if (cantidadProducto2 < cantidadProducto1) {
                var cantidadExtra = Math.ceil(cantidadProducto1 / cantidadProducto2);
                var totalGastado = cantidadExtra * precioProducto2;
                resultado.innerHTML = "<p>Producto 2 es más barato. Si quieres comprar la misma cantidad o más que el Producto 1, deberías comprar " + cantidadExtra + " unidades de Producto 2. Terminas gastando $" + totalGastado.toFixed(2) + ", pero al final ahorras $" + (precioProducto1 - totalGastado).toFixed(2) + "</p>";
            } else {
                resultado.innerHTML = "<p>Producto 2 es más barato y te ahorras $" + Math.abs((precioProducto1 - precioProducto2).toFixed(2)) + ".</p>";
            }
        } else {
            if (cantidadProducto1 === cantidadProducto2) {
                resultado.innerHTML = "<p>Ambos productos salen lo mismo y traen lo mismo. Elige según tus gustos.</p>";
            } else {
                var cantidadMenor = Math.min(cantidadProducto1, cantidadProducto2);
                var cantidadMayor = Math.max(cantidadProducto1, cantidadProducto2);
                var cantidadExtra = Math.ceil(cantidadMayor / cantidadMenor);
                var productoMenor = cantidadProducto1 < cantidadProducto2 ? "Producto 1" : "Producto 2";
                var productoMayor = cantidadProducto1 < cantidadProducto2 ? "Producto 2" : "Producto 1";
                resultado.innerHTML = "<p>Ambos productos salen lo mismo. pero deberías comprar " + cantidadExtra + " unidades del " + productoMenor + " para igualar las proporciones de " + productoMayor + ".</p>";
            }
        }
    }