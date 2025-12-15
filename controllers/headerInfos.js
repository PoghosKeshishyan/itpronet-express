import { prisma } from "../prisma/prisma-client.js";

export const all = async (req, res) => {
    const lang = req.query.lang || '';

    try {
        const headerInfos = await prisma.header_info.findMany(lang && {
            where: {
                lang,
            },
        });

        res.status(200).json(headerInfos);
    } catch (error) {
        res.status(400).json({ message: "Failed to retrieve header infos" });
    }
};

export const header_info = async (req, res) => {
    const id = req.params.id;

    try {
        const headerInfo = await prisma.header_info.findUnique({
            where: {
                id,
            },
        });

        if (!headerInfo) {
            return res.status(404).json({ message: "HeaderInfo not found" });
        }

        res.status(200).json(headerInfo);
    } catch (error) {
        res.status(400).json({ message: "Failed to retrieve header info" });
    }
};

export const add = async (req, res) => {
    const data = req.body;

    if (!data.lang || !data.welcomeText || !data.address) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const headerInfo = await prisma.header_info.create({
            data: {
                ...data,
                authorId: req.user.id,
            },
        });

        res.status(201).json(headerInfo);
    } catch (error) {
        res.status(500).json({ message: "Failed to add header info" });
    }
};

export const edit = async (req, res) => {
    const data = req.body;
    const id = req.params.id;

    try {
        const headerInfo = await prisma.header_info.update({
            where: {
                id,
            },
            data,
        });

        res.status(200).json(headerInfo);
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'HeaderInfo not found' });
        }

        res.status(500).json({ message: "Failed to update header info" });
    }
};

export const remove = async (req, res) => {
    const id = req.params.id;

    try {
        await prisma.header_info.delete({
            where: {
                id,
            },
        });

        res.status(200).json({ message: 'HeaderInfo deleted successfully' });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'HeaderInfo not found' });
        }

        res.status(500).json({ message: "Failed to delete header info" });
    }
};