class Hero {
    constructor(nom, vie, defense, degat, attaque) {
        this.nom = nom;
        this.vie = vie;
        this.defense = defense;
        this.degat = degat;
        this.attaque = attaque;
        this.experience = 0;
        this.nbTues = 0;
        this.level = 0;
        this.nbTours = 0;
        this.argent = 0;
        this.monstresTues = {
            "Carapuce": 0,
            "Salamèche": 0,
            "Bulbizarre": 0,
            "Pikachu": 0
        };
        this.nbPotions = 0;
        this.achatPotion = false;
        this.coutPotion = 150;
    }
    attaquer(monstre) {
        monstre.vie -= this.degat;
        document.querySelector('.cardMonstre').classList.add('infligeDegats');
        setTimeout(() => {
            document.querySelector('.cardMonstre').classList.remove('infligeDegats');
        }, 800);
    }
    soin() {
        this.vie += 100;
        this.nbPotions -= 1;
    }
    lvlCap = {
        1 : 50,
        2 : 100,
        3 : 150,
        4 : 200,
        5 : 250
    }
    updateLevel() {
        if (this.experience >= this.lvlCap[this.level+1]) {
            this.level++;
            this.achatPotion = true;
            this.argent += this.level * 10;
            this.degat += this.level;
            this.vie += this.level * 10;
        }
    }
}

class Guerrier extends Hero {
    constructor(nom, vie, defense, degat, attaque, mana, coutCompetence) {
        super(nom, vie, defense, degat, attaque, nbTours);
        this.mana = mana;
        this.competence = false;
        this.nbTourCompetence = 0;
        this.coutCompetence = coutCompetence;
    }
}

class Magicien extends Hero {
    constructor(nom, vie, defense, degat, attaque, mana, attaqueMagique, degatMagique, nbTours) {
        super(nom, vie, defense, degat, attaque, nbTours);
        this.mana = mana;
        this.attaqueMagique = attaqueMagique;
        this.degatMagique = degatMagique;
        this.experience = 0;
        this.nbTues = 0;
    }
    attaqueSpeciale(monstre) {
        if(this.mana >= this.degatMagique) {
            this.mana -= this.degatMagique;
            monstre.vie -= this.degatMagique;
        }
        document.querySelector('.cardMonstre').classList.add('infligeDegats');
        setTimeout(() => {
            document.querySelector('.cardMonstre').classList.remove('infligeDegats');
        }, 800);
    }
}

class Monstre {
    constructor(nom, vie, degat, experience, gainArgent) {
        this.nom = nom;
        this.vie = vie;
        this.degat = degat;
        this.experience = experience;
        this.gainArgent = gainArgent;
    }
    attaquer(guerrier) {
        if(guerrier instanceof Guerrier){
            if(guerrier.competence === true){
                console.log('compétence on');
                if(((this.degat - guerrier.defense)/2) > 0) {
                    guerrier.vie -= (this.degat - guerrier.defense)/2;
                }
            }else{
                console.log('compétence off');
                if(this.degat - guerrier.defense > 0) {
                    guerrier.vie -= this.degat - guerrier.defense;
                }
            }
        }else{
            if(this.degat - guerrier.defense > 0) {
                guerrier.vie -= this.degat - guerrier.defense;
            }
        }

        document.querySelector('.cardHero').classList.add('infligeDegats');
        setTimeout(() => {
            document.querySelector('.cardHero').classList.remove('infligeDegats');
        }, 800);
    }
}

function getInfosPerso(personnage) {
    if (personnage === 'Guerrier') {
        document.getElementById('imgJoueur1').src = 'img/Guerrier.gif';
        return new Guerrier('Guerrier', 350, 20, 60, 'CAC', 100, 60);
    }
    if (personnage === 'Magicien') {
        document.getElementById('imgJoueur1').src = 'https://i.pravatar.cc/150?img=66';
        return new Magicien('Magicien', 340, 30, 50, 'CAC', 220, 'boule de feu', 80);
    }
}

