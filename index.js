 var client = require("./job");
 var CircularJSON = require('circular-json');
 var ORDER_STORE_CANCEL_TIMEOUT_='order_store_cancel_timeout_',
 ORDER_USER_CANCEL_TIMEOUT_='order_user_cancel_timeout_',
 ORDER_WAIT_EVALUATION_TIMEOUT_='order_wait_evaluation_timeout_',
 ORDER_ALREADY_DIST_TIMEOUT_='order_already_dist_timeout_'; 
 var ORDER_CANCEL_TIMEOUT = 20 ,ORDER_EVALUATION_TIMEOUT = 120;





// client.addJob("myTest3",20,"Testing 3333  addJob .....");
// client.addJob("myTest4",30,"Testing 4444  addJob .....");

// client.cancel("myTest4");

client.getJob(function(pattern, channel, message){
    var type = message.substring(0,message.lastIndexOf('_')+1);
    var objectId = message.substring(message.lastIndexOf('_')+1);
    console.log("改变订单的状态值：    "+message+"    type 值：   "+type+"   objectId 值：  "+objectId);
    
});



// setTimeout(function(){  //注释调此函数， 运行正常。  

  client.addJob("myTest2",30);

// },30);
 
   




