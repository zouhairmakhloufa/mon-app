const router = require('express').Router();
let User = require('../models/User.model');

router.route('/ajouter').post((req, res) => {
    const Type = req.body.Type;
    const email = req.body.email;
    const password = req.body.password;
    const typeOfCars = req.body.typeOfCars;
    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;

    const newUser = new User ({
        Type ,
        FirstName ,
        LastName,
        email ,
        password ,
        typeOfCars 
    });
    // promise
     newUser.save()
        .then( (User) => res.json(  {User : User}   ) )
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/supprimer/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then( () => res.json('User supprimeé'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/supprimer').delete((req, res) => {
    res.json('maghir params brabi thabet')
});

module.exports = router;