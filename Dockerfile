FROM jenkins/jenkins:lts-jdk11
USER root

# docker-cli 설치
RUN apt-get update && \
	  apt-get -y install \
      apt-transport-https \
	    ca-certificates \
	    curl \
	    software-properties-common && \
	  curl -fsSL https://download.docker.com/linux/$(. /etc/os-release; echo "$ID")/gpg | apt-key add - && \
	  add-apt-repository "deb [arch=$(dpkg --print-architecture)] https://download.docker.com/linux/$(. /etc/os-release; echo "$ID") $(lsb_release -cs) stable" && \
	  apt-get update && \
	  apt-get -y install docker-ce-cli

# docker compose 설치
RUN curl -L "https://github.com/docker/compose/releases/download/v2.16.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && \
    chmod +x /usr/local/bin/docker-compose