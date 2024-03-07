if (app.documents.length == 0 || app.documents[0].visible == false) {
    alert("You must run this script with a document open." , "No document open" , true);
    exit();
} else {
    var myFile = app.activeDocument;
    checkSave(myFile);
    var myPresets = app.pdfExportPresets.everyItem().name;
    myPresets.unshift("");
    var gui = createGui(myPresets);
    if(gui.myWin.show() != 2) {
        if (gui.myPDFExport1.selection.index == 0 || gui.myPDFExport2.selection.index == 0) {
            alert("You must select both predefinitions.");
            exit();
        } else if (gui.myPDFExport1.selection.index != 0 && gui.myPDFExport2.selection.index != 0) {
            var myFileName = myFile.name.substr(0,myFile.name.lastIndexOf("."));
            var myFolder = Folder("").selectDlg("Select the folder where you want to save your PDF");
            var myPreset_1 = String(gui.myPDFExport1.selection.text);
            var myPreset_2 = String(gui.myPDFExport2.selection.text);
            var myRange = gui.myPageRange.text;
            savePDF(myPreset_1 , myRange);
            savePDF(myPreset_2 , myRange);
            alert("Success.\r");
        }
    }
}

function createGui(myPresets) {
    var myWin = new Window('dialog', 'PDF Export Presets');
    var g = myWin.add("group");
    g.orientation = "row";
    var g1 = g.add("group");
    g1.orientation = "column";
    g1.alignment = "left";
    g1.alignChildren = "right";
    g1.spacing = 16;
    g1.add('statictext' , undefined , "Select PDF preset #1");
    g1.add('statictext' , undefined , "Select PDF preset #2");
    g1.add('statictext' , undefined , "Page range");
    var g2 = g.add("group");
    g2.orientation = "column";
    g2.alignment = "right";
    g2.alignChildren = "left";
    var myPDFExport1 = g2.add('dropdownlist' , [0,0,200,20] , myPresets);
    myPDFExport1.selection = 0;
    var myPDFExport2 = g2.add('dropdownlist' , [0,0,200,20] , myPresets);
    myPDFExport2.selection = 0;
    var myPageRange = g2.add('edittext' , [0,0,200,20] , "");
    var g4 = myWin.add("group");
    g4.alignment = "right";
    g4.add('button', undefined, "OK", {name: "OK"});
    g4.add('button', undefined, "Cancel", {name: "Cancel"});
    myPageRange.onChanging = function() {
        if (myPageRange.text.match(/[a-zA-Z.;:\/\\\[{\]}\(\)]/)) {
            myPageRange.text = myPageRange.text.slice(0,-1);
        }
    }
    myPageRange.onChange = function() {
        if (myPageRange.text.match(/[a-zA-Z.;:\/\\\[{\]}\(\)]/)) {
            alert("You can only enter numbers or \",\" or \"-\" to set page ranges");
            myPageRange.text = "";
        }
    }
    return {
        myWin: myWin,
        myPDFExport1: myPDFExport1,
        myPDFExport2: myPDFExport2,
        myPageRange: myPageRange
    };
}

function savePDF(myPreset, myPageRange, myFolder, myFileName) {
    try {
        if (myPageRange == "") {
            myPageRange = PageRange.ALL_PAGES;
        }
        app.pdfExportPreferences.pageRange = myPageRange;
        
        // Check if the preset exists
        if (!app.pdfExportPresets.itemByName(myPreset).isValid) {
            alert("The preset " + myPreset + " does not exist. Using [High Quality Print] instead.");
            myPreset = "[High Quality Print]";
        }

        name = myFolder + "/" + myFileName + "_" + myPreset.replace(/\/|:/g, "_") + ".pdf";
        app.activeDocument.exportFile(ExportFormat.PDF_TYPE, new File(name), false, myPreset);
        alert("PDF exported successfully.");
    } catch (error) {
        alert("An error occurred while exporting the PDF: " + error.toString());
    }
}

function checkSave(myDoc) {
    try {
        if(!myDoc.saved){
            alert("This script requires the document to be saved. Please choose a save location.");
            var mySaveDialog = File.saveDialog("Choose a name and a folder to save the file","InDesign document:*.indd");
            if (mySaveDialog == null) {
                alert("Script cancelled. The document must be saved before proceeding.");
                exit();
            } else {
                myDoc.save(mySaveDialog);
                alert("File Saved.");
            }
        } else if (myDoc.modified) {
            myDoc.save();
            alert("File Saved.");
        } else {
            alert("No changes have been made since the last save.");
        }
    } catch(error) {
        alert("An error occurred while trying to save the document: " + error.toString());
    }
}