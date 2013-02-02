WaveSynth
=========

A sine-wave tone generator that lets you choose the number and loudness of its overtones.

Built with JavaScript using the [Web Audio API](http://www.w3.org/TR/webaudio/)

Check out the [demo](http://motivic-dev.com/wavesynth/demo.html).

##Creating an instance

```javascript
var ctx = new webkitAudioContext;
var partials = [1, 0.6, 0.3, 0.5, 0.2, 0.4];

var tone = new WaveSynth(ctx, partials);
```

The WaveSynth class has two required parameters:

1. The AudioContext in which to generate the sound.
2. An array of partials, with each value in the array representing the relative amplitude (from 0 to 1) of the n-th overtone, where n is the index of the value in the array. Overtone 0 represents the fundamental tone. For example:

```javascript
//just the fundamental tone, will produce a pure sine tone
var partials = [1];

//a fundamental tone and its first overtone, with the overtone at 60% amplitude
partials = [1, 0.6];

//this is equivalent, because the total amplitude of the waveform is normalized
partials = [0.5, 0.3];
```

##Working with an instance

assuming 'tone' is the instance created above

####Making sound happen
```
tone.play();
```
####Making sound stop happening
```
tone.pause();
```

####Altering the pitch

```javascript
tone.setFrequency(220); //set the frequency in Hz, default is 440
```

####Altering the tone-quality
```javascript
tone.addPartial(0.6); //add the next highest overtone, set its amplitude to 0.6

tone.removePartial(); //remove the highest overtone

tone.setPartial(2, 0.4); //set the amplitude of the 2nd overtone to 0.4
```




