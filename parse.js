const processLineBreaks = text => {
	return text.replace(/<br>/g, '\r');
};

const processRuby = text => {
	return text.replace(/(?:<\/?rt>|<\/?rb>|<\/?rp>|<\/?ruby>)/g, '');
};

const processDiv = text => {
	return text.replace(/<\/?div[^>]*>/g, '\r');
};

const processEmphasis = text => {
	return text.replace(/<\/?em[^>]*>/g, '*');
};

const processNotes = text => {
	return text.replace(/<\/?span[^>]*>/g, '');
};

const cleanFormat = text => {
	return text.replace(/(?:［＃改ページ］|［＃ページの左右中央］)/g, '');
};

const markChapters = text => {
	return text.replace(/<a class=[^>]*"midashi_anchor"[^>]*>/g, '==**==');
};

const processRest = text => {
	return text.replace(/<\/?(?:h\d|a)[^>]*>/g, '');
};

const parseText = html => {
	console.log("Attempting to parse text!");
	let cleantext = processLineBreaks(html);
	cleantext = processRuby(cleantext);
	cleantext = processDiv(cleantext);
	cleantext = processEmphasis(cleantext);
	cleantext = processNotes(cleantext);
	cleantext = cleanFormat(cleantext);
	cleantext = markChapters(cleantext);
	cleantext = processRest(cleantext);
	return cleantext;
};
module.exports = parseText;