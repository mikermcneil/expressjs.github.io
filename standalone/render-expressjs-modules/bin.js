#!/usr/bin/env node

require('./')({},function (err, result){
  if (err) {
    console.error(err);
    return process.exit(1);
  }
  console.log(result);
});
