import type { Question } from "$types";

export const readyCheck: Question = {
	text: "Let's see if you got the controls. \nAre you ready to start the quiz?",
	options: ["No", "No", "Yes", "No"],
	correctAnswerIndex: 2,
};

export const questions: Question[] = [
	{
		text: "<pre class='code'>true</pre> returns:",
		options: ["true", "false", "undefined", "null"],
		correctAnswerIndex: 0,
	},
	{
		text: `<pre class='code'>!true</pre> returns:`,
		options: ["true", "false", "undefined", "null"],
		correctAnswerIndex: 1,
	},
	{
		text: "<pre class='code'>!!true</pre> returns:",
		options: ["true", "false", "undefined", "null"],
		correctAnswerIndex: 0,
	},
	{
		text: "<pre class='code'>!![]</pre> returns:",
		options: ["'object'", "'[object Object]'", "false", "true"],
		correctAnswerIndex: 3,
	},
	{
		text: `<pre class='code'>![]</pre> returns:`,
		options: [`true`, `false`, `undefined`, `null`],
		correctAnswerIndex: 1,
	},
	{
		text: `<pre class='code'>![] == 0</pre> returns:`,
		options: [`false`, `true`, `undefined`, `null`],
		correctAnswerIndex: 1,
	},
	{
		text: `<pre class='code'>[] == 0</pre> returns:`,
		options: [`false`, `null`, `true`, `undefined`],
		correctAnswerIndex: 2,
	},
	{
		text: `<pre class='code'>0 == "0"</pre> returns:`,
		options: [`undefined`, `false`, `null`, `true`],
		correctAnswerIndex: 3,
	},
	{
		text: `<pre class='code'>"0" == []</pre> returns:`,
		options: [`false`, `true`, `null`, `undefined`],
		correctAnswerIndex: 0,
	},
	{
		text: `<pre class='code'>[] == []</pre> returns:`,
		options: [`true`, `false`, `null`, `undefined`],
		correctAnswerIndex: 1,
	},
	{
		text: `<pre class='code'>[] == false</pre> returns:`,
		options: [`false`, `null`, `true`, `undefined`],
		correctAnswerIndex: 2,
	},
	{
		text: `<pre class='code'>false == 0</pre> returns:`,
		options: [`null`, `true`, `false`, `undefined`],
		correctAnswerIndex: 1,
	},
	{
		text: `<pre class='code'>null == false</pre> returns:`,
		options: [`true`, `undefined`, `false`, `null`],
		correctAnswerIndex: 2,
	},
	{
		text: `<pre class='code'>typeof null</pre> returns:`,
		options: [`'null'`, `'undefined'`, `'object'`, `'number'`],
		correctAnswerIndex: 2,
	},
	{
		text: `<pre class='code'>null == undefined</pre> returns:`,
		options: [`false`, `null`, `true`, `undefined`],
		correctAnswerIndex: 2,
	},
	{
		text: `<pre class='code'>null instanceof Object</pre> returns:`,
		options: [`true`, `null`, `false`, `undefined`],
		correctAnswerIndex: 2,
	},
	{
		text: `<pre class='code'>"cat" instanceof String</pre> returns:`,
		options: [`undefined`, `true`, `false`, `null`],
		correctAnswerIndex: 2,
	},
	{
		text: `<pre class='code'>NaN === NaN</pre> returns:`,
		options: [`false`, `true`, `null`, `undefined`],
		correctAnswerIndex: 0,
	},
	{
		text: `<pre class='code'>typeof NaN</pre> returns:`,
		options: [`'undefined'`, `'object'`, `'NaN'`, `'number'`],
		correctAnswerIndex: 3,
	},
	{
		text: `<pre class='code'>0.1 + 0.2</pre> returns:`,
		options: [`0.3`, `0.30000000000000004`, `NaN`, `undefined`],
		correctAnswerIndex: 1,
	},
	{
		text: `<pre class='code'>9999999999999999</pre> returns:`,
		options: [`9999999999999999`, `10000000000000000`, `Infinity`, `NaN`],
		correctAnswerIndex: 1,
	},
	{
		text: `<pre class='code'>3 + ""</pre> returns:`,
		options: [`3`, `'3'`, `NaN`, `undefined`],
		correctAnswerIndex: 1,
	},
	{
		text: `<pre class='code'>3 + +''</pre> returns:`,
		options: [`'3'`, `NaN`, `3`, `0`],
		correctAnswerIndex: 2,
	},
	{
		text: `<pre class='code'>1 + ~"Morten"</pre> returns:`,
		options: [`1`, `-1`, `NaN`, `0`],
		correctAnswerIndex: 3,
	},
	{
		text: `<pre class='code'>
		const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].sort();
arr[2]
</pre> returns:`,
		options: ["2", "8", "3", "10"],
		correctAnswerIndex: 1,
	},

	{
		text: `<pre class='code'>"Athinodoros".replace(/o/, "X");</pre> returns:`,
		options: [`'AthinXdXrXs'`, `'AthinXdoros'`, `'XXXXXXXXXXX'`, `'AXXinXXXrXs'`],
		correctAnswerIndex: 1,
	},
	{
		text: `<pre class='code'>"3" + "2"</pre> returns:`,
		options: [`5`, `"32"`, `NaN`, `32`],
		correctAnswerIndex: 1,
	},
	{
		text: `<pre class='code'>"3" - "2"</pre> returns:`,
		options: [`"1"`, `"32"`, `NaN`, `1`],
		correctAnswerIndex: 3,
	},
	{
		text: `<pre class='code'>[] instanceof Array</pre> returns:`,
		options: [`false`, `null`, `true`, `undefined`],
		correctAnswerIndex: 2,
	},
	{
		text: `<pre class='code'>typeof []</pre> returns:`,
		options: [`'array'`, `'object'`, `'undefined'`, `'function'`],
		correctAnswerIndex: 1,
	},
	{
		text: `<pre class='code'>
let a = {};
let b = a;
a === b;
</pre> returns:`,
		options: [`false`, `null`, `true`, `undefined`],
		correctAnswerIndex: 2,
	},
	{
		text: `<pre class='code'>
let a = {};
let b = a;
a = {};
a === b;
</pre> returns:`,
		options: [`true`, `false`, `null`, `undefined`],
		correctAnswerIndex: 1,
	},
	{
		text: `<pre class='code'>
let a = {};
let b = JSON.parse(JSON.stringify(a));
a === b;
</pre> returns:`,
		options: [`false`, `true`, `null`, `undefined`],
		correctAnswerIndex: 0,
	},
	{
		text: `<pre class='code'>Math.max();</pre> returns:`,
		options: [`Infinity`, `0`, `-Infinity`, `NaN`],
		correctAnswerIndex: 2,
	},
	{
		text: `<pre class='code'>typeof Number(123)</pre> returns:`,
		options: [`"object"`, `"Number"`, `"number"`, `123`],
		correctAnswerIndex: 2,
	},
	{
		text: `<pre class='code'>typeof new Number("123"); </pre> returns:`,
		options: [`"number"`, `"object"`, `"Number"`, `123`],
		correctAnswerIndex: 1,
	},
	{
		text: `<pre class='code'>typeof Number("Roxhers");</pre> returns:`,
		options: [`"string"`, `"undefined"`, `"number"`, `"NaN"`],
		correctAnswerIndex: 2,
	},
	{
		text: `<pre class='code'>Number("Klara")</pre> returns:`,
		options: [`0`, `null`, `NaN`, `undefined`],
		correctAnswerIndex: 2,
	},
	{
		text: `<pre class='code'>
const Dev = function(name) {
    this.name = name || "Sameda";
}
const dev = Dev("Rando");
</pre> returns:`,
		options: [`dev.name === "Rando"`, `window.name === "Rando"`, `Dev.name === "Sameda"`, `this.name === Dev.name`],
		correctAnswerIndex: 1,
	},
	{
		text: `<pre class='code'>
const a = 0 * -1;
const b = 0 * 1;
a === b
</pre> returns:`,
		options: [`false`, `null`, `true`, `undefined`],
		correctAnswerIndex: 2,
	},
	{
		text: `<pre class='code'>
const a = 0 * -1;
1/a
</pre> returns:`,
		options: ["Infinity", "0", "-Infinity", "NaN"],
		correctAnswerIndex: 2,
	},

	{
		text: `<pre class='code'>
for(var i=0; i<10; i++) {
    i = 23
}
var i;
i
</pre> returns:`,
		options: ["0", "23", "24", "-23"],
		correctAnswerIndex: 2,
	},
	{
		text: `<pre class='code'>
var x = 3;
(() => {
    console.log(x);
    var x;
})()
</pre> returns:`,
		options: [`3`, `null`, `undefined`, `ReferenceError`],
		correctAnswerIndex: 2,
	},
	{
		text: `<pre class='code'>
(() => {
	var aaaa = bbbb = 4
})()
</pre> returns:`,
		options: [
			"Uncaught ReferenceError: aaaa is not defined",
			"Uncaught ReferenceError: bbbb is not defined",
			"4",
			"undefined",
		],
		correctAnswerIndex: 2,
	},
	{
		text: `<pre class='code'>
undefined = 2
undefined + 1
</pre> returns:`,
		options: [
			"3",
			"NaN",
			"Uncaught SyntaxError: Invalid left - hand side in assignment",
			"Uncaught ReferenceError: undefined is not defined",
		],
		correctAnswerIndex: 0,
	},
	{
		text: `<pre class='code'>
(
	function(a) {
    	a = "Jasmina";
    	return arguments[0];
	}
)(1)
</pre> returns:`,
		options: ["undefined", "1", '"Jasmina"', "Uncaught ReferenceError: arguments is not defined"],
		correctAnswerIndex: 2,
	},
	{
		text: `<pre class='code'>[] + {}</pre> returns:`,
		options: [`'[object Object]'`, `'{}'`, `'[]'`, `NaN`],
		correctAnswerIndex: 0,
	},
	{
		text: `<pre class='code'>{} + []</pre> returns:`,
		options: [`'[object Object]'`, `0`, `NaN`, `'[]'`],
		correctAnswerIndex: 1,
	},
	{
		text: `<pre class='code'>{} + {}</pre> returns:`,
		options: [`'[object Object][object Object]'`, `NaN`, `0`, `'[object Object]'`],
		correctAnswerIndex: 1,
	},
	{
		text: `<pre class='code'>[] + []</pre> returns:`,
		options: [`'[][]'`, `""`, `0`, `NaN`],
		correctAnswerIndex: 1,
	},
	{
		text: `<pre class='code'>"b" + "a" + +"a" + "a"</pre> returns:`,
		options: [`'baaa'`, `'baNaNa'`, `'banana'`, `NaN`],
		correctAnswerIndex: 1,
	},
	{
		text: `<pre class='code'>[1, 2] + [3, 4, 5]</pre> returns:`,
		options: [`'1,2,3,4,5'`, `'1,23,4,5'`, `NaN`, `[1,2,3,4,5]`],
		correctAnswerIndex: 1,
	},
	{
		text: `<pre class='code'>+true</pre> returns:`,
		options: [`true`, `1`, `0`, `NaN`],
		correctAnswerIndex: 1,
	},
	{
		text: `<pre class='code'>true + true</pre> returns:`,
		options: [`'truetrue'`, `1`, `2`, `true`],
		correctAnswerIndex: 2,
	},
	{
		text: `<pre class='code'>+(+true + \`${+false}\`)</pre> returns:`,
		options: [`1`, `10`, `'10'`, `NaN`],
		correctAnswerIndex: 1,
	},
	{
		text: `<pre class='code'>2 < 3 > 1</pre> returns:`,
		options: [`true`, `false`, `null`, `undefined`],
		correctAnswerIndex: 1,
	},
	{
		text: `<pre class='code'>2 < 3 >= 1</pre> returns:`,
		options: [`false`, `true`, `null`, `undefined`],
		correctAnswerIndex: 1,
	},
	{
		text: `<pre class='code'>2..toFixed(2)</pre> returns:`,
		options: [
			"Uncaught SyntaxError: Unexpected token '.'",
			"2.00",
			"Uncaught TypeError: undefined.toFixed is not a function",
			"Uncaught SyntaxError: Unexpected number",
		],
		correctAnswerIndex: 1,
	},
	{
		text: `<pre class='code'>(()=> { return ("False",false,+5,"Henrik")})()</pre> returns:`,
		options: ["Falsefalse5Henrik", "false", "Henrik", "5"],
		correctAnswerIndex: 2,
	},
	{
		text: `<pre class='code'>parseInt(0.0000008, 10)</pre> returns:`,
		options: ["1", "8", "0", "10"],
		correctAnswerIndex: 2,
	},
	{
		text: `<pre class='code'>parseInt("one", 16);</pre> returns:`,
		options: ["NaN", "1", "0", "15"],
		correctAnswerIndex: 3,
	},
	{
		text: `<pre class='code'>parseInt("bruh...", 16);</pre> returns:`,
		options: ["NaN", "11", "0", "178"],
		correctAnswerIndex: 1,
	},
	{
		text: `<pre class='code'>parseInt(1/"Infinity"+2_000_000_000_000_000_000_000)</pre> returns:`,
		options: ["2", "NaN", "Infinity", "2000000000000000000000"],
		correctAnswerIndex: 1,
	},
	{
		text: `<pre class='code'>
const returnArgsArray = (...a) => a;
returnArgsArray\`it's${" not "} going to work\`[0].join("").toString()
</pre> returns:`,
		options: ["it's not going to work", "i", "it's going to work", "n"],
		correctAnswerIndex: 1,
	},

	{
		text: `<pre class='code'>
(() => {
	try {
		return 1;
	} catch (err) {
		return 2;
	} finally {
		return 3;
	}
	return 4;
})()
</pre> returns:`,
		options: ["1", "2", "3", "4"],
		correctAnswerIndex: 0,
	},
	{
		text: `<pre class='code'>
function wtf({ x = 32 } = {}) {
	console.log(x);
}
// which of the following does not return 32?
</pre> returns:`,
		options: [`wtf()`, `wtf(undefined)`, `wtf(null)`, `wtf(+"thirty two")`],
		correctAnswerIndex: 2,
	},
	{
		text: `<pre class='code'>[...[...[...[...'...']]]].length</pre> returns:`,
		options: [`4`, `3`, `5`, `NaN`],
		correctAnswerIndex: 1,
	},
	{
		text: `<pre class='code'>typeof a === [][+[]] + []</pre> returns:`,
		options: [`false`, `true`, `null`, `undefined`],
		correctAnswerIndex: 1,
	},
	{
		text: `<pre class='code'>! + [] + !+[]</pre> returns:`,
		options: [`1`, `2`, `true`, `false`],
		correctAnswerIndex: 1,
	},
	{
		text: `which one of the following is true?</pre> returns:`,
		options: ["null > 0", "null == 0", "null >= 0", "null === 0"],
		correctAnswerIndex: 0,
	},
	{
		text: `which one returns "copenhagenJS"?`,
		options: [
			`{"foo"}{copenhagenJS: 'bar'}{}`,
			`{"foo"}{bar: "copenhagenJS"}{}`,
			`{}{copenhagenJs: "copenhagenJs"}{"foo"}`,
			`{"copenhagenJs"}{copenhagenJs: "copenhagenJs"; copenhagenJs: "copenhagenJs"}{"bar"}`,
		],
		correctAnswerIndex: 1,
	},

	{
		text: `<pre class='code'>
new (
	class {
		[""] = []
		["it"] = ["returned"]
		["somtehing?"] = ["?"]
		[{}] = [[]]
		[null] = [undefined]
		[3] = "WTF"
	}
)
()[""]
</pre> returns:`,
		options: [`undefined`, `"WTF"`, `[]`, `null`],
		correctAnswerIndex: 2,
	},
	{
		text: `<pre class='code'>("b" + "a" + + "a" + "a").toLowerCase();</pre> returns:`,
		options: [`'baNaNa'`, `banana`, `'baaa'`, `'baan'`],
		correctAnswerIndex: 1,
	},
	{
		text: `<pre class='code'>12345678912345678 + 1</pre> returns:`,
		options: [`12345678912345679`, `12345678912345680`, `Infinity`, `12345678912345678`],
		correctAnswerIndex: 1,
	},
	{
		text: `<pre class='code'>2 + "2" + 2</pre> returns:`,
		options: [`6`, `'222'`, `'22'`, `222`],
		correctAnswerIndex: 1,
	},
	{
		text: `<pre class='code'>2 + "2" - 2</pre> returns:`,
		options: [`2`, `20`, `'20'`, `18`],
		correctAnswerIndex: 1,
	},
	{
		text: `<pre class='code'>(+(!+[]+!+[]+!+[]+[!+[]+!+[]]))[(!![]+[])[+[]]+(!![]+[][(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([]+[])[([][(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]][([][[]]+[])[+!+[]]+(![]+[])[+!+[]]+((+[])[([][(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]+[])[+!+[]+[+!+[]]]+(!![]+[])[!+[]+!+[]+!+[]]]](!+[]+!+[]+!+[]+[!+[]+!+[]+!+[]])+(!![]+[])[+[]]+(![]+[])[+[]]</pre> returns:`,
		options: [`undefined`, `wtf`, `'wtf'`, `NaN`],
		correctAnswerIndex: 1,
	},
];
