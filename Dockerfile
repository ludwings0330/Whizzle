FROM jenkins/jenkins:lts-jdk11
USER root

RUN apt-get update && \
	  apt-get -y install \
      apt-transport-https \
	    ca-certificates \
	    curl \
	    software-properties-common && \
	  curl -fsSL https://download.docker.com/linux/$(. /etc/os-release; echo "$ID")/gpg | apt-key add - && \
	  add-apt-repository "deb [arch=$(dpkg --print-architecture)] https://download.docker.com/linux/$(. /etc/os-release; echo "$ID") $(lsb_release -cs) stable" && \
	  apt-get update && \
	  apt-get -y install docker-ce-cli \