function getRandomMonstre() {
    let random = Math.floor(Math.random() * 4);
    if (random === 0) {
        return new Monstre('Carapuce', 100, 20, 30, 150);
    } else if (random === 1) {
        return new Monstre('Salamèche', 120, 30, 40, 200);
    } else if(random === 2) {
        return new Monstre('Bulbizarre', 140, 40, 50, 250);
    }else{
        return new Monstre('Pikachu', 200, 60, 120, 400);
    }
}

function updateDetails(personnage,monstre){
    document.getElementById('joueur1').innerText = personnage.nom;
    document.getElementById('joueur2').innerText = monstre.nom;
    document.getElementById('PV1').innerText = personnage.vie;
    document.getElementById('PV2').innerText = monstre.vie;
    document.getElementById('nbTues').innerText = personnage.nbTues;
    document.getElementById('nbTours').innerText = personnage.nbTours;
    document.getElementById('experience').innerText = personnage.experience;
    document.getElementById('level').innerText = personnage.level;
    document.getElementById('imgJoueur2').src = 'img/' + monstre.nom + '.gif';
    document.getElementById('mana').innerText = personnage.mana;
    document.getElementById('attaque').innerText = personnage.attaque;
    document.getElementById('speciale').innerText = personnage.attaqueMagique;
    document.getElementById('argent').innerText = personnage.argent;
    if(personnage.achatPotion === true){
        document.getElementById('achatPotion').style.display = 'block';
    }else{
        document.getElementById('achatPotion').style.display = 'none';
    }
    if(personnage.nbPotions > 0){
        document.getElementById('usePotion').style.display = "block";
    }else{
        document.getElementById('usePotion').style.display = "none";
    }
    if(personnage instanceof Guerrier){
        document.querySelector('.attaqueSpeciale').style.display = 'none';
        if(personnage.competence === false && personnage.mana >= personnage.coutCompetence) {
            document.getElementById('competence').style.display = 'block';
        }else{
            document.getElementById('competence').style.display = 'none';
        }
    }
    if(personnage.mana < personnage.degatMagique){
        document.querySelector('.attaqueSpeciale').style.display = 'none';
    }
    if(personnage.vie <= 0){
        document.getElementById('infosGame').style.display = 'none';
        document.getElementById('gameOver').style.display = 'block';
        document.getElementById('nbTuesGameOver').innerText = personnage.nbTues;
        document.getElementById('nbToursGameOver').innerText = personnage.nbTours;
        document.getElementById('levelGameOver').innerText = personnage.level;
        document.getElementById('nbCarapuce').innerText = personnage.monstresTues.Carapuce;
        document.getElementById('nbSalameche').innerText = personnage.monstresTues.Salamèche;
        document.getElementById('nbBulbizarre').innerText = personnage.monstresTues.Bulbizarre;
        document.getElementById('nbPikachu').innerText = personnage.monstresTues.Pikachu;
    }
}
let personnage;
let monstre = getRandomMonstre();
function initGame(){
    console.log('Un ' + monstre.nom + ' sauvage apparait !');
    console.log(personnage.nom, 'est prêt à se battre !');
    updateDetails(personnage,monstre);
}

