/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from "inquirer";
import qr from "qr-image";
import fs, { writeFile } from "fs";
inquirer
  .prompt([{ message: "Type in your URL", name: "url" }])
  .then((answers) => {
    const url = answers.url;
    var qr_png = qr.image(url);
    qr_png.pipe(fs.createWriteStream("qr_img1.png"));

    writeFile("qr_url.txt", url, (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.log(error);
    } else {
      // Something else went wrong
    }
  });
