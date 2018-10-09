const ipcRenderer = require('electron').ipcRenderer;
const moment = require('moment')
const { isInConfig } = require('./common')

const addHtmlToBody = (html) => {
    let body = document.getElementById("page")
    body.innerHTML = html
}

ipcRenderer.on('chargeHtml', (event, args) => {
    if (args.css) {
        addCStyles(args.css)
    }
    if (args.cssNode) {
        addCStylesNode(args.cssNode)
    }
    if (args.cssUrl) {
        addCStylesUrl(args.cssUrl)
    }
    addHtmlToBody(args.html)
    if (isInConfig('timePrinter', args)) {
        document.getElementById("timePrinter").style.display = ''
        document.getElementById("timePrinter").innerHTML = moment.utc().format('YYYY-MM-DD HH:mm:ss');
    }

    if (isInConfig('hiddenWindow', args)) {
        print(true)
    }

})

const transformScale = (scale) => {
    document.getElementById("body").style.transform = `scale(${scale})`;
}
const addCStyles = (styles) => {
    let css = document.createElement('style')
    css.innerHTML = styles
    document.getElementsByTagName("HEAD")[0].appendChild(css)

}
const addCStylesNode = (stylesNodde) => {
    document.getElementsByTagName("HEAD")[0].appendChild(stylesNodde)
}
const addCStylesUrl = (stylesUrl) => {
    var cssLink = document.createElement('link')
    cssLink.setAttribute("rel", "stylesheet")
    cssLink.setAttribute("type", "text/css")
    cssLink.setAttribute("href", stylesUrl)
    document.getElementsByTagName("HEAD")[0].appendChild(cssLink)

}


function print(close) {
    ipcRenderer.send('print-init', { close })
}

module.exports = { transformScale, print }