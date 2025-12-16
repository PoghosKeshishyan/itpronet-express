
const getHomePage = async (req, res) => {
    const apiList = [
        `${req.baseFullUrl}/api/header_infos`,
        `${req.baseFullUrl}/api/navbars`,
        `${req.baseFullUrl}/api/sliders`,
        `${req.baseFullUrl}/api/services_sections`,
    ];

    res.render('index', { apiList });
};

export default getHomePage;
