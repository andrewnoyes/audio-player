# Audio player assignment

## Assignment 1

The api directory contains the minimal, functional backend (app dir just a placeholder). It includes the ability to upload a song, 
retrieve all songs, and retrieve an individual song by its ID. Uploaded songs contain a `url` field for playback. 

Setup: 

* `cd api` and run `yarn`. After installation, run the api with `yarn start` or `yarn start:dev` for reloading on file change. 

Ideas for improvement: 

* Right now, the metadata is all stored on the filesystem. A better approach would be to use a database to store that information. 
  * If a database is used, introducing Docker would be a good tool for managing DB images/configuration.
* Not all the metadata is gathered for a song, just its filename. An external API or module like [exiftool](https://github.com/nathanpeck/exiftool) could be used to extract metadata on upload. 
* All of the routes are currently unprotected. Introducing user authentication + route validation to restrict file uploads to only logged in users.
* Use a third party for network storage, e.g. s3, drive.
* Improved error handling on routes. Currently if anything fails it just returns a 400 with the error message.
* Define the song metadata model to be more relational so robust queries could be implemented. (e.g. 'find all songs by Bob Dylan recorded between 1960 and 1969')
* Additional unit/integration tests for routes and services.
* Support uploading multiple songs at once.




