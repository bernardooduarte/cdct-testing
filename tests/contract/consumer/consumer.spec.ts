import { PactV3, MatchersV3 } from '@pact-foundation/pact';
import path from 'path';
import axios from 'axios';

const provider = new PactV3({
    consumer: 'CDCTConsumer',
    provider: 'CDCTProvider',
    dir: path.resolve(process.cwd(), 'pacts'),
});

describe('Contrato da API de Tecnologias', () => {
    it('deve retornar uma lista de tecnologias', () => {
        provider
            .given('existem tecnologias cadastradas')
            .uponReceiving('uma requisição para listar tecnologias')
            .withRequest({
                method: 'GET',
                path: '/technologies',
            })
            .willRespondWith({
                status: 200,
                body: MatchersV3.eachLike({
                    id: MatchersV3.string('1'),
                    name: MatchersV3.string('Playwright'),
                    category: MatchersV3.string('Testing'),
                }),
            });

        return provider.executeTest(async (mockServer) => {
            const response = await axios.get(`${mockServer.url}/technologies`);

            expect(response.data[0].name).toEqual('Playwright');
            expect(response.status).toEqual(200);
        });
    });
});
