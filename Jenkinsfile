pipeline {
    agent any
    
    tools {
        nodejs "nodejs14"  // Use the name you configured in Global Tool Configuration
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
        
        stage('Build') {
            steps {
                sh 'echo "Build step completed"'
            }
        }
        
        stage('Deploy') {
            steps {
                sh '''
                echo "Deploying application..."
                nohup npm start > app.log 2>&1 &
                echo "Application deployed!"
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
