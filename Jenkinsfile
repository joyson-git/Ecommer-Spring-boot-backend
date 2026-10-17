pipeline {
    agent any

    options {
        timestamps()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Spring Boot Services') {
            steps {
                sh '''
                    java -version
                    chmod +x mvnw
                    ./mvnw -B clean package -DskipTests
                '''
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                sh '''
                    echo "Deploying microservices using Docker Compose..."
                    (docker compose down || docker-compose down) || true
                    (docker compose up -d --build || docker-compose up -d --build)
                    (docker compose ps || docker-compose ps)
                '''
            }
        }
    }

    post {
        success {
            echo "Deployment successful! You can view your application at http://140.245.243.106"
        }
        failure {
            echo "Pipeline failed. Please check the logs above."
        }
    }
}