function updateGame(choix = null) {
    let continuer = true;
    if (personnage.vie > 0) {
        console.log('Tour du joueur');
        console.log(personnage.nom, ':', personnage.vie, '-', monstre.nom, ':', monstre.vie);

        if(personnage.achatPotion === true){
            personnage.achatPotion = false;
        }

        let random = Math.floor(Math.random() * 10);
        if(random === 0){
            console.log('raté !');

            if (choix === 'S'){
                personnage.nbPotions--;
            }
            if(choix === 'C'){
                personnage.mana -= personnage.coutCompetence;
            }
            if(choix === 'AP'){
                continuer = false;
            }
            if(personnage instanceof Guerrier){
                if(personnage.nbTourCompetence > 0){
                    personnage.nbTourCompetence--;
                    if(personnage.nbTourCompetence === 0){
                        personnage.competence = false;
                    }
                }
            }
        }else{
            if (choix === 'T') {
                personnage.attaquer(monstre);
                console.log(monstre.nom, 'reçoit', personnage.degat, 'dégats. Il lui reste', monstre.vie, 'points de vie.');
                if(monstre.vie <= 0){
                    personnage.experience += monstre.experience;
                    personnage.argent += monstre.gainArgent;
                    personnage.nbTues += 1;
                    personnage.updateLevel();
                    console.log(personnage.nom, 'a tué', monstre.nom, 'et gagne', monstre.experience, 'points d\'expérience.');
                    monstre = getRandomMonstre();
                    personnage.monstresTues[monstre.nom] = personnage.monstresTues[monstre.nom] + 1;
                    updateDetails(personnage,monstre);
                }
            } else if (choix === 'B') {
                console.log('Attaque magique !');
                personnage.attaqueSpeciale(monstre);
                console.log(monstre.nom, 'reçoit', personnage.degat, 'dégats. Il lui reste', monstre.vie, 'points de vie.');
            } else if (choix === 'S') {
                personnage.soin();
                console.log(personnage.nom, 'reçoit 100 points de vie. Il lui reste', personnage.vie, 'points de vie.');
            } else if (choix === 'C') {
                //Compétence joueur
                if(personnage.competence === false && personnage.mana >= personnage.coutCompetence) {
                    personnage.competence = true;
                    personnage.nbTourCompetence = 3;
                    personnage.mana -= personnage.coutCompetence;
                    console.log(personnage.nom, 'a utilisé sa compétence !');
                }else{
                    console.log('Vous n\'avez pas assez de mana pour utiliser cette compétence !');
                }
            } else if (choix === 'AP') {
                personnage.nbPotions += 1;
                personnage.achatPotion = false;
                personnage.argent -= personnage.coutPotion;
                console.log(personnage.nom, 'a acheté une potion !');
                continuer = false;
            }
            if(personnage instanceof Guerrier){
                if(personnage.nbTourCompetence > 0){
                    personnage.nbTourCompetence--;
                    if(personnage.nbTourCompetence === 0){
                        personnage.competence = false;
                    }
                }
            }
        }
        console.log('Tour du monstre');
        if(continuer === true){
            setTimeout(()=>{
                if(monstre.vie > 0){
                    monstre.attaquer(personnage);
                    console.log(personnage.nom, 'reçoit', monstre.degat, 'dégats. Il lui reste', personnage.vie, 'points de vie.');
                }else{
                    personnage.experience += monstre.experience;
                    monstre = getRandomMonstre();
                    console.log('Un ' + monstre.nom + ' sauvage apparait !');
                    monstre.attaquer(personnage);
                    console.log(personnage.nom, 'reçoit', monstre.degat, 'dégats. Il lui reste', personnage.vie, 'points de vie.');
                }
                updateDetails(personnage,monstre);
            },1000);
        }
    }
    if(personnage.vie <= 0){
        console.log('Le joueur est mort');
        document.getElementById('infosGame').style.display = 'none';
    }
    updateDetails(personnage,monstre);
}

document.querySelectorAll('.btnAction').forEach(btn => {
    btn.addEventListener('click', (e)=>{
        let choix = e.target.getAttribute('data-action');
        personnage.nbTours++;
        updateGame(choix);
    });
});

document.querySelectorAll('.selectPerso').forEach(btn => {
    btn.addEventListener('click', (e)=>{
        let choix = e.target.getAttribute('data-personnage');
        personnage = getInfosPerso(choix);
        document.getElementById('choixPerso').style.display = 'none';
        document.getElementById('infosGame').style.display = 'block';
        initGame();
    });
});