const fs = require('fs');

const oldCode = fs.readFileSync('/tmp/old_specialtyData.js', 'utf8').replace(/export const /g, 'exports.');
const newCode = fs.readFileSync('src/specialtyData.js', 'utf8').replace(/export const /g, 'exports.');

fs.writeFileSync('/tmp/old.js', oldCode);
fs.writeFileSync('/tmp/new.js', newCode);

const oldData = require('/tmp/old.js').specialties;
const newData = require('/tmp/new.js').specialties;
const reviewsData = require('/tmp/new.js').reviewsData;

for (let i = 0; i < newData.length; i++) {
  const oldSpec = oldData.find(s => s.id === newData[i].id);
  if (oldSpec) {
    if (oldSpec.summary) newData[i].summary = oldSpec.summary;
    if (oldSpec.details) newData[i].details = oldSpec.details;
    if (oldSpec.target) newData[i].target = oldSpec.target;
    if (oldSpec.tabs) newData[i].tabs = oldSpec.tabs;
    if (oldSpec.parts) newData[i].parts = oldSpec.parts;
    if (oldSpec.images) newData[i].images = oldSpec.images;
  }
}

let output = "export const specialties = " + JSON.stringify(newData, null, 2) + ";\n\n";
output += "export const reviewsData = " + JSON.stringify(reviewsData, null, 2) + ";\n";

fs.writeFileSync('src/specialtyData.js', output);
console.log("Merged successfully");
