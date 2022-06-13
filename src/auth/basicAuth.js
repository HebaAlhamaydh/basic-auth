'use strict';

const basicAuth = (req, res, next) => {
    if (req.headers.authorization) 
    {
        next();
    }
    else{
        next('Invalid Login ');
    }
    
}

module.exports = basicAuth;