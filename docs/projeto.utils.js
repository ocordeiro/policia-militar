var projetouniversal = {};

//CONSTANTES
//DESENVOLVIMENTO
var PORTAL_URL = 'http://www.casacivil.ac.gov.br/';

//------------------------------------------------------------------------------
//FUNÇÃO PARA PEGAR VALOR PASSADO PELA URL
function retornaUrl(url) {
    var urlTratada = "";
    // dar um split para gerar um array para poder tratar a url e poder tirar por exemplo os primeiro dois parâmetros
    var arrUrl = url.split('/');
    // deleta o indice um do array que é um parâmetro vazio
    delete arrUrl[0];
    // deleta o indice dois do array que é o primeiro parâmetro da url e assim por endiante
    delete arrUrl[1];
    delete arrUrl[2];
    delete arrUrl[3];
    delete arrUrl[4];
    // dar um join para refazer a string agora sem os dois primeiros valores
    var joinUrl = arrUrl.join('/');

    urlTratada = joinUrl.substring(2);

    urlTratada.replace('/', '');
    urlTratada = urlTratada.replace('/', '');
    urlTratada = urlTratada.replace('/', '');
    urlTratada = urlTratada.replace('/', '');
    urlTratada = urlTratada.replace('/', '');
    urlTratada = urlTratada.replace('/', '');

    // retornar a url passando por substring 2 para tirar as primeiras duas barras
    return urlTratada;
}

function SomenteNumero(e) {

    var tecla = (window.event) ? event.keyCode : e.which;

    if ((tecla > 47 && tecla < 58))
        return true;

    else {

        if (tecla == 8 || tecla == 0)
            return true;

        else
            return false;

    }

}

if (typeof console == "undefined")
    console = {
        log: function () {
        }
    };

(function ($) {

    // public
    projetouniversal.util = {
        post: function (args) {
            $.ajax({
                url: args.url,
                type: args.method ? args.method : (args.data ? "POST" : "GET"),
                data: args.data,
                enctype: 'multipart/form-data',
                success: args.success,
                error: args.error
            });
        },
        testjson: function (url) {
            this.getjson({
                url: url,
                contentType: 'application/json',
                success: function (data) {
                    console.log(data)
                }
            })
        },
        getjson: function (args) {
            if (args.loading)
                args.loading();

            $.ajax({
                url: args.url,
                type: args.method ? args.method : (args.data ? "POST" : "GET"),
                dataType: args.dataType || "json",
                contentType: args.contentType || "application/x-www-form-urlencoded;charset=UTF-8",
                data: args.data,
                processData: args.processData,
                async: !args.forceSync,
                cache: false,
                success: function (result) {
                    if (args.loaded)
                        args.loaded();
                    if (args.success)
                        args.success.apply(this, arguments);
                    else
                        console.log(arguments)
                },
                error: function () {
                    if (args.loaded)
                        args.loaded();
                    if (args.error)
                        args.error.apply(this, arguments);
                    else
                        console.log(arguments)
                }
            })
        },
        gethtml: function (args) {

            function parseHtmlStripScriptsAndRenderItIntoTheContainer(parsedHtml) {
                var scriptBlocks = [], nodeList = [];

                $(parsedHtml).each(function (i, node) {
                    var targetList = nodeList;
                    if (node.nodeName == "SCRIPT")
                        targetList = scriptBlocks;

                    targetList.push(node)
                });

                for (var i = 0; i < nodeList.length; i++)
                    $("#" + args.id).append(nodeList[i])

                for (var i = 0; i < scriptBlocks.length; i++)
                    eval($(scriptBlocks[i]).text())
            }

            function parseHTMLResponse(html) {
                try {
                    var parsedHtml = $(html);

                    if (args.success)
                        args.success(parsedHtml);

                    if (args.id)
                        parseHtmlStripScriptsAndRenderItIntoTheContainer(parsedHtml)
                } catch (e) {
                    console.log(e);
                    if (args.error)
                        args.error(e);
                    else
                        throw e
                }
            }

            if (args.loading)
                args.loading();

            $.ajax({
                url: args.url,
                type: args.data ? "POST" : "GET",
                dataType: "html",
                contentType: "application/x-www-form-urlencoded;charset=UTF-8",
                data: args.data,
                statusCode: {
                    204: function () {
                    }
                },
                success: function (html) {
                    if (args.loaded)
                        args.loaded();

                    parseHTMLResponse(html)
                },
                error: function () {
                    if (args.loaded)
                        args.loaded();

                    args.error.apply(this, arguments)
                }
            })
        },
        postFile: function (args) {
            return $.ajax({
                url: args.url,
                type: 'POST',
                enctype: 'multipart/form-data',
                contentType: false,
                processData: false,
                data: args.data,
                success: args.success,
                error: args.error
            });
        }

    }

})(jQuery);	