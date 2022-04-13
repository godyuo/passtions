const models  = require("../models")
const { isAuthorized, generateAccessToken, generateRefreshToken } = require('./tokenFunctions');

module.exports = {
    getid: (req, res) => {
        const userId = req.params.id;
        const accessTokenData = isAuthorized(req);
        if(!accessTokenData) { return res.status(401).send( 'not exist JWT Token' )};

        models.getid(Number(userId), (error, result) => {
            if(error || result.length === 0){
                return res.status(404).send('Not Found')
            } else {
                res.status(200).json(result)
            }
        })
        
    },

    putid: async (req, res) => {
        const userId = req.params.id;
        const accessTokenData = isAuthorized(req);
        if(!accessTokenData) { return res.status(401).send( 'not exist JWT Token' )};

        const { name, completed } = req.body;
        models.putid(Number(userId), name, completed, (error, result) => {
            if(error || result.length === 0){
                return res.status(404).send('Not Found');
            } else {
                res.status(200).json(result);
            }
        })
    },
    
    deleteid: async (req, res) => {
        const userId = req.params.id;
        const accessTokenData = isAuthorized(req);
        if(!accessTokenData) { return res.status(401).send( 'not exist JWT Token' )};

        models.deletedid(Number(userId), (error, result) => {
            if(error || result.affectedRows === 0){
                return res.status(404).send('Not Found')
            } else {
                res.status(204).json('delete success')
            }
        })
        
    },

    postid: (req, res) => {
        const { name, completed } = req.body;

        models.postid(name, completed, (error, result) => {
            if(error){
                return res.status(400).send('Bad Request')
            } else {
                res.status(201).json(result)
            }
        })
    },

    get: (req, res) => {
        const accessTokenData = isAuthorized(req);
        if(!accessTokenData) { return res.status(401).send( 'not exist JWT Token' )};

        models.listtodo((error, result) => {
            if(error || result.length === 0){
                return res.status(404).send('Not Found')
            } else {
                res.status(200).json(result)
            }
        })
    },
    logintodo: (req, res) => {
        const userId = req.params.id;
        const { name, completed } = req.body;
        if( name === undefined || completed === undefined ){
            return res.status(400).send('Bad Request')
        } else {
            models.logintodo(userId, name, completed, (error, result) => {
                if(error){
                    return res.status(401).send('login fail')
                }
                if(result.length === 0){
                    return res.status(404).send('Not Found')
                }
                else {
                    const accessToken = generateAccessToken(result);
                    const refreshToken = generateRefreshToken(result);
                    res.cookie("jwt", refreshToken, {
                        data: { accessToken },
                        httpOnly: true
                    });
                    res.status(201).send('login success')
                }
            })
        }
    },
    getimg: (req, res) => {
        const userId = req.params.id;
        const path = req.file.path
        // const accessTokenData = isAuthorized(req);
        // if(!accessTokenData) { return res.status(401).send( 'not exist JWT Token' )};
        if(req.file === undefined) { res.status(400).send('file not exist')};

        models.getimg(Number(userId), path, (error, result) => {
            if(error || result.length === 0){
                return res.status(404).send('Not Found')
            } else {
                res.status(200).json({ message:' img upload success'})
            }
        })
    }
}