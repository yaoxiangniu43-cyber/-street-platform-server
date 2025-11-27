function findNearestIdleDriver(drivers, lng, lat){
  const idle = drivers.filter(d=>d.status === 'idle');
  if(!idle.length) return null;
  idle.sort((a,b)=>{
    const da = (a.lng - lng)**2 + (a.lat - lat)**2;
    const db = (b.lng - lng)**2 + (b.lat - lat)**2;
    return da - db;
  });
  return idle[0];
}
module.exports = { findNearestIdleDriver };
