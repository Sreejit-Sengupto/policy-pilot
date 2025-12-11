import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            age,
            gender,
            state,
            district,
            occupationCategory,
            annualIncome,
            educationLevel,
            authProviderId
        } = req.body;

        // Basic validation
        if (!name || !email || !age || !state || !occupationCategory || !annualIncome) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields"
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User with this email already exists"
            });
        }

        const newUser = await User.create({
            name,
            email,
            phone,
            age,
            gender,
            state,
            district,
            occupationCategory,
            annualIncome,
            educationLevel,
            authProviderId
        });

        return res.status(201).json({
            success: true,
            data: newUser,
            message: "User registered successfully"
        });

    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        return res.status(200).json({
            success: true,
            data: user,
            message: "User updated successfully"
        });
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

export { registerUser, getUserById, deleteUser, updateUser };
