// Implementação do node (metadados + lógica de execução)
import type {
    IExecuteFunctions,
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
} from 'n8n-workflow';

// a classe precisa implementar INodeType
// ela tem dois blocos principais: description e execute()
export class Random implements INodeType {
    // description controla como o node aparece no editor,
    // quais parametros existem e como ficam organizados
    description: INodeTypeDescription = {
        // identidade do node
        displayName: 'Random',          // nome que aparece no editor
        name: 'random',                 // ID interno (unico no pacote)
        group: ['transform'],           // grupo onde aparece na paleta
        version: 1,                     // versão do node
        description: 'True Random Number Generator (random.org)',

        // icone: arquivo SVG que você fornece
        icon: 'file:random.svg',
        defaults: {
            name: 'Random',
        },

        // conexoes (um input/um output “main”)
        inputs: ['main'],
        outputs: ['main'],

        // parametros (renderizam no painel do node)
        properties: [
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                default: 'trng',
                options: [
                    {
                        name: 'True Random Number Generator',
                        value: 'trng',
                        description: 'Generate a true random integer using random.org',
                    },
                ],
            },
            {
                displayName: 'Min',
                name: 'min',
                type: 'number',
                typeOptions: {
                    minValue: -1000000000,
                    maxValue: 1000000000,
                },
                default: 1,
                required: true,
                description: 'Lower bound (inclusive)',
            },
            {
                displayName: 'Max',
                name: 'max',
                type: 'number',
                typeOptions: {
                    minValue: -1000000000,
                    maxValue: 1000000000,
                },
                default: 60,
                required: true,
                description: 'Upper bound (inclusive)',
            },
        ],
    };

    // execute()` roda quando  "Test Step" é clicado ou executa o workflow.
    // sempre retorna Promise<INodeExecutionData[][]>.
    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        // 1) Captura os itens de entrada e o n8n processa por item – então iteramos sobre `items`.
        const items = this.getInputData();
        // 2) Onde acumula a saida (cada item que o node retorna)
        const returnData: INodeExecutionData[] = [];

        // 3) Processa item a item
        for (let i = 0; i < items.length; i++) {
            // 3.1) Le os parametros definidos em properties
            const min = this.getNodeParameter('min', i) as number;
            const max = this.getNodeParameter('max', i) as number;

            // 3.2) Validacao simples (boa UX: usuario recebe erro claro)
            if (min > max) {
                throw new Error('Min must be less than or equal to Max');
            }

            // Endpoint publico do random.org
            const url = 'https://www.random.org/integers/';

            // Query string da requisição
            const qs = {
                num: 1,         // quantidade de numeros desejados
                min,            // minimo 
                max,            // maximo
                col: 1,         // colunas
                base: 10,       // base decimal
                format: 'plain', // resposta em texto "cru" 
                rnd: 'new',
            };

            // usa o helper HTTP do n8n (respeita proxies e configs globais)
            const response = await this.helpers.httpRequest({
                method: 'GET',
                url,
                qs,
                json: false
            });


            const value = parseInt(String(response).trim(), 10);

            returnData.push({
                json: {
                    min,
                    max,
                    value,
                    source: 'random.org',
                },
            });
        }

        return [returnData];
    }
}
