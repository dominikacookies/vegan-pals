// TO DO: remove this import once passwordvalid method fixed
const bcrypt = require("bcrypt");

const { User } = require("../../models");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({
        error: "Required values missing.",
      });
    }

    const user = await User.findOne({
      where: { email },
      raw: true,
      nested: true,
    });

    if (!user) {
      return res.status(404).json({
        error: "User does not exist",
      });
    }

    // const passwordValidationResult = await user.isPasswordValid(password);

    // TO DO: when trying to do this via model method it says that it doesn't exist
    const passwordValidationResult = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordValidationResult) {
      return res.status(401).json({
        error: "Password invalid.",
      });
    }

    req.session.loggedIn = true;

    req.session.user = {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      intolerances: {
        gluten: user.gluten_intolerance,
        peanut: user.peanut_intolerance,
        sesame: user.sesame_intolerance,
        grain: user.grain_intolerance,
        soy: user.soy_intolerance,
        sulphite: user.sulphite_intolerance,
        "tree nut": user.tree_nut_intolerance,
        wheat: user.wheat_intolerance,
      },
    };

    console.log(req.session);

    return res.status(200).json({
      message: "Log in successful.",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Unable to login.",
    });
  }
};

const logout = async (req, res) => {
  try {
    req.session.destroy(() => {
      console.log("log out successful");
      return res.status(200).json({
        message: "Logout successful",
      });
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: "Unable to logout.",
    });
  }
};

const signup = async (req, res) => {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    const email = req.body.email;
    const bio = req.body.bio;
    const { gluten, peanut, sesame, grain, soy, sulphite, treeNut, wheat } =
      req.body.intolerances;

    const user = await User.create({
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      bio,
      gluten_intolerance: gluten,
      peanut_intolerance: peanut,
      sesame_intolerance: sesame,
      grain_intolerance: grain,
      soy_intolerance: soy,
      sulphite_intolerance: sulphite,
      tree_nut_intolerance: treeNut,
      wheat_intolerance: wheat,
    });

    if (!user) {
      return res.status(500).json({ error: "Failed to signup" });
    }

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to signup" });
  }
};

module.exports = {
  login,
  logout,
  signup,
};
