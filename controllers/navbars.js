import { prisma } from "../prisma/prisma-client.js";

export const all = async (req, res) => {
    const lang = req.query.lang || "";

    try {
        const navbars = await prisma.navbar.findMany({
            where: lang ? { lang } : undefined,
            include: {
                menu: true,
                contact: true,
            },
        });

        const formattedNavbars = navbars.map(navbar => ({
            ...navbar,
            contact: {
                ...navbar.contact,
                icon: `${req.baseFullUrl}${navbar.contact.icon}`,
            },
        }));

        res.status(200).json(formattedNavbars);
    } catch (error) {
        res.status(400).json({ message: "Failed to retrieve navbars" });
    }
};

export const navbar = async (req, res) => {
    const id = req.params.id;

    try {
        const navbar = await prisma.navbar.findUnique({
            where: {
                id,
            },
            include: {
                menu: true,
                contact: true,
            },
        });

        if (!navbar) {
            return res.status(404).json({ message: "Navbar not found" });
        }

        const formattedNavbar = {
            ...navbar,
            contact: {
                ...navbar.contact,
                icon: `${req.baseFullUrl}${navbar.contact.icon}`,
            },
        };

        res.status(200).json(formattedNavbar);
    } catch (error) {
        res.status(400).json({ message: "Failed to retrieve navbar" });
    }
};

export const add = async (req, res) => {
    const { lang, logo, menu, contact } = req.body;

    if (!lang || !logo || !menu || !contact) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const navbar = await prisma.navbar.create({
            data: {
                lang,
                logo,
                user: {
                    connect: {
                        id: req.user.id,
                    },
                },
                contact: {
                    create: contact,
                },
                menu: {
                    create: menu,
                },
            },
            include: {
                menu: true,
                contact: true,
            },
        });

        res.status(201).json(navbar);
    } catch (error) {
        res.status(500).json({ message: "Failed to add navbar" });
    }
};

export const edit = async (req, res) => {
    const id = req.params.id;
    const { lang, logo, menu, contact } = req.body;

    try {
        const updatedNavbar = await prisma.navbar.update({
            where: {
                id,
            },
            data: {
                lang,
                logo,
                contact: {
                    update: contact,
                },
                menu: {
                    deleteMany: {},
                    create: menu,
                },
            },
            include: {
                menu: true,
                contact: true,
            },
        });

        res.status(200).json(updatedNavbar);
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({ message: "Navbar not found" });
        }

        res.status(500).json({ message: "Failed to update navbar" });
    }
};

export const remove = async (req, res) => {
    const id = req.params.id;

    try {
        await prisma.navbar.delete({
            where: {
                id,
            },
        });

        res.status(200).json({ message: "Navbar deleted successfully" });
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({ message: "Navbar not found" });
        }

        res.status(500).json({ message: "Failed to delete navbar" });
    }
};