class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanho: 10, animais: [{ especie: 'MACACO', quantidade: 3, carnivoro: false }] },
            { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: [{ especie: 'GAZELA', quantidade: 1, carnivoro: false }] },
            { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanho: 9, animais: [{ especie: 'LEAO', quantidade: 1, carnivoro: true }] },
        ];

        this.animais = {
            LEAO: { tamanho: 3, bioma: ['savana'], carnivoro: true },
            LEOPARDO: { tamanho: 2, bioma: ['savana'], carnivoro: true },
            CROCODILO: { tamanho: 3, bioma: ['rio'], carnivoro: true },
            MACACO: { tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false },
            GAZELA: { tamanho: 2, bioma: ['savana'], carnivoro: false },
            HIPOPOTAMO: { tamanho: 4, bioma: ['savana', 'rio'], carnivoro: false },
        };
    }

    analisaRecintos(animal, quantidade) {
        if (!this.animais[animal]) {
            return { erro: "Animal inválido" };
        }

        if (typeof quantidade !== 'number' || quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }

        const especieInfo = this.animais[animal];
        const recintosViaveis = [];

        for (const recinto of this.recintos) {
            const biomasRecinto = recinto.bioma.split(' e ');

            if (!especieInfo.bioma.some(bioma => biomasRecinto.includes(bioma))) {
                continue;
            }

            const temCarnivoro = recinto.animais.some(a => a.carnivoro);
            if (temCarnivoro && !especieInfo.carnivoro) {
                continue;
            }
            if (!temCarnivoro && especieInfo.carnivoro && recinto.animais.length > 0) {
                continue;
            }

            const espacoOcupado = recinto.animais.reduce((acc, a) => acc + (a.quantidade * this.animais[a.especie].tamanho), 0);
            const espacoNecessario = especieInfo.tamanho * quantidade;
            const espacoLivre = recinto.tamanho - espacoOcupado;

            // Novo cálculo do espaço livre corrigido
            if (espacoLivre >= espacoNecessario) {
                const espacoLivreCorrigido = recinto.tamanho - (espacoOcupado + espacoNecessario);
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivreCorrigido} total: ${recinto.tamanho})`);
            }
        }

        if (recintosViaveis.length > 0) {
            recintosViaveis.sort((a, b) => {
                const numA = parseInt(a.match(/\d+/)[0]);
                const numB = parseInt(b.match(/\d+/)[0]);
                return numA - numB;
            });

            return { recintosViaveis };
        } else {
            return { erro: "Não há recinto viável" };
        }
    }
}

export { RecintosZoo as RecintosZoo };
