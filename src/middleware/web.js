export function web(req, res, next) {
    let session = req.session;
    res.locals.user = session.user;
    if (res.locals.user === undefined) {
        res.redirect('/login');
        return
    }
    next()
}