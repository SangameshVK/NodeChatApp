var expect = require('expect');

var {generateMessage} = require('./message');

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