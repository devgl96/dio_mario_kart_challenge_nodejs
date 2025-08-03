const player1 = {
    name: "MARIO",
    speed: 4,
    handling: 3,
    power: 3,
    points: 0
};

const player2 = {
    name: "LUIGI",
    speed: 3,
    handling: 4,
    power: 4,
    points: 0
};

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function logRollResult(characterName, block, diceResult, attribute) {
    return console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Round ${round}: `);

        let block = await getRandomBlock();

        console.log(`Block: ${block}`);

        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if (block === "RETA") {
            totalTestSkill1 = diceResult1 + character1.speed;
            totalTestSkill2 = diceResult2 + character2.speed;

            await logRollResult(player1.name, "VELOCIDADE", diceResult1, character1.speed);
            await logRollResult(player2.name, "VELOCIDADE", diceResult2, character2.speed);
        }

        if (block === "CURVA") {
            totalTestSkill1 = diceResult1 + character1.handling;
            totalTestSkill2 = diceResult2 + character2.handling;

            await logRollResult(player1.name, "MANOBRABILIDADE", diceResult1, character1.handling);
            await logRollResult(player2.name, "MANOBRABILIDADE", diceResult2, character2.handling);

        }

        if (block === "CONFRONTO") {
            let powerResult1 = diceResult1 + character1.power;
            let powerResult2 = diceResult2 + character2.power;

            console.log(`${character2.name} confrontou com ${character2.name} 🥊`);

            await logRollResult(player1.name, "PODER", diceResult1, character1.power);
            await logRollResult(player2.name, "PODER", diceResult2, character2.power);

            if (powerResult1 > powerResult2 && character2.points > 0) {
                console.log(`${character1.name} venceu o confronto! ${character2.name} perdeu 1 ponto 🐢`);
                character2.points--;
            }


            if (powerResult2 > powerResult1 && character1.points > 0) {
                console.log(`${character2.name} venceu o confronto! ${character1.name} perdeu 1 ponto 🐢`);
                character1.points--;
            }

            console.log(powerResult1 === powerResult2 ? 'Confronto Empatado! Nenhum ponto foi perdido!' : '');
        }

        if (totalTestSkill1 > totalTestSkill2) {
            console.log(`${character1.name} marcou um ponto!`);
            character1.points++;
        } else if (totalTestSkill2 > totalTestSkill1) {
            console.log(`${character2.name} marcou um ponto!`);
            character2.points++;
        }

        console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥")
    }
}

async function getRandomBlock() {
    let random = Math.random();
    let result;

    switch (true) {
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
            break;
    }


    return result
}

async function declareWinner(character1, character2) {
    console.log("Resultado Final: ");
    console.log(`${character1.name}: ${character1.points} ponto(s).`);
    console.log(`${character2.name}: ${character2.points} ponto(s).`);

    if (character1.points > character2.points) {
        console.log(`\n${character1.name} venceu a corrida! Parabéns! 🏆`);
    } else if (character2.points > character1.points) {
        console.log(`\n${character2.name} venceu a corrida!  Parabéns! 🏆`);
    } else {
        console.log('A corrida terminou em empate!');
    }
}

(async function main() {
    console.log("START GAME");
    console.log(`🏁🚨 Race ${player1.name} and ${player2.name} starting...`);

    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})()