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

function compararProductos() {
    if (!validarCampos()) {
        return; // Retorna si falta completar algún campo
    }

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

    producto1.cantidad = convertirUnidad(producto1.cantidad, unidad1);
    producto2.cantidad = convertirUnidad(producto2.cantidad, unidad2);

    var precioPorUnidad1 = producto1.precio / producto1.cantidad;
    var precioPorUnidad2 = producto2.precio / producto2.cantidad;

    var resultado = document.getElementById('resultado');

    if (precioPorUnidad1 < precioPorUnidad2) {
        if (producto1.cantidad === producto2.cantidad) {
            var ahorroDiferencia1 = Math.abs(producto2.precio - producto1.precio); 
            resultado.innerHTML = `<p>El Producto 1 es más barato y te ahorras $${ahorroDiferencia1.toFixed(2)}.</p>`;
        } else if (producto1.cantidad < producto2.cantidad) {
            var cantidadProducto1Equivalente = (producto2.cantidad / producto1.cantidad); 
            var precioTotalProducto1Equivalente = cantidadProducto1Equivalente * producto1.precio;
            var ahorroPrecioTotalProducto1Equivalente = Math.abs(precioTotalProducto1Equivalente - producto2.precio);

            resultado.innerHTML = `<p>El Producto 1 es más barato, pero trae menos. <br><br> Si quisieras llevar la misma cantidad que tiene el Producto 2 deberías comprar ${cantidadProducto1Equivalente.toFixed(0)} unidades del producto 1, terminas gastando $${precioTotalProducto1Equivalente.toFixed(2)} pero al final ahorras $${ahorroPrecioTotalProducto1Equivalente.toFixed(2)} en total.</p>`;
        } else {
            var ahorroProducto1 = ((producto1.cantidad / producto2.cantidad) * producto2.precio) - producto1.precio;
            resultado.innerHTML = `<p>El Producto 1 es más barato, <br><br>  Si tuvieras que llevar suficiente producto 2 parar tener la misma cantidad que el producto 1 te ahorras $${ahorroProducto1.toFixed(2)} finalmente, osea que el producto 1 es mas barato y encima trae más.</p>`;
        }
    } else if (precioPorUnidad1 > precioPorUnidad2) {
        if (producto1.cantidad === producto2.cantidad) {
            var ahorroDiferencia2 = Math.abs(producto1.precio - producto2.precio); 
            resultado.innerHTML = `<p>El Producto 2 es más barato y te ahorras $${ahorroDiferencia2.toFixed(2)}.</p>`;
        } else if (producto1.cantidad > producto2.cantidad) {
            var cantidadProducto2Equivalente = (producto1.cantidad / producto2.cantidad);
            var precioTotalProducto2Equivalente = cantidadProducto2Equivalente * producto2.precio;
            var ahorroPrecioTotalProducto2Equivalente = Math.abs(precioTotalProducto2Equivalente - producto1.precio);
            resultado.innerHTML = `<p>El Producto 2 es más barato, pero trae menos.<br><br>  Si quisieras llevar la misma cantidad que tiene el Producto 1 deberías comprar ${cantidadProducto2Equivalente.toFixed(0)} unidades del producto 2, terminas gastando $${precioTotalProducto2Equivalente.toFixed(2)} pero al final ahorras $${ahorroPrecioTotalProducto2Equivalente.toFixed(2)}  en total..</p>`;
        } else {
            var ahorroProducto2 = ((producto2.cantidad / producto1.cantidad) * producto1.precio) - producto2.precio;
            resultado.innerHTML = `<p>El Producto 2 es más barato. <br><br>  Si tuvieras que llevar suficiente producto 1 parar tener la misma cantidad que el producto 2 te ahorras $${ahorroProducto2.toFixed(2)} finalmente, osea que el producto 2 es mas barato y encima trae más.</p>`;
        }
    } else {
        if (producto1.cantidad === producto2.cantidad) {
            resultado.innerHTML = `<p>Ambos productos salen lo mismo y traen lo mismo. Elige según tus gustos.</p>`;
        } else if (producto1.cantidad < producto2.cantidad) {
            var cantidadProducto1Equivalente = Math.round(producto2.cantidad / producto1.cantidad); 
            var precioTotalProducto1Equivalente = cantidadProducto1Equivalente * producto1.precio;
            resultado.innerHTML = `<p>Ambos tienen el mismo valor, pero deberías llevar ${cantidadProducto1Equivalente.toFixed(0)} unidades del Producto 1 para tener la misma cantidad que el Producto 2.</p>`;
        } else {
            var cantidadProducto2Equivalente = Math.round(producto1.cantidad / producto2.cantidad);
            var precioTotalProducto2Equivalente = cantidadProducto2Equivalente * producto1.precio;
             resultado.innerHTML = `<p>Ambos tienen el mismo valor, pero deberías llevar ${cantidadProducto2Equivalente.toFixed(0)} unidades del Producto 2 para tener la misma cantidad que el Producto 1.</p>`;
        }
    }
}
