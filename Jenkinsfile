node {
  stage('Git Clone') {
    echo "GitLab master 브랜치 Clone 중..."
    git credentialsId: 'gitlab', url: 'https://lab.ssafy.com/s08-bigdata-recom-sub2/S08P22A805.git'
  }

  stage('Remove Existing Container And Image') {
    sh '''
      echo "백엔드 서버 컨테이너 종료"
      docker stop whizzle-back

      echo "사용하지 않는 컨테이너 삭제"
      docker container prune -f

      echo "사용하지 않는 이미지 삭제"
      docker image prune -a -f
    '''
}

stage('Build Spring Server Image')
    echo "Dockerfile를 이용하여 백엔드 서버 이미지 생성"
    sh '''
      docker build -t whizzle/back ./back
    '''
  }

  stage('Run Spring Server Container') {
    echo "백엔드 서버 컨테이너 실행"
    sh '''
      docker run -it -d \
        --name whizzle-back \
        -p 8080:8080 \
        -v /app/data/spring/config:/app/config \
        whizzle/back
    '''
  }