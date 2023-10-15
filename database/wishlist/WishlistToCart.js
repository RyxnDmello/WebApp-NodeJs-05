const { AccountModel } = require("../models/AccountModel.js");
const { DatabaseDeleteProduct } = require("./DeleteProduct.js");

module.exports.DatabaseWishlistToCart = async (email, productID) => {
  const databaseAccount = await AccountModel.findOne({ email: email });

  const wishlistProduct = GetWishlistProduct(databaseAccount, productID);

  if (!(await AddCartProduct(databaseAccount, wishlistProduct)))
    await CreateCartProduct(databaseAccount, wishlistProduct);

  DatabaseDeleteProduct(email, productID);
};

const GetWishlistProduct = (databaseAccount, productID) => {
  for (let i = 0; i < databaseAccount.wishlist.length; i++) {
    if (databaseAccount.wishlist[i].ID === productID)
      return databaseAccount.wishlist[i];
  }

  return null;
};

const CreateCartProduct = async (databaseAccount, wishlistProduct) => {
  databaseAccount.cart.push(wishlistProduct);
  await databaseAccount.save();
};

const AddCartProduct = async (databaseAccount, wishlistProduct) => {
  for (let i = 0; i < databaseAccount.cart.length; i++) {
    if (databaseAccount.cart[i].ID !== wishlistProduct.ID) continue;

    databaseAccount.cart[i].price.quantity += wishlistProduct.price.quantity;

    databaseAccount.cart[i].price.netPrice =
      databaseAccount.cart[i].price.basePrice *
      databaseAccount.cart[i].price.quantity;

    await databaseAccount.save();
    return true;
  }

  return false;
};
