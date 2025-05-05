pipeline {
    agent any
    
    tools {
        nodejs "nodejs14"
    }
    
    parameters {
        choice(name: 'ENVIRONMENT', choices: ['development', 'staging', 'production'], description: 'Deployment Environment')
    }
    
    environment {
        DOCKER_IMAGE = "my-nodejs-app:${BUILD_NUMBER}-${params.ENVIRONMENT}"
        CONTAINER_NAME = "nodejs-app-${params.ENVIRONMENT}"
        PORT_MAPPING = "${params.ENVIRONMENT == 'production' ? '80:3000' : '3000:3000'}"
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
                sh "docker build --build-arg NODE_ENV=${params.ENVIRONMENT} -t ${DOCKER_IMAGE} ."
            }
        }
        
        stage('Deploy to Environment') {
            steps {
                sh '''
                echo "Stopping any existing container..."
                docker stop ${CONTAINER_NAME} || true
                docker rm ${CONTAINER_NAME} || true
                
                echo "Starting new container for ${ENVIRONMENT} environment..."
                docker run -d -p ${PORT_MAPPING} -e NODE_ENV=${ENVIRONMENT} --name ${CONTAINER_NAME} ${DOCKER_IMAGE}
                '''
            }
        }
        
        stage('Verify Deployment') {
            steps {
                sh '''
                echo "Verifying deployment..."
                sleep 5
                curl -s http://localhost:${PORT_MAPPING.split(':')[0]}/health | grep "${ENVIRONMENT}"
                '''
            }
        }
    }
    
    post {
        success {
            echo "Pipeline completed successfully! Application deployed to ${params.ENVIRONMENT} environment"
        }
        failure {
            echo "Pipeline failed! ${params.ENVIRONMENT} deployment unsuccessful"
        }
    }
}
