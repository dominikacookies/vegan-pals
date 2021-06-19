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
      return res.status(404).json({
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
        peanuts: user.peanuts_intolerance,
        sesame: user.sesame_intolerance,
        grain: user.grain_intolerance,
        soy: user.soy_intolerance,
        sulphite: user.sulphite_intolerance,
        treeNut: user.tree_nut_intolerance,
        wheat: user.wheat_intolerance,
      },
    };

    console.log(req.session);

    return res.status(200).json({
      message: "Log in successful.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Unable to login.",
    });
  }
};

const logout = async (req, res) => {
  console.log("logout");
};

const signup = async (req, res) => {
  console.log("signup");
};

module.exports = {
  login,
  logout,
  signup,
};
