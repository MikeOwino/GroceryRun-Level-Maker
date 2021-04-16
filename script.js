m = [  
  '. . . . . . . . . . .'.split(' '), 
  '. . . . . . . . . . .'.split(' '), 
  'c . . . . . . . . . t'.split(' '), 
  '. . . . . . . . . . .'.split(' '), 
  '. . . . . . . . . . .'.split(' ') 
]

descs = [
  'The best level designed by the best person.'
]

let currmap = []
let currlev = 0
let speed = .5
let pspeed = 1000
let direction = '';
let tpleft = 0;
let tpgrab = 0;
let hasstarted = false
let hasgun = false
let haskey = false
let hasgog = false
let cmoveint = function(){}
let pmoveint = function(){}
let imoveint = function(){}
let fmoveint = function(){}
let gmoveint = function(){}

function updatetable(ls){
  var tr = 5
  var td = 11;
	var table = "<table cellspacing='0'>";
	for(i = 0; i < tr; i++) {
		table += "<tr>";
		for(j = 0; j < td; j++) {
			if (ls[i][j]==='c'){
        table += "<td class='cart'>🛒</td>";
      }else if(ls[i][j]==='p'){
        table += "<td class='person'>👨</td>";
      }else if(ls[i][j]==='w'){
        table += "<td class='wall'>🧱</td>";
      }else if(ls[i][j]==='t'){
        table += "<td class='toiletpaper'>🧻</td>"
      }else if(ls[i][j]==='.'){
        table += "<td class='empty'>&nbsp;</td>"
      }else if(ls[i][j]=='*'){
        table += "<td class='collision'>💥</td>"
      }else if(ls[i][j]=='i'){
        table += "<td class='infector'>🤢</td>"
      }else if(ls[i][j]=='#'){
        table += "<td class='sick'>🦠</td>"
      }else if(ls[i][j]=='s'){
        table += "<td class='sanitizer'>🧼</td>"
      }else if(ls[i][j]=='f'){
        table += "<td class='fire'>🔥</td>"
      }else if(ls[i][j]=='e'){
        table += "<td class='fireextinguisher'>🧯</td>"
      }else if(ls[i][j]=='k'){
        table += "<td class='key'>🔑</td>"
      }else if(ls[i][j]=='v'){
        table += "<td class='vault'>🚪</td>"
      }else if(ls[i][j]=='g'){
        table += "<td class='vault'>👮</td>"
      }else if(ls[i][j]=='-'){
        table += "<td class='gun'>🔫</td>"
      }else if(ls[i][j]=='d'){
        table += "<td class='drink'>🥤</td>"
      }else if(ls[i][j]=='~'){
        table += "<td class='water'>️⚠️</td>"
      }else if(ls[i][j]=='='){
        if(!hasgog){
          table += "<td class='secretpassageway'>🧱</td>"
        }else{
          table += "<td class='secretpassageway'>🔲</td>"
        }
      }else if(ls[i][j]=='x'){
        table += "<td class='xraygoggles'>🥽</td>"
      }
		}
		table += "</tr>";
	}
	table += "</table>";
	document.getElementById("table").innerHTML = table;
  if((!(countpaper()))&&(!(tpgrab==tpleft))) {
    gameover()
  }else if(!countpaper()){
    nextlevel()
  }
}

function nextlevel() {
  clearInterval(cmoveint)
  clearInterval(pmoveint)
  clearInterval(imoveint)
  clearInterval(fmoveint)
  clearInterval(gmoveint)
  hasstarted = false;
  direction = '';
  hasgun = false;
  haskey = false;
  hasgog = false;
  pspeed = 1000;
  loadmap(currlev)
}

function gameover() {
  clearInterval(cmoveint)
  clearInterval(pmoveint)
  clearInterval(imoveint)
  clearInterval(fmoveint)
  clearInterval(gmoveint)
  hasstarted = false;
  direction = '';
  hasgun = false;
  haskey = false;
  hasgog = false;
  pspeed = 1000;
  loadmap(currlev)
}

