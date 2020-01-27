import { AlGestaltClientInstance } from '../src/al-gestalt-client';
import { expect } from 'chai';
import { describe, before } from 'mocha';
import * as sinon from 'sinon';

describe('AlGestaltClient', () => {
    afterEach(() => {
        sinon.restore();
    });

    describe("Something", () => {
        it("should work", () => {
            expect( true ).to.equal( true );
        } );
    } );
});
