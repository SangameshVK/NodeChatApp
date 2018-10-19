var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('GenerateMessage', () => {
    it('should generate correct message object', () => {
        var text = 'Hello';
        var from = 'Money';
        var res = generateMessage(from, text);
        // expect(res.from).toBe(from);
        // expect(res.text).toBe(text);
        expect(res.createdAt).toBeA('number');
        expect(res).toInclude({from, text});
    });
});

describe('generatelocationmessage', () => {
    it('should generate correct location object', () => {
        var latitude = 1234;
        var longitude = 5678;
        var from = 'Admin'
        var url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        var locMessage = generateLocationMessage(from, latitude, longitude);
        expect(locMessage.createdAt).toBeA('number');
        expect(locMessage).toInclude({from, url});
    });
});