function removeoverlay(){
  document.getElementById("table").style.backgroundColor = '#22222211'
  updatetable(currmap)
}

function overlay(header, text){
  document.getElementById("table").style.backgroundColor = '#222222CC'
  var tag1 = document.createElement("h1");
  var cont1 = document.createTextNode(header);
  tag1.appendChild(cont1);

  var tag2 = document.createElement("p");
  var cont2 = document.createTextNode(text);
  tag2.appendChild(cont2);

  var element = document.getElementById("table");
  element.appendChild(tag1);
  element.appendChild(tag2);
}

function updatedesc(lvl){
  document.getElementById("instructions").innerHTML = descs[lvl];
}

function loadmap(level){
  updatedesc(level)
  currmap = JSON.parse(JSON.stringify(m))
  updatetable(m)
  direction = '';
  tpleft = countpaper()
  tpgrab = 0
  hasgun = false;
  haskey = false;
  hasgog = false;
  pspeed = 1000;
  overlay('Level ' + (level+1).toString(), 'Press Any Key To Start')
}

function ldmp(level){
  currmap = JSON.parse(JSON.stringify(m))
}

function getplayercoords() {
  for(i = 0; i < 5; i++) {
    if(currmap[i].indexOf('c')>-1){ 
      return [i, currmap[i].indexOf('c')]
    }
  }
}

function getinfectcoords() {
  coords = []
  for(i = 0; i < 5; i++) {
    for(j=0; j < 11; j++) {
      if(currmap[i][j]=='i'){
        coords.push([i, j])      
      }
    }
  }
  return coords
}

function getguardcoords() {
  coords = []
  for(i = 0; i < 5; i++) {
    for(j=0; j < 11; j++) {
      if(currmap[i][j]=='g'){
        coords.push([i, j])      
      }
    }
  }
  return coords
}

function getfirecoords() {
  coords = []
  for(i = 0; i < 5; i++) {
    for(j=0; j < 11; j++) {
      if(currmap[i][j]=='f'){
        coords.push([i, j])      
      }
    }
  }
  return coords
}

function hassantizer(){
  for(i = 0; i < 5; i++) {
    if(currmap[i].indexOf('s')>-1){ 
      return false
    }
  }
  return true
}

function hasexting(){
  for(i = 0; i < 5; i++) {
    if(currmap[i].indexOf('e')>-1){ 
      return false
    }
  }
  return true
}

function countpaper() {
  c = 0
  for(i = 0; i < 5; i++) {
    for(j=0; j < 11; j++) {
      if(currmap[i][j]=='t'){
        c++   
      }
    }
  }
  return c
}

function moveplayer() {
  c = getplayercoords()
  if(!c) {
    gameover()
    return
  }
  n =  JSON.parse(JSON.stringify(c))
  d = direction
  if(d=='w') { if(c[0]-1<0){ return } else { n[0]-- } }
  if(d=='s') { if(c[0]+1>4){ return } else { n[0]++ } }
  if(d=='a') { if(c[1]-1<0){ return } else { n[1]-- } }
  if(d=='d') { if(c[1]+1>10){ return } else { n[1]++ } }
  currmap[c[0]][c[1]] = '.'
  if(currmap[n[0]][n[1]]=='p'){
    if(!hasgun){
      currmap[n[0]][n[1]] = '!'
      gameover()
      return
    }
  }else if(currmap[n[0]][n[1]]=='w'){
    currmap[n[0]][n[1]] = '*'
    gameover()
    return
  }else if((currmap[n[0]][n[1]]=='f')&&(!hasexting())){
    currmap[n[0]][n[1]] = 'f'
    gameover()
    return
  }else if((currmap[n[0]][n[1]]=='i')&&(!hassantizer())){
    currmap[n[0]][n[1]] = '!'
    gameover()
    return
  }else if((currmap[n[0]][n[1]]=='#')&&(!hassantizer())){
    currmap[n[0]][n[1]] = '!'
    gameover()
    return
  }else if((currmap[n[0]][n[1]]=='v')&&(!haskey)){
    currmap[n[0]][n[1]] = '!'
    gameover()
    return
  }else if((currmap[n[0]][n[1]]=='g')){
    currmap[n[0]][n[1]] = '!'
    gameover()
    return
  }else if((currmap[n[0]][n[1]]=='-')){
    hasgun = true
  }else if((currmap[n[0]][n[1]]=='k')){
    haskey = true
  }else if((currmap[n[0]][n[1]]=='t')){
    tpgrab++
  }else if((currmap[n[0]][n[1]]=='d')){
    pspeed = pspeed/1.45;
    clearInterval(cmoveint)
    cmoveint = setInterval(moveplayer, pspeed*speed)
  }else if((currmap[n[0]][n[1]]=='~')){
    pspeed = pspeed*1.25;
    clearInterval(cmoveint)
    cmoveint = setInterval(moveplayer, pspeed*speed)
  }else if((currmap[n[0]][n[1]]=='x')){
    hasgog = true
  }
  currmap[n[0]][n[1]] = 'c'
  updatetable(currmap)
}

