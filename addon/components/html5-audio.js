import Ember from 'ember';
import InboundActions from 'ember-component-inbound-actions/inbound-actions';

/*
 * Wraps an HTML5 audio element.
 *
 * Input:
 * - src: the source of the audio file.
 *
 * Events (see https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events):
 * - durationChange: sent on `durationchange` event (https://developer.mozilla.org/en-US/docs/Web/Events/durationchange)
 * - loadedMetadata: sent on `loadedmetadata` event (https://developer.mozilla.org/en-US/docs/Web/Events/loadedmetadata)
 * - ended: sent on `ended` event
 * - timeUpdate: sent on `timeupdate` event (https://developer.mozilla.org/en-US/docs/Web/Events/timeupdate)
 *
 * Actions:
 * - play
 * - pause
 * - seek
 *
 */
export default Ember.Component.extend(InboundActions, {
  tagName: 'audio',
  attributeBindings: ['cleanSrc:src'],

  /* Properties */
  // Clean out `undefined` and `null` values for the source
  cleanSrc: Ember.computed('src', function() {
    return this.get('src') || '';
  }),

  /* Hooks */
  didInsertElement: function() {
    const $audio = this.$();

    $audio.on('durationchange', () => {
      Ember.run(() => {
        this.sendAction('durationChange', $audio[0].duration);
      });
    });

    $audio.on('loadedmetadata', () => {
      Ember.run(() => {
        this.sendAction('loadedMetadata');
      });
    });

    $audio.on('ended', () => {
      Ember.run(() => {
        this.sendAction('ended');
      });
    });

    $audio.on('timeupdate', () => {
      Ember.run(() => {
        this.sendAction('timeUpdate', $audio[0].currentTime);
      });
    });
  },
  willDestroyElement: function() {
    // Remove all event listeners
    this.$().off('durationchange loadedmetadata ended timeupdate');
  },

  /* Actions */
  actions: {
    play: function() {
      this.$()[0].play();
    },
    pause: function() {
      this.$()[0].pause();
    },
    seek: function(position) {
      this.$()[0].currentTime = position;
    }
  }
});
