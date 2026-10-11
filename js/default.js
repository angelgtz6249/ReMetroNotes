(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    var translations = {
        es: {
            settings_title: "Configuración",
            sec_general: "General",
            format_btn: "Formatear texto",
            wrap: "Ajuste de línea",
            spellcheck: "Corrector ortográfico",
            autocorrect: "Autocorrector",
            autosave: "Autoguardado",
            lang: "Idioma:",
            theme: "Tema:",
            sec_font: "Fuente",
            font_family: "Familia de fuente:",
            font_size: "Tamaño de fuente:",
            font_weight: "Tipografía:",
            sec_advanced: "Avanzado",
            adv_tools: "Herramientas de escritura avanzada",
            sec_about: "Acerca de",
            version: "Versión 1.0",
            developer: "Desarrollado por ReMetroSoftware.",
            menu_save: "Guardar .txt",
            menu_open: "Cargar .txt",
            menu_new: "Nuevo",
            menu_undo: "Deshacer",
            menu_redo: "Rehacer",
            menu_copy: "Copiar",
            menu_cut: "Cortar",
            menu_paste: "Pegar",
            menu_selectall: "Seleccionar todo",
            menu_settings: "Configuración",
            menu_exit: "Salir",
            new_confirm_msg: "¿Deseas guardar los cambios antes de crear un nuevo documento?",
            btn_yes: "Sí",
            btn_no: "No",
            btn_cancel: "Cancelar"
        },
        en: {
            settings_title: "Settings",
            sec_general: "General",
            format_btn: "Format text",
            wrap: "Word wrap",
            spellcheck: "Spell checker",
            autocorrect: "Autocorrect",
            autosave: "Autosave",
            lang: "Language:",
            theme: "Theme:",
            sec_font: "Font",
            font_family: "Font family:",
            font_size: "Font size:",
            font_weight: "Font weight:",
            sec_advanced: "Advanced",
            adv_tools: "Advanced writing tools",
            sec_about: "About",
            version: "Version 1.0",
            developer: "Developed by ReMetroSoftware.",
            menu_save: "Save .txt",
            menu_open: "Open .txt",
            menu_new: "New",
            menu_undo: "Undo",
            menu_redo: "Redo",
            menu_copy: "Copy",
            menu_cut: "Cut",
            menu_paste: "Paste",
            menu_selectall: "Select all",
            menu_settings: "Settings",
            menu_exit: "Exit",
            new_confirm_msg: "Do you want to save changes before creating a new document?",
            btn_yes: "Yes",
            btn_no: "No",
            btn_cancel: "Cancel"
        },
        ru: {
            settings_title: "Настройки",
            sec_general: "Общие",
            format_btn: "Форматировать текст",
            wrap: "Перенос строк",
            spellcheck: "Проверка орфографии",
            autocorrect: "Автокоррекция",
            autosave: "Автосохранение",
            lang: "Язык:",
            theme: "Тема:",
            sec_font: "Шрифт",
            font_family: "Семейство шрифта:",
            font_size: "Размер шрифта:",
            font_weight: "Начертание:",
            sec_advanced: "Дополнительно",
            adv_tools: "Расширенные инструменты письма",
            sec_about: "О программе",
            version: "Версия 1.0",
            developer: "Разработано ReMetroSoftware.",
            menu_save: "Сохранить .txt",
            menu_open: "Открыть .txt",
            menu_new: "Новый",
            menu_undo: "Отменить",
            menu_redo: "Повторить",
            menu_copy: "Копировать",
            menu_cut: "Вырезать",
            menu_paste: "Вставить",
            menu_selectall: "Выбрать все",
            menu_settings: "Настройки",
            menu_exit: "Выход",
            new_confirm_msg: "Хотите сохранить изменения перед созданием нового документа?",
            btn_yes: "Да",
            btn_no: "Нет",
            btn_cancel: "Отмена"
        },
        eo: {
            settings_title: "Agordoj",
            sec_general: "Ĝenerala",
            format_btn: "Formatigi tekston",
            wrap: "Linia envolvo",
            spellcheck: "Literumilo",
            autocorrect: "Aŭtokorektilo",
            autosave: "Aŭtovortrezervo",
            lang: "Lingvo:",
            theme: "Etoso:",
            sec_font: "Tiparo",
            font_family: "Tipara familio:",
            font_size: "Tiparmezuro:",
            font_weight: "Tipara pezo:",
            sec_advanced: "Altnivela",
            adv_tools: "Altnivelaj skribiloj",
            sec_about: "Pri",
            version: "Versio 1.0",
            developer: "Disvolvita de ReMetroSoftware.",
            menu_save: "Konservi .txt",
            menu_open: "Malfermi .txt",
            menu_new: "Nova",
            menu_undo: "Malfari",
            menu_redo: "Refari",
            menu_copy: "Kopii",
            menu_cut: "Eltondi",
            menu_paste: "Interglui",
            menu_selectall: "Elekti ĉion",
            menu_settings: "Agordoj",
            menu_exit: "Eliri",
            new_confirm_msg: "Ĉu vi volas konservi la ŝanĝojn antaŭ ol krei novan dokumenton?",
            btn_yes: "Jes",
            btn_no: "Ne",
            btn_cancel: "Nuligi"
        }
    };

    // Registrar Charms Bar Settings
    app.onsettings = function (e) {
        e.detail.applicationcommands = {
            "settingsFlyout": { title: "Configuración", href: "" }
        };
        WinJS.UI.Pages.define("", { ready: function () { } });
    };

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            args.setPromise(WinJS.UI.processAll().then(function () {
                initAppLogic();
            }));
        }
    };

    function initAppLogic() {
        var textArea = document.getElementById("textArea");
        var topAppBar = document.getElementById("topAppBar").winControl;
        var triggerArea = document.getElementById("topAppBarTriggerArea");

        // Activar AppBar con clic derecho en la franja superior o en cualquier lugar libre
        triggerArea.addEventListener("contextmenu", function (e) {
            e.preventDefault();
            if (topAppBar) {
                topAppBar.opened = !topAppBar.opened;
            }
        });

        // Cargar configuraciones persistentes guardadas
        loadPersistentSettings(textArea);

        // Opciones del Menú Contextual de Archivo
        document.getElementById("cmdSave").addEventListener("click", function () {
            saveFile(textArea.value);
        });

        document.getElementById("cmdOpen").addEventListener("click", function () {
            openFile(textArea);
        });

        // Lógica del botón Nuevo con el modal personalizado
        var modal = document.getElementById("newDialogModal");
        document.getElementById("cmdNew").addEventListener("click", function () {
            modal.classList.add("active");
        });

        document.getElementById("btnDialogYes").addEventListener("click", function () {
            saveFile(textArea.value);
            textArea.value = "";
            modal.classList.remove("active");
            savePersistentState(textArea);
        });

        document.getElementById("btnDialogNo").addEventListener("click", function () {
            textArea.value = "";
            modal.classList.remove("active");
            savePersistentState(textArea);
        });

        document.getElementById("btnDialogCancel").addEventListener("click", function () {
            modal.classList.remove("active");
        });

        document.getElementById("cmdUndo").addEventListener("click", function () { document.execCommand("undo"); });
        document.getElementById("cmdRedo").addEventListener("click", function () { document.execCommand("redo"); });
        document.getElementById("cmdCopy").addEventListener("click", function () { document.execCommand("copy"); });
        document.getElementById("cmdCut").addEventListener("click", function () { document.execCommand("cut"); });
        document.getElementById("cmdPaste").addEventListener("click", function () { document.execCommand("paste"); });
        document.getElementById("cmdSelectAll").addEventListener("click", function () { textArea.select(); });

        // Abrir Charms Bar desde Configuración
        document.getElementById("cmdSettingsFlyoutTrigger").addEventListener("click", function () {
            var fileFlyout = document.getElementById("fileFlyout").winControl;
            if (fileFlyout) fileFlyout.hide();
            if (topAppBar) topAppBar.opened = false;

            var settingsFlyout = document.getElementById("settingsFlyout").winControl;
            if (settingsFlyout) settingsFlyout.show();
        });

        document.getElementById("cmdExit").addEventListener("click", function () {
            window.close();
        });

        // Eventos de configuración y guardado automático al escribir
        document.getElementById("btnFormat").addEventListener("click", function () {
            textArea.value = textArea.value.trim().replace(/\s+/g, ' ');
            savePersistentState(textArea);
        });

        var chkWordWrap = document.getElementById("chkWordWrap");
        chkWordWrap.addEventListener("change", function () {
            textArea.style.whiteSpace = chkWordWrap.checked ? "pre-wrap" : "pre";
            savePersistentState(textArea);
        });

        var chkSpellCheck = document.getElementById("chkSpellCheck");
        chkSpellCheck.addEventListener("change", function () {
            textArea.spellcheck = chkSpellCheck.checked;
            savePersistentState(textArea);
        });

        var chkAutoCorrect = document.getElementById("chkAutoCorrect");
        chkAutoCorrect.addEventListener("change", function () {
            savePersistentState(textArea);
        });

        var chkAutoSave = document.getElementById("chkAutoSave");
        chkAutoSave.addEventListener("change", function () {
            savePersistentState(textArea);
        });

        textArea.addEventListener("input", function () {
            if (chkAutoSave.checked) {
                localStorage.setItem("rmn_text", textArea.value);
            }
        });

        document.getElementById("selectLang").addEventListener("change", function (e) {
            changeLanguage(e.target.value);
            savePersistentState(textArea);
        });

        document.getElementById("selectTheme").addEventListener("change", function (e) {
            document.body.className = "theme-" + e.target.value;
            savePersistentState(textArea);
        });

        document.getElementById("selectFontFamily").addEventListener("change", function (e) {
            textArea.style.fontFamily = e.target.value;
            savePersistentState(textArea);
        });

        document.getElementById("selectFontSize").addEventListener("change", function (e) {
            textArea.style.fontSize = e.target.value;
            savePersistentState(textArea);
        });

        document.getElementById("selectFontWeight").addEventListener("change", function (e) {
            textArea.style.fontWeight = e.target.value;
            savePersistentState(textArea);
        });

        document.getElementById("btnAdvancedTools").addEventListener("click", function () {
            var words = textArea.value.trim() ? textArea.value.trim().split(/\s+/).length : 0;
            var chars = textArea.value.length;
            var lines = textArea.value.split("\n").length;
            alert("Herramientas de Escritura Avanzada:\n- Palabras: " + words + "\n- Caracteres: " + chars + "\n- Líneas: " + lines);
        });
    }

    function savePersistentState(textArea) {
        localStorage.setItem("rmn_theme", document.getElementById("selectTheme").value);
        localStorage.setItem("rmn_lang", document.getElementById("selectLang").value);
        localStorage.setItem("rmn_wordwrap", document.getElementById("chkWordWrap").checked);
        localStorage.setItem("rmn_spellcheck", document.getElementById("chkSpellCheck").checked);
        localStorage.setItem("rmn_autocorrect", document.getElementById("chkAutoCorrect").checked);
        localStorage.setItem("rmn_autosave", document.getElementById("chkAutoSave").checked);
        localStorage.setItem("rmn_fontfamily", document.getElementById("selectFontFamily").value);
        localStorage.setItem("rmn_fontsize", document.getElementById("selectFontSize").value);
        localStorage.setItem("rmn_fontweight", document.getElementById("selectFontWeight").value);
        if (document.getElementById("chkAutoSave").checked) {
            localStorage.setItem("rmn_text", textArea.value);
        }
    }

    function loadPersistentSettings(textArea) {
        var theme = localStorage.getItem("rmn_theme") || "dark";
        var lang = localStorage.getItem("rmn_lang") || "es";
        var wordwrap = localStorage.getItem("rmn_wordwrap") !== null ? localStorage.getItem("rmn_wordwrap") === "true" : true;
        var spellcheck = localStorage.getItem("rmn_spellcheck") === "true";
        var autocorrect = localStorage.getItem("rmn_autocorrect") === "true";
        var autosave = localStorage.getItem("rmn_autosave") !== null ? localStorage.getItem("rmn_autosave") === "true" : true;
        var fontfamily = localStorage.getItem("rmn_fontfamily") || "Consolas";
        var fontsize = localStorage.getItem("rmn_fontsize") || "33px";
        var fontweight = localStorage.getItem("rmn_fontweight") || "normal";
        var savedText = localStorage.getItem("rmn_text");

        document.getElementById("selectTheme").value = theme;
        document.body.className = "theme-" + theme;

        document.getElementById("selectLang").value = lang;
        changeLanguage(lang);

        document.getElementById("chkWordWrap").checked = wordwrap;
        textArea.style.whiteSpace = wordwrap ? "pre-wrap" : "pre";

        document.getElementById("chkSpellCheck").checked = spellcheck;
        textArea.spellcheck = spellcheck;

        document.getElementById("chkAutoCorrect").checked = autocorrect;
        document.getElementById("chkAutoSave").checked = autosave;

        document.getElementById("selectFontFamily").value = fontfamily;
        textArea.style.fontFamily = fontfamily;

        document.getElementById("selectFontSize").value = fontsize;
        textArea.style.fontSize = fontsize;

        document.getElementById("selectFontWeight").value = fontweight;
        textArea.style.fontWeight = fontweight;

        if (autosave && savedText !== null) {
            textArea.value = savedText;
        }
    }

    function saveFile(content) {
        var savePicker = new Windows.Storage.Pickers.FileSavePicker();
        savePicker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.documentsLibrary;
        savePicker.fileTypeChoices.insert("Documento de texto", [".txt"]);
        savePicker.suggestedFileName = "SinTitulo.txt";

        savePicker.pickSaveFileAsync().then(function (file) {
            if (file) {
                Windows.Storage.CachedFileManager.deferUpdates(file);
                Windows.Storage.FileIO.writeTextAsync(file, content).then(function () {
                    Windows.Storage.CachedFileManager.completeUpdatesAsync(file);
                });
            }
        });
    }

    function openFile(textAreaElement) {
        var openPicker = new Windows.Storage.Pickers.FileOpenPicker();
        openPicker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.documentsLibrary;
        openPicker.fileTypeFilter.replaceAll([".txt"]);

        openPicker.pickSingleFileAsync().then(function (file) {
            if (file) {
                Windows.Storage.FileIO.readTextAsync(file).then(function (result) {
                    textAreaElement.value = result;
                    localStorage.setItem("rmn_text", result);
                });
            }
        });
    }

    function changeLanguage(langCode) {
        var langData = translations[langCode] || translations["es"];
        document.body.setAttribute("data-lang", langCode);

        var elements = document.querySelectorAll("[data-i18n]");
        for (var i = 0; i < elements.length; i++) {
            var key = elements[i].getAttribute("data-i18n");
            if (langData[key]) {
                elements[i].innerText = langData[key];
            }
        }
    }

    app.start();
})();