function getpeoplecoords() {
  coords = []
  for(i = 0; i < 5; i++) {
    for(j=0; j < 11; j++) {
      if(currmap[i][j]=='p'){
        coords.push([i, j])      
      }
    }
  }
  return coords
}

function movepeople() {
  c = getpeoplecoords()
  c.forEach(function(i){
    n = JSON.parse(JSON.stringify(i))
    hasmoved = false
    while(!hasmoved){
      d = Math.ceil(Math.random()*4)
      if(d==1) { 
        if(!(i[0]-1<0)) {
          n[0]--
          if((!(currmap[n[0]][n[1]]=='p'))&&(!(currmap[n[0]][n[1]]=='w'))&&(!(currmap[n[0]][n[1]]=='t'))&&(!(currmap[n[0]][n[1]]=='i'))&&(!(currmap[n[0]][n[1]]=='e'))&&(!(currmap[n[0]][n[1]]=='s'))&&(!(currmap[n[0]][n[1]]=='v'))&&(!(currmap[n[0]][n[1]]=='k'))&&(!(currmap[n[0]][n[1]]=='g'))&&(!(currmap[n[0]][n[1]]=='f'))&&(!((currmap[n[0]][n[1]]=='c')&&hasgun))&&(!(currmap[n[0]][n[1]]=='~'))&&(!(currmap[n[0]][n[1]]=='='))){
            currmap[i[0]][i[1]] = '.'
            currmap[n[0]][n[1]] = 'p'
            hasmoved = true;
          }
          n[0]++
        }
      }
      if(d==2) { 
        if(!(i[0]+1>4)) {
          n[0]++
          if((!(currmap[n[0]][n[1]]=='p'))&&(!(currmap[n[0]][n[1]]=='w'))&&(!(currmap[n[0]][n[1]]=='t'))&&(!(currmap[n[0]][n[1]]=='i'))&&(!(currmap[n[0]][n[1]]=='e'))&&(!(currmap[n[0]][n[1]]=='s'))&&(!(currmap[n[0]][n[1]]=='v'))&&(!(currmap[n[0]][n[1]]=='k'))&&(!(currmap[n[0]][n[1]]=='g'))&&(!(currmap[n[0]][n[1]]=='f'))&&(!((currmap[n[0]][n[1]]=='c')&&hasgun))&&(!(currmap[n[0]][n[1]]=='~'))&&(!(currmap[n[0]][n[1]]=='='))){
            currmap[i[0]][i[1]] = '.'
            currmap[n[0]][n[1]] = 'p'
            hasmoved = true;
          }
          n[0]--
        }
      }
      if(d==3) { 
        if(!(i[1]-1<0)) {
          n[1]--
          if((!(currmap[n[0]][n[1]]=='p'))&&(!(currmap[n[0]][n[1]]=='w'))&&(!(currmap[n[0]][n[1]]=='t'))&&(!(currmap[n[0]][n[1]]=='i'))&&(!(currmap[n[0]][n[1]]=='e'))&&(!(currmap[n[0]][n[1]]=='s'))&&(!(currmap[n[0]][n[1]]=='v'))&&(!(currmap[n[0]][n[1]]=='k'))&&(!(currmap[n[0]][n[1]]=='g'))&&(!(currmap[n[0]][n[1]]=='f'))&&(!((currmap[n[0]][n[1]]=='c')&&hasgun))&&(!(currmap[n[0]][n[1]]=='~'))&&(!(currmap[n[0]][n[1]]=='='))){
            currmap[i[0]][i[1]] = '.'
            currmap[n[0]][n[1]] = 'p'
            hasmoved = true;
          }
          n[1]++
        }
      }
      if(d==4) { 
        if(!(i[1]+1>10)) {
          n[1]++
          if((!(currmap[n[0]][n[1]]=='p'))&&(!(currmap[n[0]][n[1]]=='w'))&&(!(currmap[n[0]][n[1]]=='t'))&&(!(currmap[n[0]][n[1]]=='i'))&&(!(currmap[n[0]][n[1]]=='e'))&&(!(currmap[n[0]][n[1]]=='s'))&&(!(currmap[n[0]][n[1]]=='v'))&&(!(currmap[n[0]][n[1]]=='k'))&&(!(currmap[n[0]][n[1]]=='g'))&&(!(currmap[n[0]][n[1]]=='f'))&&(!((currmap[n[0]][n[1]]=='c')&&hasgun))&&(!(currmap[n[0]][n[1]]=='~'))&&(!(currmap[n[0]][n[1]]=='='))){
            currmap[i[0]][i[1]] = '.'
            currmap[n[0]][n[1]] = 'p'
            hasmoved = true;
          }
          n[1]--
        }
      }
      hasmoved = true;
    }
  });
  updatetable(currmap)
}

