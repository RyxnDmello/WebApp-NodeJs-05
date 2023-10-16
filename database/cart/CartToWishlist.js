const { AccountModel } = require("../models/AccountModel.js");
const { DatabaseDeleteProduct } = require("./DeleteProduct.js");

module.exports.DatabaseCartToWishlist = async (email, productID) => {
  const databaseAccount = await AccountModel.findOne({ email: email });

  const cartProduct = GetCartProduct(databaseAccount, productID);

  if (!(await AddWishlistProduct(databaseAccount, cartProduct)))
    await CreateWishlistProduct(databaseAccount, cartProduct);

  await DatabaseDeleteProduct(email, productID);
};

const GetCartProduct = (databaseAccount, productID) => {
  for (let i = 0; i < databaseAccount.cart.length; i++) {
    if (databaseAccount.cart[i].ID === productID)
      return databaseAccount.cart[i];
  }

  return null;
};

const AddWishlistProduct = async (databaseAccount, cartProduct) => {
  for (let i = 0; i < databaseAccount.wishlist.length; i++) {
    if (databaseAccount.wishlist[i].ID !== cartProduct.ID) continue;

    databaseAccount.wishlist[i].price.quantity += cartProduct.price.quantity;

    databaseAccount.wishlist[i].price.netPrice =
      databaseAccount.wishlist[i].price.basePrice *
      databaseAccount.wishlist[i].price.quantity;

    await databaseAccount.save();
    return true;
  }

  return false;
};

const CreateWishlistProduct = async (databaseAccount, cartProduct) => {
  databaseAccount.wishlist.push(cartProduct);
  await databaseAccount.save();
};
