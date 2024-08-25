# SuperCoolFlights

## Links

- [Source code](https://github.com/JeremyTubongbanua/SOFE3980U-FinalProject)
- [Video presentation](https://youtu.be/U1nbSbZJfDw)

## Description

This was our SOFE 3980U (Software Quality) final project. In this final project, we had to exemplify DevOps principles such as CI/CD and how we used it in our project.

## CI

To exemplify CI, we used GitHub actions to run tests on our project. We had a test suite that would run on every push to the main branch. If the tests failed, the build would fail, and we would be notified.

## CD

To exemplify CD, we used Docker to containerize our application. We then used GitHub actions to build the Docker image and push it to Docker Hub. We then had a VPS that would pull the Docker image from Docker Hub and run it.
