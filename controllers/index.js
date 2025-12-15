
const getHomePage = async (req, res) => {
    const apiList = [
        `${req.baseFullUrl}/api/header_infos`,
        `${req.baseFullUrl}/api/navbars`,
    ];

    res.render('index', { apiList });
};

export default getHomePage;
