const Dinosaur = require('../../models/dinosaur');
const { assert } = require('chai');
const { connectAndDrop, disconnect } = require('../../database');

describe('Dinosaur', () => {
    beforeEach(connectAndDrop);
    afterEach(disconnect);

    describe('#name', () => {
        it('is a String', () => {
            const dino = new Dinosaur({
                name: 'T-rex'
            });

            assert.strictEqual(dino.name, 'T-rex');
        });

        it('is required', () => {
            const dino = new Dinosaur({});

            const error = dino.validateSync();

            assert.equal(error.errors.name.message, 'Path `name` is required.');
            assert.equal(error.errors.name.kind, 'required');
        });
    });

    describe('#count', () => {
        it('is below 11 if risk is high', () => {
            const dino = new Dinosaur({
                name: 'T-rex',
                count: 11,
                risk: 'High'
            });

            dino.validateSync();

            assert.ok(dino.errors, 'model should be invalid');
            assert.equal(dino.errors.count.message, 'Cannot hold more than 10 dinosaurs.');
        });

        it('is valid with 10', () => {
            const dino = new Dinosaur({
                name: 'Triceratops',
                count: 10,
                risk: 'Low'
            });

            dino.validateSync();

            assert.isUndefined(dino.errors, 'model should be valid');
        });
    });

    describe('#risk', () => {
        it('is a String', () => {
            const dino = new Dinosaur({
                name: 'T-rex',
                risk: 'High'
            });

            assert.strictEqual(dino.risk, 'High');
        });
    });


    describe('#save', () => {
        it('persists a dino', async () => {
            const fields = {
                name: 'Velociraptor',
                count: 3,
                risk: 'High'
            };
            const dino = new Dinosaur(fields);

            await dino.save();
            const stored = await Dinosaur.findOne({ 'name': 'Velociraptor' });

            assert.include(stored, fields);
        });
    });

    describe('.findByName', () => {
        it('returns the first match on name', async () => {
            const fields = {
                name: 'Pterodactyl',
                count: 9,
                risk: 'Low'
            };
            const dino = new Dinosaur(fields);
            await dino.save();

            const stored = await Dinosaur.findByName('Pterodactyl');

            assert.include(stored, fields);
        });
    });

    describe('#breed', () => {
        it('increases count by 1', () => {
            const start = 3;
            const end = 4;
            const dino = new Dinosaur({
                name: 'Stegosaurus',
                count: start,
                risk: 'Low'
            });

            dino.breed();

            assert.strictEqual(dino.count, end);
        });
    });
});
