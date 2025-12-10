import { registerUser, getUserById, deleteUser, updateUser } from "../controllers/user.controller.js";
import { Router } from "express";

const router = Router();

router.post("/register", registerUser);
router.route("/:id").get(getUserById).delete(deleteUser).patch(updateUser);

export default router;