function moveguard() {
  if(haskey||hasgun) {
    c = getguardcoords()
    c.forEach(function(i){
      n = JSON.parse(JSON.stringify(i))
      hasmoved = false
      while(!hasmoved){
        d = Math.ceil(Math.random()*4)
        if(!(n[0]-1<0)) {
          if(currmap[n[0]-1][n[1]]=='c'){
            d = 1
          }
        }
        if(!(n[0]+1>4)) {
          if(currmap[n[0]+1][n[1]]=='c'){
            d = 2
          }
        }
        if(!(n[1]-1<0)) {
          if(currmap[n[0]][n[1]-1]=='c'){
            d = 3
          }
        }
        if(!(n[1]+1>10)) {
          if(currmap[n[0]][n[1]+1]=='c'){
            d = 4
          }
        }
        if(d==1) { 
          if(!(i[0]-1<0)) {
            n[0]--
            if((!(currmap[n[0]][n[1]]=='p'))&&(!(currmap[n[0]][n[1]]=='w'))&&(!(currmap[n[0]][n[1]]=='t'))&&(!(currmap[n[0]][n[1]]=='i'))&&(!(currmap[n[0]][n[1]]=='e'))&&(!(currmap[n[0]][n[1]]=='s'))&&(!(currmap[n[0]][n[1]]=='v'))&&(!(currmap[n[0]][n[1]]=='k'))&&(!(currmap[n[0]][n[1]]=='g'))&&(!(currmap[n[0]][n[1]]=='~'))){
              currmap[i[0]][i[1]] = '.'
              currmap[n[0]][n[1]] = 'g'
              hasmoved = true;
            }
            n[0]++
          }
        }
        if(d==2) { 
          if(!(i[0]+1>4)) {
            n[0]++
            if((!(currmap[n[0]][n[1]]=='p'))&&(!(currmap[n[0]][n[1]]=='w'))&&(!(currmap[n[0]][n[1]]=='t'))&&(!(currmap[n[0]][n[1]]=='i'))&&(!(currmap[n[0]][n[1]]=='e'))&&(!(currmap[n[0]][n[1]]=='s'))&&(!(currmap[n[0]][n[1]]=='v'))&&(!(currmap[n[0]][n[1]]=='k'))&&(!(currmap[n[0]][n[1]]=='g'))&&(!(currmap[n[0]][n[1]]=='~'))){
              currmap[i[0]][i[1]] = '.'
              currmap[n[0]][n[1]] = 'g'
              hasmoved = true;
            }
            n[0]--
          }
        }
        if(d==3) { 
          if(!(i[1]-1<0)) {
            n[1]--
            if((!(currmap[n[0]][n[1]]=='p'))&&(!(currmap[n[0]][n[1]]=='w'))&&(!(currmap[n[0]][n[1]]=='t'))&&(!(currmap[n[0]][n[1]]=='i'))&&(!(currmap[n[0]][n[1]]=='e'))&&(!(currmap[n[0]][n[1]]=='s'))&&(!(currmap[n[0]][n[1]]=='v'))&&(!(currmap[n[0]][n[1]]=='k'))&&(!(currmap[n[0]][n[1]]=='g'))&&(!(currmap[n[0]][n[1]]=='~'))){
              currmap[i[0]][i[1]] = '.'
              currmap[n[0]][n[1]] = 'g'
              hasmoved = true;
            }
            n[1]++
          }
        }
        if(d==4) { 
          if(!(i[1]+1>10)) {
            n[1]++
            if((!(currmap[n[0]][n[1]]=='p'))&&(!(currmap[n[0]][n[1]]=='w'))&&(!(currmap[n[0]][n[1]]=='t'))&&(!(currmap[n[0]][n[1]]=='i'))&&(!(currmap[n[0]][n[1]]=='e'))&&(!(currmap[n[0]][n[1]]=='s'))&&(!(currmap[n[0]][n[1]]=='v'))&&(!(currmap[n[0]][n[1]]=='k'))&&(!(currmap[n[0]][n[1]]=='g'))&&(!(currmap[n[0]][n[1]]=='~'))){
              currmap[i[0]][i[1]] = '.'
              currmap[n[0]][n[1]] = 'g'
              hasmoved = true;
            }
            n[1]--
          }
        }
        hasmoved = true;
      }
    });
    updatetable(currmap)
  }
}

