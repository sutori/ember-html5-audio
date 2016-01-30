# Ember-html5-audio

Ember.js addon that wraps an HTML5 audio (`<audio>`) element and "Emberizes" the events (`loadedmetadata`, `ended`, `durationchange`, etc...) that it sends.

## Installing

Install as an Ember-CLI addon:

    ember install ember-html5-audio

## Usage

    // templates/some-template.hbs
    {{html5-audio
        src="https://link-to-audio-file.ogg"
        durationChange=(action 'onDurationChange')
        loadedMetadata=(action 'onLoadedMetadata')
        ended=(action 'onEnded')
        timeUpdate=(action 'onTimeUpdate')
        actionReceiver=html5Audio
    }}

### Input
Arguments for the component:

* _src_

### Events
It implements some of the events for media elements (see https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events). Please fork and PR if you want to add more supported events.

* _durationChange_: sent on `durationchange` event (https://developer.mozilla.org/en-US/docs/Web/Events/durationchange)
* _loadedMetadata_: sent on `loadedmetadata` event (https://developer.mozilla.org/en-US/docs/Web/Events/loadedmetadata)
* _ended_: sent on `ended` event
* _timeUpdate_: sent on `timeupdate` event (https://developer.mozilla.org/en-US/docs/Web/Events/timeupdate)


### Actions
We allow actions to be sent to the audio element through the [ember-component-inbound-actions](https://github.com/GavinJoyce/ember-component-inbound-actions) addon. Supported actions:

* _play_
* _pause_
* _seek_

## Building yourself

* `git clone` this repository
* `npm install`
* `bower install`

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`
