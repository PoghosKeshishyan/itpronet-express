import { prisma } from "../prisma/prisma-client.js";

export const all = async (req, res) => {
    const lang = req.query.lang || "";

    try {
        const sections = await prisma.serviceSection.findMany({
            where: lang ? { lang } : undefined,
            include: {
                services: {
                    include: {
                        types: true,
                    },
                },
            },
        });

        const formattedSections = sections.map(section => ({
            ...section,
            services: section.services.map(service => ({
                ...service,
                image: `${req.baseFullUrl}${service.image}`,
                types: service.types.map(type => type.value),
            })),
        }));

        res.status(200).json(formattedSections);
    } catch (error) {
        res.status(400).json({ message: "Failed to retrieve service sections" });
    }
};

export const section = async (req, res) => {
    const id = req.params.id;

    try {
        const section = await prisma.serviceSection.findUnique({
            where: { 
                id,
            },
            include: {
                services: {
                    include: {
                        types: true,
                    },
                },
            },
        });

        if (!section) {
            return res.status(404).json({ message: "Service section not found" });
        }

        const formattedSection = {
            ...section,
            services: section.services.map(service => ({
                ...service,
                image: `${req.baseFullUrl}${service.image}`,
                types: service.types.map(type => type.value),
            })),
        };

        res.status(200).json(formattedSection);
    } catch (error) {
        res.status(400).json({ message: "Failed to retrieve service section" });
    }
};

export const add = async (req, res) => {
    const { lang, heading, description, services } = req.body;

    if (!lang || !heading || !description || !services?.length) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const section = await prisma.serviceSection.create({
            data: {
                lang,
                heading,
                description,
                user: {
                    connect: {
                        id: req.user.id,
                    },
                },
                services: {
                    create: services.map(service => ({
                        title: service.title,
                        image: service.image,
                        types: {
                            create: service.types.map(value => ({ value })),
                        },
                    })),
                },
            },
            include: {
                services: {
                    include: {
                        types: true,
                    },
                },
            },
        });

        res.status(201).json(section);
    } catch (error) {
        res.status(500).json({ message: "Failed to add service section" });
    }
};

export const edit = async (req, res) => {
    const id = req.params.id;
    const { lang, heading, description, services } = req.body;

    try {
        const serviceSection = await prisma.$transaction(async (tx) => {
            await tx.serviceType.deleteMany({
                where: {
                    service: {
                        sectionId: id,
                    },
                },
            });

            await tx.service.deleteMany({
                where: {
                    sectionId: id,
                },
            });

            return tx.serviceSection.update({
                where: { 
                    id, 
                },
                data: {
                    lang,
                    heading,
                    description,
                    services: {
                        create: services.map(service => ({
                            title: service.title,
                            image: service.image,
                            types: {
                                create: service.types.map(value => ({ value })),
                            },
                        })),
                    },
                },
                include: {
                    services: {
                        include: {
                            types: true,
                        },
                    },
                },
            });
        });

        res.status(200).json(serviceSection);
    } catch (error) {
        console.error(error);

        if (error.code === "P2025") {
            return res.status(404).json({ message: "Service section not found" });
        }

        res.status(500).json({ message: "Failed to update service section" });
    }
};

export const remove = async (req, res) => {
    const id = req.params.id;

    try {
        await prisma.serviceSection.delete({
            where: { 
                id,
            },
        });

        res.status(200).json({ message: "Service section deleted successfully" });
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({ message: "Service section not found" });
        }

        res.status(500).json({ message: "Failed to delete service section" });
    }
};
