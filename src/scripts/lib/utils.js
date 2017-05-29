// Capitalises the first letter of a string
function strUcFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function strStripEnds(string) {
	return string.slice(1, string.length-1);
}

module.exports = {
	strUcFirst: strUcFirst,
	strStripEnds: strStripEnds
};