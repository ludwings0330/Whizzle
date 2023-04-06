node {
  def deployedBack
  def newFrontImage

  stage('Git Clone') {
    echo "GitLab master 브랜치 Clone 중..."
    git credentialsId: 'gitlab', url: 'https://lab.ssafy.com/s08-bigdata-recom-sub2/S08P22A805.git'
  }

  stage('Find Deployed File') {
    deployedBack = sh(
            script: 'docker-compose -f /deploy/back-02/docker-compose.yml ps -q | wc -l',
            returnStdout: true
    ).trim().toInteger()
    print(deployedBack)
  }

  stage('Build Spring Server Image') {
    def newImage = (deployedBack > 0) ? 'whizzle/back:1' : 'whizzle/back:2'
    print(newImage)

    sh "docker build -t ${newImage} -f ./back/deploy/Dockerfile ."
  }

  stage('Run New Spring Containers') {
    echo "새로운 버전의 Spring Server 컨테이너를 실행합니다."

    def composeFilePath = (deployedBack > 0) ? 'back-01' : 'back-02'
    sh "docker-compose -f /deploy/${composeFilePath}/docker-compose.yml up -d"
  }

  stage('Check Health of New Spring Containers') {
    echo "새로운 버전의 Spring Server에 대하여 Health Check를 수행합니다."

    def composeFilePath = (deployedBack > 0) ? 'back-01' : 'back-02'
    def containerCnt = sh(
            script: "docker-compose -f /deploy/${composeFilePath}/docker-compose.yml ps -q | wc -l",
            returnStdout: true
    ).trim().toInteger()
    print(containerCnt)

    if (!isHealthy(composeFilePath, containerCnt)) {
      error('Spring Server의 Health Check 결과 Unhealty이므로 Pipeline을 종료합니다.')
    }
  }

  stage('Reload Nginx') {
    def upstream

    if (deployedBack > 0) {
      upstream = "echo \"upstream springs { server localhost:8080; server localhost:8081; }\" > /etc/nginx/conf.d/upstream.conf"
    } else {
      upstream = "echo \"upstream springs { server localhost:8082; server localhost:8083; }\" > /etc/nginx/conf.d/upstream.conf"
    }

    print("Nginx 설정 변경")
    sh """
          docker exec nginx sh -c '${upstream}'
          docker exec nginx \
            nginx -s reload
        """
  }

  stage('Remove Existing Spring Server Container And Image') {
    def composeFilePath = (deployedBack > 0) ? 'back-02' : 'back-01'
    print(composeFilePath)

    def containerCnt = sh(
            script: "docker-compose -f /deploy/${composeFilePath}/docker-compose.yml ps -q | wc -l",
            returnStdout: true
    ).trim().toInteger()
    print(containerCnt)

    if (containerCnt > 0) {
      print("기존의 Sprint Server Container를 종료합니다.")
      sh "docker-compose -f /deploy/${composeFilePath}/docker-compose.yml down"
    } else {
      print("기존의 Sprint Server Container가 존재하지 않습니다.")
    }

    sh '''
          echo "사용하지 않는 컨테이너 삭제"
          docker container prune -f
            
          echo "사용하지 않는 이미지 삭제"
          docker image prune -a -f
        '''
  }

  stage('Build Web Server Image') {
    def oldImage
    try {
      oldImage = sh(
              script: "docker inspect -f {{.Config.Image}} whizzle-front-01",
              returnStdout: true
      ).trim()
      print("기존의 웹 서버 이미지명 : ${oldImage}")
    } catch (Exception e) {
      oldImage = "whizzle/front:2"
    }

    newFrontImage = (oldImage == "whizzle/front:2") ? "whizzle/front:1" : "whizzle/front:2"
    print("새로운 웹 서버 이미지명: ${newFrontImage}")

    print("Dockerfile를 이용하여 프론트 이미지 생성")
    sh "docker build -t ${newFrontImage} -f ./front/deploy/Dockerfile ."
  }

  stage('Rolling Web Server Container') {
    int deployedFront = sh(
            script: 'docker ps --format {{.Names}} | grep whizzle-front | wc -l',
            returnStdout: true
    ).trim().toInteger()
    print(deployedFront)

    if (deployedFront == 0) {
      echo "프론트 컨테이너 실행"
      sh """
              docker run -it --rm \
                --name whizzle-front-01 \
                --net front-net \
                --net-alias front-net-dns \
                -p 3001:80 \
                -d ${newFrontImage}
        
              docker run -it --rm \
                --name whizzle-front-02 \
                --net front-net \
                --net-alias front-net-dns \
                -p 3002:80 \
                -d ${newFrontImage}
            """
      return
    }

    for (int i = 1; i <= deployedFront; i++) {
      def port = 3000 + i
      def containerName = removeContainer(port)

      print("새로운 웹 서버 컨테이너를 실행합니다.")
      sh """
              docker run -it --rm \
                --name ${containerName} \
                --net front-net \
                --net-alias front-net-dns \
                -p ${port}:80 \
                -d ${newFrontImage}
            """

      checkHealthy(port)
    }

    sh '''
              echo "사용하지 않는 컨테이너 삭제"
              docker container prune -f
        
              echo "사용하지 않는 이미지 삭제"
              docker image prune -a -f
            '''
  }

  stage('Remove Existing FastAPI Container And Image') {
    sh '''
          echo "FastAPI 컨테이너 종료"
          if docker ps -a --format "{{.Names}}" | grep -q whizzle-rec; then
            echo "Stopping container: whizzle-front"
            docker stop $(docker ps -a --format "{{.Names}}" | grep whizzle-rec)
          else
            echo "Container whizzle-rec does not exist"
          fi
    
          echo "사용하지 않는 컨테이너 삭제"
          docker container prune -f
    
          echo "사용하지 않는 이미지 삭제"
          docker image prune -a -f
        '''
  }

  stage('Build FastAPI Server Image') {
    echo "Dockerfile를 이용하여 FastAPI 이미지 생성"
    sh '''
          docker build -t whizzle/rec -f ./rec-fastapi/deploy/Dockerfile .
        '''
  }

  stage('Run FastAPI Container') {
    echo "FastAPI 컨테이너 실행"
    sh '''
          docker run -i --rm \
            --name whizzle-rec \
            --net back-net \
            --net-alias rec-net-dns \
            -p 8000:8000 \
            -v /app/data/fast-api/config:/src/config \
            -v /app/data/fast-api/original:/src/original \
            -v /app/data/fast-api/backup:/src/backup \
            -d whizzle/rec
        '''
  }

  stage('Prune Networks') {
    echo "사용하지 않는 네트워크 제거"
    sh '''
          docker network prune -f
        '''
  }
}

