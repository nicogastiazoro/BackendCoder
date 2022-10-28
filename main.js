const fs = require("fs");

class Container {
  constructor(nameFile) {
    // this.products = [];
    this.nameFile = nameFile;
  }

  //  getById(id){
  //     let result = null;
  //    this.products.forEach((product) => {
  //         if(product.id == id) {
  //             result = product;
  //         }
  //     });

  //     return result;

  // }

  //  getAll(){
  //     return this.products;
  // }

  //  deleteById(id){
  //     let newProducts = [];
  //     this.products.map((product) => {
  //         if(product.id != id){
  //             newProducts.push(product);
  //         }
  //     })
  //     this.products = newProducts;
  //     console.log("El producto " + id +" ha sido eliminado")
  // }

  //  deleteAll(){
  //     this.products = [];
  //     console.log("Todos los productos fueron eliminados")
  // }

  //    save(product){
  //         this.products.push(product);
  //         console.log("Se agrego el producto: " + product.id + " " + product.title )
  //     }

  getById = async (id) => {
    try {
      if (fs.existsSync(this.nameFile)) {
        const contenido = await fs.promises.readFile(this.nameFile, "utf8");
        if (contenido && contenido !== "[]") {
          const productos = JSON.parse(contenido);
          const producto = productos.find((item) => item.id === id);
          return producto;
        } else {
          return "El archivo esta vacio";
        }
      } else {
        return "El archivo no existe";
      }
    } catch (error) {
      console.log(error);
    }
  };

  getAll = async () => {
    try {
      if (fs.existsSync(this.nameFile)) {
        const contenido = await fs.promises.readFile(this.nameFile, "utf8");
        if (contenido && contenido !== "[]") {
          const productos = JSON.parse(contenido);
          return productos;
        } else {
          return "El archivo esta vacio";
        }
      } else {
        return "El archivo no existe";
      }
    } catch (error) {
      console.log(error);
    }
  };

  deleteById = async (id) => {
    try {
      if (fs.existsSync(this.nameFile)) {
        const contenido = await fs.promises.readFile(this.nameFile, "utf8");
        if (contenido && contenido !== "[]") {
          const productos = JSON.parse(contenido);
          const newProducts = productos.filter((item) => item.id !== id);
          // Regrabo el archivo sin el producto del id solicitado.
          await fs.promises.writeFile(
            this.nameFile,
            JSON.stringify(newProducts, null, 2)
          );
          return `Se elimino el producto con id=${id}`;
        } else {
          return "El archivo esta vacio";
        }
      } else {
        return "El archivo no existe";
      }
    } catch (error) {
      console.log(error);
    }
  };

  save = async (product) => {
    try {
      //leer el archivo existe
      if (fs.existsSync(this.nameFile)) {
        const contenido = await fs.promises.readFile(this.nameFile, "utf8");
        if (contenido && contenido !== "[]") {
          const productos = JSON.parse(contenido);
          const titulo = product.title;
          const existe = productos.find((item) => item.title === titulo);
          if (existe) {
            return "Ya existe ese titulo en el archivo";
          } else {
            // cuenta(acc) y recupera el ultimo id, recupera el mayor, pare evitar id repetido
            const lastIdAdded = productos.reduce(
              (acc, item) => (item.id > acc ? (acc = item.id) : acc),
              0
            );
            const newProduct = {
              id: lastIdAdded + 1,
              ...product,
            };
            productos.push(newProduct);
            await fs.promises.writeFile(
              this.nameFile,
              JSON.stringify(productos, null, 2)
            );
            return `Se agrego el producto con id=${newProduct.id}`;
          }
        } else {
          //si no existe ningun contenido en el archivo
          const newProduct = {
            id: 1,
            ...product,
          };
          //creamos el archivo
          await fs.promises.writeFile(
            this.nameFile,
            JSON.stringify([newProduct], null, 2)
          );
          return `Se agrego el producto con id=${newProduct.id}`;
        }
      } else {
        // si el archivo no existe
        const newProduct = {
          id: 1,
          ...product,
        };
        //creamos el archivo
        await fs.promises.writeFile(
          this.nameFile,
          JSON.stringify([newProduct], null, 2)
        );
        return `Se agrego el producto con id=${newProduct.id}`;
      }
    } catch (error) {
      console.log(error);
    }
  };

  deleteAll = async () => {
    try {
      if (fs.existsSync(this.nameFile)) {
        await fs.promises.writeFile(this.nameFile, JSON.stringify([]));
        return "delete sin where";
      } else {
        return "El archivo no existe";
      }
    } catch (error) {
      console.log(error);
    }
  };
}

const listProducts = new Container("./productos.txt");
const product1 = {
  title: "Sandman#1",
  price: 150,
  thumbnail: "../assets/products/Sandman001.jpeg",
};
const repeatedProduct = {
  title: "Sandman#1",
  price: 150,
  thumbnail: "../assets/products/Sandman001.jpeg",
};
const product2 = {
  title: "100 Bullets#1",
  price: 120,
  thumbnail: "../assets/products/Balas001.jpeg",
};

const product3 = {
  title: "Y: The last man#1",
  price: 180,
  thumbnail: "../assets/products/YTLM01.jpeg",
};

const creatProduct = async () => {
  //*elimino el archivo*
  // para ver que me devuelve la proxima funcion si el archivo no existe
  console.log(await listProducts.getAll());
  console.log(await listProducts.getById(1));
  console.log(await listProducts.deleteById(2));
  console.log(await listProducts.deleteAll());
  // se agregan 3 productos
  console.log(await listProducts.save(product1));
  console.log(await listProducts.save(product2));
  console.log(await listProducts.save(product3));
  // tratar titulo repetido
  console.log(await listProducts.save(repeatedProduct));
  // recupero el producto con id=1
  console.log(await listProducts.getById(1));
  // recupero los productos
  console.log(await listProducts.getAll());
  // se elimina el producto con id=2
  console.log(await listProducts.deleteById(2));
  // se vuelve a incorporar el producto 2, pero con un nuevo id
  console.log(await listProducts.save(product2));
  console.log(await listProducts.getAll());
  // se borra todo, entiendo que el id vuelve a iniciar en 1
  console.log(await listProducts.deleteAll());
  //archivo vacio
  console.log(await listProducts.getAll());
  //inexistente
  console.log(await listProducts.getById(4));
  // vuelvo a grabar los 3 primeros productos y los muestro
  console.log(await listProducts.save(product1));
  console.log(await listProducts.save(product2));
  console.log(await listProducts.save(product3));
  console.log(await listProducts.getAll());
};

creatProduct();
