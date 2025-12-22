
const getHomePage = async (req, res) => {
    const projectVersion = 'v.1.8.'

    const routes = [
        { id: 1, method: 'GET', access: 'public', url: `${req.baseFullUrl}/api/header_infos` },
        { id: 2, method: 'GET', access: 'public', url: `${req.baseFullUrl}/api/header_infos?lang=EN` },
        { id: 3, method: 'GET', access: 'public', url: `${req.baseFullUrl}/api/header_infos/53412227-86ba-4aa3-9a48-1f6884986eac` },
        { id: 4, method: 'GET', access: 'public', url: `${req.baseFullUrl}/api/services_pages/services-data/8e4fadc3-ebc0-47be-8ecb-e72ad66a6dcb` },
        { id: 5, method: 'POST', access: 'private', url: `${req.baseFullUrl}/api/header_infos` },
        { id: 6, method: 'PUT', access: 'private', url: `${req.baseFullUrl}/api/header_infos/53412227-86ba-4aa3-9a48-1f6884986eac` },
        { id: 7, method: 'DELETE', access: 'private', url: `${req.baseFullUrl}/api/header_infos/53412227-86ba-4aa3-9a48-1f6884986eac` },
    ];

    const resources = [
        `${req.baseFullUrl}/api/header-infos`,
        `${req.baseFullUrl}/api/navbars`,
        `${req.baseFullUrl}/api/sliders`,
        `${req.baseFullUrl}/api/services-sections`,
        `${req.baseFullUrl}/api/counter-sections`,
        `${req.baseFullUrl}/api/itsolutions`,
        `${req.baseFullUrl}/api/services-pages`,
        `${req.baseFullUrl}/api/about-pages`,
        `${req.baseFullUrl}/api/about-logos`,
        `${req.baseFullUrl}/api/contact-pages`,
        `${req.baseFullUrl}/api/footers`,
    ];

    res.render('index', { projectVersion, routes, resources });
};

export default getHomePage;
