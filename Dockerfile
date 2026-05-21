FROM alpine/java:21-jre as build

COPY target/*.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]