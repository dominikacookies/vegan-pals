const renderCookTogether = async (req, res) => {
  try {
    //const { cookTogether, myRecipes, myPals } = req.session;
    const {
      intolerances: { gluten, peanuts, sesame, grain, soy, sulphite, wheat },
    } = req.session.user;

    const matchingUsers = await User.findAll({
      where: {
        [Op.and]: [
          { gluten_intolerance: gluten },
          { grain_intolerance: grain },
          { soy_intolerance: soy },
          { peanuts_intolerance: peanuts },
          { sesame_intolerance: sesame },
          { sulphite_intolerance: sulphite },
          { tree_nut_intolerance: req.session.user.intolerances["tree nut"] },
          { wheat_intolerance: wheat },
        ],
      },
      include: [
        {
          model: User,
        },
      ],
    });
    console.log(matchingUsers);

    //   const formattedgetUsers = allUsers.map((getUsers) =>
    //     getUsers.get({ plain: true })
    //   );
    res.render("cooktogether");
  } catch (error) {}
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
