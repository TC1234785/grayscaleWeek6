/*
 * Project: Milestone 1
 * File Name: main.js
 * Description:
 *
 * Created Date:
 * Author:
 *
 */
const path = require("path");
const IOhandler = require("./IOhandler");
const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");
const fs = require("fs");

//Step 1: read the zip file
//Step 2: Unzip the zip file
//Step 3: Read all png images from unzipped folder
//Steap 4: Send them to the grayscale filter function
//Step 5: After ALL IMAGES have SUCCESSFULLY been grayscaled, show a success message
//ALL ERRORS MUST SHOW IN .catch in PROMISE CHAIN
IOhandler.unzip(zipFilePath, pathUnzipped)
    .then(()=> IOhandler.readDir(pathUnzipped))
    .then((PNGs) => {
                        Promise.all([IOhandler.grayScale(path.join(pathUnzipped,PNGs[0]),path.join(pathProcessed,PNGs[0])), 
                                     IOhandler.grayScale(path.join(pathUnzipped,PNGs[1]),path.join(pathProcessed,PNGs[1])),
                                     IOhandler.grayScale(path.join(pathUnzipped,PNGs[2]),path.join(pathProcessed,PNGs[2]))
                                        .then((GreyScaled)=> console.log("All images grey scaled"))])
                        })
    .catch((err) => console.log(err));

