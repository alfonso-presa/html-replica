//var body = document.getElementsByTagName('body')[0];

var nodesBlackList = {
    'script': true,
    'style': true
};

function toDataUri(img) {
    var canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    canvas.getContext('2d').drawImage(img, 0, 0);

    return canvas.toDataURL('image/png');
}

function clone(element) {
    if (nodesBlackList[element.tagName.toLowerCase()]) {
        return;
    }
    var cloned = document.createElement(element.tagName.toLowerCase());

    //var cloneddStyle = '';
    //cloned.attributes.style = '';
    for (var att, i = 0, atts = element.attributes, n = atts.length; i < n; i++){
        att = atts[i];
        cloned.setAttribute(att.nodeName, att.nodeValue);
    };

    if (element.tagName === 'IMG') {
        cloned.src = toDataUri(element);
    }

    var styles = window.getComputedStyle(element,'');
    for (var i = 0 in styles){
        style = styles[i];
        //lonedStyle += key + ':' + value;
        cloned.style[i] = style;
    };

    var childNodes = element.childNodes;

    childNodes.forEach(function (node) {
        if(node.nodeName === '#text') {
            cloned.appendChild(document.createTextNode(node.data));
        } else {
            var childClone = clone(node);
            if (childClone) {
                cloned.appendChild(childClone);
            }
        }
    });

    return cloned;
}

function doIt() {
    var toBeCloned = document.getElementById('this');
    var result = document.getElementById('result');

    var cloned = clone(toBeCloned);

    result.src = "data:text/html;charset=utf-8," + escape(cloned.outerHTML);
}

