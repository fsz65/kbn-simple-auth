# kbn-simple-auth
用于kibana项目权限改造(auth for kibana)
<br>

## 代码说明
* 本代码用于kibana的服务端插件
* 通过在hapi前增加一层express代理的方式，对每个url实行过滤，并通过url携带的cookie判断是否该产品的使用权限。
* 由于我们在项目中已经有javaweb工程，使用kibana主要是对原有的java web进行功能的扩展和补充，因此在权限方面与java web工程对接。由于my company 有统一的登录平台，类似于国内的csdn登录的方式。因为插件实现的登录及权限的基本思路如下：
    + java web工程提供查询接口，根据user获得该用户的权限标识（返回数据是json）
    + 每一个走express代理的url，获取该request的cookie，向java web接口发送请求，如果返回状态码非200，则认为需要登录（改造该request为登录请求后，提交给hapi）。否则把该request提交给hapi