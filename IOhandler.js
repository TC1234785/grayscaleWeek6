/*
 * Project: Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date: Oct 17, 2023
 * Author:Tobias Chau
 *
 */

const AdmZip = require("adm-zip"),
  fs = require("fs"),
  PNG = require("pngjs").PNG,
  path = require("path");

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    const zip = new AdmZip(pathIn);
    zip.extractAllToAsync(pathOut, true, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Extraction operation complete");
      }
    });
  });
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = (dir) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, pngs) => {
      if (err) {
        reject(err);
      } else {
        resolve(pngs.filter((file) => 
          path.extname(file) === ".png"));
      }
    });
  });
};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(pathIn);
    readStream.on("error", (err) => {
      reject(err);
    });
    readStream.pipe(new PNG({})).on("parsed", function () {
      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          let idx = (this.width * y + x) << 2;

          const grayCol =
          (this.data[idx] 
            + this.data[idx + 1] 
            + this.data[idx + 2]) / 3;

          this.data[idx] = grayCol;
          this.data[idx + 1] = grayCol;
          this.data[idx + 2] = grayCol;
        }
      }
      const writeStream = fs.createWriteStream(pathOut);
      writeStream.on("error", (err) => {
        reject(err);
      });
      writeStream.on("finish", () => {
        resolve(`${path.basename(pathIn)} has been Gray Scaled SUCCESSFULLY!`);
      });
      this.pack().pipe(writeStream);
    });
  });
};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
