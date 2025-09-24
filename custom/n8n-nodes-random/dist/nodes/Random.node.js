"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Random = void 0;
class Random {
    constructor() {
        this.description = {
            displayName: 'Random',
            name: 'random',
            group: ['transform'],
            version: 1,
            description: 'True Random Number Generator (random.org)',
            icon: 'file:random.svg',
            defaults: {
                name: 'Random',
            },
            inputs: ['main'],
            outputs: ['main'],
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
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        for (let i = 0; i < items.length; i++) {
            const min = this.getNodeParameter('min', i);
            const max = this.getNodeParameter('max', i);
            if (min > max) {
                throw new Error('Min must be less than or equal to Max');
            }
            const url = 'https://www.random.org/integers/';
            const qs = {
                num: 1,
                min,
                max,
                col: 1,
                base: 10,
                format: 'plain',
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
exports.Random = Random;
