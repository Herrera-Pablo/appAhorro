function convertirAFraccion(cantidad) {
    var entero = Math.ceil(cantidad);
    return entero;
}

function calcularAhorro(producto1, producto2, precioPorUnidad1, precioPorUnidad2) {
    var ahorroProducto1 = producto2.precio - producto1.precio;
    var cantidadProducto1Equivalente = Math.ceil(producto2.cantidad / producto1.cantidad);
    var precioTotalProducto1Equivalente = cantidadProducto1Equivalente * producto1.precio;
    var ahorroProducto1Equivalente = Math.abs(producto2.precio - precioTotalProducto1Equivalente);

    var ahorroProducto2 = producto1.precio - producto2.precio;
    var cantidadProducto2Equivalente = Math.ceil(producto1.cantidad / producto2.cantidad);
    var precioTotalProducto2Equivalente = cantidadProducto2Equivalente * producto2.precio;
    var ahorroProducto2Equivalente = Math.abs(producto1.precio - precioTotalProducto2Equivalente);

    return {
        ahorroProducto1,
        cantidadProducto1Equivalente,
        precioTotalProducto1Equivalente,
        ahorroProducto1Equivalente,
        ahorroProducto2,
        cantidadProducto2Equivalente,
        precioTotalProducto2Equivalente,
        ahorroProducto2Equivalente
    };
}
