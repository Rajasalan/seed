This project contains React UI and Node Backend connecting to elastic search 6.4.2

## STEP 1 - SETUP Docker Elastic

### Prerequisites:
docker desktop
```sh
cd docker-compose-elasticsearch-kibana
docker-compose up -d
```
gets you elasticsearch running on localhost:9200 and kibana on localhost: 5601

##  STEP 2 - SETUP Backend

### `cd backend`
### `yarn install`
### `NODE_ENV=dev node index.js`
Open [http://localhost:8000/documentation#/](http://localhost:8000/documentation#/) to view swagger in the browser.


## STEP 3 - Run UI

### `cd ui`
### `yarn install`
### `yarn start`
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


