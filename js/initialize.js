chargerTb(1).then((res)=>{
    localStorage.setItem('sexes', res)
});

chargerTb(10).then((res)=>{
    localStorage.setItem('utilisateurs', res)
});

chargerTb(13).then((res)=>{
    localStorage.setItem('notifications', res)
});

chargerTb(5).then((res) => {
    localStorage.setItem('stations', res)
});

chargerTb(11).then((res) => {
    localStorage.setItem('roles', res)
});

chargerTb(4).then((res) => {
    localStorage.setItem('pompes', res)
});

chargerTb(2).then((res) => {
    localStorage.setItem('lavages', res)
});

chargerTb(6).then((res) => {
    localStorage.setItem('vidanges', res)
});

chargerTb(14).then((res) => {
    localStorage.setItem('citernes', res)
});

