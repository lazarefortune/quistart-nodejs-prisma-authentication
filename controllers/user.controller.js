import { PrismaClient } from "@prisma/client";
import jsonwebtoken from "jsonwebtoken";
import configuration from "../config/configuration.js"
import prisma from "../db/prisma.js";

export let signInUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check all fields are filled
        if (!email || !password) {
            return res.status(400).json({
                status: "fail",
                message: "All fields are required",
            });
        }

        // check if user exists
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            return res.status(400).json({
                status: "fail",
                message: "Invalid email or password",
            });
        }

        // check if password is correct
        if (user.password !== password) {
            return res.status(400).json({
                status: "fail",
                message: "Invalid email or password",
            });
        }

        const token = jsonwebtoken.sign(
            {
                payload: {
                    user: {
                        id: user.id ,
                        name: user.name,
                        email: user.email,
                    },
                },
            },
            configuration.security.session.secret,
            { expiresIn: configuration.security.session.expireAfter }
        )

        res.status(200).json({
            status: "success",
            data: {
                token,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
}

export const createUser = async (req, res) => {
try {
        const { name, email, password } = req.body;

        // check all fields are filled
        if (!name || !email || !password) {
            return res.status(400).json({
                status: "fail",
                message: "All fields are required",
            });
        }

        // check if user already exists
        const userExists = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (userExists) {
            return res.status(400).json({
                status: "fail",
                message: "User already exists",
            });
        }

        // create user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password,
                courses: {
                }
            },
        });
        res.status(201).json({
            status: "success",
            data: user,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
}