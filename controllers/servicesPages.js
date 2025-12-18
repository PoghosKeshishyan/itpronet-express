import { prisma } from "../prisma/prisma-client.js";

export const all = async (req, res) => {
    const lang = req.query.lang || "";

    try {
        const servicePages = await prisma.service_page.findMany({
            where: lang ? { lang } : undefined,
            include: {
                servicesData: true,
            },
        });

        const formattedServicePages = servicePages.map(page => ({
            ...page,
            servicesData: page.servicesData.map(item => ({
                ...item,
                image: `${req.baseFullUrl}${item.image}`,
            })),
        }));

        res.status(200).json(formattedServicePages);
    } catch (error) {
        res.status(400).json({ message: "Failed to retrieve service pages" });
    }
};

export const servicePage = async (req, res) => {
    const id = req.params.id;

    try {
        const page = await prisma.service_page.findUnique({
            where: { 
                id,
            },
            include: {
                servicesData: true,
            },
        });

        if (!page) {
            return res.status(404).json({ message: "Service page not found" });
        }

        const formattedPage = {
            ...page,
            servicesData: page.servicesData.map(item => ({
                ...item,
                image: `${req.baseFullUrl}${item.image}`,
            })),
        };

        res.status(200).json(formattedPage);
    } catch (error) {
        res.status(400).json({ message: "Failed to retrieve service page" });
    }
};

export const add = async (req, res) => {
    const { lang, title, social, list, servicesData } = req.body;

    if (!lang || !title || !servicesData || !servicesData.length) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const page = await prisma.service_page.create({
            data: {
                lang,
                title,
                social,
                list,
                user: {
                    connect: {
                        id: req.user.id,
                    },
                },
                servicesData: {
                    create: servicesData,
                },
            },
            include: {
                servicesData: true,
            },
        });

        res.status(201).json(page);
    } catch (error) {
        res.status(500).json({ message: "Failed to add service page" });
    }
};

export const edit = async (req, res) => {
    const id = req.params.id;
    const { lang, title, social, list, servicesData } = req.body;

    try {
        const page = await prisma.service_page.update({
            where: { 
                id,
            },
            data: {
                lang,
                title,
                social,
                list,
                servicesData: {
                    deleteMany: {}, 
                    create: servicesData,
                },
            },
            include: {
                servicesData: true,
            },
        });

        res.status(200).json(page);
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({ message: "Service page not found" });
        }

        res.status(500).json({ message: "Failed to update service page" });
    }
};

export const remove = async (req, res) => {
    const id = req.params.id;

    try {
        await prisma.service_page.delete({
            where: { 
                id,
            },
        });

        res.status(200).json({ message: "Service page deleted successfully" });
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({ message: "Service page not found" });
        }

        res.status(500).json({ message: "Failed to delete service page" });
    }
};