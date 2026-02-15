import { Verifier } from '@pact-foundation/pact';
import path from 'path';
import { app } from '../../../src/api/server';
import http from 'http';

describe('Verificação do Provedor (API)', () => {
    let server: http.Server;
    const port = 3002;

    beforeAll(async () => {
        server = app.listen(port, () => {
            console.log(`Servidor de teste rodando na porta ${port}`);
        });
    });

    afterAll((done) => {
        server.close(done);
    });

    it('deve validar o contrato com o Frontend', async () => {
        const opts = {
            provider: 'CDCTProvider',
            providerBaseUrl: `http://localhost:${port}`,
            pactUrls: [
                path.resolve(process.cwd(), 'pacts/CDCTConsumer-CDCTProvider.json'),
            ],
            publishVerificationResult: false,
            providerVersion: '1.0.0',
        };

        await new Verifier(opts).verifyProvider();
    });
});
