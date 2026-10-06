import { Router } from "express";
import * as userService from "./user.service.js";
import * as validators from "./user.validation.js";
import { validation } from "../../Middlewares/validation.middleware.js";

const userController = Router();

userController.get("/profile/:userId", validation(validators.getUserProfile), async (req, res) => {
  const { userId } = req.validate.params;
  const result = await userService.getUserProfile(userId);
  res.status(200).json({ status: "User profile retrieved successfully", data: result });
});

userController.get("/all", validation(validators.getAllUsers), async (req, res) => {
  const result = await userService.getAllUsers();
  res.status(200).json({ status: "Users retrieved successfully", data: result });
});

userController.patch("/update/:userId", validation(validators.updateUser), async (req, res) => {
  const { userId } = req.validate.params;
  const result = await userService.updateUserProfile(userId, req.validate.body);
  res.status(200).json({ status: "User updated successfully", data: result });
});

userController.delete("/delete/:userId", validation(validators.deleteUser), async (req, res) => {
  const { userId } = req.validate.params;
  const result = await userService.deleteProfile(userId);
  res.status(200).json({ status: "User deleted successfully", data: result });
});

export default userController;