function moveinfector(){
  c = getinfectcoords()
  c.forEach(function(i){
    n = JSON.parse(JSON.stringify(i))
    hasmoved = false
    while(!hasmoved){
      d = Math.ceil(Math.random()*4)
      if(d==1) { 
        if(!(i[0]-1<0)) {
          n[0]--
          if((!(currmap[n[0]][n[1]]=='p'))&&(!(currmap[n[0]][n[1]]=='w'))&&(!(currmap[n[0]][n[1]]=='t'))&&(!(currmap[n[0]][n[1]]=='i'))&&(!(currmap[n[0]][n[1]]=='e'))&&(!(currmap[n[0]][n[1]]=='s'))&&(!(currmap[n[0]][n[1]]=='c'&&hassantizer()))&&(!(currmap[n[0]][n[1]]=='v'))&&(!(currmap[n[0]][n[1]]=='k'))&&(!(currmap[n[0]][n[1]]=='g'))&&(!(currmap[n[0]][n[1]]=='f'))&&(!(currmap[n[0]][n[1]]=='~'))&&(!(currmap[n[0]][n[1]]=='='))){
            currmap[i[0]][i[1]] = '#'
            currmap[n[0]][n[1]] = 'i'
            hasmoved = true;
          }
          n[0]++
        }
      }
      if(d==2) { 
        if(!(i[0]+1>4)) {
          n[0]++
          if((!(currmap[n[0]][n[1]]=='p'))&&(!(currmap[n[0]][n[1]]=='w'))&&(!(currmap[n[0]][n[1]]=='t'))&&(!(currmap[n[0]][n[1]]=='i'))&&(!(currmap[n[0]][n[1]]=='e'))&&(!(currmap[n[0]][n[1]]=='s'))&&(!(currmap[n[0]][n[1]]=='c'&&hassantizer()))&&(!(currmap[n[0]][n[1]]=='v'))&&(!(currmap[n[0]][n[1]]=='k'))&&(!(currmap[n[0]][n[1]]=='g'))&&(!(currmap[n[0]][n[1]]=='f'))&&(!(currmap[n[0]][n[1]]=='~'))&&(!(currmap[n[0]][n[1]]=='='))){
            currmap[i[0]][i[1]] = '#'
            currmap[n[0]][n[1]] = 'i'
            hasmoved = true;
          }
          n[0]--
        }
      }
      if(d==3) { 
        if(!(i[1]-1<0)) {
          n[1]--
          if((!(currmap[n[0]][n[1]]=='p'))&&(!(currmap[n[0]][n[1]]=='w'))&&(!(currmap[n[0]][n[1]]=='t'))&&(!(currmap[n[0]][n[1]]=='i'))&&(!(currmap[n[0]][n[1]]=='e'))&&(!(currmap[n[0]][n[1]]=='s'))&&(!(currmap[n[0]][n[1]]=='c'&&hassantizer()))&&(!(currmap[n[0]][n[1]]=='v'))&&(!(currmap[n[0]][n[1]]=='k'))&&(!(currmap[n[0]][n[1]]=='g'))&&(!(currmap[n[0]][n[1]]=='f'))&&(!(currmap[n[0]][n[1]]=='~'))&&(!(currmap[n[0]][n[1]]=='='))){
            currmap[i[0]][i[1]] = '#'
            currmap[n[0]][n[1]] = 'i'
            hasmoved = true;
          }
          n[1]++
        }
      }
      if(d==4) { 
        if(!(i[1]+1>10)) {
          n[1]++
          if((!(currmap[n[0]][n[1]]=='p'))&&(!(currmap[n[0]][n[1]]=='w'))&&(!(currmap[n[0]][n[1]]=='t'))&&(!(currmap[n[0]][n[1]]=='i'))&&(!(currmap[n[0]][n[1]]=='e'))&&(!(currmap[n[0]][n[1]]=='s'))&&(!(currmap[n[0]][n[1]]=='c'&&hassantizer()))&&(!(currmap[n[0]][n[1]]=='v'))&&(!(currmap[n[0]][n[1]]=='k'))&&(!(currmap[n[0]][n[1]]=='g'))&&(!(currmap[n[0]][n[1]]=='f'))&&(!(currmap[n[0]][n[1]]=='~'))&&(!(currmap[n[0]][n[1]]=='='))){
            currmap[i[0]][i[1]] = '#'
            currmap[n[0]][n[1]] = 'i'
            hasmoved = true;
          }
          n[1]--
        }
      }
      hasmoved = true;
    }
  });
  updatetable(currmap)
}

