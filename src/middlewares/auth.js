const jwt = require('jsonwebtoken');
const auth = (req, res, next) => {
    const whiteList = ['/login', '/register'];
    if (whiteList.some(route => `/v1/api${route}` === req.originalUrl)) {
        return next();
    }
    else{
        if(req?.headers?.authorization?.split(' ')?.[1]){
            const token = req.headers.authorization.split(' ')[1];
            try{
                const payload = jwt.verify(token, process.env.PRIVATE_KEY);
                next();
            }
            catch(error){
                return res.status(401).json({ error: 'Unauthorized' });
            }   
        }
        else{
            return res.status(401).json({ error: 'Unauthorized' });
        }
    }
}
module.exports = auth; //export default