# Webpack documentation
The readme contains information about webpack setup.


#Remote livereload
Follow steps 2. and 3. to enable remote livereloading on remote targets.

## 1. Setup domain name to local livereload (so livereload works on localhost)
* Add domain name to /etc/hosts (suggestion: `outer`)
  * `127.0.0.1       outer`

## 2. Setup domain name to remote livereload
* Add domain name to /etc/hosts (suggestion: `outer`)
  * `192.168.0.101       outer`
  * Replace `192.168.0.101` with your computers external IP

## 3. Change the hot reloader 
* Edit `server/hotLoadServer.js` 
  * Change `localhost` to `outer` in `proxy`
    * `proxy: { '*': 'http://outer:${port}' },`
    
* Edit `webpack.config.js`
  * Change `localhost` to `outer` in `getDevelopmentEntry()`  
    * `'webpack-dev-server/client?http://outer:' + port,`

## 4. Accessing 
When running the `dev` target. It is possible to access the target remote with `http://outer:8080`


## 5. Running a Windows image
* Install VirtualBox
  * Either from https://www.virtualbox.org/ or with brew.
* Download a windows image from link below
  * https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/
* Boot and edit `hosts` file
  * Run Notepad as administrator
  * ![Runasadmin](https://raw.githubusercontent.com/rutebanken/digitransit-ui/master/docs/images/runasadmin.png)
  * Open file `C:/Windows/System32/drivers/etc/hosts`
  * Add external IP and domain name (suggestion: `outer`)
    * E.g. `192.168.0.101   outer`
    * Replace `192.168.0.101` with your computers external IP
  