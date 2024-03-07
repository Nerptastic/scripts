//DESCRIPTION: Automate Filled Information
//=============================================================
//  Script by Nicholas Paolucci
//=============================================================
/*
MIT License

Copyright (c) 2023 Nicholas Paolucci

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
//=============================================================

function showDialog() {
    var dialog = new Window('dialog', 'Social Post Information');

    dialog.authorNameGroup = dialog.add('group');
    dialog.authorNameGroup.alignChildren = 'right';
    dialog.authorNameGroup.add('statictext', undefined, 'Author Name:');
    dialog.authorNameField = dialog.authorNameGroup.add('edittext', undefined, '');
    dialog.authorNameField.preferredSize.width = 300;

    dialog.authorTitleGroup = dialog.add('group');
    dialog.authorTitleGroup.alignChildren = 'right';
    dialog.authorTitleGroup.spacing = 10;
    dialog.authorTitleGroup.add('statictext', undefined, 'Author Title:');
    dialog.authorTitleField = dialog.authorTitleGroup.add('edittext', undefined, '');
    dialog.authorTitleField.preferredSize.width = 300;

    dialog.blogPostTitleGroup = dialog.add('group');
    dialog.blogPostTitleGroup.alignChildren = 'right';
    dialog.blogPostTitleGroup.spacing = 10;
    dialog.blogPostTitleGroup.add('statictext', undefined, 'Post Title:');
    dialog.blogPostTitleField = dialog.blogPostTitleGroup.add('edittext', [0, 0, 300, 60], '', {multiline: true});

    dialog.authorHeadshotGroup = dialog.add('group');
    dialog.authorHeadshotGroup.alignChildren = 'right';
    dialog.authorHeadshotGroup.add('statictext', undefined, 'Author Headshot:');
    dialog.authorHeadshotField = dialog.authorHeadshotGroup.add('edittext', undefined, '');
    dialog.authorHeadshotField.preferredSize.width = 300;

    dialog.buttonsGroup = dialog.add('group');
    dialog.buttonsGroup.alignment = 'center';
    dialog.buttonsGroup.spacing = 10;
    dialog.buttonsGroup.okButton = dialog.buttonsGroup.add('button', undefined, 'OK');
    dialog.buttonsGroup.cancelButton = dialog.buttonsGroup.add('button', undefined, 'Cancel');

    dialog.buttonsGroup.okButton.onClick = function () {
        dialog.close(1);
    };

    dialog.buttonsGroup.cancelButton.onClick = function () {
        dialog.close(0);
    };

    if (dialog.show() === 1) {
        return {
        authorName: dialog.authorNameField.text,
        authorTitle: dialog.authorTitleField.text,
        blogPostTitle: dialog.blogPostTitleField.text,
        authorHeadshot: dialog.authorHeadshotField.text
        };
    } else {
        return null;
    }
}
  
var userInput = showDialog();

if (userInput) {
    if (app.documents.length === 0) {
        alert("No open document found. Please open a document to add text frames.");
        exit();
    }

    var document = app.activeDocument;

    // Get a reference to the text frames
    var authorName = app.activeDocument.textFrames.itemByName("authorName");
    var authorTitle = app.activeDocument.textFrames.itemByName("authorTitle");
    var blogPostTitle = app.activeDocument.textFrames.itemByName("blogPostTitle");

    // Set the contents of the text frames
    if(userInput.authorName !== '') {
        authorName.contents = userInput.authorName;
    }
    if(userInput.authorTitle !== '') {
        authorTitle.contents = userInput.authorTitle;
    }
    if(userInput.blogPostTitle !== '') {
        blogPostTitle.contents = userInput.blogPostTitle;
    }

    // Replaces the image path
    var imageFrame = document.rectangles.itemByName("authorHeadshot");
    var newImagePath = removeFirstAndLastCharacters(userInput.authorHeadshot);
    if(newImagePath !== '') {
        replaceImage(imageFrame, newImagePath);
    }

}

function replaceImage(imageFrame, newImagePath) {
    if (imageFrame.isValid && imageFrame.contentType === ContentType.graphicType) {
        var imageFile = new File(newImagePath);
        if (imageFile.exists) {
            imageFrame.place(imageFile);
        } else {
            alert("Error: The new image file does not exist at the specified path.");
        }
    } else {
        alert("Error: The image frame is not valid or does not contain an image.");
    }
}

function removeFirstAndLastCharacters(str) {
    if (str.length > 2) {
        return str.substring(1, str.length - 1);
    } else {
        return '';
    }
}


