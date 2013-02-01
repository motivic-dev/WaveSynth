WaveSynth = function(partials){
  var ctx = new webkitAudioContext;
	this.context = ctx;
	var wtLength = partials.length + 1;
	var real = new Float32Array(wtLength);
	var imag = new Float32Array(wtLength);

	for (var i = 1; i < partials.length + 1; i++) {
		imag[i] = partials[i-1];
	}
	var wt = ctx.createWaveTable(real,imag);
	var osc = ctx.createOscillator();
	osc.setWaveTable(wt);
	osc.noteOn(0);

	this.real = real;
	this.imag = imag;
	this.oscillator = osc;
	this.wavetable_length = wtLength;
	this.partials = partials;
	this.frequency = 440;
}

WaveSynth.prototype.play = function() {
	this.oscillator.connect(this.context.destination);
}

WaveSynth.prototype.pause = function() {
	this.oscillator.disconnect();
}

WaveSynth.prototype.addPartial = function(amplitude) {
	this.wavetable_length += 1;
	var real = new Float32Array(this.wavetable_length);
	var imaginaries = [];
	for (var i = 0; i < this.imag.length; i++) {
		imaginaries.push(this.imag[i]);
	}
	imaginaries.push(amplitude);
	var imag = new Float32Array(imaginaries);

	this.real = real;
	this.imag = imag;

	var wt = this.context.createWaveTable(real,imag);
	this.oscillator.setWaveTable(wt);
	this.partials.push(amplitude);
}

WaveSynth.prototype.removePartial = function() {
	this.wavetable_length -= 1;
	var real = new Float32Array(this.wavetable_length);
	var imaginaries = [];
	for (var i = 0; i < this.imag.length - 1; i++) {
		imaginaries.push(this.imag[i]);
	}
	var imag = new Float32Array(imaginaries);

	this.real = real;
	this.imag = imag;

	var wt = this.context.createWaveTable(real,imag);
	this.oscillator.setWaveTable(wt);
	this.partials.pop();
}

WaveSynth.prototype.setPartial = function(partial, amplitude) {
	if(partial < this.wavetable_length -1) {
		this.imag[partial + 1] = amplitude;
		var wt = this.context.createWaveTable(this.real,this.imag);
		this.oscillator.setWaveTable(wt);
		this.partials[partial] = amplitude;
	} 
}

WaveSynth.prototype.setFrequency = function(frequency) {
	this.oscillator.frequency.value = frequency;
	this.frequency = frequency;
}
