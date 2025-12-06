// src/services/DB.js


// Ici c'est l'adresse de base de ma DB Mockapi
const apiURL = 'https://692de13ee5f67cd80a4d4a6b.mockapi.io/shop/';

//@/services/DB.js
export default class DB {

  //static : on ne modifiera pas
  //apiURL est l’url que l’on utilisera dans toutes les méthodes
  static apiURL = "";

  static setApiURL(url) {
    //url venant de main (DB.setApiURL(apiURL))
    //la DB reçoit donc l'adresse de base à utiliser dans toutes les fonctions
    this.apiURL = url;
  }

  //supprimer un todo par son id
  static async deleteOneById(data) {
    const response = await fetch(this.apiURL + "cart/" + data, {
      method: "DELETE",
    });
    return response.json();
  }

  //static : on ne modifiera pas
  //async: on attend le retour de la DB
  //getProducts : récupère tous les produits du catalogue
  static async getProducts() {
    //je fetch = j’attends la réponse de this.apiURL + "product"
    const response = await fetch(this.apiURL + "product");
    //je return la réponse au format json (table product)
    return response.json();
  }

  //récupérer un seul produit via son id
  static async getProductById(id) {
    //id envoyé depuis le composant
    const response = await fetch(this.apiURL + "product/" + id);
    return response.json();
  }

  // TABLE CART (ne contient que : id, createdAt, product_id)
  //récupérer le contenu du panier
  static async getCart() {
    //cart = table vide au départ, remplie par addToCart()
    const response = await fetch(this.apiURL + "cart");
    return response.json();
  }

  //Ajouter un produit dans la table cart
//Si le produit existe déjà dans cart => on augmente la quantity
//Sinon => on crée une nouvelle ligne
static async addToCart(product) {
  // on récupère d'abord tout le panier
  const cart = await this.getCart();

  let existing = null;

  cart.forEach((line) => {
    if (line.product_id == product.id) {
      existing = line;
    }
  });

  // cas 1 : le produit est déjà dans le panier
  if (existing !== null) {
  const newQuantity = existing.quantity + 1;

  const response = await fetch(this.apiURL + "cart/" + existing.id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      product_id: existing.product_id,
      quantity: newQuantity
    }),
  });

  return response.json();
}

  // cas 2 : produit pas encore dans le panier
  const response = await fetch(this.apiURL + "cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      product_id: product.id,
      quantity: 1
    }),
  });

  return response.json();
}


  //supprimer une entrée du panier via son id
  static async deletOneById(id) {
    const response = await fetch(this.apiURL + "cart/" + id, {
      method: "DELETE",
    });
    return response.json();
  }

  //mettre à jour un élément du panier (ex: si tu ajoutes quantity)
  static async updateOneCartById(id, data) {
    const response = await fetch(this.apiURL + "cart/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  }

}
// INITIALISATION AUTOMATIQUE DE LA DB
DB.setApiURL(apiURL);
