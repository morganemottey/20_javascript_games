const form = document.querySelector('.form-quizz')
const reponses = ['c', 'a', 'b', 'a', 'c'];

let tabResult = [];

const emojis = ['✔️', '✨', '👀', '😭', '👎'];
const titreResultat = document.querySelector('.resultats h2');
const noteResultat = document.querySelector('.note');
const aideResultat = document.querySelector('.aide');
const toutesLesQuestions = document.querySelectorAll('.question-block');

let verifyResult = []

form.addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log(document.querySelector('input[name="q1"]:checked').value)
    for (let i = 1; i < 6; i++) {
        tabResult.push(document.querySelector(`input[name="q${i}"]:checked`).value)
    }
    verifyFunction(tabResult);
    tabResult = [];
})

function verifyFunction() {
    for (let i = 0; i < 5; i++) {
        if (tabResult[i] === reponses[i]) {
            verifyResult.push(true)
        } else {
            verifyResult.push(false)
        }

    }
    console.log(verifyResult)

    afficherTableauResultat(verifyResult);
    couleurTableauResultat(verifyResult);
    verifyResult = [];

}

function afficherTableauResultat(tabcheck) {
    const wrongResults = tabcheck.filter(el => el !== true).length;
    // console.log(wrongResults);
    switch (wrongResults) {
        case 0:
            titreResultat.innerText = `✔️ Bravo, c'est un sans faute ! ✔️`
            aideResultat.innerText = ''
            noteResultat.innerText = '5/5'
            break;
        case 1:
            titreResultat.innerText = `✨ Vous y êtes presque ! ✨`
            aideResultat.innerText = 'Retentez une autre réponse dans la case rouge, puis re-validez !'
            noteResultat.innerText = '4/5'
            break;
        case 2:
            titreResultat.innerText = `✨ Encore un effort ... 👀`
            aideResultat.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !'
            noteResultat.innerText = '3/5'
            break;
        case 3:
            titreResultat.innerText = `👀 Il reste quelques erreurs. 😭`
            aideResultat.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !'
            noteResultat.innerText = '2/5'
            break;
        case 4:
            titreResultat.innerText = `😭 Peux mieux faire ! 😭`
            aideResultat.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !'
            noteResultat.innerText = '1/5'
            break;
        case 5:
            titreResultat.innerText = `👎 Peux mieux faire ! 👎`
            aideResultat.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !'
            noteResultat.innerText = '0/5'
            break;

        default:
            'Wops, cas innatendu.';

    }
}

function couleurTableauResultat (colorTab) {
    for (let j = 0 ; j < colorTab.length; j++) {
        if (colorTab[j] === true) {
            toutesLesQuestions[j].style.background = 'lightgreen' 
        } else {
            toutesLesQuestions[j].style.background = '#ffb8b8'
            toutesLesQuestions[j].classList.add('echec')
        }
        setTimeout(() => {
            toutesLesQuestions[j].classList.remove('echec')
        }, 500)
    }
}

toutesLesQuestions.forEach(item => {
    item.addEventListener('click', () => {
        item.style.background = "white";
    })
})