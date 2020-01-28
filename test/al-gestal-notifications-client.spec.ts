import { AlGestaltNotificationsClientInstance } from '../src/al-gestalt-notifications-client';
import { expect } from 'chai';
import { describe, before } from 'mocha';
import * as sinon from 'sinon';

describe('AlGestaltNotificationsClient', () => {
    afterEach(() => {
        sinon.restore();
    });

    describe("Something", () => {
        it("should work", () => {
            expect( true ).to.equal( true );
        } );
    } );
});