function movefire(){
  c = getfirecoords()
  c.forEach(function(i){
    n = JSON.parse(JSON.stringify(i))
    hasmoved = false
    while(!hasmoved){
      d = Math.ceil(Math.random()*4)
      if(d==1) { 
        if(!(i[0]-1<0)) {
          n[0]--
          if((!(currmap[n[0]][n[1]]=='w'))&&(!(currmap[n[0]][n[1]]=='e'))&&(!(currmap[n[0]][n[1]]=='c'&&hasexting()))&&(!(currmap[n[0]][n[1]]=='v'))&&(!(currmap[n[0]][n[1]]=='k'))&&(!(currmap[n[0]][n[1]]=='g'))&&(!(currmap[n[0]][n[1]]=='f')&&(!(currmap[n[0]][n[1]]=='s')))&&(!(currmap[n[0]][n[1]]=='='))){
            if(currmap[n[0]][n[1]]=='t'){
              currmap[n[0]][n[1]] = 'f'
            }
            currmap[n[0]][n[1]] = 'f'
            hasmoved = true;
          }
          n[0]++
        }
      }
      if(d==2) { 
        if(!(i[0]+1>4)) {
          n[0]++
          if((!(currmap[n[0]][n[1]]=='w'))&&(!(currmap[n[0]][n[1]]=='e'))&&(!(currmap[n[0]][n[1]]=='c'&&hasexting()))&&(!(currmap[n[0]][n[1]]=='v'))&&(!(currmap[n[0]][n[1]]=='k'))&&(!(currmap[n[0]][n[1]]=='g'))&&(!(currmap[n[0]][n[1]]=='f')&&(!(currmap[n[0]][n[1]]=='s')))&&(!(currmap[n[0]][n[1]]=='='))){
            if(currmap[n[0]][n[1]]=='t'){
              currmap[n[0]][n[1]] = 'f'
            }
            currmap[n[0]][n[1]] = 'f'
            hasmoved = true;
          }
          n[0]--
        }
      }
      if(d==3) { 
        if(!(i[1]-1<0)) {
          n[1]--
          if((!(currmap[n[0]][n[1]]=='w'))&&(!(currmap[n[0]][n[1]]=='e'))&&(!(currmap[n[0]][n[1]]=='c'&&hasexting()))&&(!(currmap[n[0]][n[1]]=='v'))&&(!(currmap[n[0]][n[1]]=='k'))&&(!(currmap[n[0]][n[1]]=='g'))&&(!(currmap[n[0]][n[1]]=='f')&&(!(currmap[n[0]][n[1]]=='s')))&&(!(currmap[n[0]][n[1]]=='='))){
            if(currmap[n[0]][n[1]]=='t'){
              currmap[n[0]][n[1]] = 'f'
            }
            currmap[n[0]][n[1]] = 'f'
            hasmoved = true;
          }
          n[1]++
        }
      }
      if(d==4) { 
        if(!(i[1]+1>10)) {
          n[1]++
          if((!(currmap[n[0]][n[1]]=='w'))&&(!(currmap[n[0]][n[1]]=='e'))&&(!(currmap[n[0]][n[1]]=='c'&&hasexting()))&&(!(currmap[n[0]][n[1]]=='v'))&&(!(currmap[n[0]][n[1]]=='k'))&&(!(currmap[n[0]][n[1]]=='g'))&&(!(currmap[n[0]][n[1]]=='f')&&(!(currmap[n[0]][n[1]]=='s')))&&(!(currmap[n[0]][n[1]]=='='))){
            if(currmap[n[0]][n[1]]=='t'){
              currmap[n[0]][n[1]] = 'f'
            }
            currmap[n[0]][n[1]] = 'f'
            hasmoved = true;
          }
          n[1]--
        }
      }
      hasmoved = true;
    }
  });
  updatetable(currmap)
}

