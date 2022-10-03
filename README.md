# hrms

This application was generated using  6.10.5 and  Quarkus 1.1.1, you can find documentation and help at [https://www..tech/documentation-archive/v6.10.5](https://www..tech/documentation-archive/v6.10.5).

## Development

To start your application in the dev profile, run:

    ./mvnw

For further instructions on how to develop with , have a look at [Using  in development][].

## Building for production

### Packaging as thin jar

To build the final jar and optimize the hrms application for production, run:

```
./mvnw -Pprod clean package
```

To ensure everything worked, run:

    java -jar target/quarkus-app/*.jar

Refer to [Using  in production][] for more details.

### Packaging as native executable

_Targeting your Operation System_
In order to build a native image locally, your need to have [GraalVM](https://www.graalvm.org/) installed and `GRAALVM_HOME` defined.
You can use the `native` profile as follow to build native executable.

```
./mvnw package -Pnative
```

Keep in mind that the generated native executable is dependent on your Operating System.

_Targeting a container environment_
If you plan to run your application in a container, run:

```
./mvnw package -Dnative -Dquarkus.native.container-build=true
```

It will use a Docker container with GraalVM installed and produce an 64 bit Linux executable.

## Testing

To launch your application's tests, run:

    ./mvnw verify

For more information, refer to the [Running tests page][].

## Using Docker to simplify development (optional)

You can use Docker to improve your  development experience. A number of docker-compose configuration are available in the [src/main/docker](src/main/docker) folder to launch required third party services.

For example, to start a mysql database in a docker container, run:

    docker-compose -f src/main/docker/mysql.yml up -d

To stop it and remove the container, run:

    docker-compose -f src/main/docker/mysql.yml down

