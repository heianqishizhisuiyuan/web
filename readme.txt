
##安装nrm
$ npm install -g nrm

##添加新的npm服务
$ nrm add mk-npm http://101.201.212.128:8000

##使用新的npm服务
$ nrm use mk-npm

##通过npm安装依赖包
$ npm install

npm --registry=http://101.201.212.128:8000 install