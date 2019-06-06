//FEATURED HOVER
$(document).ready(function () {

    $('[data-toggle="tooltip"]').tooltip();

    if ($('input#radio_on_off').val() == 1) {

        $('#audio-player').mediaelementplayer({
            alwaysShowControls: true,
            features: ['playpause', 'volume'],
            audioVolume: 'horizontal',
            audioWidth: 400,
            audioHeight: 120,
            success: function () {
                if ($('input#radio_on_off').attr('radioplay') == 1) {
                    $('div.mejs-play').find('button').click();
                }
            }
        });
    }

    $('div.mejs-button').click(function () {
        if ($('div.mejs-button').attr('class') == "mejs-button mejs-playpause-button mejs-play") {
            $.post(PORTAL_URL + "dao/radio.php", {on: $('input#radio_on_off').val(), estacao: $('input#radio_on_off').attr('rel'), play: 1}, function () {});
        } else if ($('div.mejs-button').attr('class') == "mejs-button mejs-playpause-button mejs-pause") {
            $.post(PORTAL_URL + "dao/radio.php", {on: $('input#radio_on_off').val(), estacao: $('input#radio_on_off').attr('rel'), play: 0}, function () {});
        }
    });

    $('button#opcao1').click(function () {//Difusora
        $('div#radio_difusora').fadeIn();
        $('#audio-player').stop();
        $('div.mejs-pause').addClass('mejs-play');
        $('div.mejs-pause').removeClass('mejs-pause');
        $('#audio-player').attr('src', 'http://midia.ac.gov.br/difusora');

        $('#audio-player').mediaelementplayer({
            alwaysShowControls: true,
            features: ['playpause', 'volume'],
            audioVolume: 'horizontal',
            audioWidth: 400,
            audioHeight: 120
        });

        $('div.mejs-play').find('button').click();
        $('h5#nome_radio').html('Difusora');
        $('img#img_radio').attr('src', PORTAL_URL + 'assets/img/difusora.svg');

        $.post(PORTAL_URL + "dao/radio.php", {on: 1, estacao: 1, play: 1}, function () {});
    });

    $('button#opcao2').click(function () {//Aldeia FM
        $('div#radio_difusora').fadeIn();
        $('#audio-player').stop();
        $('div.mejs-pause').addClass('mejs-play');
        $('div.mejs-pause').removeClass('mejs-pause');
        $('#audio-player').attr('src', 'http://midia.ac.gov.br/aldeiafm');

        $('#audio-player').mediaelementplayer({
            alwaysShowControls: true,
            features: ['playpause', 'volume'],
            audioVolume: 'horizontal',
            audioWidth: 400,
            audioHeight: 120
        });

        $('div.mejs-play').find('button').click();
        $('h5#nome_radio').html('Aldeia FM');
        $('img#img_radio').attr('src', PORTAL_URL + 'assets/img/difusora-fm.svg');
        $.post(PORTAL_URL + "dao/radio.php", {on: 1, estacao: 2, play: 1}, function () {});
    });

    $('#close_audio').click(function () {
        $('div#radio_difusora').fadeOut();
        $('#audio-player').stop();
        $('div.mejs-play').addClass('mejs-pause');
        $('div.mejs-play').removeClass('mejs-play');
        $('#audio-player').attr('src', 'http://midia.ac.gov.br/aldeiafm');
        $.post(PORTAL_URL + "dao/radio.php", {on: 0, estacao: 0}, function () {});
    });

    $(".linkfeat").hover(
            function () {
                $(".textfeat").show(500);
            },
            function () {
                $(".textfeat").hide(500);
            }
    );

    $('form#modal_erro').submit(function () {
        if (formulario_validator()) {
            window.onbeforeunload = null;
            projetouniversal.util.getjson({
                url: PORTAL_URL + "dao/modal.php",
                type: "POST",
                data: $('form#modal_erro').serialize(),
                enctype: 'multipart/form-data',
                success: onSuccessSend,
                error: onError
            });
            return false;
        } else {
            return false;
        }
    });

    $('form#modal_contato').submit(function () {
        if (formulario_validator_2()) {
            window.onbeforeunload = null;
            projetouniversal.util.getjson({
                url: PORTAL_URL + "dao/contato.php",
                type: "POST",
                data: $('form#modal_contato').serialize(),
                enctype: 'multipart/form-data',
                success: onSuccessSend,
                error: onError
            });
            return false;
        } else {
            return false;
        }
    });

//------------------------------------------------------------------------------
    function onSuccessSend(obj) {
        if (obj.msg == 'success') {
            swal({
                title: "Sucesso!",
                text: "" + obj.retorno + "",
                type: "success",
                confirmButtonClass: "btn btn-success",
                confirmButtonText: "Ok"
            }).then(function () {
                postToURL('#');
            });
        } else if (obj.msg == 'error') {
            swal({
                title: "Error!",
                text: "" + obj.retorno + "",
                type: "error",
                confirmButtonClass: "btn btn-success",
                confirmButtonText: "Ok"
            });
        }
        return false;
    }
    //------------------------------------------------------------------------------
    /* ERRO AO ENVIAR AJAX */
    function onError(obj) {
        swal({
            title: "Error!",
            text: "" + obj.retorno + "",
            type: "error",
            confirmButtonClass: "btn btn-success",
            confirmButtonText: "Ok"
        });
        return false;
    }

    var $btnAumentar = $("a#aumentar_fonte");
    var $btnDiminuir = $("a#diminuir_fonte");
    var $btnAnterior = $("a#anterior_fonte");
    var $elemento = $("body#body");
    var original = parseFloat($elemento.css('font-size'));

    function obterTamnhoFonte() {
        return parseFloat($elemento.css('font-size'));
    }

    $btnAnterior.on('click', function () {
        $elemento.css('font-size', original);
    });

    $btnAumentar.on('click', function () {
        if ((obterTamnhoFonte() + 1) <= (original + 3)) {
            $elemento.css('font-size', obterTamnhoFonte() + 1);
        }
    });

    $btnDiminuir.on('click', function () {
        if ((obterTamnhoFonte() - 1) >= (original - 3)) {
            $elemento.css('font-size', obterTamnhoFonte() - 1);
        }
    });
//--------------------------------------------------------------------------------------------
    $('div#button_top').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 200);
    });
