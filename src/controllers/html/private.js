const renderCookTogether = async (req, res) => {
  // try {
  //   //const { cookTogether, myRecipes, myPals } = req.session;
  //   const getUsers = await User.findAll({
  //     where: {
  //       user_id: userId,
  //     },
  //     include: [
  //       {
  //         model: User,
  //       },
  //     ],
  //   });

  //   const formattedgetUsers = allUsers.map((getUsers) =>
  //     getUsers.get({ plain: true })
  //   );
  // } catch (error) {}
  res.render("cooktogether");
};
const renderMyRecipesCookTogether = async (req, res) => {
  try {
  } catch (error) {}
  res.render("myrecipes-cooktogether");
};
const renderMyRecipes = async (req, res) => {
  try {
  } catch (error) {}
  res.render("myrecipes");
};

module.exports = {
  renderCookTogether,
  renderMyRecipesCookTogether,
  renderMyRecipes,
};
