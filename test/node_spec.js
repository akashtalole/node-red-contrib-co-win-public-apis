var should = require('should');
var helper = require('node-red-node-test-helper');
var node = require('../node.js');

helper.init(require.resolve('node-red'));

describe('co-win-public-apis node', function () {

    before(function (done) {
        helper.startServer(done);
    });

    after(function (done) {
        helper.stopServer(done);
    });

    afterEach(function () {
        helper.unload();
    });

    it('should be loaded', function (done) {
        var flow = [{ id: 'n1', type: 'co-win-public-apis', name: 'co-win-public-apis' }];
        helper.load(node, flow, function () {
            var n1 = helper.getNode('n1');
            n1.should.have.property('name', 'co-win-public-apis');
            done();
        });
    });

    it('should handle generateOTP()', function (done) {
        var flow = [
            { id: 'n1', type: 'co-win-public-apis', name: 'co-win-public-apis',
                method: 'generateOTP',
                generateOTP_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'co-win-public-apis-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle confirmOTP()', function (done) {
        var flow = [
            { id: 'n1', type: 'co-win-public-apis', name: 'co-win-public-apis',
                method: 'confirmOTP',
                confirmOTP_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'co-win-public-apis-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle states()', function (done) {
        var flow = [
            { id: 'n1', type: 'co-win-public-apis', name: 'co-win-public-apis',
                method: 'states',
                states_acceptLanguage: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'co-win-public-apis-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle districts()', function (done) {
        var flow = [
            { id: 'n1', type: 'co-win-public-apis', name: 'co-win-public-apis',
                method: 'districts',
                districts_acceptLanguage: '<node property>', // (1) define node properties
                districts_stateId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'co-win-public-apis-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle findByPin()', function (done) {
        var flow = [
            { id: 'n1', type: 'co-win-public-apis', name: 'co-win-public-apis',
                method: 'findByPin',
                findByPin_acceptLanguage: '<node property>', // (1) define node properties
                findByPin_pincode: '<node property>', // (1) define node properties
                findByPin_date: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'co-win-public-apis-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle findByDistrict()', function (done) {
        var flow = [
            { id: 'n1', type: 'co-win-public-apis', name: 'co-win-public-apis',
                method: 'findByDistrict',
                findByDistrict_acceptLanguage: '<node property>', // (1) define node properties
                findByDistrict_districtId: '<node property>', // (1) define node properties
                findByDistrict_date: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'co-win-public-apis-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle findByLatLong()', function (done) {
        var flow = [
            { id: 'n1', type: 'co-win-public-apis', name: 'co-win-public-apis',
                method: 'findByLatLong',
                findByLatLong_acceptLanguage: '<node property>', // (1) define node properties
                findByLatLong_lat: '<node property>', // (1) define node properties
                findByLatLong_long: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'co-win-public-apis-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle calendarByPin()', function (done) {
        var flow = [
            { id: 'n1', type: 'co-win-public-apis', name: 'co-win-public-apis',
                method: 'calendarByPin',
                calendarByPin_acceptLanguage: '<node property>', // (1) define node properties
                calendarByPin_pincode: '<node property>', // (1) define node properties
                calendarByPin_date: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'co-win-public-apis-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle calendarByDistrict()', function (done) {
        var flow = [
            { id: 'n1', type: 'co-win-public-apis', name: 'co-win-public-apis',
                method: 'calendarByDistrict',
                calendarByDistrict_acceptLanguage: '<node property>', // (1) define node properties
                calendarByDistrict_districtId: '<node property>', // (1) define node properties
                calendarByDistrict_date: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'co-win-public-apis-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle calendarByCenter()', function (done) {
        var flow = [
            { id: 'n1', type: 'co-win-public-apis', name: 'co-win-public-apis',
                method: 'calendarByCenter',
                calendarByCenter_acceptLanguage: '<node property>', // (1) define node properties
                calendarByCenter_centerId: '<node property>', // (1) define node properties
                calendarByCenter_date: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'co-win-public-apis-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle download()', function (done) {
        var flow = [
            { id: 'n1', type: 'co-win-public-apis', name: 'co-win-public-apis',
                method: 'download',
                download_beneficiaryReferenceId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'co-win-public-apis-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
});
