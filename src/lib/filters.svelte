<filter id="svgGlow">
	<feGaussianBlur id="glowSvgRes" in="SourceGraphic" stdDeviation="5" result="glowSvgBlur" />
	<feColorMatrix type="saturate" in="glowSvgBlur" values="2" result="glowSvgSat" />
	<feBlend id="glowSvgResBlend" in="SourceGraphic" in2="glowSvgSat" />
</filter>

<filter id="dead" x="0%" y="0%" width="100%" height="100%">
	<feTurbulence baseFrequency="0.2 0.2" result="NOISE" numOctaves="2" />
	<feDisplacementMap
		in="SourceGraphic"
		in2="NOISE"
		result="distorted"
		scale="20"
		xChannelSelector="R"
		yChannelSelector="R"
	></feDisplacementMap>
	<feColorMatrix in="distorted" type="saturate" values="0" />
</filter>