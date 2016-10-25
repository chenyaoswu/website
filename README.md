安装npm：
yum安装
yum install -y npm

使用taobao源 参考 https://npm.taobao.org/
alias cnpm="npm --registry=https://registry.npm.taobao.org \
--cache=$HOME/.npm/.cache/cnpm \
--disturl=https://npm.taobao.org/dist \
--userconfig=$HOME/.cnpmrc"

安装包
cnpm install -g pm2 && cnpm install -g grunt && cnpm install -g gulp

如提示“Error: CERT_UNTRUSTED”，请执行：
cnpm config set strict-ssl false
安装nvm
nvm git项目clone到/usr/local/nvm
git clone https://github.com/creationix/nvm.git /usr/local/nvm && cd /usr/local/nvm && git checkout `git describe --abbrev=0 --tags`
node项目
source /usr/local/nvm/nvm.sh

安装指定版本node，并设为系统默认node，以v0.12为例
nvm install v0.12.7

# /usr/local/bin需在PATH环境变量中才能达到默认的效果
n=$(which node);n=${n%/bin/node}; nvm deactivate ; echo $PATH | grep -q "$n/bin" || cp -rv $n/{bin,lib,share} /usr/local