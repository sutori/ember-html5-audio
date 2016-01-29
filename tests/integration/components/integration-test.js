import { test, moduleForComponent } from 'ember-qunit';
import Ember from 'ember';
import startApp from '../../helpers/start-app';
import hbs from 'htmlbars-inline-precompile';
import sinon from 'sinon';

let App;

moduleForComponent('html5-audio', 'Component - Html5 audio - Integration', {
  integration: true,
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, App.destroy);
  }
});

test('Sets the src attribute', function(assert) {
  this.render(hbs`
    {{html5-audio
        src=src
    }}
  `);

  this.set('src', null);
  assert.equal(find('audio').attr('src'), '');

  this.set('src', undefined);
  assert.equal(find('audio').attr('src'), '');

  this.set('src', '');
  assert.equal(find('audio').attr('src'), '');

  this.set('src', 'https://www.audio.com/some-sound.mp3');
  assert.equal(find('audio').attr('src'), 'https://www.audio.com/some-sound.mp3');
});

test('Sends an action on the "durationchange" event', function(assert) {
  const durationChange = sinon.spy();
  this.on('durationChange', durationChange);
  this.render(hbs`
    {{html5-audio
        durationChange=(action 'durationChange')
    }}
  `);

  find('audio').trigger('durationchange');

  assert.ok(durationChange.called);
});

test('Sends an action on the "loadedmetadata" event', function(assert) {
  const loadedMetadata = sinon.spy();
  this.on('loadedMetadata', loadedMetadata);
  this.render(hbs`
    {{html5-audio
        loadedMetadata=(action 'loadedMetadata')
    }}
  `);

  find('audio').trigger('loadedmetadata');

  assert.ok(loadedMetadata.called);
});

test('Sends an action on the "ended" event', function(assert) {
  const ended = sinon.spy();
  this.on('ended', ended);
  this.render(hbs`
    {{html5-audio
        ended=(action 'ended')
    }}
  `);

  find('audio').trigger('ended');

  assert.ok(ended.called);
});

test('Sends an action on the "timeupdate" event', function(assert) {
  const timeUpdate = sinon.spy();
  this.on('timeUpdate', timeUpdate);
  this.render(hbs`
    {{html5-audio
        timeUpdate=(action 'timeUpdate')
    }}
  `);

  find('audio').trigger('timeupdate');

  assert.ok(timeUpdate.called);
});

test('Accepts the inbound "seek" action', function(assert) {
  this.render(hbs`
    {{html5-audio
        actionReceiver=html5Audio
    }}
  `);

  this.get('html5Audio').send('seek', 1234);

  assert.equal(find('audio')[0].currentTime, 1234);
});

test('Accepts the inbound "play" action', function(assert) {
  this.render(hbs`
    {{html5-audio
        actionReceiver=html5Audio
    }}
  `);

  const play = sinon.spy();
  find('audio')[0].play = play;

  this.get('html5Audio').send('play');

  assert.ok(play.called);
});

test('Accepts the inbound "pause" action', function(assert) {
  this.render(hbs`
    {{html5-audio
        actionReceiver=html5Audio
    }}
  `);

  const pause = sinon.spy();
  find('audio')[0].pause = pause;

  this.get('html5Audio').send('pause');

  assert.ok(pause.called);
});
