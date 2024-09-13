<p align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="20%" alt="SENTINEL-logo">
</p>
<p align="center">
    <h1 align="center">SENTINEL</h1>
</p>
<p align="center">
    <em>Real-time Data to Grafana Cloud 🚀 🌍 Azure Events Hub Scalability 💪 🔥 Modular Response Structures 💫 🕰 Clean Configuration Interfaces 🔄 🚀 Seamless Authentication Interfaces 🛡️ 📈 Prometheus to Grafana Bridge 🌐</em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/HealthCheckHQ/sentinel?style=default&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/HealthCheckHQ/sentinel?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/HealthCheckHQ/sentinel?style=default&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/HealthCheckHQ/sentinel?style=default&color=0080ff" alt="repo-language-count">
</p>
<p align="center">
	<!-- default option, no dependency badges. -->
</p>

<br>

#####  Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Repository Structure](#repository-structure)
- [Modules](#modules)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Tests](#tests)
- [Project Roadmap](#project-roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

##  Overview

This open-source project, Sentinel, collects sensor data and processes it for real-time monitoring through Grafana Clouds InfluxDB by making API calls. It extends the AzureEventsHubAdapter within its adapter layer to support event exportation to Azure Event Hubs in Prometheus format. The modular structure uses data transfer objects (DTOs) for standardizing data exchange and ensures secure handling and organizing of routes, users, and adapters. Various custom adapters are selectable based on the configuration type, making it versatile in diverse export types.

---

##  Features



---

##  Repository Structure

```sh
└── sentinel/
    ├── .github
    │   ├── CONTRIBUTING.md
    │   ├── ISSUE_TEMPLATE.md
    │   ├── PULL_REQUEST_TEMPLATE.md
    │   └── workflows
    ├── Dockerfile
    ├── LICENSE
    ├── MAINTAINERS.md
    ├── Makefile
    ├── ecosystem.config.js
    ├── entrypoint.sh
    ├── jest.config.js
    ├── nginx.conf
    ├── nodemon.json
    ├── package-lock.json
    ├── package.json
    ├── sample-config.json
    ├── src
    │   ├── adapters
    │   ├── config
    │   ├── dtos
    │   ├── enums
    │   ├── exceptions
    │   ├── interfaces
    │   ├── main.ts
    │   ├── test
    │   ├── utils
    │   └── worker.ts
    ├── swagger.yaml
    └── tsconfig.json
```

---

##  Modules

<details closed><summary>.</summary>

| File | Summary |
| --- | --- |
| [nodemon.json](https://github.com/HealthCheckHQ/sentinel/blob/main/nodemon.json) | Empowers continuous development by automatically restarting the TypeScript application upon changes in the src directory or.env files. Filters log folders and test files, ensuring cleaner progress during software transformations in the Sentinel ecosystem. |
| [swagger.yaml](https://github.com/HealthCheckHQ/sentinel/blob/main/swagger.yaml) | Fetching all users (GET /users)-Creating a new user (POST /users)-Retrieving a specific user by ID (GET /users/{id})-Updating an existing user by ID (PUT /users/{id})-Deleting a user by ID (DELETE /users/{id})Each endpoint is tagged under the users' category, describing functionality for users of the Sentinel API. The definitions section specifies the required properties for a user object: email and password in string format. Additionally, schemas are defined to support both HTTPS and HTTP protocols. |
| [Dockerfile](https://github.com/HealthCheckHQ/sentinel/blob/main/Dockerfile) | The Dockerfile streamslines development process by automating NodeJS version, installing dependencies, building the application, and packaging it for production deployment with an entrypoint script. |
| [Makefile](https://github.com/HealthCheckHQ/sentinel/blob/main/Makefile) | Manages Docker container lifecycle for TypeScript-Express app. Configure builds for production and development, up and down containers, run images, pause, clean images, and remove volumes. Simplifies app deployment with clear phase instructions and versatile tagging system. |
| [jest.config.js](https://github.com/HealthCheckHQ/sentinel/blob/main/jest.config.js) | Configures Jest testing framework to utilize TypeScript for testing within the Sentinel project. Maps TS modules based on paths defined from `tsconfig.json`, ensuring seamless and consistent testing environment. Simplifies setup of testing suite by integrating with ts-jest preset, providing a robust foundation for test execution in Node environment. |
| [sample-config.json](https://github.com/HealthCheckHQ/sentinel/blob/main/sample-config.json) | Defines monitoring checks for internal servers and event trackers; Configures data export to EventHub for analytics and Prometheus compatibility. |
| [package-lock.json](https://github.com/HealthCheckHQ/sentinel/blob/main/package-lock.json) | Autoconfiguration: It configures necessary settings automatically, such as installing dependencies, building project artifacts, and setting up the application for development or production runs.-Modularity: The script relies on other configurations (e.g., `Dockerfile`, `Makefile`, etc.) within the repository structure to accomplish its tasks in an organized manner. This promotes a maintainable architecture that is easy to understand and update.-Dependency management: Using package managers like npm, it installs and upgrades required libraries specified in the project's `package.json` file.-Build automation: It performs build tasks such as compiling TypeScript, running tests using Jest, and more, as specified by the `ecosystem.config.js`, `jest.config.js`, and other configurations.By executing this entrypoint script, developers can quickly get a local instance of Sentinel up and running while adhering to best practices for environment setup and configuration management. |
| [package.json](https://github.com/HealthCheckHQ/sentinel/blob/main/package.json) | This sentinel package, version 1.0.0, is the core worker for HealthCheckHQ Sentinel. It runs scripts for development, testing, and production, leverages a multitude of dependencies for proper functioning, and enforces clean code with linters and TypeScript. |
| [tsconfig.json](https://github.com/HealthCheckHQ/sentinel/blob/main/tsconfig.json) | Configures TypeScript compiler preferences for the project, optimizing for ES2017 syntax, async iterables, decorators, and dynamic imports. Sets output and source map directories, enables pretty printing, and configures module resolution paths for easier imports within the structure. |
| [nginx.conf](https://github.com/HealthCheckHQ/sentinel/blob/main/nginx.conf) | Configures Nginx server for optimal performance. Sets up single worker process, establishes error logging system, and manages connections. Defines an API server on port 3000, routing incoming requests through it to serve our application efficiently. Logs all access and error data accordingly for monitoring and troubleshooting purposes. |
| [entrypoint.sh](https://github.com/HealthCheckHQ/sentinel/blob/main/entrypoint.sh) | Launches the Sentinel worker app at startup, ensuring uninterrupted operation of the system, leveraging Node.js for seamless execution of tasks within the repositorys service ecosystem. |
| [ecosystem.config.js](https://github.com/HealthCheckHQ/sentinel/blob/main/ecosystem.config.js) | This ecosystem.config.js file streamlines deployment by defining production and development modes, automating app restarts, logging errors, and setting environment variables for the Sentinel application server. It also handles the post-deployment process in a production environment, ensuring seamless and efficient application operation. |

</details>

<details closed><summary>src</summary>

| File | Summary |
| --- | --- |
| [main.ts](https://github.com/HealthCheckHQ/sentinel/blob/main/src/main.ts) | The `src/main.ts` file in the Sentinel repository initializes, configures, schedules, and runs health checks for synthetic probes based on user-defined configurations. It coordinates the adapter, queue, and OS signal handler to manage export events efficiently and gracefully handles terminal signals to shut down operations. |
| [worker.ts](https://github.com/HealthCheckHQ/sentinel/blob/main/src/worker.ts) | Orchestrates the Sentinel applications starting sequence. Catching potential errors, it logs issues and exits gracefully if needed. Ensures smooth application startup within parent architecture. |

</details>

<details closed><summary>.github.workflows</summary>

| File | Summary |
| --- | --- |
| [ci.yaml](https://github.com/HealthCheckHQ/sentinel/blob/main/.github/workflows/ci.yaml) | This `ci.yaml` file automates testing and deployment processes within the Sentinel repository. It integrates various workflows like building, linting, and unit testing with GitHub Actions for seamless, efficient development and maintenance. |
| [release.yaml](https://github.com/HealthCheckHQ/sentinel/blob/main/.github/workflows/release.yaml) | Triggers GitHub releases, orchestrating automation of testing, building Docker images, and deploying software changes to the production environment within the Sentinel projects ecosystem, ensuring smooth and efficient workflow for contributors. |

</details>

<details closed><summary>src.test</summary>

| File | Summary |
| --- | --- |
| [dummy.test.ts](https://github.com/HealthCheckHQ/sentinel/blob/main/src/test/dummy.test.ts) | The test suite within src/test/dummy.test.ts verifies the expected behavior of the application, specifically testing if the Create userData response is correct, as part of Sentinel's comprehensive end-to-end testing strategy to ensure software quality and robustness. |

</details>

<details closed><summary>src.config</summary>

| File | Summary |
| --- | --- |
| [index.ts](https://github.com/HealthCheckHQ/sentinel/blob/main/src/config/index.ts) | Loads and manages application configuration from environment variables by initializing dotenv, exposing Sentinel API credentials and config path for seamless access across the software. |

</details>

<details closed><summary>src.enums</summary>

| File | Summary |
| --- | --- |
| [requestType.enum.ts](https://github.com/HealthCheckHQ/sentinel/blob/main/src/enums/requestType.enum.ts) | In this Sentinel repository, the `src/enums/requestType.enum.ts` file delineates the types of HTTP requests available, thereby standardizing and simplifying data handling across the softwares application-level logic. This strategic abstraction fosters uniformity and facilitates modular development for RESTful API interactions. |
| [exportType.enum.ts](https://github.com/HealthCheckHQ/sentinel/blob/main/src/enums/exportType.enum.ts) | In the `sentinel` repository, this TypeScript file, `src/enums/exportType.enum.ts`, defines an enumeration (Enum) called `ExportType`. This Enum enumerates a constant value EVENTHUB, providing structured type definitions for data exchange across modules in the application architecture. |
| [authenticationType.enum.ts](https://github.com/HealthCheckHQ/sentinel/blob/main/src/enums/authenticationType.enum.ts) | Define user authentication types for seamless access control. Key features: NONE, BEARER, BASIC enumeration, enabling flexible authentication strategies within the Sentinel application infrastructure. |
| [logLevel.enum.ts](https://github.com/HealthCheckHQ/sentinel/blob/main/src/enums/logLevel.enum.ts) | This Enum defines the LogLevel (INFO, WARN, ERROR), enabling fine-grained control over outputted messages for efficient and organized debugging & error handling across components. |

</details>

<details closed><summary>src.utils</summary>

| File | Summary |
| --- | --- |
| [osSignalHandler.ts](https://github.com/HealthCheckHQ/sentinel/blob/main/src/utils/osSignalHandler.ts) | Manages Node.js application graceful shutdown via OS signals, ensuring orderly process termination or interrupted execution interruption by detecting and handling SIGTERM and SIGINT events. Ensures clean exit for the application, reducing potential data inconsistencies and resource leaks. |
| [classValidator.ts](https://github.com/HealthCheckHQ/sentinel/blob/main/src/utils/classValidator.ts) | Validates input objects against defined data structures in the Sentinel application, ensuring consistent and validated data flows through the system. Uses class-transformer and class-validator to decorate and non-decoratively validate input objects. |
| [syntheticProbeOrigin.ts](https://github.com/HealthCheckHQ/sentinel/blob/main/src/utils/syntheticProbeOrigin.ts) | Monitors origin performance within Sentinel application. The `syntheticProbeOrigin` function, located at `src/utils/syntheticProbeOrigin.ts`, initiates synthetic probes to assess the health and responsiveness of external origins. It sends HTTP requests with configurable parameters (headers, query params, body) and returns response time, status code, and origins return data, ensuring seamless user experience across all connected applications. |
| [sleep.ts](https://github.com/HealthCheckHQ/sentinel/blob/main/src/utils/sleep.ts) | Enables asynchronous pausing in Sentinels core system through an exported `sleep` function that utilizes Promises and Timeout, facilitating optimal execution flow control. |
| [syntheticHealthCheck.ts](https://github.com/HealthCheckHQ/sentinel/blob/main/src/utils/syntheticHealthCheck.ts) | Monitors health status of specified web services. Leverages Sentinels config for authentication and timeouts. Assesses service availability and reports success/failure via elapsed time and error messages. A key component in Sentinels comprehensive monitoring system. |
| [logger.ts](https://github.com/HealthCheckHQ/sentinel/blob/main/src/utils/logger.ts) | Empowers logging functionality across various project levels by providing customizable log format and streamlining error, warning, and informational messaging to the console. Enhances traceability and troubleshooting for improved software maintenance in this modular Node.js application. |
| [validateEnv.ts](https://github.com/HealthCheckHQ/sentinel/blob/main/src/utils/validateEnv.ts) | Secures application runtime configuration by validating environment variables. Enforces correct usage of NODE_ENV and PORT via `envalid`, ensuring reliable operation of software within the Sentinel repository infrastructure. |

</details>

<details closed><summary>src.adapters</summary>

| File | Summary |
| --- | --- |
| [grafanaCloudPrometheus.adapter.ts](https://github.com/HealthCheckHQ/sentinel/blob/main/src/adapters/grafanaCloudPrometheus.adapter.ts) | Extends data forwarding capabilities of the sentinel application by implementing an adapter for Grafana Cloud Prometheus. The `GrafanaCloudPrometheusAdapter` class receives metric data from sensors, converts it to the appropriate format, and sends it to Grafana Clouds InfluxDB through API calls. This facilitates real-time monitoring and analysis of collected sensor data within Grafana Clouds platform. |
| [baseAdapter.ts](https://github.com/HealthCheckHQ/sentinel/blob/main/src/adapters/baseAdapter.ts) | ValidateConfig()`, `exportEvents()`, `flushData()`, and `shutdown()`. |
| [azureEventshub.adapter.ts](https://github.com/HealthCheckHQ/sentinel/blob/main/src/adapters/azureEventshub.adapter.ts) | This TypeScript file extends the AzureEventsHubAdapter within the Sentinel repositorys adapter layer. It enables event exportation to Azure Event Hubs and supports Prometheus format exports. The adapter validates configuration, initializes the EventHubProducer with ManagedIdentityCredential or AzureCliCredential, and sends events as batch messages. |
| [adapterFactory.ts](https://github.com/HealthCheckHQ/sentinel/blob/main/src/adapters/adapterFactory.ts) | Empowers. Selects appropriate data stream adapter based on configuration type. Offers adaptability by implementing a factory method to create various adapters, ensuring compatibility with different export types within the Sentinel architecture. Leverages AzureEventsHubAdapter for specific use cases, further extending the systems scalability and versatility. |

</details>

<details closed><summary>src.dtos</summary>

| File | Summary |
| --- | --- |
| [checkOriginResponse.dto.ts](https://github.com/HealthCheckHQ/sentinel/blob/main/src/dtos/checkOriginResponse.dto.ts) | Transforms incoming origin responses into standardized CheckOriginResponse objects. Provides additional success/failure subtypes enhancing response handling precision and ease. Structures ProbeResponse object for comprehensive reporting on query outcomes, elapsed time, and relevant data. Contributes to the modular structure by defining custom data transfer objects (DTOs) in the sentinel application. |
| [sentinelParameters.dto.ts](https://github.com/HealthCheckHQ/sentinel/blob/main/src/dtos/sentinelParameters.dto.ts) | This TypeScript file defines data transfer objects (DTOs) for SentinelParameters. It ensures the integrity of the passed data by validating their properties, such as type, array uniqueness, minimum size, and presence, using class-validator. Critical for maintaining clean, consistent input structure in our open-source sentinel projects architecture. |
| [originParameters.dto.ts](https://github.com/HealthCheckHQ/sentinel/blob/main/src/dtos/originParameters.dto.ts) | Validates and structures incoming origin configuration data for service consumption. This TypeScript file defines data transfer objects (DTOs) `OriginConfiguration`, `UpTimeConfiguration`, and `OriginParameters` to handle complex configuration options such as request types, authentication methods, timeouts, headers, and query parameters. Essential for managing diverse origins in a scalable, standardized manner within the Sentinel architecture. |
| [queueItem.dto.ts](https://github.com/HealthCheckHQ/sentinel/blob/main/src/dtos/queueItem.dto.ts) | Transforms incoming probe response data into structured QueueItem objects for efficient processing within the Sentinel application. Critical features include mapping response status to log level, assigning attributes such as name, target, duration, and labels, and handling success or failure scenarios gracefully. |

</details>

<details closed><summary>src.interfaces</summary>

| File | Summary |
| --- | --- |
| [routes.interface.ts](https://github.com/HealthCheckHQ/sentinel/blob/main/src/interfaces/routes.interface.ts) | In this Sentinel project, the `routes.interface.ts` file defines an interface for structuring application routes within the Express framework. This custom interface simplifies handling and organizing various routes efficiently in the architecture. |
| [users.interface.ts](https://github.com/HealthCheckHQ/sentinel/blob/main/src/interfaces/users.interface.ts) | The `users.interface.ts` within the Sentinel repository serves as a blueprint for defining an application user, establishing consistent data structure across the codebase for handling users key attributes like email and password. This interface facilitates seamless interaction between different modules, ensuring robust and maintainable implementation. |
| [auth.interface.ts](https://github.com/HealthCheckHQ/sentinel/blob/main/src/interfaces/auth.interface.ts) | Empowers authentication in the Sentinel projects ecosystem by defining user-focused interfaces for handling requests, tokens, and users. Facilitates secure user handling with seamless integration within the request processing pipeline. |

</details>

<details closed><summary>src.dtos.adapterConfigs</summary>

| File | Summary |
| --- | --- |
| [azureEventsHub.config.ts](https://github.com/HealthCheckHQ/sentinel/blob/main/src/dtos/adapterConfigs/azureEventsHub.config.ts) | Configures Azure Event Hub connection parameters for data transfer in the Sentinel system. Supports options like event hub namespace, name, and connection string, as well as export to Prometheus format flag. |
| [grafanaCloudPrometheus.config.ts](https://github.com/HealthCheckHQ/sentinel/blob/main/src/dtos/adapterConfigs/grafanaCloudPrometheus.config.ts) | Configures Grafana Cloud Prometheus integration for data fetching. Contains essential parameters like instance ID, token, and base URL to establish connection. Integral part of the Sentinels data handling architecture that ensures seamless data flow from external sources. |

</details>

---

##  Getting Started

###  Prerequisites

**TypeScript**: `version x.y.z`

###  Installation

Build the project from source:

1. Clone the sentinel repository:
```sh
❯ git clone https://github.com/HealthCheckHQ/sentinel/
```

2. Navigate to the project directory:
```sh
❯ cd sentinel
```

3. Install the required dependencies:
```sh
❯ npm install
```

###  Usage

To run the project, execute the following command:

```sh
❯ npm run build && node dist/main.js
```

###  Tests

Execute the test suite using the following command:

```sh
❯ npm test
```

---

##  Project Roadmap

- [X] **`Task 1`**: <strike>Implement feature one.</strike>
- [ ] **`Task 2`**: Implement feature two.
- [ ] **`Task 3`**: Implement feature three.

---

##  Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Report Issues](https://github.com/HealthCheckHQ/sentinel/issues)**: Submit bugs found or log feature requests for the `sentinel` project.
- **[Submit Pull Requests](https://github.com/HealthCheckHQ/sentinel/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/HealthCheckHQ/sentinel/discussions)**: Share your insights, provide feedback, or ask questions.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/HealthCheckHQ/sentinel/
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="left">
   <a href="https://github.com{/HealthCheckHQ/sentinel/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=HealthCheckHQ/sentinel">
   </a>
</p>
</details>

---

##  License

This project is protected under the [SELECT-A-LICENSE](https://choosealicense.com/licenses) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.

---

##  Acknowledgments

- List any resources, contributors, inspiration, etc. here.

---
