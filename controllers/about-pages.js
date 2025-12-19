import { prisma } from "../prisma/prisma-client.js";

export const all = async (req, res) => {
    const lang = req.query.lang || "";

    try {
        const pages = await prisma.about_page.findMany({
            where: lang ? { lang } : undefined,
            include: {
                blocks: true,
                device_block: true,
            },
        });

        const formattedPages = pages.map(page => ({
            ...page,
            device_block: page.device_block[0],
            blocks: page.blocks.map(elem => ({
                ...elem,
                image: `${req.baseFullUrl}${elem.image}`,
            })),
        }));

        res.status(200).json(formattedPages);
    } catch (error) {
        res.status(400).json({ message: "Failed to retrieve about pages" });
    }
};

export const page = async (req, res) => {
    const id = req.params.id;

    try {
        const aboutPage = await prisma.about_page.findUnique({
            where: {
                id,
            },
            include: {
                blocks: true,
                device_block: true,
            },
        });

        if (!aboutPage) {
            return res.status(404).json({ message: "About page not found" });
        }

        const formattedAboutPage = {
            ...aboutPage,
            device_block: aboutPage.device_block[0],
            blocks: aboutPage.blocks.map(elem => ({
                ...elem,
                image: `${req.baseFullUrl}${elem.image}`,
            })),
        };

        res.status(200).json(formattedAboutPage);
    } catch (error) {
        res.status(400).json({ message: "Failed to retrieve about page" });
    }
};

export const add = async (req, res) => {
    const { lang, btn_text, hero_text, blocks, device_block } = req.body;

    if (!lang || !btn_text || !hero_text) {
        return res.status(400).json({ message: "Required fields are missing" });
    }

    try {
        const aboutPage = await prisma.about_page.create({
            data: {
                lang,
                btn_text,
                hero_text,
                authorId: req.user.id,
                blocks: blocks
                    ? {
                        create: blocks.map(b => ({
                            title: b.title,
                            description: b.description,
                            image: b.image,
                        })),
                    }
                    : undefined,
                device_block: device_block
                    ? {
                        create: {
                            title: device_block.title,
                            description: device_block.description,
                        },
                    }
                    : undefined,
            },
            include: {
                blocks: true,
                device_block: true,
            },
        });

        res.status(201).json(aboutPage);
    } catch (error) {
        res.status(500).json({ message: "Failed to add about page" });
    }
};

export const edit = async (req, res) => {
    const { id } = req.params;
    const { lang, btn_text, hero_text, blocks, device_block } = req.body;

    try {
        const aboutPage = await prisma.about_page.update({
            where: { 
                id,
            },
            data: {
                lang,
                btn_text,
                hero_text,
                blocks: blocks
                    ? {
                        deleteMany: {},
                        create: blocks.map(b => ({
                            title: b.title,
                            description: b.description,
                            image: b.image,
                        })),
                    }
                    : undefined,
                device_block: device_block
                    ? {
                        deleteMany: {},
                        create: {
                            title: device_block.title,
                            description: device_block.description,
                        },
                    }
                    : undefined,
            },
            include: {
                blocks: true,
                device_block: true,
            },
        });

        res.status(200).json(aboutPage);
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({ message: "About page not found" });
        }
        res.status(500).json({ message: "Failed to update about page" });
    }
};

export const remove = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.about_page.delete({
            where: { 
                id,
            },
        });

        res.status(200).json({ message: "About page deleted successfully" });
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({ message: "About page not found" });
        }
        res.status(500).json({ message: "Failed to delete about page" });
    }
};