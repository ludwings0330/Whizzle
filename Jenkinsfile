node {
  stage('Git Clone') {
    echo "GitLab master 브랜치 Clone 중..."
    git credentialsId: 'gitlab', url: 'https://lab.ssafy.com/s08-bigdata-recom-sub2/S08P22A805.git'
  }

  stage('Remove Existing Spring Server Container And Image') {
    sh '''
      echo "백엔드 서버 컨테이너 종료"
      if docker ps -a --format "{{.Names}}" | grep -q whizzle-back; then
        echo "Stopping container: whizzle-back"
        docker stop $(docker ps -a --format "{{.Names}}" | grep whizzle-back)
      else
        echo "Container whizzle-back does not exist"
      fi

      echo "사용하지 않는 컨테이너 삭제"
      docker container prune -f

      echo "사용하지 않는 이미지 삭제"
      docker image prune -a -f
    '''
  }

  stage('Build Spring Server Image') {
    echo "Dockerfile를 이용하여 백엔드 서버 이미지 생성"
    sh '''
      docker build -t whizzle/back ./back
    '''
  }

  stage('Run Spring Server Container') {
    echo "백엔드 서버 컨테이너 실행"
    sh '''
      docker run -it --rm \
        --name whizzle-back-01 \
        -p 8080:8080 \
        -v /app/data/spring/config:/app/config \
        -d whizzle/back

      docker run -it --rm \
        --name whizzle-back-02 \
        -p 8081:8080 \
        -v /app/data/spring/config:/app/config \
        -d whizzle/back
    '''
  }

  stage('Remove Existing Front Container And Image') {
    sh '''
      echo "프론트 컨테이너 종료"
      if docker ps -a --format "{{.Names}}" | grep -q whizzle-front; then
        echo "Stopping container: whizzle-front"
        docker stop $(docker ps -a --format "{{.Names}}" | grep whizzle-front)
      else
        echo "Container whizzle-front does not exist"
      fi

      echo "사용하지 않는 컨테이너 삭제"
      docker container prune -f

      echo "사용하지 않는 이미지 삭제"
      docker image prune -a -f
    '''
  }

  stage('Build Front Image') {
    echo "Dockerfile를 이용하여 프론트 이미지 생성"
    sh '''
      docker build -t whizzle/front ./front
    '''
  }

  stage('Run Front Container') {
    echo "프론트 컨테이너 실행"
    sh '''
      docker run -it --rm \
        --name whizzle-front-01 \
        --net front-net \
        --net-alias front-net-dns \
        -p 3001:80 \
        -d whizzle/front

      docker run -it --rm \
        --name whizzle-front-02 \
        --net front-net \
        --net-alias front-net-dns \
        -p 3002:80 \
        -d whizzle/front
    '''
  }

  stage('Build FastAPI Server Image') {
    echo "Dockerfile를 이용하여 FastAPI 이미지 생성"
    sh '''
      cd rec-fastapi
      docker build -t whizzle/rec -f ./deploy/Dockerfile .
    '''
  }

  stage('Run FastAPI Container') {
    echo "FastAPI 컨테이너 실행"
    sh '''
      docker run -it --rm \
        --name whizzle-rec \
        -p 8000:8000 \
        -d whizzle/rec
    '''
  }
}