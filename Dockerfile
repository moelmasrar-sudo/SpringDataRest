FROM maven:3.9.16-eclipse-temurin-21-alpine as builder

WORKDIR /app

COPY pom.xml .

# Resolve dependencies (less aggressive than go-offline, prevents hanging)
RUN mvn dependency:resolve dependency:resolve-plugins -B

COPY src ./src

RUN mvn -B -DskipTests clean package

FROM eclipse-temurin:21-jre-alpine as runner

WORKDIR /app

COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]