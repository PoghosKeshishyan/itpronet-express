
const getHomePage = async (req, res) => {
    const projectVersion = 'v.1.3.'

    const routes = [
        { id: 1, method: 'GET', access: 'public', url: `${req.baseFullUrl}/api/header_infos` },
        { id: 2, method: 'GET', access: 'public', url: `${req.baseFullUrl}/api/header_infos?lang=EN` },
        { id: 3, method: 'GET', access: 'public', url: `${req.baseFullUrl}/api/header_infos/53412227-86ba-4aa3-9a48-1f6884986eac` },
        { id: 4, method: 'POST', access: 'private', url: `${req.baseFullUrl}/api/header_infos` },
        { id: 5, method: 'PUT', access: 'private', url: `${req.baseFullUrl}/api/header_infos/53412227-86ba-4aa3-9a48-1f6884986eac` },
        { id: 6, method: 'DELETE', access: 'private', url: `${req.baseFullUrl}/api/header_infos/53412227-86ba-4aa3-9a48-1f6884986eac` },
    ];

    const resources = [
        `${req.baseFullUrl}/api/header_infos`,
        `${req.baseFullUrl}/api/navbars`,
        `${req.baseFullUrl}/api/sliders`,
        `${req.baseFullUrl}/api/services_sections`,
        `${req.baseFullUrl}/api/counter_sections`,
        `${req.baseFullUrl}/api/itsolutions`,
        `${req.baseFullUrl}/api/footers`,
    ];

    res.render('index', { projectVersion, routes, resources });
};

export default getHomePage;
