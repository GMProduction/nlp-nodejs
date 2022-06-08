export const loginPage = async (request, response) => {
    let session = request.session;
    console.log(session);
    response.render('login');
}

export const login = async (request, response) => {
    let session = request.session;
    const {
        username,
        password
    } = request.body;
    session.username = username;
    session.password = password;
    response.redirect('/')
}