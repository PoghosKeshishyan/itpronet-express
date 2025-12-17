import { prisma } from "../prisma/prisma-client.js";

export const all = async (req, res) => {
    const lang = req.query.lang || "";

    try {
        const footers = await prisma.footer.findMany({
            where: lang ? { lang } : undefined,
            include: {
                workingHours: true,
                quickLinks: {
                    include: {
                        links: true,
                    },
                },
                serviceLinks: {
                    include: {
                        links: true,
                    },
                },
            },
        });

        const formattedFooters = footers.map(footer => ({
            ...footer,
            workingHours: footer.workingHours[0],
            quickLinks: footer.quickLinks[0],
            serviceLinks: footer.serviceLinks[0],
        }));

        res.status(200).json(formattedFooters);
    } catch (error) {
        res.status(400).json({ message: "Failed to retrieve footers" });
    }
};

export const footer = async (req, res) => {
    const id = req.params.id;

    try {
        const footer = await prisma.footer.findUnique({
            where: {
                id,
            },
            include: {
                workingHours: true,
                quickLinks: {
                    include: { links: true },
                },
                serviceLinks: {
                    include: { links: true },
                },
            },
        });

        if (!footer) {
            return res.status(404).json({ message: "Footer not found" });
        }

        const formattedFooter = {
            ...footer,
            workingHours: footer.workingHours[0],
            quickLinks: footer.quickLinks[0],
            serviceLinks: footer.serviceLinks[0],
        };

        res.status(200).json(formattedFooter);
    } catch (error) {
        res.status(400).json({ message: "Failed to retrieve footer" });
    }
};

export const add = async (req, res) => {
    const { lang, logo, about, workingHours, quickLinks, serviceLinks } = req.body;

    if (!lang || !logo || !about) {
        return res.status(400).json({ message: "Required fields are missing" });
    }

    try {
        const footer = await prisma.footer.create({
            data: {
                lang,
                logo,
                about,
                authorId: req.user.id,

                workingHours: workingHours
                    ? {
                        create: {
                            title: workingHours.title,
                            weekdays: workingHours.weekdays,
                            saturday: workingHours.saturday,
                        },
                    }
                    : undefined,

                quickLinks: quickLinks
                    ? {
                        create: {
                            title: quickLinks.title,
                            links: {
                                create: quickLinks.links,
                            },
                        },
                    }
                    : undefined,

                serviceLinks: serviceLinks
                    ? {
                        create: {
                            title: serviceLinks.title,
                            links: {
                                create: serviceLinks.links,
                            },
                        },
                    }
                    : undefined,
            },
            include: {
                workingHours: true,
                quickLinks: { include: { links: true } },
                serviceLinks: { include: { links: true } },
            },
        });

        res.status(201).json(footer);
    } catch (error) {
        res.status(500).json({ message: "Failed to add footer" });
    }
};

export const edit = async (req, res) => {
    const { id } = req.params;
    const { lang, logo, about, workingHours, quickLinks, serviceLinks } = req.body;

    try {
        const footer = await prisma.footer.update({
            where: { 
                id,
            },
            data: {
                lang,
                logo,
                about,

                workingHours: workingHours
                    ? {
                          deleteMany: {},
                          create: {
                              title: workingHours.title,
                              weekdays: workingHours.weekdays,
                              saturday: workingHours.saturday,
                          },
                      }
                    : undefined,

                quickLinks: quickLinks
                    ? {
                          deleteMany: {},
                          create: {
                              title: quickLinks.title,
                              links: {
                                  create: quickLinks.links.map(l => ({
                                      label: l.label,
                                      href: l.href,
                                  })),
                              },
                          },
                      }
                    : undefined,

                serviceLinks: serviceLinks
                    ? {
                          deleteMany: {},
                          create: {
                              title: serviceLinks.title,
                              links: {
                                  create: serviceLinks.links.map(l => ({
                                      label: l.label,
                                      href: l.href,
                                  })),
                              },
                          },
                      }
                    : undefined,
            },
            include: {
                workingHours: true,
                quickLinks: { include: { links: true } },
                serviceLinks: { include: { links: true } },
            },
        });

        res.status(200).json(footer);
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({ message: "Footer not found" });
        }

        res.status(500).json({ message: "Failed to update footer" });
    }
};

export const remove = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.footer.delete({
            where: { 
                id,
            },
        });

        res.status(200).json({ message: "Footer deleted successfully" });
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({ message: "Footer not found" });
        }

        res.status(500).json({ message: "Failed to delete footer" });
    }
};