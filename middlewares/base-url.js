export default function BaseUrlMiddleware(req, res, next) {
    req.baseFullUrl = `${req.protocol}://${req.get('host')}`;
    next();
}