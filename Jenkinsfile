@Library("Shared") _
pipeline{
    agent { label 'agent-1' }
    stages{
        stage("Hello"){
            steps{
                script{
                    hello()
                }
            }
        }
        
        stage("Code"){
            steps{
                script{
                    clone("https://github.com/Ashutosh8709/E-commerce-Platform.git","main")
                }
            }
        }
        stage('Inject ENV files') {
            steps {
                withCredentials([
                    file(credentialsId: 'backend-env-file', variable: 'BACKEND_ENV'),
                    file(credentialsId: 'frontend-env-file', variable: 'FRONTEND_ENV')
                ]) {
                    sh '''
                        cp "$BACKEND_ENV" backend/.env
                        cp "$FRONTEND_ENV" frontend/.env
                    '''
                }
            }
        }
        stage("Build"){
            steps{
                echo "This is building the code"
                script{
                    docker_build("ecommerce-backend","latest","backend")
                    docker_build("ecommerce-frontend","latest","frontend")
                }
            }
        }
        stage("Push to DockerHub"){
            steps{
                echo "This is pushing the image to Docker Hub"
                script{
                    docker_push()
                }
            }
        }
        stage("Test"){
            steps{
                echo "This is testing the code"
            }
        }
        stage("Deploy"){
            steps{
                echo "This is deploying the code"
                sh "docker compose pull"
                sh "docker compose up -d"
            }
        }
    }
}
