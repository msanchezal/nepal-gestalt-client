import { AlGestaltNotificationsClientInstance } from '../src/al-gestalt-notifications-client';
import { expect } from 'chai';
import { describe } from 'mocha';
import * as sinon from 'sinon';
import { ALClient } from '@al/client';

beforeEach(() => {
    ALClient.setGlobalParameters( { noEndpointsResolution: true } );
} );

afterEach(() => {
    sinon.restore();
});

// Global spy.
let stub: sinon.SinonSpy;

describe('Gestal Notifications Client', () => {
    const apiBaseURL = "https://gestalt-api.product.dev.alertlogic.com";
    const service = "notifications";
    const version = "v1";
    const accountId = "345";

    describe('notifications ', () => {
        describe('When fetching list incidents alerts', () => {
            const list = [
            ];
            beforeEach(() => {
                stub = sinon.stub(ALClient as any, 'axiosRequest').returns(Promise.resolve({status: 200, data: list}));
            });
            afterEach(() => {
                stub.restore();
            });
            it('Should call the gestalt notifications list  with incident\'s GET.', async () => {
                const AlGestaltNotificationsClient = new AlGestaltNotificationsClientInstance();
                await AlGestaltNotificationsClient.getNotificationsList(accountId, 'incident');
                expect( stub.callCount ).to.equal(1);
                expect( stub.args[0][0].url ).to.equal(`${apiBaseURL}/${service}/${version}/${accountId}/list/incident`);
            });
        });

    });
});
