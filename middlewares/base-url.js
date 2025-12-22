export default function BaseUrlMiddleware(req, res, next) {
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    req.baseFullUrl = `${protocol}://${req.get('host')}`;
    next();
}