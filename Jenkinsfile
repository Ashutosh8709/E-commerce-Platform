@Library("Shared") _
pipeline{
    agent { label 'agent-1' }

    environment{
        SONAR_HOME= tool "Sonar"
    }


    parameters{
        string(name: 'FRONTEND_DOCKER_TAG',defaultValue: '', description: 'Setting docker image for latest push')
        string(name: 'BACKEND_DOCKER_TAG',defaultValue: '', description: 'Setting docker image for latest push')
    }

    stages{
        stage("Validate Parameters"){
            steps{
                script{
                    if(params.FRONTEND_DOCKER_TAG == '' || params.BACKEND_DOCKER_TAG == ''){
                        error("FRONTEND_DOCKER_TAG and BACKEND_DOCKER_TAG must be provided.")
                    }
                }
            }
        }

        stage("Workspace cleanup"){
            steps{
                script{
                    cleanWs()
                }
            }
        }

        stage("Git: Code Clonning"){
            steps{
                script{
                    clone("https://github.com/Ashutosh8709/E-commerce-Platform.git","main")
                }
            }
        }


        stage("Trivy: Filesystem scan"){
            steps{
                script{
                    trivy_scan()
                }
            }
        }

        stage("OWASP: Dependency check"){
            steps{
                script{
                    owasp_dependency()
                }
            }
        }

        stage("SonarQube: Code Analysis"){
            steps{
                script{
                    sonarqube_analysis("Sonar","ecommerce","ecommerce")
                }
            }
        }

        stage("SonarQube: Code Quality Gates"){
            steps{
                script{
                    sonarqube_code_quality()
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
        post{
            success{
                archiveArtifacts artifacts: '*.xml', followSymlinks: false
                build job: "Ecommerce-CD", parameters: [
                    string(name: 'FRONTEND_DOCKER_TAG', value: "${params.FRONTEND_DOCKER_TAG}"),
                    string(name: 'BACKEND_DOCKER_TAG', value: "${params.BACKEND_DOCKER_TAG}")
                ]
            }
        }
    }
}
}
