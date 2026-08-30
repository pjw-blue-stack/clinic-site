import fs from 'fs';

const oldCode = fs.readFileSync('/tmp/old_specialtyData.js', 'utf8');
const newCode = fs.readFileSync('src/specialtyData.js', 'utf8');

// Use regex to extract the specialties array from both
const extractArray = (code) => {
  const match = code.match(/export const specialties = (\[[\s\S]*?\]);/);
  return match ? eval(match[1]) : [];
};

let oldSpec = [];
let newSpec = [];
try {
  // We can't eval easily if it contains unquoted keys or complex things. Let's write a python script or safe regex.
} catch (e) { }

