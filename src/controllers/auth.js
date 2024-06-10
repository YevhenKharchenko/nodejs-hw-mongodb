import { loginUser, registerUser } from '../services/auth.js';

export const registerUserController = async (req, res, next) => {
  const user = await registerUser(req.body);

  res.json({
    status: 200,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = async (req, res, next) => {
  await loginUser(req.body);
};
