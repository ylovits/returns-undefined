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

<svg style="position: fixed;">
	<filter id="pixelate-mosaic" x="0%" y="0%" width="100%" height="100%">
		<feGaussianBlur stdDeviation="1" in="SourceGraphic" result="smoothed" />
		<feImage width="6" height="6" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAIAAAACDbGyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAWSURBVAgdY1ywgOEDAwKxgJhIgFQ+AP/vCNK2s+8LAAAAAElFTkSuQmCC" result="displacement-map" />
		<feTile in="displacement-map" result="pixelate-map" />
		<feDisplacementMap in="smoothed" in2="pixelate-map" xChannelSelector="R" yChannelSelector="G" scale="20" result="pre-final" />
		<feComposite operator="in" in2="SourceGraphic" />
	</filter>
	<filter id="pixelate-mosaic-medium" x="0%" y="0%" width="100%" height="100%">
		<feGaussianBlur stdDeviation="0.75" in="SourceGraphic" result="smoothed" />
		<feImage width="4.5" height="4.5" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAIAAAACDbGyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAWSURBVAgdY1ywgOEDAwKxgJhIgFQ+AP/vCNK2s+8LAAAAAElFTkSuQmCC" result="displacement-map" />
		<feTile in="displacement-map" result="pixelate-map" />
		<feDisplacementMap in="smoothed" in2="pixelate-map"
		xChannelSelector="R" yChannelSelector="G" scale="13.3" result="pre-final" />
		<feComposite operator="in" in2="SourceGraphic" />
	</filter>
	<filter id="pixelate-mosaic-small" x="0%" y="0%" width="100%" height="100%">
		<feGaussianBlur stdDeviation="0.5" in="SourceGraphic" result="smoothed" />
		<feImage width="3" height="3" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAIAAAACDbGyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAWSURBVAgdY1ywgOEDAwKxgJhIgFQ+AP/vCNK2s+8LAAAAAElFTkSuQmCC" result="displacement-map" />
		<feTile in="displacement-map" result="pixelate-map" />
		<feDisplacementMap in="smoothed" in2="pixelate-map" 
		xChannelSelector="R" yChannelSelector="G" scale="10" result="pre-final" />
		<feComposite operator="in" in2="SourceGraphic" />
	</filter>
	<filter id="pixelate" x="0" y="0">
		<feFlood x="4" y="4" height="2" width="2" />
		<feComposite width="10" height="10" />
		<feTile result="a" />
		<feComposite in="SourceGraphic" in2="a" operator="in" />
		<feMorphology operator="dilate" radius="5" />
	</filter>
	<filter id="pixelate-medium" x="0" y="0">
		<feFlood x="2" y="2" height="1" width="1" />
		<feComposite width="5" height="5" />
		<feTile result="a" />
		<feComposite in="SourceGraphic" in2="a" operator="in" />
		<feMorphology operator="dilate" radius="2.5" />
	</filter>
	<filter id="pixelate-small" x="0" y="0">
		<feFlood x="1" y="1" height="0.5" width="0.5" />
		<feComposite width="2.5" height="2.5" />
		<feTile result="a" />
		<feComposite in="SourceGraphic" in2="a" operator="in" />
		<feMorphology operator="dilate" radius="1.25" />
	</filter>
	<filter id="pixelate-text">
		<feFlood height="2" width="2" />
		<feComposite width="5" height="5" />
		<feTile result="a" />
		<feComposite in="SourceGraphic" in2="a" operator="in" />
		<feMorphology operator="dilate" radius="1" />
	</filter>
	<filter id="pixelate-text-small">
		<feFlood height="3" width="3" />
		<feComposite width="5" height="5" />
		<feTile result="a" />
		<feComposite in="SourceGraphic" in2="a" operator="in" />
		<feMorphology operator="dilate" radius="2" />
	</filter>
</svg>