function changedir(dir){
  direction = dir
}

function getdirection(e){
  if(!hasstarted) {
    removeoverlay()
    dir = ''
    cmoveint = setInterval(moveplayer, pspeed*speed)
    pmoveint = setInterval(movepeople, 900*speed)
    imoveint = setInterval(moveinfector, 1100*speed)
    fmoveint = setInterval(movefire, 1400*speed)
    gmoveint = setInterval(moveguard, 500*speed)
    hasstarted = true;
  }
  if(e.keyCode==87||e.keyCode==38){
    d = 'w'
  }else if(e.keyCode==83||e.keyCode==40){
    d = 's'
  }else if(e.keyCode==65||e.keyCode==37){
    d = 'a'
  }else if(e.keyCode==68||e.keyCode==39){
    d = 'd'
  }else {
    return false
  }
  changedir(d)
}

document.addEventListener("keydown", getdirection)

window.onload = (function(){
  loadmap(currlev)
})


/* CREATOR CODE */
sss = [];

function selectspot(e) {
  if(sss.indexOf(e.getAttribute("id"))>-1) {
    e.style = ''
    sss.pop(e.getAttribute("id"))
  }else{
    sss.push(e.getAttribute("id"))
    e.style = 'border: solid 1px lightblue;'
  }
}

function selecttile(t, j){
  sss.forEach(function(i){
    e = document.getElementById(i)
    i = i.split('c')
    console.log(i)
    m[i[0][1]][i[1]] = t
    document.getElementById('code').innerHTML = JSON.stringify(m)
    loadmap(0)
    e.innerHTML = j
    selectspot(e)
  })
}