// Copie les polices dans www/fonts pour que l'appli fonctionne 100 % hors ligne.
const fs=require('fs'),path=require('path');
const specs=[
 ['big-shoulders-display','Big Shoulders Display',[700,800]],
 ['instrument-sans','Instrument Sans',[400,500,600,700]],
 ['jetbrains-mono','JetBrains Mono',[400,500,700]]];
fs.mkdirSync('www/fonts',{recursive:true});
let css='';
for(const [pkg,fam,ws] of specs){
 for(const w of ws){
  const f=`${pkg}-latin-${w}-normal.woff2`;
  const src=path.join('node_modules/@fontsource',pkg,'files',f);
  if(!fs.existsSync(src)){console.warn('absent',f);continue;}
  fs.copyFileSync(src,'www/fonts/'+f);
  css+=`@font-face{font-family:'${fam}';font-weight:${w};font-style:normal;font-display:swap;src:url(fonts/${f}) format('woff2')}\n`;
 }}
fs.writeFileSync('www/fonts.css',css);
console.log('polices OK');
