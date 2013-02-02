WaveSynth
=========

A super-simple tone generator that lets you choose the number and loudness of its overtones.

###Creating an instance

```javascript
var ctx = new webkitAudioContext;
var partials = [1, 0.6, 0.3, 0.5, 0.2, 0.4];

var tone = new WaveSynth(ctx, partials);
```

The WaveSynth class has two required parameters:

1. The AudioContext in which to generate the sound.
2. An array of partials, with each value in the array representing the relative amplitude (from 0 to 1) of the n-th overtone, where n is the index of the value in the array. Overtone 0 represents the fundamental tone. For example:

```javascript
//a fundamental tone and its first overtone, with the overtone at 60% amplitude
var partials = [1, 0.6];

//this is equivalent, because the total amplitude of the waveform is normalized
partials = [0.5, 0.3];
```




