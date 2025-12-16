import { prisma } from "../prisma/prisma-client.js";

export const all = async (req, res) => {
    const lang = req.query.lang || "";

    try {
        const sliders = await prisma.slider.findMany({
            where: lang ? { lang } : undefined,
            include: {
                slides: true,
            },
        });

        const formattedSliders = sliders.map(slider => ({
            ...slider,
            slides: slider.slides.map(slide => ({
                ...slide,
                image: `${req.baseFullUrl}${slide.image}`,
            })),
        }));

        res.status(200).json(formattedSliders);
    } catch (error) {
        res.status(400).json({ message: "Failed to retrieve sliders" });
    }
};

export const slider = async (req, res) => {
    const id = req.params.id;

    try {
        const slider = await prisma.slider.findUnique({
            where: { 
                id,
            },
            include: {
                slides: true,
            },
        });

        if (!slider) {
            return res.status(404).json({ message: "Slider not found" });
        }

        const formattedSlider = {
            ...slider,
            slides: slider.slides.map(slide => ({
                ...slide,
                image: `${req.baseFullUrl}${slide.image}`,
            })),
        };

        res.status(200).json(formattedSlider);
    } catch (error) {
        res.status(400).json({ message: "Failed to retrieve slider" });
    }
};

export const add = async (req, res) => {
    const { lang, slides } = req.body;

    if (!lang || !slides || !slides.length) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const slider = await prisma.slider.create({
            data: {
                lang,
                user: {
                    connect: {
                        id: req.user.id,
                    },
                },
                slides: {
                    create: slides,
                },
            },
            include: {
                slides: true,
            },
        });

        res.status(201).json(slider);
    } catch (error) {
        res.status(500).json({ message: "Failed to add slider" });
    }
};

export const edit = async (req, res) => {
    const id = req.params.id;
    const { lang, slides } = req.body;

    try {
        const slider = await prisma.slider.update({
            where: { 
                id, 
            },
            data: {
                lang,
                slides: {
                    deleteMany: {},
                    create: slides,
                },
            },
            include: {
                slides: true,
            },
        });

        res.status(200).json(slider);
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({ message: "Slider not found" });
        }

        res.status(500).json({ message: "Failed to update slider" });
    }
};

export const remove = async (req, res) => {
    const id = req.params.id;

    try {
        await prisma.slider.delete({
            where: { 
                id, 
            },
        });

        res.status(200).json({ message: "Slider deleted successfully" });
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({ message: "Slider not found" });
        }

        res.status(500).json({ message: "Failed to delete slider" });
    }
};