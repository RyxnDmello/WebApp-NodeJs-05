module.exports.DatabaseAddProduct = async (databaseAccount, productID) => {
  for (let i = 0; i < databaseAccount.wish.length; i++) {
    if (databaseAccount.wish[i].ID !== productID) continue;

    ++databaseAccount.wish[i].price.quantity;

    databaseAccount.wish[i].price.netPrice =
      databaseAccount.wish[i].price.basePrice *
      databaseAccount.wish[i].price.quantity;

    await databaseAccount.save();
    return;
  }
};
