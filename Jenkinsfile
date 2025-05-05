pipeline {
    agent any
    
    tools {
        nodejs "nodejs14"
    }
    
    environment {
        DOCKER_IMAGE = "my-nodejs-app:${BUILD_NUMBER}"
        CONTAINER_NAME = "nodejs-app-container"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE} ."
            }
        }
        
        stage('Deploy Docker Container') {
            steps {
                sh '''
                echo "Stopping any existing container..."
                docker stop ${CONTAINER_NAME} || true
                docker rm ${CONTAINER_NAME} || true
                
                echo "Starting new container..."
                docker run -d -p 3000:3000 --name ${CONTAINER_NAME} ${DOCKER_IMAGE}
                '''
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
