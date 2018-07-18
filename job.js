 const redis = require("redis");
 var CircularJSON = require('circular-json');
 const client = redis.createClient("6379","127.0.0.1");

client.on('ready',function(error) {
	console.log("  订阅 删除事件 ....."+JSON.stringify(error));
   initRedisSubscribe();
});


client.on('connect',function(error){
    console.log('connect. 成功.....',+JSON.stringify(error));
});


client.on('error', function(error) {
	console.log("  出错 重新订阅删除事件 ....."+JSON.stringify(error));
    initRedisSubscribe();
})

/**
 *  订阅键值过期事件
 *
 */
function initRedisSubscribe() {  
    client.psubscribe('__keyevent@' + 0 + '__:expired');
}
/**
 *  添加任务
 *   jobName  任务名称
 *   timeOut  过期时间
 *   obj      存储值         
 */
client.addJob = function(jobName,timeOut){
  console.log('   client '+CircularJSON.stringify(client));
   client.SETEX(jobName,timeOut,"This is Message ");
}

client.getValue = function(key){
  if(key == null) return null;
  client.get(key);
}

/**
 *   取消定时操作
 *  jobName  任务名称  
 */
client.cancel = function(jobName){
  console.log("  取消定时任务 .....");
  client.del(jobName);
}
/**
* 任务传递出去
*/
client.getJob = function(callBack){
/**
 *   pattern： 监听事件名称   __keyevent@0__:expired
 *   channel： 监听频道       __keyevent@0__:expired
 *   message： Message      键值名 
 */
  client.on("pmessage",function (pattern, channel, message){
    if (typeof callBack === 'function') {
      console.log(" pmessage 收到监听....... "+pattern+'  channel '+channel+'   message  '+message);
      callBack(pattern,channel,message);
    }
  });
}
module.exports = client;