private boolean isHealthy(composeFileName, containerCnt) {
  def retryCnt = 10
  while (retryCnt-- > 0) {
    def healthyCnt = sh(
            script: "docker-compose -f /deploy/${composeFileName}/docker-compose.yml ps | grep healthy | wc -l",
            returnStdout: true
    ).trim().toInteger()
    print(healthyCnt)

    if (containerCnt == healthyCnt) {
      return true
    }

    sleep 10
  }

  return false
}

def removeContainer(port) {
  def containerName = sh(
          script: "docker ps | grep \"${port}->\" | awk '{print \$NF}'",
          returnStdout: true
  ).trim()
  print("제거할 컨테이너명 : ${containerName}")

  print("기존의 웹 서버 컨테이너를 제거합니다.")
  sh "docker rm -f ${containerName}"
  return containerName;
}

def checkHealthy(port, maxAttempts = 5, sleepTime = 10) {
  def command = "curl -f http://j8a805.p.ssafy.io:${port}/health"

  while (maxAttempts-- > 0) {
    try {
      sh(command)
      print("${port}를 사용하는 새로운 웹 서버가 아주 건강하군요!")
      return true
    } catch (Exception e) {
      print("${port}를 사용하는 새로운 웹 서버 준비 중...")
      sleep sleepTime
    }
  }

  error("새로운 웹 서버 실행에 실패했습니다.")
}