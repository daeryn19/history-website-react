pipeline {
    agent any
    environment {
        DOCKER_IMAGE = "daeryn19/history-website"
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install dependencies') {
            steps {
                dir('history-website') {
                    sh 'npm install --omit=dev'
                }
            }
        }
        stage('Build') {
            steps {
                dir('history-website') {
                    sh 'npm run build'
                }
            }
        }
        stage('Docker Build') {
            steps {
                dir('history-website') {
                    sh 'docker build -t $DOCKER_IMAGE .'
                }
            }
        }
        stage('Docker Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKERHUB_USER', passwordVariable: 'DOCKERHUB_PASS')]) {
                    dir('history-website') {
                        sh 'echo $DOCKERHUB_PASS | docker login -u $DOCKERHUB_USER --password-stdin'
                        sh 'docker push $DOCKER_IMAGE'
                    }
                }
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}
