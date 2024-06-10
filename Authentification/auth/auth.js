const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if(!authorizationHeader) {
    return res.status(401).json({message: "Veuillez fournir un JWT valide"})
  }

  const token = authorizationHeader.split(' ')[1]
  const decodedToken = jwt.verify(token, "private_key", (error, decodedToken) => {
    if(error){
      console.log(`deunsLog : `, error)
      return res.status(401).json({message: "L'utilisateur n'est pas autorisé à accèder a cette ressource"});
    }

    const userId = decodedToken.userId
    if(req.body.userId && req.body.userId !== userId){
      res.status(401).json({message: "L'identifiant de l'utilisateur est invalide"})
    } else {
      next();
    }
  })
}