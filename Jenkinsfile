node {
  stage('Git Clone') {
    echo "GitLab master 브랜치 Clone 중..."
    git 'git@lab.ssafy.com:s08-bigdata-recom-sub2/S08P22A805.git'
  }

  stage('Build Spring Server Image') {
    echo "Dockerfile를 이용하여 백엔드 서버 이미지 생성 중"
    sh 'docker build -t whizzle/back ./back'
  }

  stage('Run Spring Server Container') {
    echo "백엔드 서버 컨테이너 실행 중"
    sh '''
    docker run -it -d \
      --name whizzle-back \
      -p 8080:8080 \
      --net backend-network \
      -v /~/data/spring/config:/~/config \
      whizzle/back
    '''
  }
}