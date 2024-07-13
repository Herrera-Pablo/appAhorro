function convertirAFraccion(cantidad) {
    var entero = Math.ceil(cantidad);
    return entero;
}

function validarCampos() {
    var unidad1 = document.getElementById('unidad1').value;
    var unidad2 = document.getElementById('unidad2').value;
    var cantidad1 = document.getElementById('cantidad1').value;
    var cantidad2 = document.getElementById('cantidad2').value;
    var precio1 = document.getElementById('precio1').value;
    var precio2 = document.getElementById('precio2').value;

    var mensajeError = "";

    if (!unidad1) {
        mensajeError += "Falta seleccionar la unidad de medida del Producto 1.\n";
    }

    if (!unidad2) {
        mensajeError += "Falta seleccionar la unidad de medida del Producto 2.\n";
    }

    if (!cantidad1) {
        mensajeError += "Falta ingresar la cantidad del Producto 1.\n";
    }

    if (!cantidad2) {
        mensajeError += "Falta ingresar la cantidad del Producto 2.\n";
    }

    if (!precio1) {
        mensajeError += "Falta ingresar el precio del Producto 1.\n";
    }

    if (!precio2) {
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

    // Obtener las unidades seleccionadas para cada producto
    var unidad1 = document.getElementById('unidad1').value;
    var unidad2 = document.getElementById('unidad2').value;

    var producto1 = {
        cantidad: parseFloat(document.getElementById('cantidad1').value),
        precio: parseFloat(document.getElementById('precio1').value)
    };

    var producto2 = {
        cantidad: parseFloat(document.getElementById('cantidad2').value),
        precio: parseFloat(document.getElementById('precio2').value)
    };

    // Conversiones de unidades
    producto1.cantidad = convertirUnidad(producto1.cantidad, unidad1);
    producto2.cantidad = convertirUnidad(producto2.cantidad, unidad2);

    var precioPorUnidad1 = producto1.precio / producto1.cantidad;
    var precioPorUnidad2 = producto2.precio / producto2.cantidad;

    // Calcular el ahorro total si se compra el producto más barato para igualar la cantidad del producto más caro
    var ahorroTotal1 = 0;
    var cantidadNecesaria1 = 0; // Cantidad de productos del primero necesarios para igualar al segundo
    var ahorroTotal2 = 0;
    var cantidadNecesaria2 = 0; // Cantidad de productos del segundo necesarios para igualar al primero

    if (precioPorUnidad1 < precioPorUnidad2) {
        cantidadNecesaria1 = Math.ceil(producto1.cantidad / producto2.cantidad);
        cantidadNecesaria2 = Math.ceil(producto2.cantidad / producto1.cantidad);
        ahorroTotal1 = Math.abs((cantidadNecesaria1 * producto2.precio) - producto1.precio);
    } else if (precioPorUnidad1 > precioPorUnidad2) {
        cantidadNecesaria2 = Math.ceil(producto2.cantidad / producto1.cantidad);
        cantidadNecesaria1 = Math.ceil(producto1.cantidad / producto2.cantidad);
        ahorroTotal2 = Math.abs((cantidadNecesaria2 * producto1.precio) - producto2.precio);
    }

    // Mostrar el resultado
    var resultado = document.getElementById('resultado');
    if (precioPorUnidad1 < precioPorUnidad2) {
        var mensaje = "<p>El Producto 1 es más barato.</p>";
        mensaje += "<p>";
        if (producto1.cantidad === producto2.cantidad) {
            mensaje += "Y te ahorras $" + ahorroTotal1.toFixed(2) + ".";
        }
        resultado.innerHTML = mensaje;
    } else if (precioPorUnidad1 > precioPorUnidad2) {
        var mensaje = "<p>El Producto 2 es más barato.</p>";
        mensaje += "<p>";
        if (producto1.cantidad === producto2.cantidad) {
            mensaje += "Y te ahorras $" + ahorroTotal2.toFixed(2) + ".";
        }
        resultado.innerHTML = mensaje;
    }
    else {
        if (producto1.cantidad === producto2.cantidad) {
            resultado.innerHTML = "<p>Ambos productos salen lo mismo y traen lo mismo. Elige según tus gustos.</p>";
        } else {
            var cantidadNecesaria1 = producto2.cantidad / producto1.cantidad;
            var cantidadNecesaria2 = producto1.cantidad / producto2.cantidad;
            var cantidadNecesariaTexto = convertirAFraccion(Math.max(cantidadNecesaria1, cantidadNecesaria2));
            var productoConMenorCantidad = producto1.cantidad < producto2.cantidad ? "Producto 1" : "Producto 2";
            var productoConMayorCantidad = producto1.cantidad > producto2.cantidad ? "Producto 1" : "Producto 2";
            resultado.innerHTML = "<p class='resultado-texto'>Ambos productos salen lo mismo. <br><br>  Pero deberías comprar " + cantidadNecesariaTexto + " unidades del " + productoConMenorCantidad + " para igualar las proporciones del " + productoConMayorCantidad + ".</p>";
        }
    }

    function convertirUnidad(cantidad, unidad) {
        switch (unidad) {
            case 'gramos':
                return cantidad;
            case 'kilogramos':
                return cantidad * 1000;
            case 'litros':
                return cantidad * 1000;
            case 'mililitros':
                return cantidad;
            case 'metros':
                return cantidad * 100;
            case 'centimetros':
                return cantidad;
            case 'cm3':
                return cantidad;
            default:
                return cantidad;
        }
    }
}
