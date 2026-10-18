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
                    ./mvnw -B clean package -DskipTests -Dhttp.keepAlive=false -Dmaven.wagon.http.retryHandler.count=5
                '''
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                sh '''
                    echo "Setting directory permissions..."
                    chmod -R 755 .
                    echo "Stopping and removing existing containers to avoid name collisions..."
                    (docker compose down --remove-orphans || docker-compose down --remove-orphans) || true
                    docker rm -f eureka-server mongodb zookeeper kafka api-gateway auth-service product-service order-service cart-service payment-service category-service notification-service delivery-service search-service frontend-web || true
                    echo "Deploying microservices using Docker Compose..."
                    (docker compose up -d --build || docker-compose up -d --build)
                    (docker compose ps || docker-compose ps)
                '''
            }
        }
    }

    post {
        success {
            echo "Deployment successful! You can view your application at http://129.225.81.252"
        }
        failure {
            echo "Pipeline failed. Please check the logs above."
        }
    }
}
