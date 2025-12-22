import { prisma } from "../prisma/prisma-client.js";

export const all = async (req, res) => {
    const lang = req.query.lang || '';

    try {
        const pages = await prisma.contact_page.findMany(lang && {
            where: {
                lang,
            },
        });

        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve contact pages" });
    }
};

export const page = async (req, res) => {
    const id = req.params.id;

    try {
        const contactPage = await prisma.contact_page.findUnique({
            where: {
                id,
            },
        });

        if (!contactPage) {
            return res.status(404).json({ message: "Contact page not found" });
        }

        res.status(200).json(contactPage);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve contact page" });
    }
};

export const add = async (req, res) => {
    const data = req.body;

    if (
        !data.lang || !data.title || !data.phone_number_one ||
        !data.phone_number_two || !data.phone_decr || !data.email ||
        !data.email_decr || !data.location || !data.work_location ||
        !data.subtitle || !data.name_label || !data.name_placeholder ||
        !data.phone_label || !data.phone_placeholder ||
        !data.message_placeholder || !data.button
    ) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const contactPage = await prisma.contact_page.create({
            data: {
                ...data,
                authorId: req.user.id,
            },
        });

        res.status(201).json(contactPage);
    } catch (error) {
        res.status(500).json({ message: "Failed to add contact page" });
    }
};

export const edit = async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    if (
        !data.lang || !data.title || !data.phone_number_one ||
        !data.phone_number_two || !data.phone_decr || !data.email ||
        !data.email_decr || !data.location || !data.work_location ||
        !data.subtitle || !data.name_label || !data.name_placeholder ||
        !data.phone_label || !data.phone_placeholder ||
        !data.message_placeholder || !data.button
    ) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const contactPage = await prisma.contact_page.update({
            where: {
                id,
            },
            data,
        });

        res.status(200).json(contactPage);
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({ message: "Contact page not found" });
        }

        res.status(500).json({ message: "Failed to update contact page" });
    }
};

export const remove = async (req, res) => {
    const id = req.params.id;

    try {
        await prisma.contact_page.delete({
            where: { 
                id,
            },
        });

        res.status(200).json({ message: "Contact page deleted successfully" });
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({ message: "Contact page not found" });
        }

        res.status(500).json({ message: "Failed to delete contact page" });
    }
};