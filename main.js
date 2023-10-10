const path = require("path");
/*
 * Project: Milestone 1
 * File Name: main.js
 * Description:
 *
 * Created Date:
 * Author:
 *
 */

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
["img1.png", "img2.png", "img3.png"].forEach(img => {grayScale(img);});

[grayScale("img1.png"), grayScale("img2.png"), grayScale("img3.png")]
.then(() => console.log("All images done!")) // look for promise.all()


//Step 1: Unzip myfile.zip
//transform stream needs to be converted to a writeable stream
const zlib = require("zlib");
const ts = zlib.createGunzip() //ts = transformed stream
fs.createReadStream(zipFilePath)//create readstream
.pipe(unzipper.Extract({path:"./unzipped"})) //pipe to unzipper to create a transformed stream

//Read each png fie
fs.createReadStream("png1.png")
.on("data", (chunk) => console.log(chunk))