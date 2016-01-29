import Ember from 'ember';
import InboundActions from 'ember-component-inbound-actions/inbound-actions';

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
    seek: function(position) {
      this.$()[0].currentTime = position;
    },
    play: function() {
      this.$()[0].play();
    },
    pause: function() {
      this.$()[0].pause();
    }
  }
});
