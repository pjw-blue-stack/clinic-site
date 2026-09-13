const fs = require('fs');

function getToxinY(x) {
  if (x <= 350) return 150 - (x / 350) * 50; // 150 to 100
  if (x <= 750) return 100 + ((x - 350) / 400) * 300; // 100 to 400
  return 400; // Stable
}

let path = 'M 0 ' + getToxinY(0);
for (let x = 0; x <= 1000; x += 5) {
  // Base line is toxin line
  let baseY = getToxinY(x);
  
  // Amplitude
  let amp = 0;
  if (x <= 350) amp = 60 + (x / 350) * 40; // Increases from 60 to 100
  else if (x <= 750) amp = 100 - ((x - 350) / 400) * 80; // Decreases from 100 to 20
  else amp = 20; // Stable at 20

  // Frequency
  // Math.sin(x * frequency)
  // Let's use a constant frequency
  let freq = 0.05;
  let wave = Math.sin(x * freq) * amp;
  
  path += ` L ${x} ${baseY + wave}`;
}

fs.writeFileSync('wave.txt', path);
console.log("Wave path generated in wave.txt");
