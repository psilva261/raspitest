var gpio = require('gpio');
var xmpp = require('node-xmpp-client');

var client = new xmpp.Client({ jid: 'raspitest@jabber.de', password: 'secret' });
var on = 0;

var gpio15 = gpio.export(15, { direction: 'out' });

client.on('online', function() {
  console.log('Connected.');
  client.send(new xmpp.Client.Stanza('presence'));
});

client.on('stanza', function(stanza) {
  if (stanza.is('message')) {
    on = on ? 0 : 1;
    console.log('switch 15 to ' + on);
    gpio15.set(on);
  }
});

client.on('error', function(foo) {
	console.log('err')
});

