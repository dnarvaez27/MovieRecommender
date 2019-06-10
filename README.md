# MovieRecommender

## Used technologies
* Python 3.7
  * Pandas
  * Flask
* Javascript ES6 + CSS + HTML
  * React.js
* GitHub Pages
* Heroku


## How to setup?

### Backend
> Is necesary to setup the [OMDbAPI_KEY](http://www.omdbapi.com/apikey.aspx) in the run.py file or as an Environment Variable

* Start the virtual environment
  ```
  pipenv shell
  ```
* Install the dependencies
  ```
  pipenv install
  ```
  
* Execute the backend
  ```
  python run.py
  ```

### Frontend
* Go to the frontend folder
  ```
  cd ./front
  ```
* Install all dependencies
  ```
  npm install
  ```
* Run
  ```
  npm start
  ```
  
  ## Limitations
  * The OMDb API allows up to 1000 calls per day
  * The dataset is not enrichable through the webpage
  * The recommendation is based on ratings of users and doing a correlational matrix
