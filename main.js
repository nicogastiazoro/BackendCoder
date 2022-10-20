class Container{
    constructor(){
        this.products = [];
    }

     getById(id){
        let result = null;
       this.products.forEach((product) => {
            if(product.id == id) {
                result = product;
            }
        });

        return result;
      
    }

     getAll(){
        return this.products;
    }

     deleteById(id){
        let newProducts = []; 
        this.products.map((product) => {
            if(product.id != id){
                newProducts.push(product);
            }
        })
        this.products = newProducts;
        console.log("El producto " + id +" ha sido eliminado")
    }

     deleteAll(){
        this.products = [];
        console.log("Todos los productos fueron eliminados")
    }

    
   save(product){
        this.products.push(product);
        console.log("Se agrego el producto: " + product.id + " " + product.title )
    }

}


    const producto1 = {
        id: 12,
        title: "producto 1",
        price: 14.50,
        thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdZ_D6c2lP83SI2tWN1igxju8Gj38nNMnFQzMl4OPftw&s"
       }
    
       const producto2= {
        id: 1123,
        title: "producto 2",
        price: 20,
        thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdZ_D6c2lP83SI2tWN1igxju8Gj38nNMnFQzMl4OPftw&s"
       }
    
       
       const producto3= {
        id: 8935,
        title: "producto 3",
        price: 4650,
        thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdZ_D6c2lP83SI2tWN1igxju8Gj38nNMnFQzMl4OPftw&s"
       }
    const contenedor = new Container();

    contenedor.save(producto1);
    contenedor.save(producto2)
    contenedor.save(producto3)

    console.log("##################################################################################################################")
    console.log("##################################################################################################################")
    console.log("##################################################################################################################")
    console.log("Busco el item 12")
    console.log(contenedor.getById(12))

    console.log("##################################################################################################################")
    console.log("##################################################################################################################")
    console.log("##################################################################################################################")
    console.log("Obtengo todos los productos")
    console.log(contenedor.getAll());

    console.log("##################################################################################################################")
    console.log("##################################################################################################################")
    console.log("##################################################################################################################")
    console.log("Busco producto inexistente")
    console.log(contenedor.getById(1111))

    console.log("##################################################################################################################")
    console.log("##################################################################################################################")
    console.log("##################################################################################################################")
    console.log("Elimino producto con ID 12")
    contenedor.deleteById(12)
    console.log(contenedor.getAll())

    console.log("##################################################################################################################")
    console.log("##################################################################################################################")
    console.log("##################################################################################################################")
    console.log("Elimino todos los productos")
    contenedor.deleteAll();
    console.log(contenedor.getAll());





    