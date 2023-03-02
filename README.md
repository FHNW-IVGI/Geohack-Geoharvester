# Geohack: NDGI Project Geoharvester

## Challenge 1 - Metadata quality control:

#### Context:
Besides our main goal of making data available and accessible through the geoharvester we also thrive to promote quality standards and good metadata documentation. For this we would like to target the data providers with a simple effort-reward strategy: Data which is complete and well documented gets found more easily and/or heigher ranked in the search results than incomplete, outdated or faulty data. Ideally the data providers will thus optimise the metadata of their services / data.

Based on the current [source definition](https://github.com/davidoesch/geoservice_harvester_poc/blob/main/sources.csv), the [scraper](https://github.com/davidoesch/geoservice_harvester_poc) currently sources about 25000 [datasets](https://github.com/davidoesch/geoservice_harvester_poc/blob/main/data/geoservices_CH.csv). (Note that for this challenge, we use a [smaller csv](https://github.com/FHNW-IVGI/Geohack-Geoharvester/blob/main/server/app/tmp/geoservices_CH_WFSonly.csv) file which only contains WFS service addresses - still about 6500 datasets). As you can see from the output the quality of the metadata varies greatly, but is difficult to grasp in detail from a table alone.

#### Task:
To get a better overview over the (meta)data quality of the current data we need additional aids - and this is very you come in: 
- How can the services/datasets assessed on their metadata completeness and quality? (main task)
- What are meaningful indicators and criteria to judge and or rank the data? (OGC compliance is a good starting point)
- How can the data be sorted/grouped/aggregated based on such criteria and analyised statistically (or visually)?

#### Suggestions:
While you could work with the [csv file](https://github.com/FHNW-IVGI/Geohack-Geoharvester/blob/main/server/app/tmp/geoservices_CH_WFSonly.csv) alone, you can also hook into the panda dataframe and transform / extend it to your needs. The dataframe gets populated once during startup (main.py / @app.on_event("startup"), see https://fastapi.tiangolo.com/advanced/events/) but you could move the code to an endpoint to trigger it from the outside,e.g. the frontend.


## Challenge 2 - Extend scraper with explorative search:

#### Context:
While the Geoharvester provides a search interface as well as a server for quick data retrieval, the datasets stored in the database/dataframe come from a separate [scraper](https://github.com/davidoesch/geoservice_harvester_poc) . Run daily by Github actions, the script takes a list of [service urls](https://github.com/davidoesch/geoservice_harvester_poc/blob/main/sources.csv), retrieves all datasets listed by the getCapabilities definition and saves the output into a [csv file](https://github.com/davidoesch/geoservice_harvester_poc/blob/main/data/geoservices_CH.csv), which is then ingested by the Geoharvester. 

#### Task:
We would like to expand the scrapers ability to source geodata, in addition to the existing list of sources. For that we would imagine an additonal script, that
- searches for additional, publically available WM(T)S / WFS services, retrieves their getCapabilies url and saves it to a file (main task)
- checks with the sources.csv if this url is already registered to avoid duplication
- filters datasets on their relevance, e.g. by comparing the bounding box (BBOX property) with the dimensions of Swizerland. Only datasets with a sufficient overlap should pass the filter
- any additonal features you may see fit

#### Suggestions:
While the service / dataset url is the main goal you could also analyse the datasets (e.g. on their quality or completeness, see challenge 1) or visualise the results. You do not need to hook into the scraper code itself (as it might be process heavy if run on your local machine) but you could add your script to the API as a separate endpoint or into the startup routine (main.py / @app.on_event("startup"), see https://fastapi.tiangolo.com/advanced/events/), save the output to a separate dataframe and display results in the frontend.  

---


## Project stack:
Stack diagram of the main project:
![Stack Diagram](https://user-images.githubusercontent.com/36440175/220350037-c8300e83-8d18-4962-b99a-54b75f5c886a.PNG)

### Simplified stack for Geohack:

The Geohack version of Geoharvester differs from this diagram:

- The backend is not containerized, Docker is not needed.
- Pandas dataframe instead of Redis database.

To compensate for the lower performance of pandas compared to reddit, a row limit (see main.py) is set.

![Stack Diagram](https://user-images.githubusercontent.com/36440175/222378450-290b82e0-f631-4628-987c-e6d67aae82ed.png)

---


## Setup / Deployment

### Frontend:

###### Requirements:

- Your favorite terminal (Recommendation for Windows: https://apps.microsoft.com/store/detail/windows-terminal/9N0DX20HK701?hl=de-ch&gl=ch&rtc=1)
- Have node and npm installed (https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

###### Run:

1. cd into frontend folder ("geoharvester_client")
2. run `npm i` to install dependencies (from package.json)
3. run `npm start` to start the fronted on localhost (`npm start` is defined in package.json)

### Backend:

###### Requirements:

- Your favorite terminal (Recommendation for Windows: https://apps.microsoft.com/store/detail/windows-terminal/9N0DX20HK701?hl=de-ch&gl=ch&rtc=1)
- Have a venv running and dependencies installed. Cd into server/app then run `python -m venv env &&  source ./env/bin/activate && pip install -r requirements.txt`

###### Run:

1. In terminal cd into the server folder
2. Run `uvicorn app.main:app --reload` to start the API
3. Check `localhost:8000/docs`in your browser to verify that backend is running

#### Troubleshooting:

##### Cannot start the application

- Check that you are starting the backend from the `server` folder (not server/apps).
- Is the virtual environment up and running?

##### VSCode complains about missing imports

- Point the VSCode python compiler to your venv, so that it can pick up the dependencies from the virtual environment. (See/Click bottom right corner in VSCode )

## API Documentation

#### SwaggerUI

Fast API comes with Swagger UI preinstalled. If you have the backend running (see steps above), Swagger UI is available on http://localhost:8000/docs. See the wiki pages of this repo for the documentation of this project.
