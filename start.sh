function toUpperCase() {
	echo $1 | awk '{print toupper($0)}'
}

#read env, read port
env=$1

usage='bash start.sh env'
if [[ -z ${env} ]]; then
	echo ${usage}
	exit 1
fi

BIG_ENV=$(toUpperCase ${env})

HOST_KEY=${BIG_ENV}'_YXJ_H5_HOST'
host=$(eval echo "$"${HOST_KEY})

if [[ -z ${host} ]]; then
	echo 'please set env '$HOST_KEY
	exit 1
fi

echo "REACT_APP_HOST=${host}" >.env

image=youxiangju_web

docker build . -t $image

container=$env.$image

docker stop $container
docker rm $container

docker run --name $container \
	--restart=always \
	-d \
	$image

docker network connect inner ${container}
