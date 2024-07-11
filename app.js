const mongoose = require('mongoose');
require('dotenv').config();

// Récupérer l'URI MongoDB depuis les variables d'environnement
const uri = process.env.MONGO_URI;

// Connexion à MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connexion à MongoDB réussie');
}).catch(err => {
  console.error('Erreur de connexion à MongoDB :', err.message);
});




////////////////////////////////////////////////////////////////////////////////////////

//Créer un Modèle de Personne avec Mongoose Définissez un modèle de personne avec les champs spécifiés (nom, âge, favoriteFoods) en utilisant Mongoose.
const mongoose = require('mongoose');

// Définir le schéma Personne
const personneSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  age: { type: Number },
  favoriteFoods: { type: [String] }
});

// Créer le modèle Personne à partir du schéma
const Personne = mongoose.model('Personne', personneSchema);

module.exports = Personne; // Exporter le modèle pour l'utiliser dans d'autres fichiers




////////////////////////////////////////////////////////////////////////////////////

/*
Opérations CRUD avec Mongoose
Voici comment effectuer les différentes opérations CRUD avec Mongoose :

Créer et Sauvegarder un Enregistrement
*/
//création et sauvegarde d'un document Personne
const nouvellePersonne = new Personne({
  nom: 'John Doe',
  age: 30,
  favoriteFoods: ['Pizza', 'Pasta']
});

nouvellePersonne.save((err, personne) => {
  if (err) {
    console.error('Erreur lors de la sauvegarde de la personne :', err);
  } else {
    console.log('Personne sauvegardée avec succès :', personne);
  }
});


/*
Créer plusieurs enregistrements avec Model.create()
*/
const arrayOfPeople = [
  { nom: 'Jane Smith', age: 25, favoriteFoods: ['Sushi', 'Salad'] },
  { nom: 'Michael Brown', age: 40, favoriteFoods: ['Steak', 'Burger'] }
];

Personne.create(arrayOfPeople, (err, people) => {
  if (err) {
    console.error('Erreur lors de la création de plusieurs personnes :', err);
  } else {
    console.log('Personnes créées avec succès :', people);
  }
});



/* Rechercher avec Model.find() */

// Trouver toutes les personnes avec un nom donné
Personne.find({ nom: 'John Doe' }, (err, personnes) => {
    if (err) {
      console.error('Erreur lors de la recherche de personnes :', err);
    } else {
      console.log('Personnes trouvées :', personnes);
    }
  });
  
  /*Rechercher avec Model.findOne()*/
  // Rechercher une personne qui a un aliment spécifique dans ses favoris
Personne.findOne({ favoriteFoods: 'Pizza' }, (err, personne) => {
    if (err) {
      console.error('Erreur lors de la recherche de la personne :', err);
    } else {
      console.log('Personne trouvée :', personne);
    }
  });

  
  /*  Rechercher avec Model.findOne()*/
  // Rechercher une personne qui a un aliment spécifique dans ses favoris
Personne.findOne({ favoriteFoods: 'Pizza' }, (err, personne) => {
    if (err) {
      console.error('Erreur lors de la recherche de la personne :', err);
    } else {
      console.log('Personne trouvée :', personne);
    }
  });

  /*Rechercher par ID avec Model.findById()*/

  // Rechercher une personne par son ID
const personId01 = 'votre_id';
Personne.findById(personId01, (err, personne) => {
  if (err) {
    console.error('Erreur lors de la recherche de la personne par ID :', err);
  } else {
    console.log('Personne trouvée par ID :', personne);
  }
});


/*Mettre à jour avec Model.findOneAndUpdate()*/
// Mettre à jour l'âge d'une personne par son nom
const personName = 'John Doe';
Personne.findOneAndUpdate({ nom: personName }, { age: 20 }, { new: true }, (err, personne) => {
  if (err) {
    console.error('Erreur lors de la mise à jour de la personne :', err);
  } else {
    console.log('Personne mise à jour :', personne);
  }
});


/*Supprimer avec Model.findByIdAndRemove()*/
// Supprimer une personne par son ID
const personId02 = 'votre_id';
Personne.findByIdAndRemove(personId02, (err, personneSupprimee) => {
  if (err) {
    console.error('Erreur lors de la suppression de la personne :', err);
  } else {
    console.log('Personne supprimée :', personneSupprimee);
  }
});

/*Supprimer plusieurs documents avec Model.remove()*/

// Supprimer toutes les personnes avec un nom spécifique (par exemple, 'Mary')
Personne.remove({ nom: 'Mary' }, (err, result) => {
  if (err) {
    console.error('Erreur lors de la suppression des personnes :', err);
  } else {
    console.log('Personnes supprimées avec succès :', result);
  }
});

/* Aides à la recherche de chaîne pour affiner les résultats de recherche.
Recherchez des personnes qui aiment les burritos. Triez-les par nom, limitez les résultats à deux documents et masquez leur âge.
Enchaînez .find(), .sort(), .limit(), .select(), puis .exec(). Transmettez le rappel done(err, data) à exec()*/


const Person = require('./models/person.model');

// Recherche des personnes aimant les burritos, triées par nom, limitées à 2 et sans âge
Person.find({ favoriteFoods: 'Burritos' })
  .sort({ name: 1 })   // Trie par nom croissant
  .limit(2)            // Limite à 2 résultats
  .select('-age')      // Exclut le champ 'age'
  .exec(function(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log('Personnes aimant les burritos (triées par nom) :', data);
    }
  });


/////////////////////////////////////////////////////////////////