//--------------------------------------------------------------------------------------------
});

function formulario_validator() {
    var valido = true;
    var nome = $("#nome").val();
    var email = $("#email").val();
    var descricao = $("#descricao").val();

    var element = null;

    //LIMPA MENSAGENS DE ERRO
    $('label.error').each(function () {
        $(this).remove();
    });

    //VERIFICANDO SE O CAMPO DESCRIÇÃO FOI INFORMADO
    if (descricao == "") {
        $('textarea#descricao').after('<label id="erro_descricao" class="error">Descrição é obrigatório.</label>');
        valido = false;
        element = $('textarea#descricao');
    }

    //VERIFICANDO SE O CAMPO EMAIL FOI INFORMADO
    if (email == "") {
        $('input#email').after('<label id="erro_email" class="error">Email é obrigatório.</label>');
        valido = false;
        element = $('input#email');
    }

    //VERIFICANDO SE O CAMPO NOME FOI INFORMADO
    if (nome == "") {
        $('input#nome').after('<label id="erro_nome" class="error">Nome é obrigatório.</label>');
        valido = false;
        element = $('input#nome');
    }

    return valido;
}

function formulario_validator_2() {
    var valido = true;
    var nome = $("#nome_2").val();
    var assunto_2 = $("#assunto_2").val();
    var email = $("#email_2").val();
    var descricao = $("#descricao_2").val();

    var element = null;

    //LIMPA MENSAGENS DE ERRO
    $('label.error').each(function () {
        $(this).remove();
    });

    //VERIFICANDO SE O CAMPO DESCRIÇÃO FOI INFORMADO
    if (descricao == "") {
        $('textarea#descricao_2').after('<label id="erro_descricao_2" class="error">Descrição é obrigatório.</label>');
        valido = false;
        element = $('textarea#descricao_2');
    }

    //VERIFICANDO SE O CAMPO EMAIL FOI INFORMADO
    if (email == "") {
        $('input#email_2').after('<label id="erro_email_2" class="error">Email é obrigatório.</label>');
        valido = false;
        element = $('input#email_2');
    }

    //VERIFICANDO SE O CAMPO CONTATO FOI INFORMADO
    if (assunto_2 == "") {
        $('input#assunto_2').after('<label id="erro_assunto_2" class="error">Assunto é obrigatório.</label>');
        valido = false;
        element = $('input#assunto_2');
    }

    //VERIFICANDO SE O CAMPO NOME FOI INFORMADO
    if (nome == "") {
        $('input#nome_2').after('<label id="erro_nome_2" class="error">Nome é obrigatório.</label>');
        valido = false;
        element = $('input#nome_2');
    }

    return valido;
}

//--------------------------------------------------------------------------------------------
function myFunction() {

    if ($('body#body').offset().top == $(window).scrollTop()) {

        if ($('div#busca_serach').attr('class') == 'search2' || $('div#busca_serach').attr('class') == 'search3') {

            $('#busca_serach').removeClass('search3');
            $('div#busca_serach').removeClass('search2');
            $('div#busca_serach').addClass('search');

        } else if ($('div#busca_serach').attr('class') == 'search2 on2' || $('div#busca_serach').attr('class') == 'search3 on3') {
            $('div#busca_serach').removeClass('search3 on3');
            $('div#busca_serach').removeClass('search2 on2');
            $('div#busca_serach').addClass('search on');
        }

        $('#header_no_fixed').removeAttr('style');
        $('#header_no_fixed').attr('style', 'position: fixed; top: 25px; z-index: 50;');
    } else {
        $('#header_no_fixed').removeAttr('style');
        $('#header_no_fixed').attr('style', 'position: fixed; top: 0px; z-index: 50;');

        if ($('div#busca_serach').attr('class') == 'search') {
            $('div#busca_serach').removeClass('search');
            $('div#busca_serach').addClass('search2');
        } else if ($('div#busca_serach').attr('class') == 'search on') {
            $('div#busca_serach').removeClass('search on');
            $('div#busca_serach').addClass('search3 on3');
        }
    }
}

//--------------------------------------------------------------------------------------------
function mostrar_search() {

    if ($('#busca_serach').attr('class') == 'search') {
        $('#busca_serach').addClass('on');
    } else if ($('#busca_serach').attr('class') == 'search on') {
        $('#busca_serach').removeClass('on');
    }

    if ($('#busca_serach').attr('class') == 'search2') {
        $('#busca_serach').addClass('on2');
    } else if ($('#busca_serach').attr('class') == 'search2 on2') {
        $('#busca_serach').removeClass('on2');
    }

    if ($('#busca_serach').attr('class') == 'search3 on3') {
        $('#busca_serach').removeClass('search3 on3');
        $('#busca_serach').addClass('search2');
    }
}
//--------------------------------------------------------------------------------------------

