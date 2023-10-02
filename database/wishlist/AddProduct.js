module.exports.DatabaseAddProduct = async (databaseAccount, productID) => {
  for (let i = 0; i < databaseAccount.wishlist.length; i++) {
    if (databaseAccount.wishlist[i].ID !== productID) continue;

    ++databaseAccount.wishlist[i].price.quantity;

    databaseAccount.wishlist[i].price.netPrice =
      databaseAccount.wishlist[i].price.basePrice *
      databaseAccount.wishlist[i].price.quantity;

    await databaseAccount.save();
    return;
  }
};
