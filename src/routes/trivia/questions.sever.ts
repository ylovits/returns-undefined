import type { Question } from "$types";

export const readyCheck: Question = {
	text: "Let's see if you got the controls. \nAre you ready to start the quiz?",
	options: ["No", "Yes"],
	correctAnswerIndex: 1,
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
	{ text: `<pre class='code'>![]</pre> returns:`, options: [`false`], correctAnswerIndex: 0 },
	{ text: `<pre class='code'>![] == 0</pre> returns:`, options: [`true`], correctAnswerIndex: 0 },
	{ text: `<pre class='code'>[] == 0</pre> returns:`, options: [`true`], correctAnswerIndex: 0 },
	{ text: `<pre class='code'>0 == "0"</pre> returns:`, options: [`true`], correctAnswerIndex: 0 },
	{ text: `<pre class='code'>"0" == []</pre> returns:`, options: [`false`], correctAnswerIndex: 0 },
	{ text: `<pre class='code'>[] == []</pre> returns:`, options: [`false`], correctAnswerIndex: 0 },
	{ text: `<pre class='code'>[] == false</pre> returns:`, options: [`true`], correctAnswerIndex: 0 },
	{ text: `<pre class='code'>false == 0</pre> returns:`, options: [`true`], correctAnswerIndex: 0 },
	{ text: `<pre class='code'>null == false</pre> returns:`, options: [`false`], correctAnswerIndex: 0 },
	{ text: `<pre class='code'>typeof null</pre> returns:`, options: [`'object'`], correctAnswerIndex: 0 },
	{ text: `<pre class='code'>null == undefined</pre> returns:`, options: [`true`], correctAnswerIndex: 0 },
	{ text: `<pre class='code'>null instanceof Object</pre> returns:`, options: [`false`], correctAnswerIndex: 0 },
	{ text: `<pre class='code'>Paul instanceof String</pre> returns:`, options: [`false`], correctAnswerIndex: 0 },
	{ text: `<pre class='code'>NaN === NaN</pre> returns:`, options: [`false`], correctAnswerIndex: 0 },
	{ text: `<pre class='code'>typeof NaN</pre> returns:`, options: [`'number'`], correctAnswerIndex: 0 },
	{ text: `<pre class='code'>0.1 + 0.2</pre> returns:`, options: [`0.30000000000000004`], correctAnswerIndex: 0 },
	{ text: `<pre class='code'>9999999999999999</pre> returns:`, options: [`10000000000000000`], correctAnswerIndex: 0 },
	{ text: `<pre class='code'>3 + ''</pre> returns:`, options: [`'3'`], correctAnswerIndex: 0 },
	{ text: `<pre class='code'>3 + +''</pre> returns:`, options: [`3`], correctAnswerIndex: 0 },
	{ text: `<pre class='code'>1 + ~"Morten"</pre> returns:`, options: [`0`], correctAnswerIndex: 0 },
	{
		text: `<pre class='code'>
		const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].sort();
arr[2]
</pre> returns:`,
		options: ["8", "2", "3", "10"],
		correctAnswerIndex: 0,
	},

	{
		text: `<pre class='code'>"Athinodoros".replace(/o/, "X");</pre> returns:`,
		options: [`'AthinXdoros' // Not 'AthinXdXrXs' neither 'XXXXXXXXXXX'`],
		correctAnswerIndex: 0,
	},
	{ text: `<pre class='code'>"3" + "2"</pre> returns:`, options: [`"32"`], correctAnswerIndex: 0 },
	{ text: `<pre class='code'>"3" - "2"</pre> returns:`, options: [`1`], correctAnswerIndex: 0 },
	{ text: `<pre class='code'>[] instanceof Array</pre> returns:`, options: [`true`], correctAnswerIndex: 0 },
	{ text: `<pre class='code'>typeof []</pre> returns:`, options: [`'object'`], correctAnswerIndex: 0 },
	{
		text: `<pre class='code'>
let a = {};
let b = a;
a === b;
</pre> returns:`,
		options: [`true`],
		correctAnswerIndex: 0,
	},
	{
		text: `<pre class='code'>
let a = {};
let b = a;
a = {};
a === b;
</pre> returns:`,
		options: [`false`],
		correctAnswerIndex: 0,
	},
	{
		text: `<pre class='code'>
let a = {};
let b = JSON.parse(JSON.stringify(a));
a === b;
</pre> returns:`,
		options: [`false`],
		correctAnswerIndex: 0,
	},
	{ text: `<pre class='code'>Math.max();</pre> returns:`, options: [`-Infinity`], correctAnswerIndex: 0 },
	{ text: `<pre class='code'>typeof Number(123)</pre> returns:`, options: [`"number"`], correctAnswerIndex: 0 },
	{ text: `<pre class='code'>typeof new Number("123"); </pre> returns:`, options: [`"object"`], correctAnswerIndex: 0 },
	{ text: `<pre class='code'>typeof Number("Roxhers");</pre> returns:`, options: [`"number"`], correctAnswerIndex: 0 },
	{ text: `<pre class='code'>Number("Klara")</pre> returns:`, options: [`NaN`], correctAnswerIndex: 0 },
	{
		text: `<pre class='code'>
const Dev = function(name) {
    this.name = name || "Sameda";
}
const dev = Dev("Rando");
</pre> returns:`,
		options: [`dev.name === "Rando"`, `window.name === "Rando"`, `Dev.name === "Sameda"`, `this.name === Dev.name`],
		correctAnswerIndex: 0,
	},
	{
		text: `<pre class='code'>
const a = 0 * -1;
const b = 0 * 1;
a === b
</pre> returns:`,
		options: [`true`],
		correctAnswerIndex: 0,
	},
	{
		text: `<pre class='code'>
const a = 0 * -1;
1/a
</pre> returns:`,
		options: ["Infinity", "0", "-Infinity", "Uncaught SyntaxError: Illegal return statement", "false"],
		correctAnswerIndex: 0,
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
		correctAnswerIndex: 0,
	},
	{
		text: `<pre class='code'>
var x = 3;
(() => {
    console.log(x);
    var x;
})()
</pre> returns:`,
		options: [`undefined`],
		correctAnswerIndex: 0,
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
			"true",
			"false",
		],
		correctAnswerIndex: 0,
	},
	{
		text: `<pre class='code'>
undefined = 2
undefined + 1
</pre> returns:`,
		options: [
			"Uncaught SyntaxError: Invalid left - hand side in assignment",
			"Uncaught ReferenceError: undefined is not defined",
			"NaN",
			"Uncaught SyntaxError: Identifier 'undefined' has already been declared",
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
		options: ["Uncaught ReferenceError: arguments is not defined", "undefined", "1", '"Jasmina"'],
		correctAnswerIndex: 0,
	},
	{ text: `<pre class='code'>[] + {}</pre> returns:`, options: [`'[object Object]'`], correctAnswerIndex: 0 },
	{ text: `<pre class='code'>{} + []</pre> returns:`, options: [`0`], correctAnswerIndex: 0 },
	{ text: `<pre class='code'>{} + {}</pre> returns:`, options: [`NaN`], correctAnswerIndex: 0 },
	{ text: `<pre class='code'>[] + []</pre> returns:`, options: [`""`], correctAnswerIndex: 0 },
	{ text: `<pre class='code'>"b" + "a" + +"a" + "a"</pre> returns:`, options: [`'baNaNa'`], correctAnswerIndex: 0 },
	{ text: `<pre class='code'>[1, 2] + [3, 4, 5]</pre> returns:`, options: [`'1,23,4,5'`], correctAnswerIndex: 0 },
	{ text: `<pre class='code'>+true</pre> returns:`, options: [`1`], correctAnswerIndex: 0 },
	{ text: `<pre class='code'>true + true</pre> returns:`, options: [`2`], correctAnswerIndex: 0 },
	{ text: `<pre class='code'>+(+true + \`${+false}\`)</pre> returns:`, options: [`10`], correctAnswerIndex: 0 },
	{ text: `<pre class='code'>2 < 3 > 1</pre> returns:`, options: [`false`], correctAnswerIndex: 0 },
	{ text: `<pre class='code'>2 < 3 >= 1</pre> returns:`, options: [`true`], correctAnswerIndex: 0 },
	{
		text: `2..toFixed(2)</pre> returns:`,
		options: [
			"Uncaught SyntaxError: Unexpected token '.'",
			"Uncaught TypeError: undefined.toFixed is not a function",
			"2.00",
			"Uncaught SyntaxError: Unexpected number",
		],
		correctAnswerIndex: 0,
	},
	{
		text: `(()=> { return ("False",false,+5,"Henrik")})()</pre> returns:`,
		options: [
			"Falsefalse5Henrik",
			"Uncaught TypeError: ((intermediate value) , false, 5, 'Henrik') is not a function",
			"Henrik",
			"true",
		],
		correctAnswerIndex: 0,
	},
	{
		text: `<pre class='code'>parseInt(0.0000008, 10)</pre> returns:`,
		options: ["0", "1", "8", "10"],
		correctAnswerIndex: 0,
	},
	{
		text: `parseInt("one", 16);</pre> returns:`,
		options: ["1", "NaN", "0", "3"],
		correctAnswerIndex: 0,
	},
	{
		text: `parseInt("bruh...", 16);</pre> returns:`,
		options: ["11", "NaN", "0", "7"],
		correctAnswerIndex: 0,
	},
	{
		text: `parseInt(1/"Infinity"+2_000_000_000_000_000_000_000)</pre> returns:`,
		options: ["NaN", "2", "Uncaught ReferenceError: Infinity is not defined", "2000000000000000000000"],
		correctAnswerIndex: 0,
	},
	{
		text: `<pre class='code'>
const returnArgsArray = (...a) => a;
returnArgsArray\`it's${" not "} going to work\`[0].join("").toString()
</pre> returns:`,
		options: ["i", "it's not going to work", "it's going to work", "n", "' '"],
		correctAnswerIndex: 0,
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
		options: [`wtf(undefined)`, `wtf()`, `wtf(null)`, `wtf(+"thirty two")`, `wtf(32)`],
		correctAnswerIndex: 0,
	},
	{ text: `<pre class='code'>[...[...[...[...'...']]]].length</pre> returns:`, options: [`3`], correctAnswerIndex: 0 },
	{ text: `<pre class='code'>typeof a === [][+[]] + []</pre> returns:`, options: [`true`], correctAnswerIndex: 0 },
	{ text: `<pre class='code'>! + [] + !+[]</pre> returns:`, options: [`2`], correctAnswerIndex: 0 },
	{
		text: `which one of the following is true?</pre> returns:`,
		options: ["null > 0", "null == 0", "null >= 0", "null === 0"],
		correctAnswerIndex: 0,
	},
	{
		text: `which one returns "copenhagenJS"?</pre> returns:`,
		options: [
			`{"foo"}{bar: "copenhagenJS"}{}`,
			`{"foo"}{copenhagenJS: 'bar'}{}`,
			`{}{copenhagenJs: "copenhagenJs"}{"foo"}`,
			`{"copenhagenJs"}{copenhagenJs: "copenhagenJs"; copenhagenJs: "copenhagenJs"}{"bar"}`,
		],
		correctAnswerIndex: 0,
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
		options: [
			`[]`,
			`"WTF"`,
			`undefined`,
			`Uncaught SyntaxError: Unexpected token ']'`,
			`Uncaught TypeError: Cannot create property 'it' on object []`,
		],
		correctAnswerIndex: 0,
	},
	{
		text: `<pre class='code'>("b" + "a" + + "a" + "a").toLowerCase();</pre> returns:`,
		options: [`banana`],
		correctAnswerIndex: 0,
	},
	{
		text: `<pre class='code'>12345678912345678 + 1</pre> returns:`,
		options: [`12345678912345680`],
		correctAnswerIndex: 0,
	},
	{ text: `<pre class='code'>2 + "2" + 2</pre> returns:`, options: [`222`], correctAnswerIndex: 0 },
	{ text: `<pre class='code'>2 + "2" - 2</pre> returns:`, options: [`20`], correctAnswerIndex: 0 },
	{
		text: `<pre class='code'>(+(!+[]+!+[]+!+[]+[!+[]+!+[]]))[(!![]+[])[+[]]+(!![]+[][(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([]+[])[([][(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]][([][[]]+[])[+!+[]]+(![]+[])[+!+[]]+((+[])[([][(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]+[])[+!+[]+[+!+[]]]+(!![]+[])[!+[]+!+[]+!+[]]]](!+[]+!+[]+!+[]+[!+[]+!+[]+!+[]])+(!![]+[])[+[]]+(![]+[])[+[]]</pre> returns:`,
		options: [`wtf`],
		correctAnswerIndex: 0,
	},
];
