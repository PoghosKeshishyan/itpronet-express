import { prisma } from "../prisma/prisma-client.js";

export const all = async (req, res) => {
    try {
        const logos = await prisma.about_logo.findMany();

        const formattedLogos = logos.map(logo => ({
            ...logo,
            image: `${req.baseFullUrl}${logo.image}`,
        }));

        res.status(200).json(formattedLogos);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve logos" });
    }
};

export const logo = async (req, res) => {
    const { id } = req.params;

    try {
        const aboutLogo = await prisma.about_logo.findUnique({
            where: {
                id,
            },
        });

        if (!aboutLogo) {
            return res.status(404).json({ message: "Logo not found" });
        }

        const formattedLogo = {
            ...aboutLogo,
            image: `${req.baseFullUrl}${aboutLogo.image}`,
        };

        res.status(200).json(formattedLogo);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve logo" });
    }
};

export const add = async (req, res) => {
    const { name, image } = req.body;

    if (!name || !image) {
        return res.status(400).json({ message: "Required fields are missing" });
    }

    try {
        const aboutLogo = await prisma.about_logo.create({
            data: {
                name,
                image,
            },
        });

        res.status(201).json(aboutLogo);
    } catch (error) {
        res.status(500).json({ message: "Failed to add logo" });
    }
};

export const edit = async (req, res) => {
    const { id } = req.params;
    const { name, image } = req.body;

    try {
        const aboutLogo = await prisma.about_logo.update({
            where: { 
                id,
            },
            data: {
                name,
                image,
            },
        });

        res.status(200).json(aboutLogo);
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({ message: "Logo not found" });
        }
        res.status(500).json({ message: "Failed to update logo" });
    }
};

export const remove = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.about_logo.delete({
            where: { 
                id,
            },
        });

        res.status(200).json({ message: "Logo deleted successfully" });
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({ message: "Logo not found" });
        }
        res.status(500).json({ message: "Failed to delete logo" });
    }
};