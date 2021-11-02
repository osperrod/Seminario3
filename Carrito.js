var Cliente = require ('./MymongoDB.js');
class Carrito{
	constructor(){
		this.carrito = new Array();
	}

	//Se crea un carrito que será un array de productos

	anyadirProducto(producto){
		var carrito = this.carrito;

	//Creamos una copia del producto al que le sumaremos la cantidad de productos del mismo tipo 
	//ya existente en el carrito, para ello se usa JSON.parse(JSON.stringify(producto))
		let comprobarProducto = JSON.parse(JSON.stringify(producto));
		console.log(comprobarProducto);
		var indice;
		
		if(carrito.length == 0){indice = -1;}
		for( let i in carrito ){
			if(carrito[i].key == producto.key){
                comprobarProducto.cantidad = producto.cantidad + carrito[i].cantidad;
			indice = i;
			}
		}

		Cliente.comprobarStock(comprobarProducto, function(sePuede){

			if(sePuede){
				
				if(indice == -1 || indice == undefined){
					carrito.push(producto);	
					console.log( "Producto: "+producto.description+" añadido al carrito ("+producto.cantidad+" unidades)!");
				}else{
					carrito[indice].cantidad = carrito[indice].cantidad + producto.cantidad;
					console.log( "Articulo: "+carrito[indice].description+" actualizado (+"+producto.cantidad+")!");	
				}
				
			}else{
				console.log( "El producto: "+producto.description+" NO se ha añadido al carrito");	
			}

		});
		
	}

	quitarProducto(clavePrimaria){
		var indice;
		var encontrado = false;
		for(var i = 0; i < this.carrito.length && !encontrado; i++) {
			if (this.carrito[i].key === clavePrimaria){ console.log(this.carrito[i].key); indice = i; encontrado = true;}
		}
		
		if(encontrado){
			let nombre = this.carrito[indice].description;
			console.log("Producto: "+nombre+" borrado del carrito!");
			this.carrito.splice(indice, 1);
			
		}
		else{
			console.log("No existe el producto de clave: "+clavePrimaria+" en el carrito!");
		}
		
    }
    
    

	
}
    

module.exports = Carrito;
