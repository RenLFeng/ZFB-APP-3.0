#read env, read port
env=$1

usage='bash start.sh env'
if [[ -z ${env} ]]; then
	echo ${usage}
	exit 1
fi

if [[ -z ${APP_API_HOST} ]]; then
	echo 'please config env var APP_API_HOST'
	exit 1
fi

host=http://$env-${APP_API_HOST}

echo "REACT_APP_HOST=${host}" >.env

cat .env

image=pospay-h5
container=$env-$image

docker build . -t $image
docker stop $container
docker rm $container

docker run \
	--name $container \
	--restart=always \
  --network inner \
	-d \
	$image