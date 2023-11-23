<div align="center">
  <img src=".github/velome-icon.svg" alt="velome-icon" width="80" height="80" />
  <p align="center">App to measure your velocity in developing applications.</p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#velome-api">Velome api</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#requirements">Requirements</a></li>
        <li><a href="#setup">Setup</a>
          <ul>
            <li><a href="#install">Install</a></li>
            <li><a href="#environment-variables">Environment variables</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li><a href="#start">Start</a>
    </li>
    <li><a href="#routes">Routes</a>
      <ul>
          <li><a href="#metrics">/metrics</a></li>
          <li><a href="#measures">/measures</a>
            <ul>
              <li><a href="#current">/current</a></li>
              <li><a href="#labels">/labels</a></li>
              <li><a href="#work">/work</a></li>
            </ul>
          </li>
        </ul>
    </li>
  </ol>
</details>

# Velome api

Velome api is developed with [Express.js](https://expressjs.com/) using [Prometheus](https://prometheus.io/) api

## Getting Started

### Requirements

You must install NodeJS, NPM, Yarn on your machine.

> I prefer to use yarn rather than npm.

### Setup

#### Install

```sh
yarn install
```

#### Environment variables

```sh
PROMETHEUS_URL: http://localhost:9090 # Prometheus url
```

## Start

Start api locally

```sh
yarn start
```

Then Velome api is accessible via url: http://localhost:8080

## Routes

### /metrics

Routet GET /metrics to expose the metrics so prometheus can scrape them

Curl

```sh
curl --location --request GET 'http://localhost:8080/metrics'
```

Response

```sh
# HELP work_status Work status
# TYPE work_status gauge
work_status{application="project-1",feature="header"} 1
work_status{application="project-2",feature="login"} 0
work_status{application="project-3",feature="logout"} 0
work_status{application="project-3",feature="login"} 0
work_status{application="project-1",feature="navigation"} 0
work_status{application="project-1",feature="login"} 0
work_status{application="project-1",feature="page-1"} 0
work_status{application="project-1",feature="page-2"} 0
work_status{application="project-1",feature="page-3"} 0
```

### /measures

#### /current

Routet GET /measures/current to get the status of current applications and features.

Params:

- application
- features

Curl

```sh
curl --location --request GET 'http://localhost:8080/measures/current'
```

Response

```json
{
  "data": [
    {
      "application": "project-1",
      "features": [
        {
          "feature": "header",
          "status": true
        },
        {
          "feature": "init",
          "status": false
        },
        {
          "feature": "login",
          "status": false
        },
        {
          "feature": "navigation",
          "status": false
        },
        {
          "feature": "page-1",
          "status": false
        },
        {
          "feature": "page-2",
          "status": false
        },
        {
          "feature": "page-3",
          "status": false
        }
      ]
    },
    {
      "application": "project-2",
      "features": [
        {
          "feature": "login",
          "status": false
        }
      ]
    },
    {
      "application": "project-3",
      "features": [
        {
          "feature": "login",
          "status": false
        },
        {
          "feature": "logout",
          "status": false
        }
      ]
    }
  ]
}
```

#### /labels

Routet GET /measures/labels to get all applications and features labels.

Curl

```sh
curl --location --request GET 'http://localhost:8080/measures/labels'
```

Response

```json
{
  "data": {
    "applications": ["project-1", "project-2", "project-3"],
    "features": [
      "header",
      "init",
      "login",
      "logout",
      "navigation",
      "page-1",
      "page-2",
      "page-3"
    ]
  }
}
```

#### /work

Routet POST /measures/work to start|stop application|features.

Curl

```sh
curl --location --request POST 'http://localhost:8080/measures/work' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "application": "project-1",
    "features": ["header"],
    "status": true
  }'
```

Response

```json
{
  "application": "project-1",
  "features": ["header"],
  "status": true
}
```

Made by Lucas Consejo ⚡
